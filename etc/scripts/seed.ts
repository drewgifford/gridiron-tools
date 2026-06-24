/**
 * Seeds the database with rosters (and their likes).
 *
 * Run with:  bun run db:seed
 * Requires:  DATABASE_URL pointing at the target Postgres database.
 *
 * The script is idempotent — re-running it replaces every roster owned by one
 * of the seeded users (the owner below plus a synthetic user per public author)
 * rather than stacking duplicates. Deleting a roster cascades to its likes.
 */
import { inArray } from "drizzle-orm";
import { client, db } from "@/db/db-client";
import { rosterLikes, rostersTable } from "@/db/schema";

/** Clerk user the seeded "My Rosters" are attributed to. */
const ownerId = "user_3FWA7zaz0kTtCI1JXPPUlHuXXgV";

type SeedRoster = {
  name: string;
  description: string;
  preset: string;
  ovr: number;
  offenseOvr: number;
  defenseOvr: number;
  rating: number;
  /** Synthetic likes to fabricate for this roster. */
  likes: number;
  createdAt: string;
  updatedAt: string;
  /** Display name for public rosters; the owner's rosters omit this. */
  author?: string;
};

/** Rosters attributed to the owner above ("Your rosters" in the UI). */
const ownedRosters: SeedRoster[] = [
  {
    name: "Prairie Hawks",
    description: "Ted Lasso offense. Total football baby. Oh, wrong sport?",
    preset: "Balanced",
    ovr: 87,
    offenseOvr: 85,
    defenseOvr: 88,
    rating: 4.5,
    likes: 128,
    createdAt: "2026-05-02T14:00:00Z",
    updatedAt: "2026-06-18T09:30:00Z",
  },
  {
    name: "Tempo Raiders",
    description: "But do they have wenegade waider in the item shop?",
    preset: "Spread Option",
    ovr: 88,
    offenseOvr: 89,
    defenseOvr: 86,
    rating: 4,
    likes: 210,
    createdAt: "2026-05-19T08:00:00Z",
    updatedAt: "2026-06-20T13:15:00Z",
  },
];

/** Community rosters, each attributed to a synthetic user from its author. */
const publicRosters: SeedRoster[] = [
  {
    name: "Desert Gunslingers",
    preset: "Air Raid",
    description: "That looked a little Mahomey",
    ovr: 90,
    offenseOvr: 94,
    defenseOvr: 84,
    rating: 5,
    likes: 342,
    author: "AirRaidAndy",
    createdAt: "2026-04-21T18:10:00Z",
    updatedAt: "2026-06-12T22:05:00Z",
  },
  {
    name: "Smashmouth U",
    preset: "Ground & Pound",
    description: "JUST RUN THE DAMN BALL",
    ovr: 84,
    offenseOvr: 86,
    defenseOvr: 82,
    rating: 3.5,
    likes: 56,
    author: "CoachK",
    createdAt: "2026-03-15T11:45:00Z",
    updatedAt: "2026-05-30T16:20:00Z",
  },
  {
    name: "Iron Curtain",
    preset: "4-3 Defense",
    description: "Based on the Pittsburgh Steelers.",
    ovr: 86,
    offenseOvr: 80,
    defenseOvr: 92,
    rating: 2.5,
    likes: 19,
    author: "BlitzBob",
    createdAt: "2026-02-28T09:00:00Z",
    updatedAt: "2026-06-01T10:40:00Z",
  },
  {
    name: "Capital City Pros",
    preset: "Pro Style",
    description:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black.",
    ovr: 91,
    offenseOvr: 90,
    defenseOvr: 91,
    rating: 5,
    likes: 415,
    author: "GridGuru",
    createdAt: "2026-06-05T20:30:00Z",
    updatedAt: "2026-06-21T19:00:00Z",
  },
  {
    name: "Bayou Bombers",
    preset: "Air Raid",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ovr: 89,
    offenseOvr: 93,
    defenseOvr: 83,
    rating: 4,
    likes: 173,
    author: "GeauxDeep",
    createdAt: "2026-04-02T15:20:00Z",
    updatedAt: "2026-06-09T11:00:00Z",
  },
  {
    name: "Mountain Maulers",
    preset: "Ground & Pound",
    description: "Lorem ipsum dolor sit amet",
    ovr: 85,
    offenseOvr: 88,
    defenseOvr: 81,
    rating: 3,
    likes: 88,
    author: "RunItTwice",
    createdAt: "2026-03-29T12:00:00Z",
    updatedAt: "2026-05-22T17:45:00Z",
  },
  {
    name: "Coastal Cannons",
    preset: "Balanced",
    description: "Evil Larry made this roster",
    ovr: 88,
    offenseOvr: 87,
    defenseOvr: 89,
    rating: 4.5,
    likes: 264,
    author: "TideRoller",
    createdAt: "2026-05-11T09:15:00Z",
    updatedAt: "2026-06-19T08:30:00Z",
  },
  {
    name: "River City Rebels",
    preset: "Spread Option",
    description: "A fun roster I made in my free time. Generated",
    ovr: 86,
    offenseOvr: 88,
    defenseOvr: 83,
    rating: 3.5,
    likes: 121,
    author: "OptionOllie",
    createdAt: "2026-04-17T19:40:00Z",
    updatedAt: "2026-06-15T14:10:00Z",
  },
  {
    name: "Summit Sentinels",
    preset: "Pro Style",
    description: "A pro style offense based on the Akron Pros",
    ovr: 90,
    offenseOvr: 89,
    defenseOvr: 90,
    rating: 5,
    likes: 388,
    author: "ProStylePat",
    createdAt: "2026-05-26T10:05:00Z",
    updatedAt: "2026-06-17T20:25:00Z",
  },
];

/** Derive a stable, synthetic user id for a public roster's author. */
function authorUserId(author: string): string {
  const slug = author
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `seed_user_${slug || "anonymous"}`;
}

/** Owner's rosters belong to `ownerId`; public rosters to a per-author user. */
const seedRosters = [
  ...ownedRosters.map((roster) => ({ ...roster, userId: ownerId })),
  ...publicRosters.map((roster) => ({
    ...roster,
    userId: authorUserId(roster.author ?? "anonymous"),
  })),
];

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Point it at your Postgres database before seeding.",
    );
  }

  const ownedUserIds = Array.from(new Set(seedRosters.map((r) => r.userId)));

  const totalLikes = seedRosters.reduce((sum, r) => sum + r.likes, 0);
  console.log(
    `Seeding ${seedRosters.length} rosters (${ownedRosters.length} owned, ${publicRosters.length} public) and ${totalLikes} likes...`,
  );

  await db.transaction(async (tx) => {
    // Wipe prior seed data for these users; likes cascade on roster delete.
    await tx
      .delete(rostersTable)
      .where(inArray(rostersTable.userId, ownedUserIds));

    // Insert rosters; a single multi-row insert returns ids in input order.
    const inserted = await tx
      .insert(rostersTable)
      .values(
        seedRosters.map((roster) => ({
          userId: roster.userId,
          name: roster.name,
          description: roster.description,
          preset: roster.preset,
          ovr: roster.ovr,
          offenseOvr: roster.offenseOvr,
          defenseOvr: roster.defenseOvr,
          status: "published" as const,
          rating: roster.rating,
          createdAt: new Date(roster.createdAt),
          updatedAt: new Date(roster.updatedAt),
        })),
      )
      .returning({ id: rostersTable.id });

    // Fabricate one like row per like, with a unique liker per (roster, like).
    const likeRows = inserted.flatMap(({ id }, i) =>
      Array.from({ length: seedRosters[i].likes }, (_, n) => ({
        rosterId: id,
        userId: `seed_liker_${id}_${n}`,
      })),
    );

    for (const batch of chunk(likeRows, 1000)) {
      await tx.insert(rosterLikes).values(batch);
    }
  });

  console.log("Seed complete.");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
