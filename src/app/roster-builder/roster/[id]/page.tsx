import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { RosterView } from "@/components/roster/view/RosterView";
import {
  getRosterVotes,
  getRosterWithPlayers,
  getUserVotes,
} from "@/lib/db/rosters";
import type { RosterVote } from "@/lib/domain/roster";

export default async function RosterViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rosterId = Number(id);
  if (!Number.isInteger(rosterId)) notFound();

  const data = await getRosterWithPlayers(rosterId);
  if (!data) notFound();

  const { userId } = await auth();
  const isOwner = data.roster.userId === userId;
  if (data.roster.status === "draft" && !isOwner) notFound();

  const [votes, userVotes] = await Promise.all([
    getRosterVotes(rosterId),
    userId
      ? getUserVotes(userId)
      : Promise.resolve<Record<number, RosterVote>>({}),
  ]);

  return (
    <Container>
      <div className="flex flex-col gap-6 px-4 py-8">
        <RosterView
          roster={data.roster}
          players={data.players}
          isOwner={isOwner}
          likes={votes.likes}
          dislikes={votes.dislikes}
          userVote={userVotes[rosterId] ?? null}
          isSignedIn={!!userId}
        />
      </div>
    </Container>
  );
}
