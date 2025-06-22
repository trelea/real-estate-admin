import { PaginationMeta, UrlQueriesType } from "@/types";
import { User } from "@/features/auth/types";

export interface Location {
  id: number;
  location_category: { id: number; name: string };
  location_subcategory: { id: number; name: string };
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

export interface Terrain {
  id: number;
  offert: ("SALE" | "RENT")[];
  user: User;
  price: number;
  hot: boolean;
  status: boolean | "PUBLIC" | "PRIVATE";
  desc_ro: string;
  desc_ru: string;
  desc_en: string;
  location: Location;
  area: number;
  usability: { id: number }[];
  features: { id: number }[];
  media: Media[];
  views: number;
  created_at: string;
  updated_at: string;
}

export interface TerrainResponse {
  data: Terrain[];
  meta: PaginationMeta;
}

export interface TerrainQueriesType extends UrlQueriesType {
  price_min?: string;
  price_max?: string;
  area_min?: string;
  area_max?: string;
  usability?: string;
  features?: string;
}
