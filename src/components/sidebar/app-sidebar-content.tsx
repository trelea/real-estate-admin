import React from "react";
import { SidebarContent } from "../ui/sidebar";
import { AppSidebarContentGroup } from "./app-sidebar-content-group";
import {
  BookType,
  Building,
  EarthLock,
  HandPlatter,
  Handshake,
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
                title: "Placings",
                url: { pathname: "/dashboard/commercials/placings" },
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
      {/* filters */}
      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label="Filters"
        items={[
          {
            title: "Housing Types",
            icon: UnfoldVertical,
            url: { pathname: "/dashboard/housing-stocks" },
          },
          {
            title: "Conditions",
            icon: ReceiptText,
            url: { pathname: "/dashboard/conditions" },
          },
          { title: "Locations", icon: MapPinned, url: "/dashboard/locations" },
        ]}
      />
      {/* blogs and services */}
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
            title: "Privacy Policy",
            icon: EarthLock,
            url: { pathname: "/dashboard/privacy-policy" },
          },
          {
            title: "Terms and Conditions",
            icon: Handshake,
            url: { pathname: "/dashboard/terms-and-conditions" },
          },
          {
            title: "About Us",
            icon: BookType,
            url: { pathname: "/dashboard/about-us" },
          },
        ]}
      />
      {/* users */}
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

      {/* settings */}
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
