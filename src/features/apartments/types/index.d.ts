import { PaginationMeta, UrlQueriesType } from "@/types";
import { User } from "@/features/auth/types";
import { z } from "zod";
import { createApartmentSchema } from "../validation";

export type CreateApartmentReqType = z.infer<typeof createApartmentSchema>;
export type CreateApartmentResType = {
  id: number;
  message: string;
};

export type UpdateApartmentReqType = {
  id: number;
  data: Omit<z.infer<typeof createApartmentSchema>, "media"> & {
    media?: string[];
  };
};

export type UpdateApartmentResType = {
  id: number;
  message: string;
};

export type GetApartmentsReqType = UrlQueriesType;
export type GetApartmentsResType = {
  data: Apartment[];
  meta: PaginationMeta;
};

export type UploadApartmentMediaReqType = {
  id: number;
  data: FormData;
};

export type UploadApartmentMediaResType = {
  id: number;
  message: string;
};

export type DeleteApartmentReqType = {
  id: number;
};

export type DeleteApartmentResType = {
  id: number;
  message: string;
};

export interface Location {
  id: number;
  location_category: {
    id: number;
    name: string;
  };
  location_subcategory: {
    id: number;
    name: string;
  };
  lat: number;
  lng: number;
  street_ro: string;
  street_ru: string;
  street_en: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface HousingStock {
  id: number;
  name: string;
}

export interface Feature {
  id: number;
  name: string;
}

export interface Apartment {
  id: number;
  offert: ("SALE" | "RENT")[];
  user: User;
  price: number;
  price_square: number;
  hot: boolean;
  status: boolean | "PUBLIC" | "PRIVATE";
  desc_ro: string;
  desc_ru: string;
  desc_en: string;
  location: Location;
  rooms: number;
  sanitaries: number;
  surface: number;
  floor: number;
  floors: number;
  housing_stock: HousingStock;
  housing_conditions: { id: number }[];
  features: Feature[];
  media: Media[];
  views: number;
  created_at: string;
  updated_at: string;
}
