import { z } from "zod";

export const ZUser = z.object({
  id: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof ZUser>;
