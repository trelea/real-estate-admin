import React from "react";
import { GarageFeaturesContext, GarageFeaturesContextProps } from "./context";
import { useDeleteGarageFeature } from "@/features/garage-features/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { GarageFeatureType } from "@/features/garage-features/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  UpdateGarageFeatureForm,
  CreateGarageFeatureForm,
} from "@/features/garage-features/forms";
import { User } from "@/features/auth/types";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const GarageFeatures: React.FC<Props> = ({ status }) => {
  const {
    data: {
      garageFeatures: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateGarageFeature,
      setOpenDialogCreateGarageFeature,
    },
  } = React.useContext<GarageFeaturesContextProps>(GarageFeaturesContext);

  const [deleteGarageFeature, deleteLoading] = useDeleteGarageFeature();
  const { t } = useTranslation();

  return (
    <ManageData<GarageFeatureType>
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
        title: t("garageFeatures.manageTitle", "Garage Features"),
        badge: t("garageFeatures.badge", {
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
            label: t("garageFeatures.create.trigger", "Create feature"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t("garageFeatures.create.title", "Create Garage Feature"),
            description: t(
              "garageFeatures.create.description",
              "Fill in the garage feature details in all supported languages. Once submitted, the feature will be added to the system and available for use in relevant modules."
            ),
            children: <CreateGarageFeatureForm />,
          },
          dialogState: {
            open: openDialogCreateGarageFeature,
            onOpenChange: setOpenDialogCreateGarageFeature,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as GarageFeatureType[],
          headers: [
            t("garageFeatures.tableHeaders.id", "ID"),
            t("garageFeatures.tableHeaders.ro", "Romanian"),
            t("garageFeatures.tableHeaders.ru", "Russian"),
            t("garageFeatures.tableHeaders.en", "English"),
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
            onDeleteAction: (id) => deleteGarageFeature(Number(id)),
          },
          update: {
            title: t("garageFeatures.update.title", "Update Garage Feature"),
            disabled: status?.role !== "ADMIN" || deleteLoading,
            description: t(
              "garageFeatures.update.description",
              "Edit the details of an existing garage feature. Update the multilingual names or other relevant fields to ensure the information remains accurate and current."
            ),
            children: (feature) => (
              <UpdateGarageFeatureForm garageFeature={feature} />
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
