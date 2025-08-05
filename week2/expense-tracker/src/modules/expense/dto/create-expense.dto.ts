import { group } from "console"
import { z } from "zod"

export const createExpenseDto = z.object({
    description : z.string().nonempty(),
    groupId : z.coerce.number(),
    userId : z.coerce.number(),
    amount : z.coerce.number()
})

export type CraeteExpenseDto = z.infer<typeof createExpenseDto>;