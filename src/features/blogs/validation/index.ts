import { z } from "zod";

export const createBlogSchema = z.object({
  thumbnail: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
    })
    .optional(),
  status: z.boolean().optional(),

  title_ro: z.string(),
  title_ru: z.string(),
  title_en: z.string(),

  desc_ro: z.string(),
  desc_ru: z.string(),
  desc_en: z.string(),
});

export const updateBlogSchema = z.object({
  thumbnail: z
    .union([
      z.string().url("Thumbnail must be a valid URL").optional(),
      z
        .array(z.custom<File>())
        // .min(1, "Please select at least one file")
        .refine(
          (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
          {
            message: "File size must be less than 5MB",
          }
        )
        .optional(),
    ])
    .optional(),
  status: z.boolean().optional(),

  title_ro: z.string().optional(),
  title_ru: z.string().optional(),
  title_en: z.string().optional(),

  desc_ro: z.string().optional(),
  desc_ru: z.string().optional(),
  desc_en: z.string().optional(),
});
