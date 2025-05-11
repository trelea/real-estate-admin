export type SigninResType = unknown;
export type SigninReqType = { email: string; password: string };

export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  role: "ADMIN" | "USER";
  profile: Profile;
}

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  surname: string;
  contact: string | null;
  thumbnail: string | null;
}

export type StatusResType = User;
export type StatusReqType = unknown;

export type SignoutResType = unknown;
export type SignoutReqType = unknown;
