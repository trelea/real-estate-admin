import { fileValidation } from "@/utils";
import { z } from "zod";

export const createServiceSchema = z.object({
  thumbnail: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .refine(fileValidation, {
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

  content_ro: z.string(),
  content_ru: z.string(),
  content_en: z.string(),
});

export const updateServiceSchema = z.object({
  thumbnail: z
    .union([
      z.string().url("Thumbnail must be a valid URL").optional(),
      z
        .array(z.custom<File>())
        // .min(1, "Please select at least one file")
        .refine(fileValidation, {
          message: "File size must be less than 5MB",
        })
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

  content_ro: z.string().optional(),
  content_ru: z.string().optional(),
  content_en: z.string().optional(),
});
