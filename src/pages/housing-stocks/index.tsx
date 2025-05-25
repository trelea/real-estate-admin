import { ManageData } from "@/components/manage-data-table/manage-data";
import { User } from "@/features/auth/types";
import React from "react";
import { HousingStocksContext, HousingStocksContextProps } from "./context";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import { type HousingStockType } from "@/features/housing-stocks/types";
import {
  CreateHousingStockForm,
  UpdateHousingStockForm,
} from "@/features/housing-stocks/forms";
import { useDeleteHousingStock } from "@/features/housing-stocks/hooks";

interface Props {
  status?: User;
}

export const HousingStocks: React.FC<Props> = ({ status }) => {
  const {
    data: {
      housingStocks: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateHousingStock,
      setOpenDialogCreateHousingStock,
    },
  } = React.useContext<HousingStocksContextProps>(HousingStocksContext);
  const [deleteHousingStock, deleteHousingStockLoading] =
    useDeleteHousingStock();

  return (
    <ManageData<HousingStockType>
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
        title: "Housing Types",
        badge: `${data?.meta.total} housing types`,
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
            label: "Create housing type",
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: "Create Housing Stock",
            description:
              "Enter the required information to add a new housing stock entry. After submission, the record will be saved and available in the system.",
            children: <CreateHousingStockForm />,
          },
          dialogState: {
            open: openDialogCreateHousingStock,
            onOpenChange: setOpenDialogCreateHousingStock,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as HousingStockType[],
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
            disabled: status?.role !== "ADMIN" || deleteHousingStockLoading,
            // @ts-ignore
            onDeleteAction: (id: number) => deleteHousingStock(Number(id)),
          },
          update: {
            disabled: status?.role !== "ADMIN",
            title: "Update Housing Stock",
            description:
              "Modify the details of an existing housing stock entry. You can update the name, description, and other relevant fields to reflect the most accurate and up-to-date information.",
            children: (housingStock) => (
              <UpdateHousingStockForm housingStock={housingStock} />
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
