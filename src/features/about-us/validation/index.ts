import { z } from "zod";

export const patchAboutUsContentSchema = z.object({
  content_ro: z.string().optional(),
  content_ru: z.string().optional(),
  content_en: z.string().optional(),
});
