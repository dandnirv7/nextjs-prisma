import { z } from "zod";

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  fullName: z
    .string()
    .min(2, { message: "Fullname must be at least 2 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(regexPassword, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
});

export type UserData = z.infer<typeof UserSchema>;
