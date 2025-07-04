import { z } from "zod";
import { stripHtml } from "@/utils/validation";

/* ------------------------------------------------------------------
 * CREATE  COMMERCIAL  FORM  SCHEMA
 * ------------------------------------------------------------------*/
export const createCommercialSchema = z.object({
  // basic info
  offert: z.array(z.enum(["SALE", "RENT"])).nonempty(),
  user: z.string().min(1),
  price: z.coerce.number().positive(),
  hot: z.boolean().optional(),
  status: z.boolean().optional(),

  // descriptions (must contain some non-html text)
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

  // location
  location_category: z.number().int().positive(),
  location_subcategory: z.number().int().positive(),
  street_ro: z.string().min(1),
  street_ru: z.string().min(1),
  street_en: z.string().min(1),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  place: z.string(),

  // characteristics
  area: z.coerce.number().positive(),
  floors: z.coerce.number().positive(),
  first_line: z.boolean().optional(),

  // commercial specific
  commercial_destinations: z.array(z.number().int().positive()).nonempty(),
  commercial_placings: z.array(z.number().int().positive()).nonempty(),

  // conditions and features
  housing_conditions: z.array(z.number().int().positive()).nonempty(),
  features: z.array(z.number().int().positive()).optional(),

  // media is mandatory on create
  media: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(10, "Please select up to 10 files")
    .refine((files) => files.every((f) => f.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});

/* ------------------------------------------------------------------
 * UPDATE  COMMERCIAL  FORM  SCHEMA (all fields optional)
 * ------------------------------------------------------------------*/
export const updateCommercialSchema = z.object({
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

  area: z.coerce.number().nonnegative().optional(),
  floors: z.coerce.number().nonnegative().optional(),
  first_line: z.boolean().optional(),

  commercial_destinations: z.array(z.number().int().positive()).optional(),
  commercial_placings: z.array(z.number().int().positive()).optional(),

  housing_conditions: z.array(z.number().int().positive()).optional(),
  features: z.array(z.number().int().positive()).optional(),
  media: z.array(z.union([z.string().uuid(), z.custom<File>()])).optional(),
});
