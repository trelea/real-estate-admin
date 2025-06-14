import { z } from "zod";
import { stripHtml } from "@/utils/validation";

export const createApartmentSchema = z.object({
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
  // bull shit stuff
  place: z.string(),

  // caracteristics
  rooms: z.coerce.number().positive(),
  sanitaries: z.coerce.number().positive(),
  surface: z.coerce.number().positive(),
  floor: z.coerce.number().positive(),
  floors: z.coerce.number().positive(),
  housing_stock: z.number().int().positive(),
  housing_conditions: z.array(z.number().int().positive()).nonempty(),
  features: z.array(z.number().int().positive()).optional(),

  // media
  media: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(10, "Please select up to 10 files")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});
