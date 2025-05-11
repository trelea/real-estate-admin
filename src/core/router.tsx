import {
  Settings,
  SignIn,
  Users,
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
          Component: withAuth(Users),
        },
        { path: "settings", Component: withAuth(Settings) },
        /**
         * Aprtments
         */
        { path: "apartments", Component: withAuth(IndexApartments) },
        { path: "apartments/create", Component: withAuth(CreateApartments) },
        { path: "apartments/:id", Component: withAuth(ShowApartment) },
        { path: "apartments/:id/edit", Component: withAuth(EditApartments) },
        {
          path: "apartments/features",
          Component: withAuth(ApartmentsFeatures),
        },
        /**
         * Houses
         */
        { path: "houses", Component: withAuth(IndexHouses) },
        { path: "houses/create", Component: withAuth(CreateHouses) },
        { path: "houses/:id", Component: withAuth(ShowHouse) },
        { path: "houses/:id/edit", Component: withAuth(EditHouses) },
        {
          path: "houses/features",
          Component: withAuth(HousesFeatures),
        },
        /**
         * Commercials
         */
        { path: "commercials", Component: withAuth(IndexCommercials) },
        { path: "commercials/create", Component: withAuth(CreateCommercials) },
        { path: "commercials/:id", Component: withAuth(ShowCommercial) },
        { path: "commercials/:id/edit", Component: withAuth(EditCommercials) },
        {
          path: "commercials/features",
          Component: withAuth(CommercialsFeatures),
        },
        {
          path: "commercials/destinations",
          Component: withAuth(CommercialsDestinations),
        },
        {
          path: "commercials/placements",
          Component: withAuth(CommercialsPlacements),
        },

        /**
         * Terrains
         */
        { path: "terrains", Component: withAuth(IndexTerrains) },
        { path: "terrains/create", Component: withAuth(CreateTerrains) },
        { path: "terrains/:id", Component: withAuth(ShowTerrain) },
        { path: "terrains/:id/edit", Component: withAuth(EditTerrains) },
        {
          path: "terrains/features",
          Component: withAuth(TerrainsFeatures),
        },
        {
          path: "terrains/usabilities",
          Component: withAuth(TerrainsUsabilities),
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
