import {
  and,
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  ilike,
  ne,
  or,
  type SQL,
} from "drizzle-orm";
import { rosterLikes, rostersTable } from "@/db/schema";
import {
  MAX_PUBLIC_ROSTERS,
  type Roster,
  type RosterSort,
} from "@/lib/rosters";
import { db } from "./db";

const SORT_ORDER: Record<RosterSort, SQL> = {
  recent: desc(rostersTable.updatedAt),
  likes: desc(count(rosterLikes.rosterId)),
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
      likes: count(rosterLikes.rosterId),
    })
    .from(rostersTable)
    .leftJoin(rosterLikes, eq(rosterLikes.rosterId, rostersTable.id))
    .where(where)
    .groupBy(rostersTable.id)
    .orderBy(...orderBy)
    .$dynamic();

  const rows = await (limit ? query.limit(limit) : query);

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    preset: row.preset,
    ovr: row.ovr,
    offenseOvr: row.offenseOvr,
    defenseOvr: row.defenseOvr,
    rating: row.rating,
    likes: row.likes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }));
}

export function getRostersByUser(userId: string): Promise<Roster[]> {
  return listRosters({ where: eq(rostersTable.userId, userId) });
}

export type PublicRosterQuery = {
  excludeUserId?: string;
  search?: string;
  preset?: string;
  sort?: RosterSort;
};

export function getPublicRosters({
  excludeUserId,
  search,
  preset,
  sort = "recent",
}: PublicRosterQuery = {}): Promise<Roster[]> {
  const filters = [
    excludeUserId ? ne(rostersTable.userId, excludeUserId) : undefined,
    preset ? eq(rostersTable.preset, preset) : undefined,
    search
      ? or(
          ilike(rostersTable.name, `%${search}%`),
          ilike(rostersTable.preset, `%${search}%`),
        )
      : undefined,
  ];

  return listRosters({
    where: and(...filters),
    orderBy: [SORT_ORDER[sort], desc(rostersTable.id)],
    limit: MAX_PUBLIC_ROSTERS,
  });
}

export async function getRosterPresets(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ preset: rostersTable.preset })
    .from(rostersTable)
    .orderBy(asc(rostersTable.preset));
  return rows.map((row) => row.preset);
}
