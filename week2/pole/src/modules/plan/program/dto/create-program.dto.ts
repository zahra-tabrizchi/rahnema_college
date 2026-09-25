import { z, ZodAny } from "zod";
import { isNonEmptyString, NonEmptyString, zodNonEmptyString } from "../../../../data/non-empty-string";
import { zodPlanId } from "../../model/plan-id";

export const createProgramDto = z.object({
  title: zodNonEmptyString,
  planId: zodPlanId,
  description: z.string().optional(),
});

export type CreateProgramDto = z.infer<typeof createProgramDto>;
