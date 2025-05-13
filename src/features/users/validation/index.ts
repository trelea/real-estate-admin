import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const createUserSchema = z.object({
  thumbnail: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
    })
    .optional(),
  name: z.string().min(1).max(25),
  surname: z.string().min(1).max(25),
  email: z.string().email(),
  password: z.string().min(8).max(25),
  contact: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  role: z.string().optional(),
});

export const updateUserSchema = z.object({
  thumbnail: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
    })
    .optional(),
  name: z.string().min(1).max(25).optional(),
  surname: z.string().min(1).max(25).optional(),
  email: z.string().email().optional(),
  // password: z.string().min(8).max(25).optional(),
  contact: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .optional(),
  role: z.string().optional(),
});
