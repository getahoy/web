import type { historyChangedSchema } from "@getahoy/protocol";
import type { z } from "zod";

export const HISTORY_CHANGED: z.infer<typeof historyChangedSchema> = {
  changed: true,
};
