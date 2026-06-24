import {
  and,
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  ilike,
  or,
  type SQL,
} from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db/db-client";
import { rosterLikes, rostersTable } from "@/db/schema";
import { MAX_PUBLIC_ROSTERS, type RosterSort } from "@/lib/rosters";
import { type Roster, ZRoster } from "@/lib/schema/roster";
import { attachAuthors } from "@/lib/util/resolve-author";

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

  const mappedRows: Roster[] = rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    name: row.name,
    description: row.description,
    preset: row.preset,
    ovr: row.ovr,
    offenseOvr: row.offenseOvr,
    defenseOvr: row.defenseOvr,
    rating: row.rating,
    likes: row.likes,
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

export type PublicRosterQuery = {
  search?: string;
  preset?: string;
  sort?: RosterSort;
};

export function getPublicRosters({
  search,
  preset,
  sort = "recent",
}: PublicRosterQuery = {}): Promise<Roster[]> {
  const filters = [
    preset ? eq(rostersTable.preset, preset) : undefined,
    search
      ? or(
          ilike(rostersTable.name, `%${search}%`),
          ilike(rostersTable.preset, `%${search}%`),
          ilike(rostersTable.description, `%${search}%`),
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
    },
  )();
}

export async function getRosterPresets(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ preset: rostersTable.preset })
    .from(rostersTable)
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
