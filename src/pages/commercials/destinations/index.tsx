import React from "react";
import { User } from "@/features/auth/types";
import {
  CommercialDestinationsContext,
  CommercialDestinationsContextProps,
} from "./context";
import { useDeleteCommercialDestination } from "@/features/commercial-destinations/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { CommercialDestinationType } from "@/features/commercial-destinations/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  CreateCommercialDestinationForm,
  UpdateCommercialDestinationForm,
} from "@/features/commercial-destinations/forms";

interface Props {
  status?: User;
}

export const CommercialDestinations: React.FC<Props> = ({ status }) => {
  const {
    data: {
      commercialDestinations: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateCommercialDestination,
      setOpenDialogCreateCommercialDestination,
    },
  } = React.useContext<CommercialDestinationsContextProps>(
    CommercialDestinationsContext
  );

  const [deleteCommercialDestination, deleteLoading] =
    useDeleteCommercialDestination();

  return (
    <ManageData<CommercialDestinationType>
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
        title: "Commercial Destinations",
        badge: `${data?.meta.total} destinations`,
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
            label: "Create destination",
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: "Create Commercial Destination",
            description:
              "Fill in the commercial destination details in all supported languages. Once submitted, the destination will be added to the system and available for use in relevant modules.",
            children: <CreateCommercialDestinationForm />,
          },
          dialogState: {
            open: openDialogCreateCommercialDestination,
            onOpenChange: setOpenDialogCreateCommercialDestination,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as CommercialDestinationType[],
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
            onDeleteAction: (id) => deleteCommercialDestination(Number(id)),
          },
          update: {
            disabled: status?.role !== "ADMIN",
            title: "Update Commercial Destination",
            description:
              "Edit the details of an existing commercial destination. Update the multilingual names or other relevant fields to ensure the information remains accurate and current.",
            children: (destination) => (
              <UpdateCommercialDestinationForm
                commercialDestination={destination}
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
