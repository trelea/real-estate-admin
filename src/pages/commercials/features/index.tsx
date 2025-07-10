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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        title: t("commercialFeatures.manageTitle", "Commercial Features"),
        badge: t("commercialFeatures.badge", {
          count: data?.meta.total ?? 0,
          defaultValue: `${data?.meta.total} features`,
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
            label: t("commercialFeatures.create.trigger", "Create feature"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t(
              "commercialFeatures.create.title",
              "Create Commercial Feature"
            ),
            description: t(
              "commercialFeatures.create.description",
              "Fill in the commercial feature details in all supported languages. Once submitted, the feature will be added to the system and available for use in relevant modules."
            ),
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
          headers: [
            t("commercialFeatures.tableHeaders.id", "ID"),
            t("commercialFeatures.tableHeaders.ro", "Romanian"),
            t("commercialFeatures.tableHeaders.ru", "Russian"),
            t("commercialFeatures.tableHeaders.en", "English"),
          ],
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
            title: t(
              "commercialFeatures.update.title",
              "Update Commercial Feature"
            ),
            disabled: status?.role !== "ADMIN" || deleteLoading,
            description: t(
              "commercialFeatures.update.description",
              "Edit the details of an existing commercial feature. Update the multilingual names or other relevant fields to ensure the information remains accurate and current."
            ),
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
