import { PositionArchetypes } from "@/data/roster-generator/archetypes";
import type { PlayerArchetype } from "@/lib/domain/archetypes";
import type { RosterPosition } from "@/lib/domain/positions";
import { type PlayerStat, type PlayerStats, Stats } from "@/lib/domain/stats";
import type { GeneratedPlayer } from "@/lib/roster-generator/types";
import { clamp, pick, randomFloat } from "@/lib/util/random";

const STAT_CODES = Object.keys(Stats) as PlayerStat[];

const clampStat = (value: number) => clamp(Math.round(value), 1, 99);

export function getArchetype(
  position: RosterPosition,
  name: string,
): PlayerArchetype | undefined {
  return PositionArchetypes[position].find(
    (archetype) => archetype.name === name,
  );
}

/** The archetype's most heavily weighted stats — its defining attributes. */
export function getKeyStats(
  position: RosterPosition,
  archetypeName: string,
  count = 3,
): PlayerStat[] {
  const archetype = getArchetype(position, archetypeName);
  if (!archetype) return [];
  return (
    Object.entries(archetype.ovrFormula.weights) as [PlayerStat, number][]
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([stat]) => stat);
}

export function calculateOvr(
  formula: PlayerArchetype["ovrFormula"],
  stats: PlayerStats,
): number {
  let ovr = formula.intercept;
  for (const [stat, weight] of Object.entries(formula.weights)) {
    ovr += (weight ?? 0) * (stats[stat as PlayerStat] ?? 0);
  }
  return clamp(Math.round(ovr), 1, 99);
}

/** Returns the player with `overall` recomputed from its archetype and stats. */
export function withRecomputedOverall(
  player: GeneratedPlayer,
): GeneratedPlayer {
  const archetype = getArchetype(player.position, player.archetype);
  if (!archetype) return player;
  return {
    ...player,
    overall: calculateOvr(archetype.ovrFormula, player.stats),
  };
}

/**
 * Builds a stat line for an archetype that evaluates to `targetOvr` under its
 * OVR formula. OVR is linear in the weighted stats, so we seed each weighted
 * stat near the level that hits the target, then nudge until the formula lands
 * exactly. Non-weighted stats get a looser baseline since they don't move OVR.
 */
export function generateStats(
  position: RosterPosition,
  archetypeName: string,
  targetOvr: number,
): PlayerStats {
  const stats = Object.fromEntries(
    STAT_CODES.map((stat) => [
      stat,
      clampStat(targetOvr * 0.7 + randomFloat(-8, 8)),
    ]),
  ) as PlayerStats;

  const archetype = getArchetype(position, archetypeName);
  if (!archetype) return stats;

  const { ovrFormula } = archetype;
  const weightedStats = Object.keys(ovrFormula.weights) as PlayerStat[];
  const totalWeight = Object.values(ovrFormula.weights).reduce(
    (sum, weight) => sum + (weight ?? 0),
    0,
  );
  const targetLevel = clamp(
    (targetOvr - ovrFormula.intercept) / (totalWeight || 1),
    1,
    99,
  );

  for (const stat of weightedStats) {
    stats[stat] = clampStat(targetLevel + randomFloat(-5, 5));
  }

  for (let i = 0; i < 300; i++) {
    const ovr = calculateOvr(ovrFormula, stats);
    if (ovr === targetOvr) break;
    const stat = pick(weightedStats);
    const next = (stats[stat] ?? 0) + (targetOvr > ovr ? 1 : -1);
    if (next >= 1 && next <= 99) stats[stat] = next;
  }

  return stats;
}
