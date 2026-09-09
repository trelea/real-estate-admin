import React from "react";
import { User } from "@/features/auth/types";
import { useGetGarageFeaturesQuery } from "@/features/garage-features/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export type GarageFeaturesUrlQueriesType = UrlQueriesType;
export type SetGarageFeaturesUrlQueriesType = (
  query:
    | GarageFeaturesUrlQueriesType
    | ((query: GarageFeaturesUrlQueriesType) => void)
) => void;

export interface GarageFeaturesContextProps
  extends ContextProps<
    {
      uriQueries: GarageFeaturesUrlQueriesType;
      setUriQueries: SetGarageFeaturesUrlQueriesType;
      status?: User;
      openDialogCreateGarageFeature: boolean;
      setOpenDialogCreateGarageFeature: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    {
      garageFeatures: ReturnType<typeof useGetGarageFeaturesQuery>;
    }
  > {}

export const GarageFeaturesContext =
  React.createContext<GarageFeaturesContextProps>(
    {} as GarageFeaturesContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const GarageFeaturesContextProvider: React.FC<Props> = ({
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

  const [openDialogCreateGarageFeature, setOpenDialogCreateGarageFeature] =
    React.useState<boolean>(false);

  const garageFeatures = useGetGarageFeaturesQuery({
    page: uriQueries.page,
    search: uriQueries.search,
  });

  return (
    <GarageFeaturesContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetGarageFeaturesUrlQueriesType,
          status,
          openDialogCreateGarageFeature,
          setOpenDialogCreateGarageFeature,
        },
        data: { garageFeatures },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </GarageFeaturesContext.Provider>
  );
};
