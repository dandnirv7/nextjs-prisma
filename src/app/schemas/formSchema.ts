import { z } from "zod";

export const CategoryEnum = ["food", "beverages"] as const;

export const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  category: z.enum(CategoryEnum, {
    message: "Category must be one of food, or beverages.",
  }),
  price: z
    .number()
    .min(0, {
      message: "The price must be greater than 0",
    })
    .max(1000000, {
      message: "The price cannot exceed 1.000.000",
    }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  imageUrl: z
    .string()
    .refine(
      (url) => {
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
        return allowedExtensions.some((ext) => url.toLowerCase().endsWith(ext));
      },
      {
        message: "Only image files (.jpg, .jpeg, .png, .gif) are allowed.",
      }
    )
    .optional(),
  status: z.boolean(),
  stock: z
    .number()
    .min(0, {
      message: "Stock must be between 0 and 100.",
    })
    .max(100, {
      message: "Stock must be between 0 and 100.",
    }),
});

export type FormData = z.infer<typeof FormSchema>;
