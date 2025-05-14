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
import { DebouncedSearch } from "@/components/debounced-search/debounced-search";

interface Props {
  status?: User;
}

export const Users: React.FC<Props> = ({ status }) => {
  const {
    data: {
      users: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
    },
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
        {/* debounced search */}
        <DebouncedSearch
          defaultValue={search}
          onChange={(data) =>
            setUriQueries(({ search, ..._ }) => ({ search: data, ..._ }))
          }
        />
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
              access={(p) =>
                setUriQueries(({ page, ..._ }) => ({ page: p, ..._ }))
              }
              prev={() =>
                setUriQueries(({ page, ..._ }) => ({ page: page - 1, ..._ }))
              }
              next={() =>
                setUriQueries(({ page, ..._ }) => ({ page: page + 1, ..._ }))
              }
            />
          </CardFooter>
        </React.Fragment>
      )}
    </Card>
  );
};
