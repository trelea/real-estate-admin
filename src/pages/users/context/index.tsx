import { User } from "@/features/auth/types";
import { useGetUsersQuery } from "@/features/users/api";
import { cn } from "@/lib/utils";
import { ContextProps } from "@/types";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";

export interface UsersContextProps
  extends ContextProps<
    {
      page: number;
      setPage: (
        value: number | ((old: number) => number | null) | null
      ) => Promise<URLSearchParams>;
      status?: User;
      openDialogCreateUser: boolean;
      setOpenDialogCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
      openDialogUpdateUser: boolean;
      setOpenDialogUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [openDialogCreateUser, setOpenDialogCreateUser] =
    React.useState<boolean>(false);
  const [openDialogUpdateUser, setOpenDialogUpdateUser] =
    React.useState<boolean>(false);
  const users = useGetUsersQuery(
    { page },
    { refetchOnMountOrArgChange: false }
  );

  return (
    <UsersContext.Provider
      value={{
        meta: {
          page,
          setPage,
          status,
          openDialogCreateUser,
          setOpenDialogCreateUser,
          openDialogUpdateUser,
          setOpenDialogUpdateUser,
        },
        data: { users },
      }}
    >
      <section
        className={cn("w-full h-full px-4 pb-4 flex flex-col gap-4", className)}
      >
        {children}
      </section>
    </UsersContext.Provider>
  );
};
