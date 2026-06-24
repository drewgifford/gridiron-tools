import z from "zod";
import { PublishStatuses, RosterVotes } from "@/lib/domain/roster";
import { ZUser } from "./author";

export const ZRoster = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  preset: z.string(),
  status: z.enum(PublishStatuses),
  ovr: z.int(),
  offenseOvr: z.int(),
  defenseOvr: z.int(),
  rating: z.number(),
  likes: z.int(),
  dislikes: z.int(),
  userVote: z.enum(RosterVotes).nullish(),
  userId: z.string(),
  user: ZUser.nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Roster = z.infer<typeof ZRoster>;
