import React from "react";
import {
  CommercialFeaturesContext,
  CommercialFeaturesContextProps,
} from "./context";
import { useDeleteCommercialFeature } from "@/features/commercial-features/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { CommercialFeatureType } from "@/features/commercial-features/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  CreateCommercialFeatureForm,
  UpdateCommercialFeatureForm,
} from "@/features/commercial-features/forms";
import { User } from "@/features/auth/types";

interface Props {
  status?: User;
}

export const CommercialFeatures: React.FC<Props> = ({ status }) => {
  const {
    data: {
      commercialFeatures: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateCommercialFeature,
      setOpenDialogCreateCommercialFeature,
    },
  } = React.useContext<CommercialFeaturesContextProps>(
    CommercialFeaturesContext
  );

  const [deleteCommercialFeature, deleteLoading] = useDeleteCommercialFeature();

  return (
    <ManageData<CommercialFeatureType>
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
        title: "Commercial Features",
        badge: `${data?.meta.total ?? 0} features`,
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
            title: "Create Commercial Feature",
            description:
              "Fill in the commercial feature details in all supported languages. Once submitted, the feature will be added to the system and available for use in relevant modules.",
            children: <CreateCommercialFeatureForm />,
          },
          dialogState: {
            open: openDialogCreateCommercialFeature,
            onOpenChange: setOpenDialogCreateCommercialFeature,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as CommercialFeatureType[],
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
            onDeleteAction: (id) => deleteCommercialFeature(Number(id)),
          },
          update: {
            title: "Update Commercial Feature",
            disabled: status?.role !== "ADMIN" || deleteLoading,
            description:
              "Edit the details of an existing commercial feature. Update the multilingual names or other relevant fields to ensure the information remains accurate and current.",
            children: (feature) => (
              <UpdateCommercialFeatureForm commercialFeature={feature} />
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
