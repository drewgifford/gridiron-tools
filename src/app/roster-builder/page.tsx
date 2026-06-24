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
} from "@/lib/db/rosters";
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

  const [publicRosters, presets] = await Promise.all([
    getPublicRostersCached({
      search: search || undefined,
      preset: activePreset || undefined,
      sort,
    }),
    getRosterPresetsCached(),
  ]);

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
            <Button variant="ghost">My Rosters</Button>

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
              rosters={publicRosters}
              presets={presets}
              query={search}
              preset={activePreset}
              sort={sort}
            />
          </Suspense>
        </section>
      </div>
    </Container>
  );
}
