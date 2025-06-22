import { PaginationMeta, UrlQueriesType } from "@/types";
import { User } from "@/features/auth/types";
import { z } from "zod";
import { createCommercialSchema } from "../validation";
import { Location, Media } from "@/features/apartments/types";

export type CreateCommercialReqType = z.infer<typeof createCommercialSchema>;

export interface CommercialDestination {
  id: number;
  name: string;
}

export interface CommercialFeature {
  id: number;
  name: string;
}

export interface CommercialPlacing {
  id: number;
  name: string;
}

export interface Commercial {
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
  area: number;
  rooms: number;
  floor: number;
  floors: number;
  housing_stock: { id: number; name: string };
  housing_conditions: { id: number }[];
  commercial_destinations: CommercialDestination[];
  commercial_placings: CommercialPlacing[];
  features: CommercialFeature[];
  media: Media[];
  views: number;
  created_at: string;
  updated_at: string;
}

export interface CommercialResponse {
  data: Commercial[];
  meta: PaginationMeta;
}

export interface CommercialQueriesType extends UrlQueriesType {
  destination?: string;
  placing?: string;
  features?: string;
  housing_stock?: string;
  housing_conditions?: string;
  price_min?: string;
  price_max?: string;
  area_min?: string;
  area_max?: string;
  rooms_min?: string;
  rooms_max?: string;
  floor_min?: string;
  floor_max?: string;
  floors_min?: string;
  floors_max?: string;
}
