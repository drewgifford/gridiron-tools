export const PublishStatuses = ["draft", "published"] as const;

export type PublishStatus = (typeof PublishStatuses)[number];

export const RosterVotes = ["like", "dislike"] as const;

export type RosterVote = (typeof RosterVotes)[number];
