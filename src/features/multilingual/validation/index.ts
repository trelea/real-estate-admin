import { z } from "zod";

export const createMultilingualSchema = z.object({
  ro: z.string().trim().min(2).max(256),
  ru: z.string().trim().min(2).max(256),
  en: z.string().trim().min(2).max(256),
});

export const updateMultilingualSchema = z.object({
  ro: z.string().trim().min(2).max(256).optional(),
  ru: z.string().trim().min(2).max(256).optional(),
  en: z.string().trim().min(2).max(256).optional(),
});
