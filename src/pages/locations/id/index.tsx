import { User } from "@/features/auth/types";
import React from "react";
import { LocationsContext, LocationsContextProps } from "../context";
import { ManageData } from "@/components/manage-data-table/manage-data";
import {
  GetLocationSubCategoriesResType,
  LocationCategoryType,
  LocationSubCategoryType,
} from "@/features/locations/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import { CreateLocationSubCategoryForm } from "@/features/locations/forms/create-location-subcategory-form";
import { UpdateLocationSubCategoryForm } from "@/features/locations/forms";
import { useDeleteLocationSubCategory } from "@/features/locations/hooks";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const Location: React.FC<Props> = ({ status }) => {
  const {
    data: {
      locations_subcategories: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateLocationSubCategory,
      setOpenDialogCreateLocationSubCategory,
    },
  } = React.useContext<LocationsContextProps>(LocationsContext);
  const [deleteLocationSubCategory, deleteLocationSubCategoryLoading] =
    useDeleteLocationSubCategory();
  const { t } = useTranslation();

  return (
    <ManageData<LocationSubCategoryType>
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
        title: (data?.category as LocationCategoryType)?.ro,
        badge: t("locations.sub.badge", {
          count: data?.meta.total ?? 0,
          defaultValue: "{{count}} subcategories",
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
            label: t("locations.sub.create.trigger", "Create Subcategory"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t(
              "locations.sub.create.title",
              "Create Location Subcategory"
            ),
            description: t(
              "locations.sub.create.description",
              "Fill in the location subcategory details in all supported languages. Once submitted, the subcategory will be added under the selected location category and available for use in relevant modules."
            ),
            children: (
              <CreateLocationSubCategoryForm
                category={
                  (data as GetLocationSubCategoriesResType)?.category.id
                }
              />
            ),
          },
          dialogState: {
            open: openDialogCreateLocationSubCategory,
            onOpenChange: setOpenDialogCreateLocationSubCategory,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as LocationSubCategoryType[],
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
            disabled:
              status?.role !== "ADMIN" || deleteLocationSubCategoryLoading,
            // @ts-ignore
            onDeleteAction: (id) => deleteLocationSubCategory(id),
          },
          /**
           * update action
           */
          update: {
            disabled: status?.role !== "ADMIN",
            title: t(
              "locations.sub.update.title",
              "Update Location Subcategory"
            ),
            description: t(
              "locations.sub.update.description",
              "Modify the multilingual details for this location subcategory."
            ),
            children: (subcategory) => (
              <UpdateLocationSubCategoryForm
                subcategory={subcategory}
                category={
                  (data as GetLocationSubCategoriesResType)?.category.id
                }
              />
            ),
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
