import React from "react";
import { User } from "@/features/auth/types";
import { useGetTerrainUsabilitiesQuery } from "@/features/terrain-usabilities/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export type TerrainUsabilitiesUrlQueriesType = UrlQueriesType;
export type SetTerrainUsabilitiesUrlQueriesType = (
  query:
    | TerrainUsabilitiesUrlQueriesType
    | ((query: TerrainUsabilitiesUrlQueriesType) => void)
) => void;

export interface TerrainUsabilitiesContextProps
  extends ContextProps<
    {
      uriQueries: TerrainUsabilitiesUrlQueriesType;
      setUriQueries: SetTerrainUsabilitiesUrlQueriesType;
      status?: User;
      openDialogCreateTerrainUsability: boolean;
      setOpenDialogCreateTerrainUsability: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    {
      terrainUsabilities: ReturnType<typeof useGetTerrainUsabilitiesQuery>;
    }
  > {}

export const TerrainUsabilitiesContext =
  React.createContext<TerrainUsabilitiesContextProps>(
    {} as TerrainUsabilitiesContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const TerrainUsabilitiesContextProvider: React.FC<Props> = ({
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
    openDialogCreateTerrainUsability,
    setOpenDialogCreateTerrainUsability,
  ] = React.useState<boolean>(false);

  const terrainUsabilities = useGetTerrainUsabilitiesQuery(
    { page: uriQueries.page, search: uriQueries.search },
    { refetchOnMountOrArgChange: false }
  );

  return (
    <TerrainUsabilitiesContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetTerrainUsabilitiesUrlQueriesType,
          status,
          openDialogCreateTerrainUsability,
          setOpenDialogCreateTerrainUsability,
        },
        data: { terrainUsabilities },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </TerrainUsabilitiesContext.Provider>
  );
};
