export type AboutUsType = {
  id: string;
  created_at: string;
  updated_at: string;
  content_ro: string;
  content_ru: string;
  content_en: string;
};

export type GetAboutUsContentResType = AboutUsType;
export type GetAboutUsContentReqType = unknown;

export type PatchAboutUsContentResType = unknown;
export type PatchAboutUsContentReqType = Partial<{
  content_ro: string;
  content_ru: string;
  content_en: string;
}>;
