import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import {
  CreateRosterForm,
  type RosterFormInitial,
} from "@/components/roster/builder/CreateRosterForm";
import type { RosterPreset } from "@/data/roster-generator/presets";
import { getRosterWithPlayers } from "@/lib/db/rosters";

export default async function RosterEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rosterId = Number(id);
  if (!Number.isInteger(rosterId)) notFound();

  const { userId } = await auth();
  const data = await getRosterWithPlayers(rosterId);
  if (!data || data.roster.userId !== userId) notFound();

  const { roster, players } = data;
  const initial: RosterFormInitial = {
    rosterId: roster.id,
    details: {
      name: roster.name,
      description: roster.description,
      starRating: roster.rating,
      visibility: roster.status,
    },
    config: {
      preset: roster.preset as RosterPreset,
      offensiveScheme: "Multiple",
      defensiveScheme: "4-3",
      targetOffenseOvr: roster.offenseOvr,
      targetDefenseOvr: roster.defenseOvr,
    },
    players: players.map(
      ({ id: _id, rosterId: _rosterId, createdAt, updatedAt, ...rest }) => rest,
    ),
  };

  return (
    <Container>
      <div className="flex flex-col gap-4 px-4 py-8">
        <CreateRosterForm initial={initial} />
      </div>
    </Container>
  );
}
