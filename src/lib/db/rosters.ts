import { rostersTable } from "@/db/schema";
import { db } from "./db";

export async function getRosters() {
  await db.select().from(rostersTable);
}
