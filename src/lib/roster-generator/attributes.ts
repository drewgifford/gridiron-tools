import { POSITION_META } from "@/data/roster-generator/position-meta";
import type {
  MentalAbility,
  PlayerMentalAbility,
  PlayerPhysicalAbility,
} from "@/lib/domain/abilities";
import type { PlayerArchetype } from "@/lib/domain/archetypes";
import type {
  Dealbreaker,
  DevTrait,
  Handedness,
  PlayerPotential,
  PlayerYear,
} from "@/lib/domain/player-traits";
import type { PositionGroupId } from "@/lib/domain/positions";
import type { PlayerStat, PlayerStats } from "@/lib/domain/stats";
import { clamp, pick, randomFloat } from "@/lib/util/random";

const YEARS_IN_SCHOOL: Record<PlayerYear, number> = {
  FR: 1,
  "R-FR": 2,
  SO: 2,
  "R-SO": 3,
  JR: 3,
  "R-JR": 4,
  SR: 4,
  "R-SR": 5,
};

export const getAge = (year: PlayerYear) => 17 + YEARS_IN_SCHOOL[year];

export type RosterRole =
  | "Star"
  | "Quality"
  | "Average"
  | "Developing"
  | "Project";

export function getRosterRole(depth: number, maxDepth: number): RosterRole {
  const rand = Math.random();

  if (depth === 1) {
    if (rand < 0.15) return "Star";
    if (rand < 0.6) return "Quality";
    if (rand < 0.9) return "Average";
    return "Developing";
  }

  if (depth <= Math.ceil(maxDepth / 2)) {
    if (rand < 0.05) return "Star";
    if (rand < 0.25) return "Quality";
    if (rand < 0.7) return "Average";
    if (rand < 0.9) return "Developing";
    return "Project";
  }

  if (rand < 0.02) return "Quality";
  if (rand < 0.3) return "Average";
  if (rand < 0.8) return "Developing";
  return "Project";
}

const ROLE_MODIFIERS: Record<RosterRole, () => number> = {
  Star: () => 10 + randomFloat(-3, 3),
  Quality: () => 4 + randomFloat(-2, 2),
  Average: () => randomFloat(-3, 3),
  Developing: () => -5 + randomFloat(-3, 3),
  Project: () => -10 + randomFloat(-4, 4),
};

export function getTargetOvr(
  baseTeamOvr: number,
  depth: number,
  maxDepth: number,
  role: RosterRole,
): number {
  const plateauStart = Math.max(2, maxDepth - 2);

  let depthPenalty = 0;
  if (depth > 1 && depth < plateauStart) {
    depthPenalty = (depth - 1) * 3;
  } else if (depth >= plateauStart) {
    depthPenalty = (plateauStart - 1) * 3 + (depth - plateauStart) * 0.5;
  }
  depthPenalty *= randomFloat(0.9, 1.1);

  const ovr = baseTeamOvr + ROLE_MODIFIERS[role]() - depthPenalty;
  return clamp(Math.round(ovr), 25, 99);
}

export function getYear(targetOvr: number, depth: number): PlayerYear {
  const maturity = ((targetOvr - 60) / 40) * 0.7 + (depth === 1 ? 0.3 : 0);
  const rand = Math.random() + maturity * 0.6;

  const orRedshirt = (year: PlayerYear, redshirt: PlayerYear) =>
    Math.random() > 0.4 ? year : redshirt;

  if (rand > 1.3) return "R-SR";
  if (rand > 1.1) return orRedshirt("SR", "R-JR");
  if (rand > 0.8) return orRedshirt("JR", "R-SO");
  if (rand > 0.4) return orRedshirt("SO", "R-FR");
  return "FR";
}

export function getDevTrait(
  targetOvr: number,
  year: PlayerYear,
  programRating: number,
): DevTrait {
  if (targetOvr < 75 && (year === "SR" || year === "JR")) return "Normal";

  const eliteProgramBonus = (programRating * 20 - 70) / 100;
  const rand = Math.random() - eliteProgramBonus;

  if (targetOvr > 88 && rand < 0.3) return "Elite";
  if (targetOvr > 80 && rand < 0.5) return "Star";
  if (targetOvr > 74 && rand < 0.7) return "Impact";
  return "Normal";
}

export function getPlayerPotential(
  currentOvr: number,
  devTrait: DevTrait,
  year: PlayerYear,
): PlayerPotential {
  const baseScore =
    devTrait === "Elite"
      ? 96
      : devTrait === "Star"
        ? 90
        : devTrait === "Impact"
          ? 84
          : 75;

  const variance =
    year === "SR" ? 10 : year === "JR" ? 8 : year === "SO" ? 6 : 4;
  const ceiling = Math.max(
    currentOvr,
    baseScore + randomFloat(-variance, variance),
  );

  if (ceiling >= 90) return "High";
  if (ceiling >= 80) return "Medium";
  return "Low";
}

export function getHandedness(): Handedness {
  return Math.random() < 0.13 ? "Left" : "Right";
}

export function getHsStarRating(
  ovr: number,
  year: PlayerYear,
  programRating: number,
): number {
  const decay = year === "SR" ? 12 : year === "JR" ? 8 : year === "SO" ? 4 : 0;
  const bias = (programRating - 3) * 3 + randomFloat(-1, 1);
  const score = ovr - decay + bias;

  if (score >= 90) return 5;
  if (score >= 77) return 4;
  if (score >= 67) return 3;
  if (score >= 56) return 2;
  return 1;
}

export function getDealbreaker(
  starRating: number,
  potential: PlayerPotential,
): Dealbreaker {
  const weights: Record<Exclude<Dealbreaker, "None">, number> = {
    "Brand Exposure": 1,
    "Championship Contender": 1,
    "Coach Prestige": 1,
    "Conference Prestige": 1,
    "Playing Style": 1,
    "Playing Time": 1,
    "Pro Potential": 1,
    "Proximity to Home": 1,
  };

  if (starRating >= 4 || potential === "High") {
    weights["Pro Potential"] += 10;
    weights["Brand Exposure"] += 8;
    weights["Championship Contender"] += 6;
  }
  if (starRating === 4 || starRating === 3) {
    weights["Playing Time"] += 5;
    weights["Conference Prestige"] += 3;
  }
  if (starRating === 3) {
    weights["Playing Style"] += 4;
  }
  if (starRating <= 2) {
    weights["Proximity to Home"] += 6;
    weights["Coach Prestige"] += 4;
    weights["Playing Time"] += 4;
  }

  const entries = Object.entries(weights) as [Dealbreaker, number][];
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;
  for (const [name, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return name;
  }
  return "Proximity to Home";
}

export function getPhysicals(
  group: PositionGroupId,
  stats: PlayerStats,
  programRating: number,
) {
  const { heightRange, weightRange } = POSITION_META[group];
  const [minHeight, maxHeight] = heightRange;
  const [minWeight, maxWeight] = weightRange;

  const normStr = clamp(((stats.STR ?? 70) - 50) / 49, 0, 1);
  const normSpd = clamp(((stats.SPD ?? 75) - 50) / 49, 0, 1);

  let size = normStr * 0.7 + (1 - normSpd) * 0.3;
  size += (programRating - 3) * 0.04;
  size += randomFloat(-0.08, 0.08);
  size = clamp(size, 0, 1);

  const weightLbs = Math.round(minWeight + (maxWeight - minWeight) * size);
  const heightTendency = clamp(size + randomFloat(-0.15, 0.15), 0, 1);
  const heightInches = Math.round(
    minHeight + (maxHeight - minHeight) * heightTendency,
  );

  return { heightInches, weightLbs };
}

export function getJerseyNumber(
  group: PositionGroupId,
  used: Set<number>,
): number {
  const numbers: number[] = [];
  for (const [min, max] of POSITION_META[group].numberRanges) {
    for (let n = min; n <= max; n++) numbers.push(n);
  }
  const free = numbers.filter((n) => !used.has(n));
  return pick(free.length > 0 ? free : numbers);
}

const TRAIT_COSTS = [2, 4, 6, 8];
const XP_PER_YEAR: Record<DevTrait, number> = {
  Normal: 2,
  Impact: 3,
  Star: 5,
  Elite: 8,
};

/** Spends an XP pool (scaled by dev/potential/years) on the archetype's
 *  ability tree, respecting per-level stat requirements. */
export function getPhysicalAbilities(
  archetype: PlayerArchetype,
  stats: PlayerStats,
  year: PlayerYear,
  devTrait: DevTrait,
  potential: PlayerPotential,
): PlayerPhysicalAbility[] {
  const xpGain = () => {
    let base = XP_PER_YEAR[devTrait];
    if (potential === "High") base *= 1.25;
    else if (potential === "Medium") base *= 1.1;
    return Math.max(1, base + randomFloat(-1, 2));
  };

  let xp = xpGain();
  for (let i = 0; i < YEARS_IN_SCHOOL[year]; i++) xp += xpGain();

  const slots = archetype.abilities.map((ability) => ({
    name: ability.name,
    level: 0,
    requirements: ability.requirements,
  }));

  for (let guard = 0; xp > 0 && guard < 100; guard++) {
    const buyable = slots.filter((slot) => {
      if (slot.level >= 4 || TRAIT_COSTS[slot.level] > xp) return false;
      return Object.entries(slot.requirements).every(([stat, req]) => {
        const needed = req?.[slot.level];
        return (
          needed === undefined || (stats[stat as PlayerStat] ?? 0) >= needed
        );
      });
    });
    if (buyable.length === 0) break;

    const slot = pick(buyable);
    xp -= TRAIT_COSTS[slot.level];
    slot.level++;
  }

  return slots
    .filter((slot) => slot.level > 0)
    .map((slot) => ({ name: slot.name, level: slot.level }));
}

const MENTAL_POINTS: Record<PlayerPotential, number> = {
  Low: 5,
  Medium: 10,
  High: 20,
};
const MENTAL_COST = 5;
const MAX_ABILITY_LEVEL = 4;

export function getMentalAbilities(
  group: PositionGroupId,
  potential: PlayerPotential,
): PlayerMentalAbility[] {
  let points = MENTAL_POINTS[potential] * (1 + randomFloat(-0.25, 0.25));
  const names = [...new Set(POSITION_META[group].mentalAbilities)];
  const levels = new Map<MentalAbility, number>();

  while (points >= MENTAL_COST) {
    const owned = names.filter((name) => {
      const level = levels.get(name) ?? 0;
      return level > 0 && level < MAX_ABILITY_LEVEL;
    });
    const fresh = names.filter((name) => !levels.has(name));

    const upgrade = owned.length > 0 && Math.random() < 0.4;
    const target = upgrade ? pick(owned) : fresh[0] ? pick(fresh) : owned[0];
    if (!target) break;

    levels.set(target, (levels.get(target) ?? 0) + 1);
    points -= MENTAL_COST;
  }

  return [...levels.entries()].map(([name, level]) => ({ name, level }));
}
