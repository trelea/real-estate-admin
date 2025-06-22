import React from "react";
import { User } from "@/features/auth/types";
import {
  ApartmentFeaturesContext,
  ApartmentFeaturesContextProps,
} from "./context";
import { useDeleteApartmentFeature } from "@/features/apartment-features/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { ApartmentFeatureType } from "@/features/apartment-features/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  CreateApartmentFeatureForm,
  UpdateApartmentFeatureForm,
} from "@/features/apartment-features/forms";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const ApartmentFeatures: React.FC<Props> = ({ status }) => {
  const {
    data: {
      apartmentFeatures: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateApartmentFeature,
      setOpenDialogCreateApartmentFeature,
    },
  } = React.useContext<ApartmentFeaturesContextProps>(ApartmentFeaturesContext);
  const { t } = useTranslation();

  const [deleteApartmentFeature, deleteLoading] = useDeleteApartmentFeature();

  return (
    <ManageData<ApartmentFeatureType>
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
        title: t("apartmentFeatures.manageTitle", "Apartment Features"),
        badge: t("apartmentFeatures.badge", {
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
            label: t("apartmentFeatures.create.trigger", "Create feature"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t(
              "apartmentFeatures.create.title",
              "Create Apartment Feature"
            ),
            description: t(
              "apartmentFeatures.create.description",
              "Fill in the apartment feature details in all supported languages. Once submitted, the feature will be added to the system and available for use in relevant modules."
            ),
            children: <CreateApartmentFeatureForm />,
          },
          dialogState: {
            open: openDialogCreateApartmentFeature,
            onOpenChange: setOpenDialogCreateApartmentFeature,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as ApartmentFeatureType[],
          headers: [
            t("apartmentFeatures.tableHeaders.id", "ID"),
            t("apartmentFeatures.tableHeaders.ro", "Romanian"),
            t("apartmentFeatures.tableHeaders.ru", "Russian"),
            t("apartmentFeatures.tableHeaders.en", "English"),
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
            onDeleteAction: (id) => deleteApartmentFeature(Number(id)),
          },
          update: {
            disabled: status?.role !== "ADMIN",
            title: t(
              "apartmentFeatures.update.title",
              "Update Apartment Feature"
            ),
            description: t(
              "apartmentFeatures.update.description",
              "Edit the details of an existing apartment feature. Update the multilingual names or other relevant fields to ensure the information remains accurate and current."
            ),
            children: (feature) => (
              <UpdateApartmentFeatureForm apartmentFeature={feature} />
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
