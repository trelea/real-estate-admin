import React from "react";
import { TerrainFeaturesContext, TerrainFeaturesContextProps } from "./context";
import { useDeleteTerrainFeature } from "@/features/terrain-features/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { TerrainFeatureType } from "@/features/terrain-features/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  UpdateTerrainFeatureForm,
  CreateTerrainFeatureForm,
} from "@/features/terrain-features/forms";
import { User } from "@/features/auth/types";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const TerrainFeatures: React.FC<Props> = ({ status }) => {
  const {
    data: {
      terrainFeatures: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateTerrainFeature,
      setOpenDialogCreateTerrainFeature,
    },
  } = React.useContext<TerrainFeaturesContextProps>(TerrainFeaturesContext);

  const [deleteTerrainFeature, deleteLoading] = useDeleteTerrainFeature();
  const { t } = useTranslation();

  return (
    <ManageData<TerrainFeatureType>
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
        title: t("terrainFeatures.manageTitle", "Terrain Features"),
        badge: t("terrainFeatures.badge", {
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
            label: t("terrainFeatures.create.trigger", "Create feature"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t("terrainFeatures.create.title", "Create Terrain Feature"),
            description: t(
              "terrainFeatures.create.description",
              "Fill in the terrain feature details in all supported languages. Once submitted, the feature will be added to the system and available for use in relevant modules."
            ),
            children: <CreateTerrainFeatureForm />,
          },
          dialogState: {
            open: openDialogCreateTerrainFeature,
            onOpenChange: setOpenDialogCreateTerrainFeature,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as TerrainFeatureType[],
          headers: [
            t("terrainFeatures.tableHeaders.id", "ID"),
            t("terrainFeatures.tableHeaders.ro", "Romanian"),
            t("terrainFeatures.tableHeaders.ru", "Russian"),
            t("terrainFeatures.tableHeaders.en", "English"),
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
            onDeleteAction: (id) => deleteTerrainFeature(Number(id)),
          },
          update: {
            title: t("terrainFeatures.update.title", "Update Terrain Feature"),
            disabled: status?.role !== "ADMIN" || deleteLoading,
            description: t(
              "terrainFeatures.update.description",
              "Edit the details of an existing terrain feature. Update the multilingual names or other relevant fields to ensure the information remains accurate and current."
            ),
            children: (feature) => (
              <UpdateTerrainFeatureForm terrainFeature={feature} />
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
