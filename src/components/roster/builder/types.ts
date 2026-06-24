import type { RosterPreset } from "@/data/roster-generator/presets";
import type {
  DefenseScheme,
  OffenseScheme,
} from "@/data/roster-generator/schemes";

export const VISIBILITY_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
] as const;

export type Visibility = (typeof VISIBILITY_OPTIONS)[number]["value"];

export type RosterDetails = {
  name: string;
  starRating: number;
  visibility: Visibility;
  description: string;
};

export type GenerateConfig = {
  preset: RosterPreset | "";
  offensiveScheme: OffenseScheme;
  defensiveScheme: DefenseScheme;
  targetOffenseOvr: number;
  targetDefenseOvr: number;
};

export type RosterStep = "details" | "generate" | "players";

export type GenerationStatus = "idle" | "generating" | "done";
