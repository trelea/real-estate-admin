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
    <Card className="m-0 p-0 h-full gap-0 w-full">
      <CardHeader className="m-0 p-0 w-full h-fit">
        <div className="px-4 py-2 xl:p-6 grid grid-cols-2 lg:grid-cols-3 items-center border-b gap-2">
          <div className="flex items-center gap-2">
            <h1 className="font-medium text-base xl:text-lg">Manage</h1>
            <Badge className="font-semibold text-xs text-primary bg-primary/10 h-fit w-fit py-1 px-2 rounded-2xl flex justify-center items-center">
              {data?.meta.total} users
            </Badge>
          </div>

          <div className="flex justify-end lg:hidden">
            <CreateUserButton disabled={status?.role === "USER"} />
          </div>

          {/* debounced search */}
          <DebouncedSearch
            className="py-1 col-span-2 xl:py-2 lg:col-span-1 w-full"
            defaultValue={search}
            onChange={(data) =>
              setUriQueries(({ search, ..._ }) => ({ search: data, ..._ }))
            }
          />

          <div className="hidden lg:flex justify-end">
            <CreateUserButton disabled={status?.role === "USER"} />
          </div>
        </div>
      </CardHeader>

      {isLoading || isFetching ? (
        <UsersDataTableSkeleton />
      ) : (
        <CardContent className="h-full w-full">
          <UsersDataTable data={data?.data} />
        </CardContent>
      )}
      <CardFooter className="h-fit flex items-end w-full m-0 p-0">
        <div className="border-t w-full px-6 py-2">
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
        </div>
      </CardFooter>
    </Card>
  );
};
