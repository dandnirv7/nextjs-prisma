import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, {
      message: "Password at least 1 lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password at least 1 uppercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password at least 1 number.",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password at least 1 special character.",
    }),
});

export const registerSchema = authSchema.extend({
  username: z.string().min(5, "Username must be at least 5 characters long."),
  fullName: z.string().min(2, "Full name must be at least 2 characters long."),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type AuthCredentials = z.infer<typeof authSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;
