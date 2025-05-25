import React from "react";
import { User } from "@/features/auth/types";
import { useGetApartmentFeaturesQuery } from "@/features/apartment-features/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export type ApartmentFeaturesUrlQueriesType = UrlQueriesType;
export type SetApartmentFeaturesUrlQueriesType = (
  query:
    | ApartmentFeaturesUrlQueriesType
    | ((query: ApartmentFeaturesUrlQueriesType) => void)
) => void;

export interface ApartmentFeaturesContextProps
  extends ContextProps<
    {
      uriQueries: ApartmentFeaturesUrlQueriesType;
      setUriQueries: SetApartmentFeaturesUrlQueriesType;
      status?: User;
      openDialogCreateApartmentFeature: boolean;
      setOpenDialogCreateApartmentFeature: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    { apartmentFeatures: ReturnType<typeof useGetApartmentFeaturesQuery> }
  > {}

export const ApartmentFeaturesContext =
  React.createContext<ApartmentFeaturesContextProps>(
    {} as ApartmentFeaturesContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const ApartmentFeaturesContextProvider: React.FC<Props> = ({
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
    openDialogCreateApartmentFeature,
    setOpenDialogCreateApartmentFeature,
  ] = React.useState<boolean>(false);

  const apartmentFeatures = useGetApartmentFeaturesQuery(
    { page: uriQueries.page, search: uriQueries.search },
    { refetchOnMountOrArgChange: false }
  );

  return (
    <ApartmentFeaturesContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetApartmentFeaturesUrlQueriesType,
          status,
          openDialogCreateApartmentFeature,
          setOpenDialogCreateApartmentFeature,
        },
        data: { apartmentFeatures },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </ApartmentFeaturesContext.Provider>
  );
};
