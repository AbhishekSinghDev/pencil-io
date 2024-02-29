import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Please provide email."),
  password: z.string().min(4, "Please provide password."),
});
