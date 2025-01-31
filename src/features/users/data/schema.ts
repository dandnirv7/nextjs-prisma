import { Users } from "@prisma/client";
import { z } from "zod";

const userStatusSchema = z.union([z.literal("active"), z.literal("inactive")]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([z.literal("admin"), z.literal("user")]);

const userSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  username: z.string(),
  email: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
});
export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);

export type UsersResponse = {
  data: {
    total_menus: number;
    total_pages: number;
    page: number;
    limit: number;
    users: Users[];
  };
};

export const addUserSchema = z
  .object({
    fullName: z.string().min(1, { message: "Username is required." }),
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

export type AddUserForm = z.infer<typeof addUserSchema>;

export const editUserSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Email is invalid." }),
    password: z
      .string()
      .optional()
      .transform((pwd) => (pwd ?? "").trim()), // Password is optional for edit
    role: z.string().min(1, { message: "Role is required." }),
    confirmPassword: z
      .string()
      .optional()
      .transform((pwd) => (pwd ?? "").trim()), // Confirm Password is optional for edit
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password && password !== "") {
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

export type EditUserForm = z.infer<typeof editUserSchema>;
