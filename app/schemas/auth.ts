import z from "zod";

export const signUpSchemas = z.object({
  name: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(3).max(30),
});
