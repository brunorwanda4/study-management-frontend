import z from "zod";
export const updateUserEmailSchema = z.object({
    email: z.string().email(),
})

export type updateUserEmailDto = z.infer<typeof updateUserEmailSchema>
