import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POSITION_META } from "@/data/roster-generator/position-meta";
import type {
  PlayerMentalAbility,
  PlayerPhysicalAbility,
} from "@/lib/domain/abilities";
import type { ArchetypeAbility } from "@/lib/domain/archetypes";
import { getPositionGroup, type RosterPosition } from "@/lib/domain/positions";
import type { PlayerStat, PlayerStats } from "@/lib/domain/stats";
import { getArchetype } from "@/lib/roster-generator/stats";
import {
  ABILITY_TIER_CLASSES,
  ABILITY_TIER_LABELS,
  tierIndex,
} from "@/lib/util/ability-tier";
import { cn } from "@/lib/utils";

export function setLevel<T extends { name: string; level: number }>(
  list: T[],
  name: T["name"],
  level: number,
): T[] {
  const without = list.filter((ability) => ability.name !== name);
  return level > 0 ? [...without, { name, level } as T] : without;
}

function TierSelect({
  level,
  onChange,
}: {
  level: number;
  onChange: (level: number) => void;
}) {
  return (
    <Select value={String(level)} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger className="h-7 w-28 shrink-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">None</SelectItem>
        {ABILITY_TIER_LABELS.map((label, i) => (
          <SelectItem key={label} value={String(i + 1)}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function RequirementHint({
  ability,
  level,
  stats,
  onSetStat,
}: {
  ability: ArchetypeAbility;
  level: number;
  stats: PlayerStats;
  onSetStat: (stat: PlayerStat, value: number) => void;
}) {
  const entries = Object.entries(ability.requirements) as [
    PlayerStat,
    [number, number, number, number],
  ][];
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] tabular-nums">
      {entries.map(([stat, tiers]) => {
        const need = tiers[level - 1];
        if ((stats[stat] ?? 0) >= need) {
          return (
            <span key={stat} className="text-emerald-500">
              {stat} {need} ✓
            </span>
          );
        }
        return (
          <button
            key={stat}
            type="button"
            title={`Set ${stat} to ${need}`}
            onClick={() => onSetStat(stat, need)}
            className="text-red-500 hover:underline cursor-pointer"
          >
            {stat} {need} ✗
          </button>
        );
      })}
    </div>
  );
}

export function PhysicalAbilitiesEditor({
  position,
  archetypeName,
  stats,
  physical,
  onSetStat,
  onPhysicalChange,
  readOnly,
}: {
  position: RosterPosition;
  archetypeName: string;
  stats: PlayerStats;
  physical: PlayerPhysicalAbility[];
  onSetStat: (stat: PlayerStat, value: number) => void;
  onPhysicalChange: (abilities: PlayerPhysicalAbility[]) => void;
  readOnly?: boolean;
}) {
  const archetype = getArchetype(position, archetypeName);
  const physicalPool = archetype?.abilities ?? [];

  return (
    <section className="flex flex-col gap-2">
      <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Physical abilities
      </h4>
      <div className="flex flex-col gap-1.5">
        {physicalPool.map((ability) => {
          const level =
            physical.find((p) => p.name === ability.name)?.level ?? 0;
          const levelIndex = tierIndex(level);
          return (
            <div
              key={ability.name}
              className="flex flex-col gap-1 rounded-md bg-muted/20 p-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{ability.name}</span>
                {readOnly ? (
                  <Badge
                    className={cn(
                      ABILITY_TIER_CLASSES[levelIndex],
                      "text-sm rounded-lg",
                    )}
                  >
                    {ABILITY_TIER_LABELS[levelIndex]}
                  </Badge>
                ) : (
                  <TierSelect
                    level={level}
                    onChange={(l) =>
                      onPhysicalChange(setLevel(physical, ability.name, l))
                    }
                  />
                )}
              </div>
              {level > 0 && (
                <RequirementHint
                  ability={ability}
                  level={level}
                  stats={stats}
                  onSetStat={onSetStat}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function MentalAbilitiesEditor({
  position,
  mental,
  onMentalChange,
  readOnly,
}: {
  position: RosterPosition;
  mental: PlayerMentalAbility[];
  onMentalChange: (abilities: PlayerMentalAbility[]) => void;
  readOnly?: boolean;
}) {
  const group = getPositionGroup(position).id;
  const mentalPool = [...new Set(POSITION_META[group].mentalAbilities)];

  return (
    <section className="flex flex-col gap-2">
      <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Mental abilities
      </h4>
      <div className="flex flex-col gap-1.5">
        {mentalPool.map((name) => {
          const level = mental.find((m) => m.name === name)?.level ?? 0;
          const levelIndex = level === 0 ? -1 : tierIndex(level);
          return (
            <div
              key={name}
              className="flex items-center justify-between gap-2 rounded-md bg-muted/20 p-2"
            >
              <span className="text-sm font-medium">{name}</span>
              {readOnly ? (
                levelIndex === -1 ? (
                  <span className="text-sm text-muted-foreground">N/A</span>
                ) : (
                  <Badge
                    className={cn(
                      ABILITY_TIER_CLASSES[levelIndex],
                      "text-sm rounded-lg",
                    )}
                  >
                    {ABILITY_TIER_LABELS[levelIndex]}
                  </Badge>
                )
              ) : (
                <TierSelect
                  level={level}
                  onChange={(l) => onMentalChange(setLevel(mental, name, l))}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function PlayerAbilitiesEditor({
  position,
  archetypeName,
  stats,
  physical,
  mental,
  onSetStat,
  onPhysicalChange,
  onMentalChange,
  readOnly,
}: {
  position: RosterPosition;
  archetypeName: string;
  stats: PlayerStats;
  physical: PlayerPhysicalAbility[];
  mental: PlayerMentalAbility[];
  onSetStat: (stat: PlayerStat, value: number) => void;
  onPhysicalChange: (abilities: PlayerPhysicalAbility[]) => void;
  onMentalChange: (abilities: PlayerMentalAbility[]) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <PhysicalAbilitiesEditor
        position={position}
        archetypeName={archetypeName}
        stats={stats}
        physical={physical}
        onSetStat={onSetStat}
        onPhysicalChange={onPhysicalChange}
        readOnly={readOnly}
      />
      <MentalAbilitiesEditor
        position={position}
        mental={mental}
        onMentalChange={onMentalChange}
        readOnly={readOnly}
      />
    </div>
  );
}
