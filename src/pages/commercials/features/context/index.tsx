import React from "react";
import { User } from "@/features/auth/types";
import { useGetCommercialFeaturesQuery } from "@/features/commercial-features/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export type CommercialFeaturesUrlQueriesType = UrlQueriesType;
export type SetCommercialFeaturesUrlQueriesType = (
  query:
    | CommercialFeaturesUrlQueriesType
    | ((query: CommercialFeaturesUrlQueriesType) => void)
) => void;

export interface CommercialFeaturesContextProps
  extends ContextProps<
    {
      uriQueries: CommercialFeaturesUrlQueriesType;
      setUriQueries: SetCommercialFeaturesUrlQueriesType;
      status?: User;
      openDialogCreateCommercialFeature: boolean;
      setOpenDialogCreateCommercialFeature: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    {
      commercialFeatures: ReturnType<typeof useGetCommercialFeaturesQuery>;
    }
  > {}

export const CommercialFeaturesContext =
  React.createContext<CommercialFeaturesContextProps>(
    {} as CommercialFeaturesContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const CommercialFeaturesContextProvider: React.FC<Props> = ({
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
    openDialogCreateCommercialFeature,
    setOpenDialogCreateCommercialFeature,
  ] = React.useState<boolean>(false);

  const commercialFeatures = useGetCommercialFeaturesQuery({
    page: uriQueries.page,
    search: uriQueries.search,
  });

  return (
    <CommercialFeaturesContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetCommercialFeaturesUrlQueriesType,
          status,
          openDialogCreateCommercialFeature,
          setOpenDialogCreateCommercialFeature,
        },
        data: { commercialFeatures },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </CommercialFeaturesContext.Provider>
  );
};
