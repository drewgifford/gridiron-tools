import type { MentalAbility } from "@/lib/domain/abilities";
import type { PositionGroupId } from "@/lib/domain/positions";

export type PositionGroupMeta = {
  mentalAbilities: MentalAbility[];
  heightRange: [number, number];
  weightRange: [number, number];
  numberRanges: [number, number][];
};

const COMMON: MentalAbility[] = [
  "Fan Favorite",
  "Clearheaded",
  "Winning Time",
  "The Natural",
];

export const POSITION_META: Record<PositionGroupId, PositionGroupMeta> = {
  QB: {
    mentalAbilities: ["Road Dog", "Field General", ...COMMON],
    heightRange: [69, 78],
    weightRange: [190, 250],
    numberRanges: [[0, 19]],
  },
  RB: {
    mentalAbilities: ["Road Dog", "Headstrong", ...COMMON],
    heightRange: [66, 75],
    weightRange: [180, 240],
    numberRanges: [[0, 49]],
  },
  FB: {
    mentalAbilities: ["Road Dog", ...COMMON],
    heightRange: [69, 75],
    weightRange: [210, 260],
    numberRanges: [
      [0, 49],
      [80, 89],
    ],
  },
  WR: {
    mentalAbilities: ["Road Dog", "Best Friend", "Headstrong", ...COMMON],
    heightRange: [68, 76],
    weightRange: [160, 220],
    numberRanges: [
      [0, 49],
      [80, 89],
    ],
  },
  TE: {
    mentalAbilities: ["Road Dog", "Best Friend", "Headstrong", ...COMMON],
    heightRange: [72, 80],
    weightRange: [220, 280],
    numberRanges: [
      [10, 49],
      [80, 89],
    ],
  },
  OL: {
    mentalAbilities: ["Road Dog", "OL Rally", ...COMMON],
    heightRange: [74, 82],
    weightRange: [270, 400],
    numberRanges: [[50, 79]],
  },
  DL: {
    mentalAbilities: ["Road Dog", "DL Rally", ...COMMON],
    heightRange: [71, 79],
    weightRange: [250, 330],
    numberRanges: [
      [50, 79],
      [90, 99],
    ],
  },
  LB: {
    mentalAbilities: ["Road Dog", ...COMMON],
    heightRange: [70, 77],
    weightRange: [200, 260],
    numberRanges: [[0, 59]],
  },
  CB: {
    mentalAbilities: ["Road Dog", "Legion", ...COMMON],
    heightRange: [69, 75],
    weightRange: [170, 210],
    numberRanges: [[0, 49]],
  },
  S: {
    mentalAbilities: ["Road Dog", "Legion", ...COMMON],
    heightRange: [69, 76],
    weightRange: [175, 215],
    numberRanges: [[0, 49]],
  },
  K: {
    mentalAbilities: ["Road Dog", "Clutch Kicker", ...COMMON],
    heightRange: [68, 77],
    weightRange: [160, 230],
    numberRanges: [
      [0, 49],
      [90, 99],
    ],
  },
  P: {
    mentalAbilities: ["Road Dog", "Clutch Kicker", ...COMMON],
    heightRange: [68, 77],
    weightRange: [160, 230],
    numberRanges: [
      [0, 49],
      [90, 99],
    ],
  },
};
