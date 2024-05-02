import { z } from "zod";

export const signupValidation = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export type TSignUpValidation = z.infer<typeof signupValidation>;
