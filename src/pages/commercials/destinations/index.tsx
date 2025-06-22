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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        title: t(
          "commercialDestinations.manageTitle",
          "Commercial Destinations"
        ),
        badge: t("commercialDestinations.badge", {
          count: data?.meta.total ?? 0,
          defaultValue: `${data?.meta.total} destinations`,
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
            label: t(
              "commercialDestinations.create.trigger",
              "Create destination"
            ),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t(
              "commercialDestinations.create.title",
              "Create Commercial Destination"
            ),
            description: t(
              "commercialDestinations.create.description",
              "Fill in the commercial destination details in all supported languages. Once submitted, the destination will be added to the system and available for use in relevant modules."
            ),
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
          headers: [
            t("commercialDestinations.tableHeaders.id", "ID"),
            t("commercialDestinations.tableHeaders.ro", "Romanian"),
            t("commercialDestinations.tableHeaders.ru", "Russian"),
            t("commercialDestinations.tableHeaders.en", "English"),
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
            onDeleteAction: (id) => deleteCommercialDestination(Number(id)),
          },
          update: {
            disabled: status?.role !== "ADMIN",
            title: t(
              "commercialDestinations.update.title",
              "Update Commercial Destination"
            ),
            description: t(
              "commercialDestinations.update.description",
              "Edit the details of an existing commercial destination. Update the multilingual names or other relevant fields to ensure the information remains accurate and current."
            ),
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
