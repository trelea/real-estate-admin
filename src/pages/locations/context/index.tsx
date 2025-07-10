import { User } from "@/features/auth/types";
import {
  useGetLocationCategoriesQuery,
  useGetLocationSubCategoriesQuery,
} from "@/features/locations/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import React from "react";
import { useParams } from "react-router";

export type LocationsContextUrlQueriesType = UrlQueriesType;

export type SetLocationsContextUrlQueriesType = (
  query:
    | LocationsContextUrlQueriesType
    | ((query: LocationsContextUrlQueriesType) => void)
) => void;

export interface LocationsContextProps
  extends ContextProps<
    {
      uriQueries: LocationsContextUrlQueriesType;
      setUriQueries: SetLocationsContextUrlQueriesType;
      status?: User;
      openDialogCreateLocationCategory: boolean;
      setOpenDialogCreateLocationCategory: React.Dispatch<
        React.SetStateAction<boolean>
      >;
      openDialogCreateLocationSubCategory: boolean;
      setOpenDialogCreateLocationSubCategory: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    {
      locations_categories: ReturnType<typeof useGetLocationCategoriesQuery>;
      locations_subcategories: ReturnType<
        typeof useGetLocationSubCategoriesQuery
      >;
    }
  > {}

export const LocationsContext = React.createContext<LocationsContextProps>(
  {} as LocationsContextProps
);

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const LocationsContextProvider: React.FC<Props> = ({
  children,
  className,
  status,
}) => {
  const { id } = useParams();

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
    openDialogCreateLocationCategory,
    setOpenDialogCreateLocationCategory,
  ] = React.useState<boolean>(false);
  const [
    openDialogCreateLocationSubCategory,
    setOpenDialogCreateLocationSubCategory,
  ] = React.useState<boolean>(false);

  const locations_categories = useGetLocationCategoriesQuery({
    page: uriQueries.page,
    search: uriQueries.search,
  });
  const locations_subcategories = useGetLocationSubCategoriesQuery(
    {
      id: parseInt(id as string),
      page: uriQueries.page,
      search: uriQueries.search,
    },
    { skip: !Boolean(id) }
  );

  return (
    <LocationsContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetLocationsContextUrlQueriesType,
          status,
          openDialogCreateLocationCategory,
          setOpenDialogCreateLocationCategory,
          openDialogCreateLocationSubCategory,
          setOpenDialogCreateLocationSubCategory,
        },
        data: { locations_categories, locations_subcategories },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </LocationsContext.Provider>
  );
};
