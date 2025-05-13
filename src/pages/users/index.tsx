import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { User } from "@/features/auth/types";
import {
  CreateUserButton,
  UsersDataTable,
  UsersDataTableSkeleton,
} from "@/features/users/components";
import React from "react";
import { UsersContext, UsersContextProps } from "./context";
import { TablePagination } from "@/components/pagination/table-pagination";

interface Props {
  status?: User;
}

export const Users: React.FC<Props> = ({ status }) => {
  const {
    data: {
      users: { data, isLoading, isFetching },
    },
    meta: { setPage },
  } = React.useContext<UsersContextProps>(UsersContext);

  return (
    <Card className="m-0 p-0 h-full gap-0">
      <CardHeader className="m-0 p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-lg">Manage</h1>
          <Badge className="font-semibold text-xs text-primary bg-primary/10 h-fit w-fit py-1 px-2 rounded-2xl flex justify-center items-center">
            {data?.meta.total} users
          </Badge>
        </div>
        <div>
          <CreateUserButton disabled={status?.role === "USER"} />
        </div>
      </CardHeader>

      {isLoading || isFetching ? (
        <UsersDataTableSkeleton />
      ) : (
        <React.Fragment>
          <CardContent>
            <UsersDataTable data={data?.data} />
          </CardContent>

          <CardFooter className="h-full flex items-end pb-2">
            <TablePagination
              meta={data?.meta}
              access={(p) => setPage(p)}
              prev={() => setPage((p) => p - 1)}
              next={() => setPage((p) => p + 1)}
            />
          </CardFooter>
        </React.Fragment>
      )}
    </Card>
  );
};
