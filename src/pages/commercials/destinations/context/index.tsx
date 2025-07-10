import React from "react";
import { User } from "@/features/auth/types";
import { useGetCommercialDestinationsQuery } from "@/features/commercial-destinations/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export type CommercialDestinationsUrlQueriesType = UrlQueriesType;
export type SetCommercialDestinationsUrlQueriesType = (
  query:
    | CommercialDestinationsUrlQueriesType
    | ((query: CommercialDestinationsUrlQueriesType) => void)
) => void;

export interface CommercialDestinationsContextProps
  extends ContextProps<
    {
      uriQueries: CommercialDestinationsUrlQueriesType;
      setUriQueries: SetCommercialDestinationsUrlQueriesType;
      status?: User;
      openDialogCreateCommercialDestination: boolean;
      setOpenDialogCreateCommercialDestination: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    {
      commercialDestinations: ReturnType<
        typeof useGetCommercialDestinationsQuery
      >;
    }
  > {}

export const CommercialDestinationsContext =
  React.createContext<CommercialDestinationsContextProps>(
    {} as CommercialDestinationsContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const CommercialDestinationsContextProvider: React.FC<Props> = ({
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
    openDialogCreateCommercialDestination,
    setOpenDialogCreateCommercialDestination,
  ] = React.useState<boolean>(false);

  const commercialDestinations = useGetCommercialDestinationsQuery({
    page: uriQueries.page,
    search: uriQueries.search,
  });

  return (
    <CommercialDestinationsContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries:
            setUriQueries as SetCommercialDestinationsUrlQueriesType,
          status,
          openDialogCreateCommercialDestination,
          setOpenDialogCreateCommercialDestination,
        },
        data: { commercialDestinations },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </CommercialDestinationsContext.Provider>
  );
};
