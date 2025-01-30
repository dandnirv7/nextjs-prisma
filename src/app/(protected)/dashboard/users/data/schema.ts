import { z } from "zod";

const userStatusSchema = z.union([z.literal("active"), z.literal("inactive")]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([z.literal("admin"), z.literal("user")]);

const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  fullName: z.string(),
  email: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
});
export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);

export const userFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Fullname must be at least 2 characters" }),
    username: z.string().min(1, { message: "Username is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Email is invalid." }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.string().min(1, { message: "Role is required." }),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== "")) {
      if (password === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required.",
          path: ["password"],
        });
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters long.",
          path: ["password"],
        });
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one lowercase letter.",
          path: ["password"],
        });
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one number.",
          path: ["password"],
        });
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match.",
          path: ["confirmPassword"],
        });
      }
    }
  });

export type UserForm = z.infer<typeof userFormSchema>;
