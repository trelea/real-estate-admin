import React from "react";
import { SidebarContent } from "../ui/sidebar";
import { AppSidebarContentGroup } from "./app-sidebar-content-group";
import {
  BookType,
  Building,
  EarthLock,
  GalleryVerticalEnd,
  HandPlatter,
  Handshake,
  House,
  MapPinned,
  Newspaper,
  Plus,
  ReceiptText,
  Settings,
  ShoppingBag,
  Trees,
  UnfoldVertical,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";

interface Props {
  state?: "expanded" | "collapsed";
  toggleSidebar?: () => void;
}

function withLangPrefix(url: any, langPrefix: string) {
  if (!url) return url;
  if (typeof url === "string") {
    if (url.startsWith("/")) return langPrefix + url;
    return langPrefix + "/" + url;
  }
  if (typeof url === "object" && url.pathname) {
    if (url.pathname.startsWith("/")) {
      return { ...url, pathname: langPrefix + url.pathname };
    }
    return { ...url, pathname: langPrefix + "/" + url.pathname };
  }
  return url;
}

export const AppSidebarContent: React.FC<Props> = ({
  state,
  toggleSidebar,
}) => {
  const { currentLang } = useChangeLanguage();
  const langPrefix = currentLang ? `/${currentLang}` : "";

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
                title: (
                  <Badge>
                    <Plus />
                    Create New
                  </Badge>
                ),
                url: withLangPrefix(
                  { pathname: "/dashboard/apartments/create" },
                  langPrefix
                ),
              },
              {
                title: "Posts",
                url: withLangPrefix(
                  { pathname: "/dashboard/apartments" },
                  langPrefix
                ),
              },
              {
                title: "Features",
                url: withLangPrefix(
                  { pathname: "/dashboard/apartments/features" },
                  langPrefix
                ),
              },
            ],
          },
          // Houses
          {
            title: "Hoses",
            icon: House,
            collapsible: [
              {
                title: (
                  <Badge>
                    <Plus />
                    Create New
                  </Badge>
                ),
                url: withLangPrefix(
                  { pathname: "/dashboard/houses/create" },
                  langPrefix
                ),
              },
              {
                title: "Posts",
                url: withLangPrefix(
                  { pathname: "/dashboard/houses" },
                  langPrefix
                ),
              },
              {
                title: "Features",
                url: withLangPrefix(
                  { pathname: "/dashboard/houses/features" },
                  langPrefix
                ),
              },
            ],
          },
          // Commercials
          {
            title: "Commercials",
            icon: ShoppingBag,
            collapsible: [
              {
                title: (
                  <Badge>
                    <Plus />
                    Create New
                  </Badge>
                ),
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials/create" },
                  langPrefix
                ),
              },
              {
                title: "Posts",
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials" },
                  langPrefix
                ),
              },
              {
                title: "Destinations",
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials/destinations" },
                  langPrefix
                ),
              },
              {
                title: "Placings",
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials/placings" },
                  langPrefix
                ),
              },
              {
                title: "Features",
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials/features" },
                  langPrefix
                ),
              },
            ],
          },
          // Terrains
          {
            title: "Terrains",
            icon: Trees,
            collapsible: [
              {
                title: (
                  <Badge>
                    <Plus />
                    Create New
                  </Badge>
                ),
                url: withLangPrefix(
                  { pathname: "/dashboard/terrains/create" },
                  langPrefix
                ),
              },
              {
                title: "Posts",
                url: withLangPrefix(
                  { pathname: "/dashboard/terrains" },
                  langPrefix
                ),
              },
              {
                title: "Usability",
                url: withLangPrefix(
                  { pathname: "/dashboard/terrains/usabilities" },
                  langPrefix
                ),
              },
              {
                title: "Features",
                url: withLangPrefix(
                  { pathname: "/dashboard/terrains/features" },
                  langPrefix
                ),
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
            url: withLangPrefix(
              { pathname: "/dashboard/housing-stocks" },
              langPrefix
            ),
          },
          {
            title: "Conditions",
            icon: ReceiptText,
            url: withLangPrefix(
              { pathname: "/dashboard/conditions" },
              langPrefix
            ),
          },
          {
            title: "Locations",
            icon: MapPinned,
            url: withLangPrefix("/dashboard/locations", langPrefix),
          },
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
            url: withLangPrefix(
              { pathname: "/dashboard/services" },
              langPrefix
            ),
          },
          {
            title: "Blogs",
            icon: Newspaper,
            url: withLangPrefix({ pathname: "/dashboard/blogs" }, langPrefix),
          },
          {
            title: "Privacy Policy",
            icon: EarthLock,
            url: withLangPrefix(
              { pathname: "/dashboard/privacy-policy" },
              langPrefix
            ),
          },
          {
            title: "Terms and Conditions",
            icon: Handshake,
            url: withLangPrefix(
              { pathname: "/dashboard/terms-and-conditions" },
              langPrefix
            ),
          },
          {
            title: "About Us",
            icon: BookType,
            url: withLangPrefix(
              { pathname: "/dashboard/about-us" },
              langPrefix
            ),
          },
          {
            title: "Landing",
            icon: GalleryVerticalEnd,
            url: withLangPrefix({ pathname: "/dashboard/landing" }, langPrefix),
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
            url: withLangPrefix({ pathname: "/dashboard/users" }, langPrefix),
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
            url: withLangPrefix(
              { pathname: "/dashboard/settings" },
              langPrefix
            ),
          },
        ]}
      />
    </SidebarContent>
  );
};
