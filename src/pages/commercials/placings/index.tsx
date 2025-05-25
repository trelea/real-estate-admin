import React from "react";
import {
  CommercialPlacingsContext,
  CommercialPlacingsContextProps,
} from "./context";
import { useDeleteCommercialPlacing } from "@/features/commercial-placings/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { CommercialPlacingType } from "@/features/commercial-placings/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  CreateCommercialPlacingForm,
  UpdateCommercialPlacingForm,
} from "@/features/commercial-placings/forms";
import { User } from "@/features/auth/types";

interface Props {
  status?: User;
}

export const CommercialPlacings: React.FC<Props> = ({ status }) => {
  const {
    data: {
      commercialPlacings: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateCommercialPlacing,
      setOpenDialogCreateCommercialPlacing,
    },
  } = React.useContext<CommercialPlacingsContextProps>(
    CommercialPlacingsContext
  );

  const [deleteCommercialPlacing, deleteLoading] = useDeleteCommercialPlacing();

  return (
    <ManageData<CommercialPlacingType>
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
        title: "Commercial Placings",
        badge: `${data?.meta.total ?? 0} placings`,
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
            label: "Create placing",
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: "Create Commercial Placing",
            description:
              "Fill in the commercial placing details in all supported languages. Once submitted, the placing will be added to the system and available for use in relevant modules.",
            children: <CreateCommercialPlacingForm />,
          },
          dialogState: {
            open: openDialogCreateCommercialPlacing,
            onOpenChange: setOpenDialogCreateCommercialPlacing,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as CommercialPlacingType[],
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
            onDeleteAction: (id) => deleteCommercialPlacing(Number(id)),
          },
          update: {
            title: "Update Commercial Placing",
            disabled: status?.role !== "ADMIN" || deleteLoading,
            description:
              "Edit the details of an existing commercial placing. Update the multilingual names or other relevant fields to ensure the information remains accurate and current.",
            children: (placing) => (
              <UpdateCommercialPlacingForm commercialPlacing={placing} />
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
