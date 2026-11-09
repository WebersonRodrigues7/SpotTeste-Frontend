import z from "zod";

export const verifySchema = z.object({
    email: z.email(),
    otp: z.string()
})

export type verifyType = z.infer<typeof verifySchema>