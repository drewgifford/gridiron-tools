import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Container from "@/components/Container";
import { PublicRosters } from "@/components/roster/PublicRosters";
import { Heading1, Heading2, Text } from "@/components/typography/Heading";
import { Button } from "@/components/ui/button";
import {
  getPublicRostersCached,
  getRosterPresetsCached,
  getUserVotes,
} from "@/lib/db/rosters";
import type { RosterVote } from "@/lib/domain/roster";
import { parseSort } from "@/lib/rosters";

export default async function RosterCreator({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; preset?: string; sort?: string }>;
}) {
  const { q, preset, sort: sortParam } = await searchParams;
  const search = typeof q === "string" ? q.trim() : "";
  const activePreset = typeof preset === "string" ? preset : "";
  const sort = parseSort(sortParam);

  const { userId } = await auth();
  const [publicRosters, presets, userVotes] = await Promise.all([
    getPublicRostersCached({
      search: search || undefined,
      preset: activePreset || undefined,
      sort,
    }),
    getRosterPresetsCached(),
    userId
      ? getUserVotes(userId)
      : Promise.resolve<Record<number, RosterVote>>({}),
  ]);

  const rosters = publicRosters.map((roster) => ({
    ...roster,
    userVote: userVotes[roster.id] ?? null,
  }));

  return (
    <Container>
      <div className="flex flex-col gap-10 px-4 py-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <Heading1>Roster Builder</Heading1>
            <Text>
              Easily generate and manage custom rosters for Team Builder on CFB
              27.
            </Text>
          </div>

          <div className="flex gap-2">
            <Link href="/roster-builder/my-rosters">
              <Button variant="ghost">My Rosters</Button>
            </Link>

            <Link href="/roster-builder/create">
              <Button>
                <Plus />
                New roster
              </Button>
            </Link>
          </div>
        </header>

        <section
          aria-labelledby="public-rosters-heading"
          className="flex flex-col gap-4"
        >
          <Heading2 id="public-rosters-heading">Search public rosters</Heading2>
          <Suspense>
            <PublicRosters
              rosters={rosters}
              presets={presets}
              query={search}
              preset={activePreset}
              sort={sort}
              isSignedIn={!!userId}
            />
          </Suspense>
        </section>
      </div>
    </Container>
  );
}
