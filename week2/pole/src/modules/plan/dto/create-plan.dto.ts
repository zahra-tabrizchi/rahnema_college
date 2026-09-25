import { z } from "zod";
import { isNonEmptyString, NonEmptyString, zodNonEmptyString } from "../../../data/non-empty-string";

export const createPlanDto = z.object({
  title: zodNonEmptyString,
  description: z.string().optional(),
  deadline: z.coerce.date(),
});

export type CreatePlanDto = z.infer<typeof createPlanDto>;
