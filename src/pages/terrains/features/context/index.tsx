import React from "react";
import { User } from "@/features/auth/types";
import { useGetTerrainFeaturesQuery } from "@/features/terrain-features/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export type TerrainFeaturesUrlQueriesType = UrlQueriesType;
export type SetTerrainFeaturesUrlQueriesType = (
  query:
    | TerrainFeaturesUrlQueriesType
    | ((query: TerrainFeaturesUrlQueriesType) => void)
) => void;

export interface TerrainFeaturesContextProps
  extends ContextProps<
    {
      uriQueries: TerrainFeaturesUrlQueriesType;
      setUriQueries: SetTerrainFeaturesUrlQueriesType;
      status?: User;
      openDialogCreateTerrainFeature: boolean;
      setOpenDialogCreateTerrainFeature: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    {
      terrainFeatures: ReturnType<typeof useGetTerrainFeaturesQuery>;
    }
  > {}

export const TerrainFeaturesContext =
  React.createContext<TerrainFeaturesContextProps>(
    {} as TerrainFeaturesContextProps
  );

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const TerrainFeaturesContextProvider: React.FC<Props> = ({
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

  const [openDialogCreateTerrainFeature, setOpenDialogCreateTerrainFeature] =
    React.useState<boolean>(false);

  const terrainFeatures = useGetTerrainFeaturesQuery(
    { page: uriQueries.page, search: uriQueries.search },
    { refetchOnMountOrArgChange: false }
  );

  return (
    <TerrainFeaturesContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetTerrainFeaturesUrlQueriesType,
          status,
          openDialogCreateTerrainFeature,
          setOpenDialogCreateTerrainFeature,
        },
        data: { terrainFeatures },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </TerrainFeaturesContext.Provider>
  );
};
