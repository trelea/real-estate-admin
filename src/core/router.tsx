import {
  Settings,
  SignIn,
  Users,
  Blogs,
  /**
   * Apartments
   */
  IndexApartments,
  ShowApartment,
  CreateApartments,
  EditApartments,
  ApartmentsFeatures,
  /**
   * Houses
   */
  IndexHouses,
  ShowHouse,
  CreateHouses,
  EditHouses,
  HousesFeatures,
  /**
   * Commercials
   */
  IndexCommercials,
  ShowCommercial,
  CreateCommercials,
  EditCommercials,
  CommercialsDestinations,
  CommercialsFeatures,
  CommercialsPlacements,
  /**
   * Terrains
   */
  IndexTerrains,
  ShowTerrain,
  CreateTerrains,
  EditTerrains,
  TerrainsFeatures,
  TerrainsUsabilities,
} from "@/pages";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import withAuth from "./with-auth";
import { UsersContextLayout } from "@/pages/users/context";
import { BlogsContextLayout } from "@/pages/blogs/context";

interface Props {}

export const Router: React.FC<Props> = ({}) => {
  const router = createBrowserRouter([
    {
      path: "signin",
      Component: SignIn,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "users",
          Component: withAuth({
            Context: UsersContextLayout,
            Component: Users,
          }),
        },
        {
          path: "blogs",
          Component: withAuth({
            Context: BlogsContextLayout,
            Component: Blogs,
          }),
        },
        {
          path: "settings",
          Component: withAuth({ Component: Settings }),
        },
        /**
         * Apartments
         */
        {
          path: "apartments",
          Component: withAuth({ Component: IndexApartments }),
        },
        {
          path: "apartments/create",
          Component: withAuth({ Component: CreateApartments }),
        },
        {
          path: "apartments/:id",
          Component: withAuth({ Component: ShowApartment }),
        },
        {
          path: "apartments/:id/edit",
          Component: withAuth({ Component: EditApartments }),
        },
        {
          path: "apartments/features",
          Component: withAuth({ Component: ApartmentsFeatures }),
        },
        /**
         * Houses
         */
        {
          path: "houses",
          Component: withAuth({ Component: IndexHouses }),
        },
        {
          path: "houses/create",
          Component: withAuth({ Component: CreateHouses }),
        },
        {
          path: "houses/:id",
          Component: withAuth({ Component: ShowHouse }),
        },
        {
          path: "houses/:id/edit",
          Component: withAuth({ Component: EditHouses }),
        },
        {
          path: "houses/features",
          Component: withAuth({ Component: HousesFeatures }),
        },
        /**
         * Commercials
         */
        {
          path: "commercials",
          Component: withAuth({ Component: IndexCommercials }),
        },
        {
          path: "commercials/create",
          Component: withAuth({ Component: CreateCommercials }),
        },
        {
          path: "commercials/:id",
          Component: withAuth({ Component: ShowCommercial }),
        },
        {
          path: "commercials/:id/edit",
          Component: withAuth({ Component: EditCommercials }),
        },
        {
          path: "commercials/features",
          Component: withAuth({ Component: CommercialsFeatures }),
        },
        {
          path: "commercials/destinations",
          Component: withAuth({ Component: CommercialsDestinations }),
        },
        {
          path: "commercials/placements",
          Component: withAuth({ Component: CommercialsPlacements }),
        },
        /**
         * Terrains
         */
        {
          path: "terrains",
          Component: withAuth({ Component: IndexTerrains }),
        },
        {
          path: "terrains/create",
          Component: withAuth({ Component: CreateTerrains }),
        },
        {
          path: "terrains/:id",
          Component: withAuth({ Component: ShowTerrain }),
        },
        {
          path: "terrains/:id/edit",
          Component: withAuth({ Component: EditTerrains }),
        },
        {
          path: "terrains/features",
          Component: withAuth({ Component: TerrainsFeatures }),
        },
        {
          path: "terrains/usabilities",
          Component: withAuth({ Component: TerrainsUsabilities }),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

/**
 * ROUTES:
 *
 * AUTH:
 * /signin
 *
 * USERS:
 * /dashboard/users
 *
 * APARTMENT ROUTES:
 * /dashboard/apartments
 * /dashboard/apartments/create
 * /dashboard/apartments/{:id}
 * /dashboard/apartments/{:id}/edit
 * /dashboard/apartments/{stare,features,fond-locativ,...}
 *
 * HOUSES ROUTES:
 * /dashboard/houses
 * /dashboard/houses/create
 * /dashboard/houses/{:id}
 * /dashboard/houses/{:id}/edit
 * /dashboard/houses/{stare,features,fond-locativ,...}
 *
 * TERRAIN ROUTES:
 * /dashboard/terrains
 * /dashboard/terrains/create
 * /dashboard/terrains/{:id}
 * /dashboard/terrains/{:id}/edit
 * /dashboard/terrains/{stare,features,fond-locativ,...}
 *
 * COMMERCIALS
 * /dashboard/commercials
 * /dashboard/commercials/create
 * /dashboard/commercials/{:id}
 * /dashboard/commercials/{:id}/edit
 * /dashboard/commercials/{stare,features,fond-locativ,...}
 *
 */
