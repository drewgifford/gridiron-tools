import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

import type {
  PlayerMentalAbility,
  PlayerPhysicalAbility,
} from "@/lib/domain/abilities";
import type { PlayerStats } from "@/lib/domain/stats";
import { metaFields } from "../meta";
import {
  playerDealbreakerEnum,
  playerDevTraitEnum,
  playerHandednessEnum,
  playerPotentialEnum,
  playerYearEnum,
  rosterPositionEnum,
} from "./enum";
import { rostersTable } from "./roster";

export const playersTable = pgTable(
  "players",
  {
    id: serial().primaryKey(),
    rosterId: integer()
      .notNull()
      .references(() => rostersTable.id, { onDelete: "cascade" }),
    position: rosterPositionEnum().notNull(),
    depthOrder: integer().notNull(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    jerseyNumber: integer().notNull(),
    classYear: playerYearEnum().default("FR"),
    age: integer().notNull().default(18),
    heightInches: integer().notNull(),
    weightLbs: integer().notNull(),
    overall: integer().notNull(),
    archetype: text().notNull(),
    dealbreaker: playerDealbreakerEnum().notNull().default("None"),
    devTrait: playerDevTraitEnum().notNull().default("Normal"),
    potential: playerPotentialEnum().notNull().default("Low"),
    handedness: playerHandednessEnum().notNull().default("Right"),
    hsStarRating: integer().notNull().default(1),
    skinToneIndex: integer().notNull().default(0),
    headIndex: integer().notNull().default(0),
    mentalAbilities: jsonb()
      .$type<PlayerMentalAbility[]>()
      .notNull()
      .default([]),
    physicalAbilities: jsonb()
      .$type<PlayerPhysicalAbility[]>()
      .notNull()
      .default([]),
    stats: jsonb().$type<PlayerStats>().notNull(),
    ...metaFields,
  },
  (table) => [index("players_roster_id_idx").on(table.rosterId)],
);

export type Player = typeof playersTable.$inferSelect;
