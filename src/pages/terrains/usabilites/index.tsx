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

  return (
    <ManageData<TerrainUsabilityType>
      loading={{
        state: isLoading || isFetching,
        component: <TableSkeleton />,
      }}
      header={{
        title: "Terrain Usabilities",
        badge: `${data?.meta.total ?? 0} usabilities`,
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
            label: "Create usability",
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: "Create Terrain Usability",
            description:
              "Fill in the terrain usability details in all supported languages. Once submitted, the usability will be added to the system and available for use in relevant modules.",
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
            onDeleteAction: (id) => deleteTerrainUsability(Number(id)),
          },
          update: {
            title: "Update Terrain Usability",
            disabled: status?.role !== "ADMIN" || deleteLoading,
            description:
              "Edit the details of an existing terrain usability. Update the multilingual names or other relevant fields to ensure the information remains accurate and current.",
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
