import { X } from "lucide-react";
import { HeadPicker } from "@/components/roster/players/HeadPicker";
import { PlayerAbilitiesEditor } from "@/components/roster/players/PlayerAbilitiesEditor";
import { PlayerStatsEditor } from "@/components/roster/players/PlayerStatsEditor";
import { PlayerTraitsEditor } from "@/components/roster/players/PlayerTraitsEditor";
import { RegenerateButton } from "@/components/roster/players/RegenerateButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PositionArchetypes } from "@/data/roster-generator/archetypes";
import type { PlayerStat, PlayerStats } from "@/lib/domain/stats";
import type { GeneratedPlayer } from "@/lib/roster-generator";
import {
  calculateOvr,
  getArchetype,
  withRecomputedOverall,
} from "@/lib/roster-generator/stats";
import { ovrBoxClass } from "@/lib/util/ovr-color";
import { cn } from "@/lib/utils";

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

export function PlayerEditor({
  player,
  onChange,
  onRegenerate,
  onClose,
}: {
  player: GeneratedPlayer;
  onChange: (next: GeneratedPlayer) => void;
  onRegenerate?: () => void;
  onClose: () => void;
}) {
  const archetype = getArchetype(player.position, player.archetype);
  const archetypes = PositionArchetypes[player.position];
  const weightedStats = archetype
    ? (Object.entries(archetype.ovrFormula.weights) as [PlayerStat, number][])
        .sort(([, a], [, b]) => b - a)
        .map(([stat]) => stat)
    : [];

  const setStats = (stats: PlayerStats) =>
    onChange(withRecomputedOverall({ ...player, stats }));

  const setStat = (stat: PlayerStat, value: number) =>
    setStats({ ...player.stats, [stat]: value });

  const setArchetype = (name: string) =>
    onChange(withRecomputedOverall({ ...player, archetype: name }));

  const applyPatch = (patch: Partial<GeneratedPlayer>) =>
    onChange({ ...player, ...patch });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <HeadPicker
            skinToneIndex={player.skinToneIndex ?? 0}
            headIndex={player.headIndex ?? 0}
            onChange={(skinToneIndex, headIndex) =>
              applyPatch({ skinToneIndex, headIndex })
            }
          />
          <span
            className={cn(
              "flex size-12 shrink-0 flex-col items-center justify-center rounded-md text-base font-semibold tabular-nums",
              ovrBoxClass(player.overall),
            )}
          >
            {player.overall}
            <span className="text-[10px] font-medium text-muted-foreground">
              OVR
            </span>
          </span>
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">
              {player.position} • #{player.jerseyNumber}
            </div>
            <div className="truncate font-semibold">
              {player.firstName} {player.lastName}
            </div>
          </div>
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

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="edit-first" className="text-xs text-muted-foreground">
            First name
          </Label>
          <Input
            id="edit-first"
            value={player.firstName}
            onChange={(e) => applyPatch({ firstName: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="edit-last" className="text-xs text-muted-foreground">
            Last name
          </Label>
          <Input
            id="edit-last"
            value={player.lastName}
            onChange={(e) => applyPatch({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor="edit-archetype"
          className="text-xs text-muted-foreground"
        >
          Archetype
        </Label>
        <Select value={player.archetype} onValueChange={setArchetype}>
          <SelectTrigger id="edit-archetype" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {archetypes.map((option) => {
              const ovr = calculateOvr(option.ovrFormula, player.stats);
              return (
                <SelectItem key={option.name} value={option.name}>
                  <span className="flex w-full items-center justify-between gap-4">
                    <span>{option.name}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {ovr} OVR
                    </span>
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <SectionDivider label="Stats" />
      <PlayerStatsEditor
        stats={player.stats}
        weightedStats={weightedStats}
        onChange={setStats}
      />

      <SectionDivider label="Attributes" />
      <PlayerTraitsEditor player={player} onChange={applyPatch} />

      <SectionDivider label="Abilities" />
      <PlayerAbilitiesEditor
        position={player.position}
        archetypeName={player.archetype}
        stats={player.stats}
        physical={player.physicalAbilities ?? []}
        mental={player.mentalAbilities ?? []}
        onSetStat={setStat}
        onPhysicalChange={(physicalAbilities) =>
          applyPatch({ physicalAbilities })
        }
        onMentalChange={(mentalAbilities) => applyPatch({ mentalAbilities })}
      />

      {onRegenerate && (
        <div className="flex justify-end border-t pt-4">
          <RegenerateButton count={1} onConfirm={onRegenerate} />
        </div>
      )}
    </div>
  );
}
