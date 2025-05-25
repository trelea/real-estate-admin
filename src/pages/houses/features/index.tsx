import React from "react";
import { User } from "@/features/auth/types";
import { HouseFeaturesContext, HouseFeaturesContextProps } from "./context";
import { useDeleteHouseFeature } from "@/features/house-features/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { HouseFeatureType } from "@/features/house-features/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  CreateHouseFeatureForm,
  UpdateHouseFeatureForm,
} from "@/features/house-features/forms";

interface Props {
  status?: User;
}

export const HouseFeatures: React.FC<Props> = ({ status }) => {
  const {
    data: {
      houseFeatures: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateHouseFeature,
      setOpenDialogCreateHouseFeature,
    },
  } = React.useContext<HouseFeaturesContextProps>(HouseFeaturesContext);

  const [deleteHouseFeature, deleteLoading] = useDeleteHouseFeature();

  return (
    <ManageData<HouseFeatureType>
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
        title: "House Features",
        badge: `${data?.meta.total} features`,
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
            label: "Create feature",
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: "Create House Feature",
            description:
              "Fill in the house feature details in all supported languages. Once submitted, the feature will be added to the system and available for use in relevant modules.",
            children: <CreateHouseFeatureForm />,
          },
          dialogState: {
            open: openDialogCreateHouseFeature,
            onOpenChange: setOpenDialogCreateHouseFeature,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as HouseFeatureType[],
          headers: ["ID", "Romanian", "Russian", "English"],
          rows: ({ ro, ru, en, id }) => [
            <div className="py-2 sm:py-4">
              <span className="font-bold text-sm">{id}</span>
            </div>,
            <span className="font-medium text-sm">{ro}</span>,
            <span className="font-medium text-sm">{ru}</span>,
            <span className="font-medium text-sm">{en}</span>,
          ],
          delete: {
            disabled: status?.role !== "ADMIN" || deleteLoading,
            onDeleteAction: (id) => deleteHouseFeature(Number(id)),
          },
          update: {
            disabled: status?.role !== "ADMIN",
            title: "Update House Feature",
            description:
              "Edit the details of an existing house feature. Update the multilingual names or other relevant fields to ensure the information remains accurate and current.",
            children: (feature) => (
              <UpdateHouseFeatureForm houseFeature={feature} />
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
