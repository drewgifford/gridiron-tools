import { generateRandomName } from "@/data/names";
import { RosterPresetData } from "@/data/roster-generator/presets";
import {
  DEFENSE_SCHEMES,
  OFFENSE_SCHEMES,
  type SchemeArchetypeWeights,
} from "@/data/roster-generator/schemes";
import { ARCHETYPE_NAMES } from "@/lib/domain/archetypes";
import {
  getPositionGroup,
  isOffense,
  type PositionGroupId,
  type RosterPosition,
} from "@/lib/domain/positions";
import { getRandomHead } from "@/lib/util/player-heads";
import {
  getAge,
  getDealbreaker,
  getDevTrait,
  getHandedness,
  getHsStarRating,
  getJerseyNumber,
  getMentalAbilities,
  getPhysicalAbilities,
  getPhysicals,
  getPlayerPotential,
  getRosterRole,
  getTargetOvr,
  getYear,
} from "./attributes";
import { generateStats, getArchetype } from "./stats";
import type {
  GeneratedPlayer,
  GeneratePlayerParams,
  TeamConfig,
} from "./types";

export type { GeneratedPlayer, TeamConfig } from "./types";

function buildArchetypeWeights(config: TeamConfig): SchemeArchetypeWeights {
  return {
    ...OFFENSE_SCHEMES[config.offensiveScheme].archetypeWeights,
    ...DEFENSE_SCHEMES[config.defensiveScheme].archetypeWeights,
  };
}

function pickArchetype(
  weights: SchemeArchetypeWeights,
  group: PositionGroupId,
): string {
  const priorities = Object.entries(weights[group] ?? {}) as [string, number][];
  if (priorities.length === 0) return ARCHETYPE_NAMES[group][0];

  const total = priorities.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;
  for (const [name, weight] of priorities) {
    roll -= weight;
    if (roll <= 0) return name;
  }
  return priorities[priorities.length - 1][0];
}

export function generatePlayer(params: GeneratePlayerParams): GeneratedPlayer {
  const {
    position,
    depth,
    maxDepth,
    archetypeWeights,
    usedJerseyNumbers,
    baseTeamOvr,
    programRating,
  } = params;

  const group = getPositionGroup(position).id;
  const { firstName, lastName } = generateRandomName();

  const archetypeName = pickArchetype(archetypeWeights, group);
  const archetype = getArchetype(position, archetypeName);

  const role = getRosterRole(depth, maxDepth);
  const overall = getTargetOvr(baseTeamOvr, depth, maxDepth, role);
  const classYear = getYear(overall, depth);
  const devTrait = getDevTrait(overall, classYear, programRating);
  const potential = getPlayerPotential(overall, devTrait, classYear);
  const stats = generateStats(position, archetypeName, overall);
  const hsStarRating = getHsStarRating(overall, classYear, programRating);

  const jerseyNumber = getJerseyNumber(group, usedJerseyNumbers);
  usedJerseyNumbers.add(jerseyNumber);

  return {
    position,
    depthOrder: depth,
    firstName,
    lastName,
    jerseyNumber,
    classYear,
    age: getAge(classYear),
    overall,
    archetype: archetypeName,
    devTrait,
    potential,
    handedness: getHandedness(),
    hsStarRating,
    dealbreaker: getDealbreaker(hsStarRating, potential),
    stats,
    ...getPhysicals(group, stats, programRating),
    mentalAbilities: getMentalAbilities(group, potential),
    physicalAbilities: archetype
      ? getPhysicalAbilities(archetype, stats, classYear, devTrait, potential)
      : [],
    ...getRandomHead(),
  };
}

export function generateRoster(config: TeamConfig) {
  const usedJerseyNumbers = new Set<number>();
  const players: GeneratedPlayer[] = [];
  const archetypeWeights = buildArchetypeWeights(config);
  const counts = RosterPresetData[config.preset];

  for (const position of Object.keys(counts) as RosterPosition[]) {
    const maxDepth = counts[position];
    const baseTeamOvr = isOffense(position)
      ? config.offensiveOvr
      : config.defensiveOvr;

    for (let depth = 1; depth <= maxDepth; depth++) {
      players.push(
        generatePlayer({
          position,
          depth,
          maxDepth,
          archetypeWeights,
          usedJerseyNumbers,
          baseTeamOvr,
          programRating: config.programRating,
        }),
      );
    }
  }

  return { players, usedJerseyNumbers };
}

type ExistingSlot = Pick<
  GeneratedPlayer,
  "position" | "depthOrder" | "jerseyNumber"
>;

export function regeneratePlayer(
  player: ExistingSlot,
  config: TeamConfig,
  usedJerseyNumbers: Set<number>,
): GeneratedPlayer {
  const baseTeamOvr = isOffense(player.position)
    ? config.offensiveOvr
    : config.defensiveOvr;

  // Free the old number so the regenerated player can reclaim it.
  usedJerseyNumbers.delete(player.jerseyNumber);

  const next = generatePlayer({
    position: player.position,
    depth: player.depthOrder,
    maxDepth: RosterPresetData[config.preset][player.position],
    archetypeWeights: buildArchetypeWeights(config),
    usedJerseyNumbers,
    baseTeamOvr,
    programRating: config.programRating,
  });

  if (next.jerseyNumber !== player.jerseyNumber) {
    usedJerseyNumbers.delete(next.jerseyNumber);
    next.jerseyNumber = player.jerseyNumber;
    usedJerseyNumbers.add(player.jerseyNumber);
  }

  return next;
}
