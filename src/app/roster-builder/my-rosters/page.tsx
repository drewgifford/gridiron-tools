import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import Container from "@/components/Container";
import { RosterCard } from "@/components/roster/RosterCard";
import { Heading1, Text } from "@/components/typography/Heading";
import { Button } from "@/components/ui/button";
import { getRostersByUser, getUserVotes } from "@/lib/db/rosters";
import { MAX_ROSTERS_PER_USER } from "@/lib/rosters";

export default async function MyRosters() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-3 px-4 py-20 text-center">
          <Heading1>My Rosters</Heading1>
          <Text className="text-muted-foreground">
            Sign in to view and manage your rosters.
          </Text>
          <SignInButton mode="modal">
            <Button className="mt-2">Sign in</Button>
          </SignInButton>
        </div>
      </Container>
    );
  }

  const [rosters, userVotes] = await Promise.all([
    getRostersByUser(userId),
    getUserVotes(userId),
  ]);
  const withVotes = rosters.map((roster) => ({
    ...roster,
    userVote: userVotes[roster.id] ?? null,
  }));

  return (
    <Container>
      <div className="flex flex-col gap-8 px-4 py-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <Heading1>My Rosters</Heading1>
            <Text>
              {rosters.length} of {MAX_ROSTERS_PER_USER} rosters
            </Text>
          </div>
          {rosters.length < MAX_ROSTERS_PER_USER && (
            <Link href="/roster-builder/create">
              <Button>
                <Plus />
                New roster
              </Button>
            </Link>
          )}
        </header>

        {withVotes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {withVotes.map((roster) => (
              <RosterCard key={roster.id} roster={roster} isSignedIn />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            You haven't created any rosters yet.
          </div>
        )}
      </div>
    </Container>
  );
}
