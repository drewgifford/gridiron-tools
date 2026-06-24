import { z } from "zod";
import { MentalAbilities, PhysicalAbilities } from "@/lib/domain/abilities";
import {
  Dealbreakers,
  DevTraits,
  Handednesses,
  PlayerPotentials,
  PlayerYears,
} from "@/lib/domain/player-traits";
import { RosterPositions } from "@/lib/domain/positions";

const ability = <T extends readonly [string, ...string[]]>(names: T) =>
  z.object({ name: z.enum(names), level: z.number().int().min(0).max(4) });

/** Validates an untrusted player from a server action before it reaches the DB. */
export const ZGeneratedPlayer = z.object({
  position: z.enum(RosterPositions),
  depthOrder: z.number().int(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  jerseyNumber: z.number().int().min(0).max(99),
  classYear: z.enum(PlayerYears).nullish(),
  age: z.number().int().optional(),
  heightInches: z.number().int(),
  weightLbs: z.number().int(),
  overall: z.number().int().min(0).max(99),
  archetype: z.string().min(1),
  dealbreaker: z.enum(Dealbreakers).optional(),
  devTrait: z.enum(DevTraits).optional(),
  potential: z.enum(PlayerPotentials).optional(),
  handedness: z.enum(Handednesses).optional(),
  hsStarRating: z.number().int().optional(),
  skinToneIndex: z.number().int().optional(),
  headIndex: z.number().int().optional(),
  mentalAbilities: z.array(ability(MentalAbilities)).optional(),
  physicalAbilities: z.array(ability(PhysicalAbilities)).optional(),
  stats: z.record(z.string(), z.number()),
});

export const ZGeneratedPlayers = z.array(ZGeneratedPlayer);
