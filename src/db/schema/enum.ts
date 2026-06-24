import { pgEnum } from "drizzle-orm/pg-core";
import {
  Dealbreakers,
  DevTraits,
  Handednesses,
  PlayerPotentials,
  PlayerYears,
} from "@/lib/domain/player-traits";
import { RosterPositions } from "@/lib/domain/positions";
import { PublishStatuses, RosterVotes } from "@/lib/domain/roster";

export const publishStatusEnum = pgEnum("publishStatus", PublishStatuses);
export const rosterVoteEnum = pgEnum("rosterVote", RosterVotes);
export const rosterPositionEnum = pgEnum("rosterPosition", RosterPositions);
export const playerDevTraitEnum = pgEnum("playerDevTrait", DevTraits);
export const playerPotentialEnum = pgEnum("playerPotnetial", PlayerPotentials);
export const playerDealbreakerEnum = pgEnum("playerDealbreaker", Dealbreakers);
export const playerHandednessEnum = pgEnum("playerHandedness", Handednesses);
export const playerYearEnum = pgEnum("playerYear", PlayerYears);
