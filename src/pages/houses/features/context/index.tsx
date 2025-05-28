import React from "react";
import { User } from "@/features/auth/types";
import { useGetHouseFeaturesQuery } from "@/features/house-features/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export type HouseFeaturesUrlQueriesType = UrlQueriesType;
export type SetHouseFeaturesUrlQueriesType = (
  query:
    | HouseFeaturesUrlQueriesType
    | ((query: HouseFeaturesUrlQueriesType) => void)
) => void;

export interface HouseFeaturesContextProps
  extends ContextProps<
    {
      uriQueries: HouseFeaturesUrlQueriesType;
      setUriQueries: SetHouseFeaturesUrlQueriesType;
      status?: User;
      openDialogCreateHouseFeature: boolean;
      setOpenDialogCreateHouseFeature: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    { houseFeatures: ReturnType<typeof useGetHouseFeaturesQuery> }
  > {}

export const HouseFeaturesContext =
  React.createContext<HouseFeaturesContextProps>(
    {} as HouseFeaturesContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const HouseFeaturesContextProvider: React.FC<Props> = ({
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

  const [openDialogCreateHouseFeature, setOpenDialogCreateHouseFeature] =
    React.useState<boolean>(false);

  const houseFeatures = useGetHouseFeaturesQuery({
    page: uriQueries.page,
    search: uriQueries.search,
  });

  return (
    <HouseFeaturesContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetHouseFeaturesUrlQueriesType,
          status,
          openDialogCreateHouseFeature,
          setOpenDialogCreateHouseFeature,
        },
        data: { houseFeatures },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </HouseFeaturesContext.Provider>
  );
};
