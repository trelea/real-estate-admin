import React from "react";
import { User } from "@/features/auth/types";
import { useGetCommercialPlacingsQuery } from "@/features/commercial-placings/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export type CommercialPlacingsUrlQueriesType = UrlQueriesType;
export type SetCommercialPlacingsUrlQueriesType = (
  query:
    | CommercialPlacingsUrlQueriesType
    | ((query: CommercialPlacingsUrlQueriesType) => void)
) => void;

export interface CommercialPlacingsContextProps
  extends ContextProps<
    {
      uriQueries: CommercialPlacingsUrlQueriesType;
      setUriQueries: SetCommercialPlacingsUrlQueriesType;
      status?: User;
      openDialogCreateCommercialPlacing: boolean;
      setOpenDialogCreateCommercialPlacing: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    {
      commercialPlacings: ReturnType<typeof useGetCommercialPlacingsQuery>;
    }
  > {}

export const CommercialPlacingsContext =
  React.createContext<CommercialPlacingsContextProps>(
    {} as CommercialPlacingsContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const CommercialPlacingsContextProvider: React.FC<Props> = ({
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

  const [
    openDialogCreateCommercialPlacing,
    setOpenDialogCreateCommercialPlacing,
  ] = React.useState<boolean>(false);

  const commercialPlacings = useGetCommercialPlacingsQuery(
    { page: uriQueries.page, search: uriQueries.search },
    { refetchOnMountOrArgChange: false }
  );

  return (
    <CommercialPlacingsContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetCommercialPlacingsUrlQueriesType,
          status,
          openDialogCreateCommercialPlacing,
          setOpenDialogCreateCommercialPlacing,
        },
        data: { commercialPlacings },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </CommercialPlacingsContext.Provider>
  );
};
