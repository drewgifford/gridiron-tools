"use client";

import { Cog, ListChecks, Loader2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  createRoster,
  updateRoster,
} from "@/app/roster-builder/create/actions";
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PublishStatus } from "@/lib/domain/roster";
import {
  type GeneratedPlayer,
  generateRoster,
  regeneratePlayer,
  type TeamConfig,
} from "@/lib/roster-generator";
import { withRecomputedOverall } from "@/lib/roster-generator/stats";
import {
  rosterDescriptionSchema,
  rosterNameSchema,
} from "@/lib/schema/roster-input";

export type RosterFormInitial = {
  rosterId: number;
  details: RosterDetails;
  config: GenerateConfig;
  players: GeneratedPlayer[];
};

export function CreateRosterForm({ initial }: { initial?: RosterFormInitial }) {
  const [details, setDetails] = useState<RosterDetails>(
    initial?.details ?? {
      name: "",
      starRating: 3,
      visibility: "draft",
      description: "",
    },
  );
  const [config, setConfig] = useState<GenerateConfig>(
    initial?.config ?? {
      preset: "",
      offensiveScheme: "Multiple",
      defensiveScheme: "4-3",
      targetOffenseOvr: 75,
      targetDefenseOvr: 75,
    },
  );
  const [step, setStep] = useState<RosterStep>(initial ? "players" : "details");
  const [players, setPlayers] = useState<GeneratedPlayer[]>(
    initial?.players ?? [],
  );
  const [genStatus, setGenStatus] = useState<GenerationStatus>(
    initial ? "done" : "idle",
  );
  const [genId, setGenId] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [savingStatus, setSavingStatus] = useState<PublishStatus | null>(null);
  const [isSaving, startSaving] = useTransition();
  const router = useRouter();

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

  const nameResult = rosterNameSchema.safeParse(details.name);
  const descriptionResult = rosterDescriptionSchema.safeParse(
    details.description,
  );
  const nameError =
    details.name.trim().length > 0 && !nameResult.success
      ? nameResult.error.issues[0].message
      : undefined;
  const descriptionError = !descriptionResult.success
    ? descriptionResult.error.issues[0].message
    : undefined;

  const canSubmit =
    nameResult.success &&
    descriptionResult.success &&
    config.preset !== "" &&
    players.length > 0;

  const gateHint = !canSubmit
    ? !nameResult.success
      ? details.name.trim().length > 0
        ? nameResult.error.issues[0].message
        : "Add a roster name to save."
      : descriptionError
        ? descriptionError
        : "Generate players before saving."
    : null;

  const submit = (status: PublishStatus) => {
    if (!canSubmit) return;
    setServerError(null);
    setSavingStatus(status);
    startSaving(async () => {
      const payload = {
        name: details.name,
        description: details.description,
        status,
        preset: config.preset,
        offensiveScheme: config.offensiveScheme,
        defensiveScheme: config.defensiveScheme,
        offensiveOvr: config.targetOffenseOvr,
        defensiveOvr: config.targetDefenseOvr,
        rating: details.starRating,
        players,
      };
      const result = initial
        ? await updateRoster(initial.rosterId, payload)
        : await createRoster(payload);
      if (result.ok) {
        router.push(
          initial
            ? `/roster-builder/roster/${initial.rosterId}`
            : "/roster-builder",
        );
      } else {
        setServerError(result.error);
        setSavingStatus(null);
      }
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
          nameError={nameError}
          descriptionError={descriptionError}
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

      <div className="sticky bottom-0 z-10 -mx-4 flex flex-col gap-3 border-t bg-background px-4 py-4">
        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}
        <div className="flex items-center justify-end gap-3">
          {gateHint && (
            <span className="text-sm text-muted-foreground">{gateHint}</span>
          )}
          <Button
            variant="secondary"
            disabled={!canSubmit || isSaving}
            onClick={() => submit("draft")}
          >
            {savingStatus === "draft" && <Loader2 className="animate-spin" />}
            Save draft
          </Button>
          <Button
            disabled={!canSubmit || isSaving}
            onClick={() => submit("published")}
          >
            {savingStatus === "published" && (
              <Loader2 className="animate-spin" />
            )}
            Publish
          </Button>
        </div>
      </div>
    </>
  );
}
