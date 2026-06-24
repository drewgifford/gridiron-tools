export const PlayerPotentials = ["Low", "Medium", "High"] as const;

export const Dealbreakers = [
  "None",
  "Brand Exposure",
  "Championship Contender",
  "Coach Prestige",
  "Conference Prestige",
  "Playing Style",
  "Playing Time",
  "Pro Potential",
  "Proximity to Home",
] as const;

export const Handednesses = ["Left", "Right"] as const;

export const PlayerYears = [
  "R-FR",
  "FR",
  "R-SO",
  "SO",
  "R-JR",
  "JR",
  "R-SR",
  "SR",
] as const;

export const DevTraits = ["Normal", "Impact", "Star", "Elite"] as const;

export type PlayerPotential = (typeof PlayerPotentials)[number];
export type Dealbreaker = (typeof Dealbreakers)[number];
export type Handedness = (typeof Handednesses)[number];
export type PlayerYear = (typeof PlayerYears)[number];
export type DevTrait = (typeof DevTraits)[number];
