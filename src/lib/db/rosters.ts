import {
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  ilike,
  or,
  type SQL,
  sql,
} from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db/db-client";
import type { Player } from "@/db/schema";
import { playersTable, rosterLikes, rostersTable } from "@/db/schema";
import type { RosterVote } from "@/lib/domain/roster";
import { MAX_PUBLIC_ROSTERS, type RosterSort } from "@/lib/rosters";
import type { User } from "@/lib/schema/author";
import { type Roster, ZRoster } from "@/lib/schema/roster";
import { attachAuthors } from "@/lib/util/resolve-author";

const likeCount =
  sql<number>`count(*) filter (where ${rosterLikes.vote} = 'like')`.mapWith(
    Number,
  );
const dislikeCount =
  sql<number>`count(*) filter (where ${rosterLikes.vote} = 'dislike')`.mapWith(
    Number,
  );

const SORT_ORDER: Record<RosterSort, SQL> = {
  recent: desc(rostersTable.updatedAt),
  likes: desc(likeCount),
  rating: desc(rostersTable.rating),
  ovr: desc(rostersTable.ovr),
  name: asc(rostersTable.name),
};

async function listRosters({
  where,
  orderBy = [desc(rostersTable.updatedAt)],
  limit,
}: {
  where?: SQL;
  orderBy?: SQL[];
  limit?: number;
} = {}): Promise<Roster[]> {
  const query = db
    .select({
      ...getTableColumns(rostersTable),
      likes: likeCount,
      dislikes: dislikeCount,
    })
    .from(rostersTable)
    .leftJoin(rosterLikes, eq(rosterLikes.rosterId, rostersTable.id))
    .where(where)
    .groupBy(rostersTable.id)
    .orderBy(...orderBy)
    .$dynamic();

  const rows = await (limit ? query.limit(limit) : query);

  const mappedRows: Roster[] = rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    name: row.name,
    description: row.description,
    preset: row.preset,
    status: row.status,
    ovr: row.ovr,
    offenseOvr: row.offenseOvr,
    defenseOvr: row.defenseOvr,
    rating: row.rating,
    likes: row.likes,
    dislikes: row.dislikes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    user: null,
  }));

  const rostersWithAuthors = await attachAuthors(mappedRows);
  return ZRoster.array().parse(rostersWithAuthors);
}

export function getRostersByUser(userId: string): Promise<Roster[]> {
  return listRosters({ where: eq(rostersTable.userId, userId) });
}

export function countRostersByUser(userId: string): Promise<number> {
  return db.$count(rostersTable, eq(rostersTable.userId, userId));
}

/** The current user's vote per roster, keyed by roster id. Not cached (per-user). */
export async function getUserVotes(
  userId: string,
): Promise<Record<number, RosterVote>> {
  const rows = await db
    .select({ rosterId: rosterLikes.rosterId, vote: rosterLikes.vote })
    .from(rosterLikes)
    .where(eq(rosterLikes.userId, userId));
  return Object.fromEntries(rows.map((row) => [row.rosterId, row.vote]));
}

/** Like/dislike counts for a single roster. */
export async function getRosterVotes(
  rosterId: number,
): Promise<{ likes: number; dislikes: number }> {
  const [row] = await db
    .select({ likes: likeCount, dislikes: dislikeCount })
    .from(rosterLikes)
    .where(eq(rosterLikes.rosterId, rosterId));
  return { likes: row?.likes ?? 0, dislikes: row?.dislikes ?? 0 };
}

export type PublicRosterQuery = {
  search?: string;
  preset?: string;
  sort?: RosterSort;
};

/** Escape LIKE/ILIKE wildcards so user input is matched literally. */
function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export function getPublicRosters({
  search,
  preset,
  sort = "recent",
}: PublicRosterQuery = {}): Promise<Roster[]> {
  const term = search ? `%${escapeLike(search)}%` : undefined;
  const filters = [
    eq(rostersTable.status, "published"),
    preset ? eq(rostersTable.preset, preset) : undefined,
    term
      ? or(
          ilike(rostersTable.name, term),
          ilike(rostersTable.preset, term),
          ilike(rostersTable.description, term),
        )
      : undefined,
  ];

  return listRosters({
    where: and(...filters),
    orderBy: [SORT_ORDER[sort], desc(rostersTable.id)],
    limit: MAX_PUBLIC_ROSTERS,
  });
}

export async function getPublicRostersCached(query: PublicRosterQuery = {}) {
  return unstable_cache(
    () => {
      return getPublicRosters(query);
    },
    [
      "get-public-rosters",
      query.preset ?? "",
      query.search ?? "",
      query.sort ?? "",
    ],
    {
      revalidate: 60,
      tags: ["public-rosters"],
    },
  )();
}

export type RosterRow = typeof rostersTable.$inferSelect;
export type RosterWithAuthor = RosterRow & { user: User | null };

export async function getRosterWithPlayers(
  id: number,
): Promise<{ roster: RosterWithAuthor; players: Player[] } | null> {
  const [roster] = await db
    .select()
    .from(rostersTable)
    .where(eq(rostersTable.id, id))
    .limit(1);
  if (!roster) return null;

  const [withAuthor] = await attachAuthors([roster]);
  const players = await db
    .select()
    .from(playersTable)
    .where(eq(playersTable.rosterId, id))
    .orderBy(asc(playersTable.depthOrder));

  return { roster: withAuthor, players };
}

export async function getRosterPresets(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ preset: rostersTable.preset })
    .from(rostersTable)
    .where(eq(rostersTable.status, "published"))
    .orderBy(asc(rostersTable.preset));
  return rows.map((row) => row.preset);
}

export async function getRosterPresetsCached() {
  return unstable_cache(
    () => {
      return getRosterPresets();
    },
    ["get-roster-presets"],
    {
      revalidate: 60 * 60,
    },
  )();
}
