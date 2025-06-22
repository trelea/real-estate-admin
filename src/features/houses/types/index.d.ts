import { PaginationMeta, UrlQueriesType } from "@/types";
import { User } from "@/features/auth/types";
import { z } from "zod";
import { createHouseSchema } from "../validation";

export type CreateHouseReqType = z.infer<typeof createHouseSchema>;
export type CreateHouseResType = {
  id: number;
  message: string;
};

export type UpdateHouseReqType = {
  id: number;
  data: Omit<z.infer<typeof createHouseSchema>, "media"> & {
    media?: string[];
  };
};

export type UpdateHouseResType = {
  id: number;
  message: string;
};

export type GetHousesReqType = UrlQueriesType;
export type GetHousesResType = {
  data: House[];
  meta: PaginationMeta;
};

export type UploadHouseMediaReqType = {
  id: number;
  data: FormData;
};

export type UploadHouseMediaResType = {
  id: number;
  message: string;
};

export type DeleteHouseReqType = {
  id: number;
};

export type DeleteHouseResType = {
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

export interface House {
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
  floors: number;
  rooms: number;
  bathrooms: number;
  area: number;
  balcony: number;
  housing_stock: HousingStock;
  housing_conditions: { id: number }[];
  features: Feature[];
  media: Media[];
  views: number;
  created_at: string;
  updated_at: string;
}
