export type Roster = {
  id: number;
  name: string;
  preset: string;
  ovr: number;
  offenseOvr: number;
  defenseOvr: number;
  rating: number;
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | null;
  author?: string;
  createdAt: string;
  updatedAt: string;
};
export const MAX_PUBLIC_ROSTERS = 50;
export const MAX_ROSTERS_PER_USER = 10;

export const ROSTER_SORTS = {
  recent: "Recently edited",
  likes: "Most liked",
  rating: "Highest rated",
  ovr: "Highest OVR",
  name: "Name (A-Z)",
} as const;

export type RosterSort = keyof typeof ROSTER_SORTS;

export function parseSort(value: unknown): RosterSort {
  return typeof value === "string" && value in ROSTER_SORTS
    ? (value as RosterSort)
    : "recent";
}
