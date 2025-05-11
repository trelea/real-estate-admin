import { SignIn } from "@/pages";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

interface Props {}

export const Router: React.FC<Props> = ({}) => {
  const router = createBrowserRouter([
    {
      path: "signin",
      Component: SignIn,
    },
    /**
     * dev stage stuff
     */
    {
      path: "dashboard",
      Component: () => <>Protected Dashboard</>,
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
