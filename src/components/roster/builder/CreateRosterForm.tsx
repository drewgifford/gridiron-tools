"use client";

import { Cog, ListChecks, Users } from "lucide-react";
import { useState } from "react";
import { DetailsStep } from "@/components/roster/builder/DetailsStep";
import { GenerateStep } from "@/components/roster/builder/GenerateStep";
import { PlayersStep } from "@/components/roster/builder/PlayersStep";
import type {
  GenerateConfig,
  GenerationStatus,
  RosterDetails,
  RosterStep,
} from "@/components/roster/builder/types";
import { Heading1 } from "@/components/typography/Heading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type GeneratedPlayer,
  generateRoster,
  regeneratePlayer,
  type TeamConfig,
} from "@/lib/roster-generator";
import { withRecomputedOverall } from "@/lib/roster-generator/stats";

export function CreateRosterForm() {
  const [details, setDetails] = useState<RosterDetails>({
    name: "",
    starRating: 3,
    visibility: "draft",
    description: "",
  });
  const [config, setConfig] = useState<GenerateConfig>({
    preset: "",
    offensiveScheme: "Multiple",
    defensiveScheme: "4-3",
    targetOffenseOvr: 75,
    targetDefenseOvr: 75,
  });
  const [step, setStep] = useState<RosterStep>("details");
  const [players, setPlayers] = useState<GeneratedPlayer[]>([]);
  const [genStatus, setGenStatus] = useState<GenerationStatus>("idle");
  const [genId, setGenId] = useState(0);

  const handleGenerate = async () => {
    if (config.preset === "") return;
    setGenStatus("generating");
    // Yield so the spinner paints before the synchronous generation blocks.
    await new Promise((resolve) => setTimeout(resolve, 0));
    const { players: generated } = generateRoster({
      preset: config.preset,
      offensiveScheme: config.offensiveScheme,
      defensiveScheme: config.defensiveScheme,
      offensiveOvr: config.targetOffenseOvr,
      defensiveOvr: config.targetDefenseOvr,
      programRating: details.starRating,
    });
    setPlayers(generated);
    setGenStatus("done");
    // Bump the generation id so PlayersStep remounts and drops stale selection.
    setGenId((id) => id + 1);
  };

  const updatePlayer = (index: number, next: GeneratedPlayer) =>
    setPlayers((prev) => prev.map((p, i) => (i === index ? next : p)));

  const updatePlayers = (
    indices: number[],
    mutate: (player: GeneratedPlayer) => GeneratedPlayer,
  ) => {
    const targets = new Set(indices);
    setPlayers((prev) =>
      prev.map((p, i) =>
        targets.has(i) ? withRecomputedOverall(mutate(p)) : p,
      ),
    );
  };

  const regeneratePlayers = (indices: number[]) => {
    if (config.preset === "") return;
    const teamConfig: TeamConfig = {
      preset: config.preset,
      offensiveScheme: config.offensiveScheme,
      defensiveScheme: config.defensiveScheme,
      offensiveOvr: config.targetOffenseOvr,
      defensiveOvr: config.targetDefenseOvr,
      programRating: details.starRating,
    };
    const targets = new Set(indices);
    setPlayers((prev) => {
      const usedJerseyNumbers = new Set(prev.map((p) => p.jerseyNumber));
      return prev.map((p, i) =>
        targets.has(i) ? regeneratePlayer(p, teamConfig, usedJerseyNumbers) : p,
      );
    });
  };

  return (
    <>
      <header className="flex items-start justify-between gap-4">
        <Heading1>{details.name.trim() || "New roster"}</Heading1>
      </header>

      <Tabs
        value={step}
        onValueChange={(v) => setStep(v as RosterStep)}
        className="flex flex-col gap-8"
      >
        <TabsList className="w-full">
          <TabsTrigger value="details">
            <ListChecks />
            Details
          </TabsTrigger>
          <TabsTrigger value="generate">
            <Cog />
            Generate
          </TabsTrigger>
          <TabsTrigger value="players">
            <Users />
            Roster
          </TabsTrigger>
        </TabsList>

        <DetailsStep
          value={details}
          onChange={setDetails}
          onNext={() => setStep("generate")}
        />
        <GenerateStep
          value={config}
          onChange={setConfig}
          onGenerate={handleGenerate}
          onNext={() => setStep("players")}
          status={genStatus}
          generatedCount={players.length}
        />
        <PlayersStep
          key={genId}
          players={players}
          onUpdatePlayer={updatePlayer}
          onUpdatePlayers={updatePlayers}
          onRegeneratePlayers={regeneratePlayers}
        />
      </Tabs>
    </>
  );
}
