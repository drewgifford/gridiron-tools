"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/db/db-client";
import { playersTable, rostersTable } from "@/db/schema";
import { isOffense } from "@/lib/domain/positions";
import type { PublishStatus } from "@/lib/domain/roster";
import type { GeneratedPlayer } from "@/lib/roster-generator";
import { MAX_ROSTERS_PER_USER } from "@/lib/rosters";
import { ZRosterInput } from "@/lib/schema/roster-input";

export type CreateRosterInput = {
  name: string;
  description: string;
  status: PublishStatus;
  preset: string;
  offensiveScheme: string;
  defensiveScheme: string;
  offensiveOvr: number;
  defensiveOvr: number;
  rating: number;
  players: GeneratedPlayer[];
};

export type CreateRosterResult =
  | { ok: true; rosterId: number }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  );
}

/** Validate input and derive the persisted roster column values. */
function buildRoster(input: CreateRosterInput) {
  const parsed = ZRosterInput.safeParse({
    name: input.name,
    description: input.description,
    status: input.status,
    preset: input.preset,
    offensiveScheme: input.offensiveScheme,
    defensiveScheme: input.defensiveScheme,
    offensiveOvr: input.offensiveOvr,
    defensiveOvr: input.defensiveOvr,
    rating: input.rating,
    playerCount: input.players.length,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
    }
    return {
      ok: false as const,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const players = input.players;
  return {
    ok: true as const,
    players,
    values: {
      name: data.name,
      description: data.description,
      preset: data.preset,
      ovr: average(players.map((p) => p.overall)),
      offenseOvr: average(
        players.filter((p) => isOffense(p.position)).map((p) => p.overall),
      ),
      defenseOvr: average(
        players.filter((p) => !isOffense(p.position)).map((p) => p.overall),
      ),
      status: data.status,
      rating: data.rating,
    },
  };
}

export async function createRoster(
  input: CreateRosterInput,
): Promise<CreateRosterResult> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "You must be signed in to save a roster." };
  }

  const built = buildRoster(input);
  if (!built.ok) return built;

  const count = await db.$count(rostersTable, eq(rostersTable.userId, userId));
  if (count >= MAX_ROSTERS_PER_USER) {
    return {
      ok: false,
      error: `You've reached the limit of ${MAX_ROSTERS_PER_USER} rosters.`,
    };
  }

  const rosterId = await db.transaction(async (tx) => {
    const [row] = await tx
      .insert(rostersTable)
      .values({ userId, ...built.values })
      .returning({ id: rostersTable.id });

    await tx
      .insert(playersTable)
      .values(built.players.map((player) => ({ ...player, rosterId: row.id })));

    return row.id;
  });

  revalidatePath("/roster-builder");
  updateTag("public-rosters");
  return { ok: true, rosterId };
}

export async function updateRoster(
  rosterId: number,
  input: CreateRosterInput,
): Promise<CreateRosterResult> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "You must be signed in to save a roster." };
  }

  const [existing] = await db
    .select({ userId: rostersTable.userId })
    .from(rostersTable)
    .where(eq(rostersTable.id, rosterId))
    .limit(1);
  if (!existing) return { ok: false, error: "Roster not found." };
  if (existing.userId !== userId) {
    return { ok: false, error: "You can only edit your own rosters." };
  }

  const built = buildRoster(input);
  if (!built.ok) return built;

  await db.transaction(async (tx) => {
    await tx
      .update(rostersTable)
      .set({ ...built.values, updatedAt: new Date() })
      .where(eq(rostersTable.id, rosterId));

    await tx.delete(playersTable).where(eq(playersTable.rosterId, rosterId));
    await tx
      .insert(playersTable)
      .values(built.players.map((player) => ({ ...player, rosterId })));
  });

  revalidatePath("/roster-builder");
  revalidatePath(`/roster-builder/roster/${rosterId}`);
  updateTag("public-rosters");
  return { ok: true, rosterId };
}
