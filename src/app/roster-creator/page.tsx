import { Show, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import Container from "@/components/Container";
import { PublicRosters } from "@/components/roster/PublicRosters";
import { RosterCard } from "@/components/roster/RosterCard";
import { Heading1, Heading2, Text } from "@/components/typography/Heading";
import { Button } from "@/components/ui/button";
import {
  getPublicRosters,
  getRosterPresets,
  getRostersByUser,
} from "@/lib/db/rosters";
import { parseSort } from "@/lib/rosters";

export default async function RosterCreator({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; preset?: string; sort?: string }>;
}) {
  const { userId } = await auth();
  const { q, preset, sort: sortParam } = await searchParams;
  const search = typeof q === "string" ? q.trim() : "";
  const activePreset = typeof preset === "string" ? preset : "";
  const sort = parseSort(sortParam);

  const [myRosters, publicRosters, presets] = await Promise.all([
    userId ? getRostersByUser(userId) : [],
    getPublicRosters({
      excludeUserId: userId ?? undefined,
      search: search || undefined,
      preset: activePreset || undefined,
      sort,
    }),
    getRosterPresets(),
  ]);

  return (
    <Container>
      <div className="flex flex-col gap-10 px-4 py-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <Heading1>Roster Creator</Heading1>
            <Text>Easily manage rosters for Team Builder on CFB 27.</Text>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost">My Rosters</Button>
            <Button>
              <Plus />
              New roster
            </Button>
          </div>
        </header>

        <section
          aria-labelledby="your-rosters-heading"
          className="flex flex-col gap-4"
        >
          <Heading2 id="your-rosters-heading">Your rosters</Heading2>
          {myRosters.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {myRosters.map((roster) => (
                <RosterCard key={roster.id} roster={roster} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
              <Show when="signed-in">
                <span>You haven't created any rosters yet.</span>
                <Button>
                  <Plus />
                  New roster
                </Button>
              </Show>

              <Show when="signed-out">
                <span>Sign in to see your rosters.</span>
                <SignInButton>
                  <Button>Sign in</Button>
                </SignInButton>
              </Show>
            </div>
          )}
        </section>

        <section
          aria-labelledby="public-rosters-heading"
          className="flex flex-col gap-4"
        >
          <Heading2 id="public-rosters-heading">Public rosters</Heading2>
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
