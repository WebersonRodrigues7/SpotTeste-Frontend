import z from "zod";

export const sendotpSchema = z.object({
  email: z.email(),
});

export type sendotpType = z.infer<typeof sendotpSchema>;
