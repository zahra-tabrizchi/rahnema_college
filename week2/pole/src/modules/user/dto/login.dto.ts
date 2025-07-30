import { z } from "zod";

export const loginDto = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty()
})

export type LoginDto = z.infer<typeof loginDto>;