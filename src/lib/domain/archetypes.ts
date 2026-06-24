import type { PhysicalAbility } from "./abilities";
import type { PositionGroupId } from "./positions";
import type { PlayerStat } from "./stats";

/**
 * The archetypes available to each position group. This is the source of truth
 * for archetype names: the archetype data tables and the scheme weights are
 * both typed against it, so a name that doesn't exist here fails to compile.
 */
export const ARCHETYPE_NAMES = {
  QB: ["Backfield Creator", "Dual Threat", "Pocket Passer", "Pure Runner"],
  RB: [
    "Backfield Threat",
    "Contact Seeker",
    "East/West Playmaker",
    "Elusive Bruiser",
    "North/South Blocker",
    "North/South Receiver",
  ],
  FB: ["Blocking", "Utility"],
  WR: [
    "Contested Specialist",
    "Elusive Route Runner",
    "Physical Route Runner",
    "Route Artist",
    "Speedster",
  ],
  TE: [
    "Pure Blocker",
    "Vertical Threat",
    "Physical Route Runner",
    "Gritty Possession",
    "Pure Possession",
  ],
  OL: ["Pass Protector", "Raw Strength", "Well Rounded", "Agile"],
  DL: ["Gap Specialist", "Pure Power", "Speed Rusher", "Power Rusher"],
  LB: ["Lurker", "Signal Caller", "Thumper"],
  CB: ["Boundary", "Bump and Run", "Field", "Zone"],
  S: ["Box Specialist", "Coverage Specialist", "Hybrid"],
  K: ["Accurate", "Power"],
  P: ["Accurate", "Power"],
} as const satisfies Record<PositionGroupId, readonly string[]>;

export type ArchetypeNameByGroup = {
  [G in PositionGroupId]: (typeof ARCHETYPE_NAMES)[G][number];
};

export type ArchetypeName = ArchetypeNameByGroup[PositionGroupId];

/** The linear regression that maps a stat line to an overall rating. */
export type ArchetypeOvrFormula = {
  intercept: number;
  weights: Partial<Record<PlayerStat, number>>;
};

/** A physical ability an archetype can unlock, with its per-tier stat gates. */
export type ArchetypeAbility = {
  name: PhysicalAbility;
  requirements: Partial<Record<PlayerStat, [number, number, number, number]>>;
};

export type PlayerArchetype = {
  name: ArchetypeName;
  ovrFormula: ArchetypeOvrFormula;
  abilities: ArchetypeAbility[];
};
