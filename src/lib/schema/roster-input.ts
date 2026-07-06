import { z } from "zod";
import { PublishStatuses } from "@/lib/domain/roster";
import { containsProfanity } from "@/lib/util/obscenity";

export const ROSTER_NAME_MIN = 3;
export const ROSTER_NAME_MAX = 60;
export const ROSTER_DESCRIPTION_MAX = 500;

export const rosterNameSchema = z
  .string()
  .trim()
  .min(ROSTER_NAME_MIN, `Name must be at least ${ROSTER_NAME_MIN} characters.`)
  .max(ROSTER_NAME_MAX, `Name must be ${ROSTER_NAME_MAX} characters or fewer.`)
  .refine((value) => !containsProfanity(value), {
    message: "Please choose a different name.",
  });

export const rosterDescriptionSchema = z
  .string()
  .trim()
  .max(
    ROSTER_DESCRIPTION_MAX,
    `Description must be ${ROSTER_DESCRIPTION_MAX} characters or fewer.`,
  )
  .refine((value) => !containsProfanity(value), {
    message: "Please remove inappropriate language.",
  });

export const ZRosterInput = z.object({
  name: rosterNameSchema,
  description: rosterDescriptionSchema,
  status: z.enum(PublishStatuses),
  preset: z.string().min(1, "Select a preset and generate players first."),
  offensiveScheme: z.string().min(1),
  defensiveScheme: z.string().min(1),
  offensiveOvr: z.number().int().min(30).max(99),
  defensiveOvr: z.number().int().min(30).max(99),
  rating: z.number().min(0.5).max(5),
  playerCount: z.number().int().min(1, "Generate players before saving."),
});

export type RosterInput = z.infer<typeof ZRosterInput>;
