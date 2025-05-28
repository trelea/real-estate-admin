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
  CreateApartment,
  EditApartment,
  ApartmentFeatures,
  /**
   * Houses
   */
  IndexHouses,
  ShowHouse,
  CreateHouse,
  EditHouse,
  HouseFeatures,
  /**
   * Commercials
   */
  IndexCommercials,
  ShowCommercial,
  CreateCommercial,
  EditCommercial,
  CommercialDestinations,
  CommercialFeatures,
  CommercialPlacings,
  /**
   * Terrains
   */
  IndexTerrains,
  ShowTerrain,
  CreateTerrain,
  EditTerrain,
  TerrainFeatures,
  TerrainUsabilities,
  Services,
  HousingStocks,
  Conditions,
  AboutUs,
  TermsAndConditions,
  PrivacyPolicy,
} from "@/pages";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import withAuth from "./with-auth";
import { UsersContextProvider } from "@/pages/users/context";
import { BlogsContextProvider } from "@/pages/blogs/context";
import { ServicesContextProvider } from "@/pages/services/context";
import { HousingStocksContextProvider } from "@/pages/housing-stocks/context";
import { ConditionsContextProvider } from "@/pages/conditions/context";
import { ApartmentFeaturesContextProvider } from "@/pages/apartments/features/context";
import { HouseFeaturesContextProvider } from "@/pages/houses/features/context";
import { CommercialDestinationsContextProvider } from "@/pages/commercials/destinations/context";
import { CommercialFeaturesContextProvider } from "@/pages/commercials/features/context";
import { CommercialPlacingsContextProvider } from "@/pages/commercials/placings/context";
import { TerrainFeaturesContextProvider } from "@/pages/terrains/features/context";
import { TerrainUsabilitiesContextProvider } from "@/pages/terrains/usabilites/context";

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
            Context: UsersContextProvider,
            Component: Users,
          }),
        },
        {
          path: "blogs",
          Component: withAuth({
            Context: BlogsContextProvider,
            Component: Blogs,
          }),
        },
        {
          path: "services",
          Component: withAuth({
            Context: ServicesContextProvider,
            Component: Services,
          }),
        },
        {
          path: "housing-stocks",
          Component: withAuth({
            Context: HousingStocksContextProvider,
            Component: HousingStocks,
          }),
        },
        {
          path: "conditions",
          Component: withAuth({
            Component: Conditions,
            Context: ConditionsContextProvider,
          }),
        },

        /**
         * costumizable about us, terms and conditions and privacy content
         */
        { path: "about-us", Component: withAuth({ Component: AboutUs }) },
        {
          path: "terms-and-conditions",
          Component: withAuth({ Component: TermsAndConditions }),
        },
        {
          path: "privacy-policy",
          Component: withAuth({ Component: PrivacyPolicy }),
        },

        /**
         * settings optional
         */
        {
          path: "settings",
          Component: withAuth({ Component: Settings }),
        },

        /**
         * Apartments
         */
        {
          path: "apartments",
          children: [
            {
              index: true,
              Component: withAuth({ Component: IndexApartments }),
            },
            {
              path: "features",
              Component: withAuth({
                Component: ApartmentFeatures,
                Context: ApartmentFeaturesContextProvider,
              }),
            },
            {
              path: "create",
              Component: withAuth({ Component: CreateApartment }),
            },
            {
              path: ":id",
              Component: withAuth({ Component: ShowApartment }),
            },
            {
              path: ":id/edit",
              Component: withAuth({ Component: EditApartment }),
            },
          ],
        },

        /**
         * Houses
         */
        {
          path: "houses",
          children: [
            { index: true, Component: withAuth({ Component: IndexHouses }) },
            {
              path: "features",
              Component: withAuth({
                Component: HouseFeatures,
                Context: HouseFeaturesContextProvider,
              }),
            },
            {
              path: "create",
              Component: withAuth({ Component: CreateHouse }),
            },
            {
              path: ":id",
              Component: withAuth({ Component: ShowHouse }),
            },
            {
              path: ":id/edit",
              Component: withAuth({ Component: EditHouse }),
            },
          ],
        },

        /**
         * Commercials
         */
        {
          path: "commercials",

          children: [
            {
              index: true,
              Component: withAuth({ Component: IndexCommercials }),
            },
            {
              path: "features",
              Component: withAuth({
                Component: CommercialFeatures,
                Context: CommercialFeaturesContextProvider,
              }),
            },
            {
              path: "destinations",
              Component: withAuth({
                Component: CommercialDestinations,
                Context: CommercialDestinationsContextProvider,
              }),
            },
            {
              path: "placings",
              Component: withAuth({
                Component: CommercialPlacings,
                Context: CommercialPlacingsContextProvider,
              }),
            },
            {
              path: "create",
              Component: withAuth({ Component: CreateCommercial }),
            },
            {
              path: ":id",
              Component: withAuth({ Component: ShowCommercial }),
            },
            {
              path: ":id/edit",
              Component: withAuth({ Component: EditCommercial }),
            },
          ],
        },

        /**
         * Terrains
         */
        {
          path: "terrains",
          children: [
            {
              index: true,
              Component: withAuth({ Component: IndexTerrains }),
            },
            {
              path: "features",
              Component: withAuth({
                Component: TerrainFeatures,
                Context: TerrainFeaturesContextProvider,
              }),
            },
            {
              path: "usabilities",
              Component: withAuth({
                Component: TerrainUsabilities,
                Context: TerrainUsabilitiesContextProvider,
              }),
            },
            {
              path: "create",
              Component: withAuth({ Component: CreateTerrain }),
            },
            {
              path: ":id",
              Component: withAuth({ Component: ShowTerrain }),
            },
            {
              path: ":id/edit",
              Component: withAuth({ Component: EditTerrain }),
            },
          ],
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
