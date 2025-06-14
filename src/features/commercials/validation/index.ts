import { z } from "zod";
import { stripHtml } from "@/utils/validation";

export const createCommercialSchema = z.object({
  offert: z.array(z.enum(["SALE", "RENT"])).nonempty(),
  user: z.string().min(1),
  price: z.coerce.number().positive(),
  hot: z.boolean().optional(),
  status: z.boolean().optional(),
  desc_ro: z.string().refine((v) => stripHtml(v).length > 0, {
    message: "Description is required",
  }),
  desc_ru: z.string().refine((v) => stripHtml(v).length > 0, {
    message: "Description is required",
  }),
  desc_en: z.string().refine((v) => stripHtml(v).length > 0, {
    message: "Description is required",
  }),
  location_category: z.number().int().positive(),
  location_subcategory: z.number().int().positive(),
  street_ro: z.string().min(1),
  street_ru: z.string().min(1),
  street_en: z.string().min(1),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  place: z.string(),
  features: z.array(z.number().int().positive()).optional(),
  media: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(10, "Please select up to 10 files")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),

  /**
   * caracteristics
   */
  floors: z.number().int().positive(),
  first_line: z.boolean().optional(),
  area: z.number().int().positive(),
  housing_conditions: z.array(z.number().int().positive()).nonempty(),
  commercial_destinations: z.array(z.number().int().positive()).nonempty(),
  commercial_placings: z.array(z.number().int().positive()).nonempty(),
});
