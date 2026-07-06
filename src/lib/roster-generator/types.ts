import type { RosterPreset } from "@/data/roster-generator/presets";
import type {
  DefenseScheme,
  OffenseScheme,
  SchemeArchetypeWeights,
} from "@/data/roster-generator/schemes";
import type { playersTable } from "@/db/schema";
import type { RosterPosition } from "@/lib/domain/positions";

export type TeamConfig = {
  preset: RosterPreset;
  offensiveScheme: OffenseScheme;
  defensiveScheme: DefenseScheme;
  offensiveOvr: number;
  defensiveOvr: number;
  /** Program prestige on a 1-5 scale. */
  programRating: number;
};

/** A generated player, minus the columns the database assigns on insert. */
export type GeneratedPlayer = Omit<
  typeof playersTable.$inferInsert,
  "id" | "rosterId" | "createdAt" | "updatedAt"
>;

export type GeneratePlayerParams = {
  position: RosterPosition;
  depth: number;
  maxDepth: number;
  archetypeWeights: SchemeArchetypeWeights;
  usedJerseyNumbers: Set<number>;
  baseTeamOvr: number;
  programRating: number;
};
