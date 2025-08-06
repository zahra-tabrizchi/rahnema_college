import { title } from "process"
import { z, ZodAny } from "zod"

export const createProgramDto = z.object({
    title: z.string().nonempty(),
    planId: z.coerce.number(),
    description: z.string().optional(),
});

export type CreateProgramDto = z.infer<typeof createProgramDto>