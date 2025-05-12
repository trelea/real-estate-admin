import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { User } from "@/features/auth/types";
import { useGetUsersQuery } from "@/features/users/api";
import {
  CreateUserButton,
  UsersDataTable,
  UsersDataTableSkeleton,
} from "@/features/users/components";
import { useQueryState, parseAsInteger } from "nuqs";
import React from "react";

interface Props {
  status: User;
}

export const Users: React.FC<Props> = ({ status }) => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data, isLoading, isFetching } = useGetUsersQuery({ page });

  return (
    <section className="w-full h-full px-4 pb-4 flex flex-col gap-4">
      {isLoading || isFetching ? (
        <UsersDataTableSkeleton />
      ) : (
        <Card className="m-0 p-0 h-full gap-0">
          <CardHeader className="m-0 p-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="font-medium text-lg">Manage</h1>
              <Badge className="font-semibold text-xs text-primary bg-primary/10 h-fit w-fit py-1 px-2 rounded-2xl flex justify-center items-center">
                {data?.meta.total} users
              </Badge>
            </div>
            <div>
              <CreateUserButton disabled={status.role === "USER"} />
            </div>
          </CardHeader>

          <CardContent>
            <UsersDataTable data={data?.data} />
          </CardContent>

          <CardFooter className="flex items-end w-full h-full">
            PAGINATION
          </CardFooter>
        </Card>
      )}
    </section>
  );
};
