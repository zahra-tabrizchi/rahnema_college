import { z }  from "zod";

export const createGroupDto = z.object({
    name: z.string().optional(),
    memberIds : z.array(z.number())
})

export type CreateGroupDto = z.infer<typeof createGroupDto>;