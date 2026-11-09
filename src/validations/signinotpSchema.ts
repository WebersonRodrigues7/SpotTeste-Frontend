import z from "zod";

export const signinotpSchema = z.object({
  email: z.email(),
  otp: z.string()
});

export type signinotpType = z.infer<typeof signinotpSchema>;
