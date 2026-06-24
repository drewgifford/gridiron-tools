export const RosterPositions = [
  "QB",
  "WR",
  "RB",
  "LT",
  "LG",
  "C",
  "RG",
  "RT",
  "TE",
  "FB",
  "LE",
  "RE",
  "DT",
  "LOLB",
  "ROLB",
  "MLB",
  "CB",
  "FS",
  "SS",
  "K",
  "P",
] as const;

export type RosterPosition = (typeof RosterPositions)[number];

export type RosterPositionUnit = "Offense" | "Defense" | "Special teams";

type PositionGroupDef = {
  id: string;
  name: string;
  unit: RosterPositionUnit;
  positions: readonly RosterPosition[];
};

/**
 * The single source of truth for how positions are grouped. A group is the set
 * of positions that share an archetype catalog (see ARCHETYPE_NAMES), so both
 * the scheme weights and the roster-composition UI derive from this list.
 */
export const RosterPositionGroups = [
  { id: "QB", name: "Quarterback", unit: "Offense", positions: ["QB"] },
  { id: "RB", name: "Halfback", unit: "Offense", positions: ["RB"] },
  { id: "FB", name: "Fullback", unit: "Offense", positions: ["FB"] },
  { id: "WR", name: "Wide Receiver", unit: "Offense", positions: ["WR"] },
  { id: "TE", name: "Tight End", unit: "Offense", positions: ["TE"] },
  {
    id: "OL",
    name: "Offensive Line",
    unit: "Offense",
    positions: ["LT", "LG", "C", "RG", "RT"],
  },
  {
    id: "DL",
    name: "Defensive Line",
    unit: "Defense",
    positions: ["LE", "RE", "DT"],
  },
  {
    id: "LB",
    name: "Linebacker",
    unit: "Defense",
    positions: ["LOLB", "MLB", "ROLB"],
  },
  { id: "CB", name: "Cornerback", unit: "Defense", positions: ["CB"] },
  { id: "S", name: "Safety", unit: "Defense", positions: ["FS", "SS"] },
  { id: "K", name: "Kicker", unit: "Special teams", positions: ["K"] },
  { id: "P", name: "Punter", unit: "Special teams", positions: ["P"] },
] as const satisfies readonly PositionGroupDef[];

export type PositionGroupId = (typeof RosterPositionGroups)[number]["id"];

const RosterPositionUnits: readonly RosterPositionUnit[] = [
  "Offense",
  "Defense",
  "Special teams",
];

export const RosterPositionUnitGroups = RosterPositionUnits.map((unit) => ({
  unit,
  groups: RosterPositionGroups.filter((group) => group.unit === unit).map(
    (group) => ({ label: group.id, positions: group.positions }),
  ),
}));

type RosterPositionGroup = (typeof RosterPositionGroups)[number];

const GROUP_BY_POSITION = Object.fromEntries(
  RosterPositionGroups.flatMap((group) =>
    group.positions.map((position) => [position, group]),
  ),
) as Record<RosterPosition, RosterPositionGroup>;

export const getPositionGroup = (position: RosterPosition) =>
  GROUP_BY_POSITION[position];

export const isOffense = (position: RosterPosition) =>
  getPositionGroup(position).unit === "Offense";
