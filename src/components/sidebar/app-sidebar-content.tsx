import React from "react";
import { SidebarContent } from "../ui/sidebar";
import { AppSidebarContentGroup } from "./app-sidebar-content-group";
import {
  Building,
  HandPlatter,
  House,
  MapPinned,
  Newspaper,
  ReceiptText,
  Settings,
  ShoppingBag,
  Trees,
  UnfoldVertical,
  Users,
} from "lucide-react";

interface Props {
  state?: "expanded" | "collapsed";
  toggleSidebar?: () => void;
}

export const AppSidebarContent: React.FC<Props> = ({
  state,
  toggleSidebar,
}) => {
  return (
    <SidebarContent
      className={state !== "collapsed" ? `m-0 p-0 px-6` : undefined}
    >
      {/* content */}

      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label="Content"
        items={[
          // Aprtments
          {
            title: "Apartments",
            icon: Building,
            collapsible: [
              {
                title: "Posts",
                url: { pathname: "/dashboard/apartments" },
              },
              {
                title: "Features",
                url: { pathname: "/dashboard/apartments/features" },
              },
            ],
          },
          // Houses
          {
            title: "Hoses",
            icon: House,
            collapsible: [
              {
                title: "Posts",
                url: { pathname: "/dashboard/houses" },
              },
              {
                title: "Features",
                url: { pathname: "/dashboard/houses/features" },
              },
            ],
          },
          // Commercials
          {
            title: "Commercials",
            icon: ShoppingBag,
            collapsible: [
              {
                title: "Posts",
                url: { pathname: "/dashboard/commercials" },
              },
              {
                title: "Destinations",
                url: { pathname: "/dashboard/commercials/destinations" },
              },
              {
                title: "Placements",
                url: { pathname: "/dashboard/commercials/placements" },
              },
              {
                title: "Features",
                url: { pathname: "/dashboard/commercials/features" },
              },
            ],
          },
          // Terrains
          {
            title: "Terrains",
            icon: Trees,
            collapsible: [
              { title: "Posts", url: { pathname: "/dashboard/terrains" } },
              {
                title: "Usability",
                url: { pathname: "/dashboard/terrains/usabilities" },
              },
              {
                title: "Features",
                url: { pathname: "/dashboard/terrains/features" },
              },
            ],
          },
        ]}
      />
      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label="Access"
        items={[
          {
            title: "Users",
            icon: Users,
            url: { pathname: "/dashboard/users" },
          },
        ]}
      />
      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label="Utils"
        items={[
          {
            title: "Services",
            icon: HandPlatter,
            url: { pathname: "/dashboard/services" },
          },
          {
            title: "Blogs",
            icon: Newspaper,
            url: { pathname: "/dashboard/blogs" },
          },
          {
            title: "Housing Stock",
            icon: UnfoldVertical,
            url: { pathname: "/dashboard/housing-stock" },
          },
          {
            title: "Conditions",
            icon: ReceiptText,
            url: { pathname: "/dashboard/conditions" },
          },
          { title: "Locations", icon: MapPinned, collapsible: [] },
        ]}
      />
      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label="Settings"
        items={[
          {
            title: "Configure",
            icon: Settings,
            url: { pathname: "/dashboard/settings" },
          },
        ]}
      />
    </SidebarContent>
  );
};
