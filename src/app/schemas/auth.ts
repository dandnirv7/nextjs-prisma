import { z } from "zod";

const uppercaseRegex = /[A-Z]/;
const numberRegex = /\d/;
const specialCharRegex = /[@$!%*?&]/;

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(uppercaseRegex, "Password must contain at least one uppercase letter.")
  .regex(numberRegex, "Password must contain at least one number.")
  .regex(
    specialCharRegex,
    "Password must contain at least one special character."
  );

export const authSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long."),
  password: passwordSchema,
});

export const registerSchema = authSchema.extend({
  fullName: z.string().min(2, "Full name must be at least 2 characters long."),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type AuthData = z.infer<typeof authSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
