import React from "react";
import {
  TerrainUsabilitiesContext,
  TerrainUsabilitiesContextProps,
} from "./context";
import { useDeleteTerrainUsability } from "@/features/terrain-usabilities/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { TerrainUsabilityType } from "@/features/terrain-usabilities/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  UpdateTerrainUsabilityForm,
  CreateTerrainUsabilityForm,
} from "@/features/terrain-usabilities/forms";
import { User } from "@/features/auth/types";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const TerrainUsabilities: React.FC<Props> = ({ status }) => {
  const {
    data: {
      terrainUsabilities: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateTerrainUsability,
      setOpenDialogCreateTerrainUsability,
    },
  } = React.useContext<TerrainUsabilitiesContextProps>(
    TerrainUsabilitiesContext
  );

  const [deleteTerrainUsability, deleteLoading] = useDeleteTerrainUsability();
  const { t } = useTranslation();

  return (
    <ManageData<TerrainUsabilityType>
      loading={{
        state: isLoading || isFetching,
        component: <TableSkeleton />,
      }}
      header={{
        title: t("terrainUsabilities.manageTitle", "Terrain Usabilities"),
        badge: t("terrainUsabilities.badge", {
          count: data?.meta.total ?? 0,
          defaultValue: `${data?.meta.total} usabilities`,
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
            label: t("terrainUsabilities.create.trigger", "Create usability"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t(
              "terrainUsabilities.create.title",
              "Create Terrain Usability"
            ),
            description: t(
              "terrainUsabilities.create.description",
              "Fill in the terrain usability details in all supported languages. Once submitted, the usability will be added to the system and available for use in relevant modules."
            ),
            children: <CreateTerrainUsabilityForm />,
          },
          dialogState: {
            open: openDialogCreateTerrainUsability,
            onOpenChange: setOpenDialogCreateTerrainUsability,
          },
        },
      }}
      content={{
        table: {
          data: data?.data as TerrainUsabilityType[],
          headers: [
            t("terrainUsabilities.tableHeaders.id", "ID"),
            t("terrainUsabilities.tableHeaders.ro", "Romanian"),
            t("terrainUsabilities.tableHeaders.ru", "Russian"),
            t("terrainUsabilities.tableHeaders.en", "English"),
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
            onDeleteAction: (id) => deleteTerrainUsability(Number(id)),
          },
          update: {
            title: t(
              "terrainUsabilities.update.title",
              "Update Terrain Usability"
            ),
            disabled: status?.role !== "ADMIN" || deleteLoading,
            description: t(
              "terrainUsabilities.update.description",
              "Edit the details of an existing terrain usability. Update the multilingual names or other relevant fields to ensure the information remains accurate and current."
            ),
            children: (usability) => (
              <UpdateTerrainUsabilityForm terrainUsability={usability} />
            ),
          },
        },
      }}
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
