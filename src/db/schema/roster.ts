import {
  index,
  integer,
  pgTable,
  real,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { metaFields } from "../meta";
import { publishStatusEnum } from "./enum";

export const rostersTable = pgTable(
  "rosters",
  {
    id: serial().primaryKey(),
    userId: text().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    preset: text().notNull(),
    ovr: integer().notNull(),
    offenseOvr: integer().notNull(),
    defenseOvr: integer().notNull(),
    status: publishStatusEnum().notNull().default("draft"),
    rating: real().notNull(),
    ...metaFields,
  },
  (table) => [index("rosters_user_id_idx").on(table.userId)],
);
