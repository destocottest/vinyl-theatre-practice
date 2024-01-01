import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignUpSchema = z
  .object({
    email: z.string().email("invalid email"),
    display: z.string(),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((values) => {
    return values.password === values.confirm;
  }, "passwords do not match");
