import { z } from "zod";

export const signupValidation = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
});

export const signinValidation = signupValidation.pick({
  email: true,
  password: true,
});

export type TSignUpValidation = z.infer<typeof signupValidation>;
export type TSignInValidation = z.infer<typeof signinValidation>