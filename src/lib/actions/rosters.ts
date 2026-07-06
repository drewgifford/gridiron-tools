"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db/db-client";
import { rosterLikes, rostersTable } from "@/db/schema";
import type { RosterVote } from "@/lib/domain/roster";

/** Record (or clear, when `vote` is null) the current user's vote on a roster. */
export async function voteRoster(rosterId: number, vote: RosterVote | null) {
  const { userId } = await auth();
  if (!userId) throw new Error("You must be signed in to vote.");

  if (vote === null) {
    await db
      .delete(rosterLikes)
      .where(
        and(eq(rosterLikes.rosterId, rosterId), eq(rosterLikes.userId, userId)),
      );
  } else {
    await db
      .insert(rosterLikes)
      .values({ rosterId, userId, vote })
      .onConflictDoUpdate({
        target: [rosterLikes.rosterId, rosterLikes.userId],
        set: { vote, updatedAt: new Date() },
      });
  }

  updateTag("public-rosters");
}

/** Delete a roster the current user owns. Its players cascade-delete. */
export async function deleteRoster(rosterId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("You must be signed in to delete a roster.");

  await db
    .delete(rostersTable)
    .where(and(eq(rostersTable.id, rosterId), eq(rostersTable.userId, userId)));

  updateTag("public-rosters");
}
