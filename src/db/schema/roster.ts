import {
  index,
  integer,
  pgTable,
  real,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { metaFields } from "../meta";

export const rostersTable = pgTable(
  "rosters",
  {
    id: serial().primaryKey(),
    userId: text().notNull(),
    name: text().notNull(),
    preset: text().notNull(),
    ovr: integer().notNull(),
    offenseOvr: integer().notNull(),
    defenseOvr: integer().notNull(),
    rating: real().notNull(),
    ...metaFields,
  },
  (table) => [index("rosters_user_id_idx").on(table.userId)],
);
