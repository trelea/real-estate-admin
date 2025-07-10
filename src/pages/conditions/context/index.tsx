import { User } from "@/features/auth/types";
import { useGetConditionsQuery } from "@/features/conditions/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import React from "react";

export type ConditionsUrlQueriesType = UrlQueriesType;
export type SetConditionsUrlQueriesType = (
  query: ConditionsUrlQueriesType | ((query: ConditionsUrlQueriesType) => void)
) => void;

export interface ConditionsContextProps
  extends ContextProps<
    {
      uriQueries: ConditionsUrlQueriesType;
      setUriQueries: SetConditionsUrlQueriesType;
      status?: User;
      openDialogCreateCondition: boolean;
      setOpenDialogCreateCondition: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    },
    { conditions: ReturnType<typeof useGetConditionsQuery> }
  > {}

export const ConditionsContext = React.createContext<ConditionsContextProps>(
  {} as ConditionsContextProps
);

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const ConditionsContextProvider: React.FC<Props> = ({
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

  const [openDialogCreateCondition, setOpenDialogCreateCondition] =
    React.useState<boolean>(false);

  const conditions = useGetConditionsQuery({
    page: uriQueries.page,
    search: uriQueries.search,
  });

  return (
    <ConditionsContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetConditionsUrlQueriesType,
          status,
          openDialogCreateCondition,
          setOpenDialogCreateCondition,
        },
        data: { conditions },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </ConditionsContext.Provider>
  );
};
