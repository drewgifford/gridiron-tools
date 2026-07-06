export const ABILITY_TIER_CLASSES = [
  "border-amber-700/40 bg-amber-700/10 text-amber-600",
  "border-muted-foreground/40 bg-muted-foreground/10 text-muted-foreground",
  "border-yellow-600/40 dark:border-yellow-500/40 bg-yellow-600/10 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
  "border-purple-500/40 dark:border-purple-400/40 bg-purple-500/10 dark:bg-purple-400/10 text-purple-500 dark:text-purple-400",
] as const;

export const ABILITY_TIER_LABELS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
] as const;

export function tierIndex(level: number) {
  return Math.min(Math.max(level, 1), 4) - 1;
}
