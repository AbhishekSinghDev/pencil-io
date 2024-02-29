import { z } from "zod";

export const signupFormSchema = z.object({
  username: z.string().min(2, "Username must of atleast 2 characters."),
  email: z.string().email("Please provide email."),
  password: z.string().min(8, "Password must of atleast 8 characters."),
});
