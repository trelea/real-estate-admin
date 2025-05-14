import { User } from "@/features/auth/types";
import { useGetUsersQuery } from "@/features/users/api";
import { cn } from "@/lib/utils";
import { ContextProps } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import React from "react";

export type UsersContextUrlQueriesType = {
  page: number;
  search: string;
};

export type SetUsersContextUrlQueriesType = (
  query:
    | UsersContextUrlQueriesType
    | ((query: UsersContextUrlQueriesType) => void)
) => void;

export interface UsersContextProps
  extends ContextProps<
    {
      uriQueries: UsersContextUrlQueriesType;
      setUriQueries: SetUsersContextUrlQueriesType;
      status?: User;
      openDialogCreateUser: boolean;
      setOpenDialogCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
    },
    {
      users: ReturnType<typeof useGetUsersQuery>;
    }
  > {}

export const UsersContext = React.createContext<UsersContextProps>(
  {} as UsersContextProps
);

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const UsersContextLayout: React.FC<Props> = ({
  children,
  className,
  status,
}) => {
  /**
   * urlQueries
   */
  const [uriQueries, setUriQueries] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(""),
    },
    { history: "push" }
  );

  React.useEffect(() => {
    setUriQueries({ page: 1 });
  }, [uriQueries.search]);

  const [openDialogCreateUser, setOpenDialogCreateUser] =
    React.useState<boolean>(false);

  const users = useGetUsersQuery(
    { page: uriQueries.page, search: uriQueries.search },
    { refetchOnMountOrArgChange: false }
  );

  return (
    <UsersContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetUsersContextUrlQueriesType,
          status,
          openDialogCreateUser,
          setOpenDialogCreateUser,
        },
        data: { users },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </UsersContext.Provider>
  );
};
