import { z } from "zod";
import { stripHtml } from "@/utils/validation";

export const createTerrainSchema = z.object({
  offert: z.array(z.enum(["SALE", "RENT"])).nonempty(),
  user: z.string().min(1),
  price: z.coerce.number().positive(),
  hot: z.boolean().optional(),
  status: z.boolean().optional(),
  desc_ro: z
    .string()
    .refine((v) => stripHtml(v).length > 0, {
      message: "Description is required",
    })
    .optional(),
  desc_ru: z
    .string()
    .refine((v) => stripHtml(v).length > 0, {
      message: "Description is required",
    })
    .optional(),
  desc_en: z
    .string()
    .refine((v) => stripHtml(v).length > 0, {
      message: "Description is required",
    })
    .optional(),
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
    .max(20, "Please select up to 20 files")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),

  /**
   * caracteristics
   */
  area: z.coerce.number().int().positive(),
  usability: z.array(z.number().int().positive()).nonempty(),
});

/* ------------------------------------------------------------------
 * UPDATE TERRAIN FORM SCHEMA (all fields optional)
 * ------------------------------------------------------------------*/
export const updateTerrainSchema = z.object({
  offert: z.array(z.enum(["SALE", "RENT"])).optional(),
  user: z.string().uuid().optional(),
  price: z.coerce.number().positive().optional(),
  hot: z.boolean().optional(),
  status: z.boolean().optional(),
  desc_ro: z.string().optional(),
  desc_ru: z.string().optional(),
  desc_en: z.string().optional(),
  location_category: z.number().int().positive().optional(),
  location_subcategory: z.number().int().positive().optional(),
  street_ro: z.string().optional(),
  street_ru: z.string().optional(),
  street_en: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  place: z.string().optional(),
  features: z.array(z.number().int().positive()).optional(),
  media: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(20, "Please select up to 20 files")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
  // characteristics
  area: z.coerce.number().int().positive().optional(),
  usability: z.array(z.number().int().positive()).optional(),
});
