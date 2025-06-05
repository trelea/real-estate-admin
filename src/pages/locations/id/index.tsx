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
        badge: `${data?.meta.total} subcategories`,
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
            label: "Create Subcategory",
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: "Create Location Subcategory",
            description:
              "Fill in the location subcategory details in all supported languages. Once submitted, the subcategory will be added under the selected location category and available for use in relevant modules.",
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
          headers: ["ID", "Romanian", "Russian", "English"],
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
            title: "Update Location Subcategory",
            description:
              "Modify the multilingual details for this location subcategory.",
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
