import { User } from "@/features/auth/types";
import { useGetHousingStocksQuery } from "@/features/housing-stocks/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import React from "react";

export type HousingStocksUrlQueriesType = UrlQueriesType;
export type SetHousingStocksUrlQueriesType = (
  query:
    | HousingStocksUrlQueriesType
    | ((query: HousingStocksUrlQueriesType) => void)
) => void;

export interface HousingStocksContextProps
  extends ContextProps<
    {
      uriQueries: HousingStocksUrlQueriesType;
      setUriQueries: SetHousingStocksUrlQueriesType;
      status?: User;
      openDialogCreateHousingStock: boolean;
      setOpenDialogCreateHousingStock: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    { housingStocks: ReturnType<typeof useGetHousingStocksQuery> }
  > {}

export const HousingStocksContext =
  React.createContext<HousingStocksContextProps>(
    {} as HousingStocksContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const HousingStocksContextProvider: React.FC<Props> = ({
  children,
  className,
  status,
}) => {
  const [uriQueries, setUriQueries] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(""),
    },
    { history: "push" }
  );

  React.useEffect(() => {
    if (uriQueries.page !== 1) setUriQueries({ page: 1 });
  }, [uriQueries.search]);

  const [openDialogCreateHousingStock, setOpenDialogCreateHousingStock] =
    React.useState<boolean>(false);

  const housingStocks = useGetHousingStocksQuery({
    page: uriQueries.page,
    search: uriQueries.search,
  });

  return (
    <HousingStocksContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetHousingStocksUrlQueriesType,
          status,
          openDialogCreateHousingStock,
          setOpenDialogCreateHousingStock,
        },
        data: { housingStocks },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </HousingStocksContext.Provider>
  );
};
