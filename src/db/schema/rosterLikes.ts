import { index, pgTable, primaryKey, serial, text } from "drizzle-orm/pg-core";
import { metaFields } from "../meta";
import { rostersTable } from "./roster";

export const rosterLikes = pgTable(
  "roster_likes",
  {
    rosterId: serial()
      .notNull()
      .references(() => rostersTable.id, { onDelete: "cascade" }),
    userId: text().notNull(),
    ...metaFields,
  },
  (table) => [
    primaryKey({ columns: [table.rosterId, table.userId] }),
    index("roster_likes_roster_id_idx").on(table.rosterId),
  ],
);
