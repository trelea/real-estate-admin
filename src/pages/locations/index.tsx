import { ManageData } from "@/components/manage-data-table/manage-data";
import { User } from "@/features/auth/types";
import { LocationCategoryType } from "@/features/locations/types";
import React from "react";
import { LocationsContext, LocationsContextProps } from "./context";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  CreateLocationCategoryForm,
  UpdateLocationCategoryForm,
} from "@/features/locations/forms";
import { useDeleteLocationCategory } from "@/features/locations/hooks";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const Locations: React.FC<Props> = ({ status }) => {
  const {
    data: {
      locations_categories: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateLocationCategory,
      setOpenDialogCreateLocationCategory,
    },
  } = React.useContext<LocationsContextProps>(LocationsContext);
  const [deleteLocationCategory, deleteLocationCategoryLoading] =
    useDeleteLocationCategory();
  const { t } = useTranslation();
  return (
    <ManageData<LocationCategoryType>
      /**
       * loading
       */
      loading={{
        state: isLoading || isFetching,
        component: <TableSkeleton />,
      }}
      /**
       * header
       */
      header={{
        title: t("locations.manageTitle", "Locations"),
        badge: t("locations.badge", {
          count: data?.meta.total ?? 0,
          defaultValue: "{{count}} locations",
        }),
        search: {
          defaultValue: search,
          onValueChange: (value) =>
            setUriQueries(({ search, ...rest }) => ({
              search: value,
              ...rest,
            })),
        },
        create: {
          trigger: {
            label: t("locations.create.trigger", "Create location category"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t("locations.create.title", "Create Location Category"),
            description: t(
              "locations.create.description",
              "Enter the required multilingual information to create a new location category. After submission, the category will be available in the system."
            ),
            children: <CreateLocationCategoryForm />,
          },
          dialogState: {
            open: openDialogCreateLocationCategory,
            onOpenChange: setOpenDialogCreateLocationCategory,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as LocationCategoryType[],
          headers: [
            t("locations.tableHeaders.id", "ID"),
            t("locations.tableHeaders.ro", "Romanian"),
            t("locations.tableHeaders.ru", "Russian"),
            t("locations.tableHeaders.en", "English"),
          ],
          rows: ({ ro, ru, en, id }) => [
            <div className="py-2 sm:py-4">
              <span className="font-bold text-sm">{id}</span>
            </div>,
            <span className="font-medium text-sm">{ro}</span>,
            <span className="font-medium text-sm">{ru}</span>,
            <span className="font-medium text-sm">{en}</span>,
          ],
          /**
           * delete action
           */
          delete: {
            disabled: status?.role !== "ADMIN" || deleteLocationCategoryLoading,
            // @ts-ignore
            onDeleteAction: (id) => deleteLocationCategory(id),
          },
          /**
           * update action
           */
          update: {
            disabled: status?.role !== "ADMIN",
            title: t("locations.update.title", "Update Location Category"),
            description: t(
              "locations.update.description",
              "Modify the multilingual details for this location category."
            ),
            children: (category) => (
              <UpdateLocationCategoryForm category={category} />
            ),
          },
          /**
           * access
           */
          access: {
            href: ({ id }) => ({ pathname: id.toString() }),
          },
        },
      }}
      /**
       * footer
       */
      footer={{
        pagination: {
          meta: data?.meta,
          next: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page + 1,
              ...rest,
            })),
          prev: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page - 1,
              ...rest,
            })),
          current: (_) =>
            setUriQueries(({ page, ...rest }) => ({
              page: _,
              ...rest,
            })),
        },
      }}
    />
  );
};
