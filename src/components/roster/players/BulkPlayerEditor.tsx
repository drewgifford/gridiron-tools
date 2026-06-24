import { X } from "lucide-react";
import {
  MentalAbilitiesEditor,
  PhysicalAbilitiesEditor,
  setLevel,
} from "@/components/roster/players/PlayerAbilitiesEditor";
import { PlayerStatsEditor } from "@/components/roster/players/PlayerStatsEditor";
import { PlayerTraitsEditor } from "@/components/roster/players/PlayerTraitsEditor";
import { RegenerateButton } from "@/components/roster/players/RegenerateButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PositionArchetypes } from "@/data/roster-generator/archetypes";
import type {
  PlayerMentalAbility,
  PlayerPhysicalAbility,
} from "@/lib/domain/abilities";
import { getPositionGroup } from "@/lib/domain/positions";
import { type PlayerStat, type PlayerStats, Stats } from "@/lib/domain/stats";
import type { GeneratedPlayer } from "@/lib/roster-generator";
import { getArchetype } from "@/lib/roster-generator/stats";

const ALL_STATS = Object.keys(Stats) as PlayerStat[];

/** The one ability whose tier changed between two ability lists (0 = removed). */
function changedAbility<T extends { name: string; level: number }>(
  prev: T[],
  next: T[],
): { name: T["name"]; level: number } | null {
  const prevLevels = new Map(prev.map((a) => [a.name, a.level]));
  for (const ability of next) {
    if ((prevLevels.get(ability.name) ?? 0) !== ability.level) {
      return { name: ability.name, level: ability.level };
    }
  }
  for (const ability of prev) {
    if (!next.some((n) => n.name === ability.name)) {
      return { name: ability.name, level: 0 };
    }
  }
  return null;
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <div className="h-px flex-1 bg-foreground/10" />
    </div>
  );
}

/** Edits every selected player at once; each change is applied to all of them. */
export function BulkPlayerEditor({
  players,
  indices,
  onApply,
  onRegenerate,
  onClose,
}: {
  players: GeneratedPlayer[];
  indices: number[];
  onApply: (mutate: (player: GeneratedPlayer) => GeneratedPlayer) => void;
  onRegenerate: () => void;
  onClose: () => void;
}) {
  const selectedPlayers = indices.map((i) => players[i]);
  const lead = selectedPlayers[0];

  const samePosition = selectedPlayers.every(
    (p) => p.position === lead.position,
  );
  const sameArchetype =
    samePosition &&
    selectedPlayers.every((p) => p.archetype === lead.archetype);
  const samePositionGroup = selectedPlayers.every(
    (p) =>
      getPositionGroup(p.position).id === getPositionGroup(lead.position).id,
  );

  // OVR-driving stats for the selection: the union of every player's archetype
  // weights, ranked by total influence. Stats no archetype weights fall through
  // to the editor's "All other stats" section.
  const weightTotals = new Map<PlayerStat, number>();
  for (const player of selectedPlayers) {
    const archetype = getArchetype(player.position, player.archetype);
    if (!archetype) continue;
    for (const [stat, weight] of Object.entries(
      archetype.ovrFormula.weights,
    ) as [PlayerStat, number][]) {
      weightTotals.set(stat, (weightTotals.get(stat) ?? 0) + (weight ?? 0));
    }
  }
  const weightedStats = [...weightTotals.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([stat]) => stat);

  const applyStats = (next: PlayerStats) => {
    const changed = ALL_STATS.filter((stat) => next[stat] !== lead.stats[stat]);
    if (changed.length === 0) return;
    const patch = Object.fromEntries(changed.map((stat) => [stat, next[stat]]));
    onApply((p) => ({ ...p, stats: { ...p.stats, ...patch } }));
  };

  const setStat = (stat: PlayerStat, value: number) =>
    onApply((p) => ({ ...p, stats: { ...p.stats, [stat]: value } }));

  const applyPatch = (patch: Partial<GeneratedPlayer>) =>
    onApply((p) => ({ ...p, ...patch }));

  const applyPhysical = (next: PlayerPhysicalAbility[]) => {
    const change = changedAbility(lead.physicalAbilities ?? [], next);
    if (!change) return;
    onApply((p) => ({
      ...p,
      physicalAbilities: setLevel(
        p.physicalAbilities ?? [],
        change.name,
        change.level,
      ),
    }));
  };

  const applyMental = (next: PlayerMentalAbility[]) => {
    const change = changedAbility(lead.mentalAbilities ?? [], next);
    if (!change) return;
    onApply((p) => ({
      ...p,
      mentalAbilities: setLevel(
        p.mentalAbilities ?? [],
        change.name,
        change.level,
      ),
    }));
  };

  const archetypes = samePosition ? PositionArchetypes[lead.position] : [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          Editing {indices.length} players
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close editor"
        >
          <X />
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs text-muted-foreground">Archetype</Label>
        {samePosition ? (
          <Select
            value={lead.archetype}
            onValueChange={(name) => applyPatch({ archetype: name })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {archetypes.map((option) => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="rounded-md border border-dashed px-3 py-2 text-xs text-muted-foreground">
            Select players from a single position to change their archetype.
          </p>
        )}
      </div>

      <SectionDivider label="Stats" />
      <PlayerStatsEditor
        stats={lead.stats}
        weightedStats={weightedStats}
        onChange={applyStats}
      />

      <SectionDivider label="Attributes" />
      <PlayerTraitsEditor player={lead} onChange={applyPatch} hideJersey />

      <SectionDivider label="Abilities" />
      {sameArchetype ? (
        <PhysicalAbilitiesEditor
          position={lead.position}
          archetypeName={lead.archetype}
          stats={lead.stats}
          physical={lead.physicalAbilities ?? []}
          onSetStat={setStat}
          onPhysicalChange={applyPhysical}
        />
      ) : (
        <p className="rounded-md border border-dashed px-3 py-2 text-xs text-muted-foreground">
          Select players sharing one archetype to edit physical abilities.
        </p>
      )}
      {samePositionGroup ? (
        <MentalAbilitiesEditor
          position={lead.position}
          mental={lead.mentalAbilities ?? []}
          onMentalChange={applyMental}
        />
      ) : (
        <p className="rounded-md border border-dashed px-3 py-2 text-xs text-muted-foreground">
          Select players from one position group to edit mental abilities.
        </p>
      )}

      <div className="flex justify-end border-t pt-4">
        <RegenerateButton count={indices.length} onConfirm={onRegenerate} />
      </div>
    </div>
  );
}
