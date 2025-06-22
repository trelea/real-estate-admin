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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <SidebarContent
      className={state !== "collapsed" ? `m-0 p-0 px-6` : undefined}
    >
      {/* content */}
      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label={t("sidebar.content")}
        items={[
          {
            title: t("sidebar.apartments"),
            icon: Building,
            collapsible: [
              {
                title: (
                  <Badge>
                    <Plus />
                    {t("sidebar.createNew")}
                  </Badge>
                ),
                url: withLangPrefix(
                  { pathname: "/dashboard/apartments/create" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.posts"),
                url: withLangPrefix(
                  { pathname: "/dashboard/apartments" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.features"),
                url: withLangPrefix(
                  { pathname: "/dashboard/apartments/features" },
                  langPrefix
                ),
              },
            ],
          },
          {
            title: t("sidebar.houses"),
            icon: House,
            collapsible: [
              {
                title: (
                  <Badge>
                    <Plus />
                    {t("sidebar.createNew")}
                  </Badge>
                ),
                url: withLangPrefix(
                  { pathname: "/dashboard/houses/create" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.posts"),
                url: withLangPrefix(
                  { pathname: "/dashboard/houses" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.features"),
                url: withLangPrefix(
                  { pathname: "/dashboard/houses/features" },
                  langPrefix
                ),
              },
            ],
          },
          {
            title: t("sidebar.commercials"),
            icon: ShoppingBag,
            collapsible: [
              {
                title: (
                  <Badge>
                    <Plus />
                    {t("sidebar.createNew")}
                  </Badge>
                ),
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials/create" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.posts"),
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.destinations"),
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials/destinations" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.placings"),
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials/placings" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.features"),
                url: withLangPrefix(
                  { pathname: "/dashboard/commercials/features" },
                  langPrefix
                ),
              },
            ],
          },
          {
            title: t("sidebar.terrains"),
            icon: Trees,
            collapsible: [
              {
                title: (
                  <Badge>
                    <Plus />
                    {t("sidebar.createNew")}
                  </Badge>
                ),
                url: withLangPrefix(
                  { pathname: "/dashboard/terrains/create" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.posts"),
                url: withLangPrefix(
                  { pathname: "/dashboard/terrains" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.usability"),
                url: withLangPrefix(
                  { pathname: "/dashboard/terrains/usabilities" },
                  langPrefix
                ),
              },
              {
                title: t("sidebar.features"),
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
        label={t("sidebar.filters")}
        items={[
          {
            title: t("sidebar.housingTypes"),
            icon: UnfoldVertical,
            url: withLangPrefix(
              { pathname: "/dashboard/housing-stocks" },
              langPrefix
            ),
          },
          {
            title: t("sidebar.conditions"),
            icon: ReceiptText,
            url: withLangPrefix(
              { pathname: "/dashboard/conditions" },
              langPrefix
            ),
          },
          {
            title: t("sidebar.locations"),
            icon: MapPinned,
            url: withLangPrefix("/dashboard/locations", langPrefix),
          },
        ]}
      />
      {/* blogs and services */}
      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label={t("sidebar.utils")}
        items={[
          {
            title: t("sidebar.services"),
            icon: HandPlatter,
            url: withLangPrefix(
              { pathname: "/dashboard/services" },
              langPrefix
            ),
          },
          {
            title: t("sidebar.blogs"),
            icon: Newspaper,
            url: withLangPrefix({ pathname: "/dashboard/blogs" }, langPrefix),
          },
          {
            title: t("sidebar.privacyPolicy"),
            icon: EarthLock,
            url: withLangPrefix(
              { pathname: "/dashboard/privacy-policy" },
              langPrefix
            ),
          },
          {
            title: t("sidebar.termsAndConditions"),
            icon: Handshake,
            url: withLangPrefix(
              { pathname: "/dashboard/terms-and-conditions" },
              langPrefix
            ),
          },
          {
            title: t("sidebar.aboutUs"),
            icon: BookType,
            url: withLangPrefix(
              { pathname: "/dashboard/about-us" },
              langPrefix
            ),
          },
          {
            title: t("sidebar.landing"),
            icon: GalleryVerticalEnd,
            url: withLangPrefix({ pathname: "/dashboard/landing" }, langPrefix),
          },
        ]}
      />
      {/* users */}
      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label={t("sidebar.access")}
        items={[
          {
            title: t("sidebar.users"),
            icon: Users,
            url: withLangPrefix({ pathname: "/dashboard/users" }, langPrefix),
          },
        ]}
      />

      {/* settings */}
      <AppSidebarContentGroup
        state={state}
        toggleSidebar={toggleSidebar}
        label={t("sidebar.settings")}
        items={[
          {
            title: t("sidebar.configure"),
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
