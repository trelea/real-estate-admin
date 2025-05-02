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
