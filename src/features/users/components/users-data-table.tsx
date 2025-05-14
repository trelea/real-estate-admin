import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/features/auth/types";
import React from "react";
import { UpdateUserButton } from "./update-user-button";
import { DeleteUserButton } from "./delete-user-button";
import { UsersContext, UsersContextProps } from "@/pages/users/context";
import { useDeleteUserMutation } from "../api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

interface Props {
  data?: (User & { posts?: number })[];
}

export const UsersDataTable: React.FC<Props> = ({ data }) => {
  const {
    meta: {
      status,
      uriQueries: { page, search },
    },
  } = React.useContext<UsersContextProps>(UsersContext);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  return (
    <Table>
      <TableHeader className="m-0 p-0">
        <TableRow>
          <TableHead className="font-semibold text-xs">Name</TableHead>
          <TableHead className="font-semibold text-xs">Email</TableHead>
          <TableHead className="font-semibold text-xs">Contact</TableHead>
          <TableHead className="font-semibold text-xs">Role</TableHead>
          <TableHead className="font-semibold text-xs">Posts</TableHead>
          <TableHead className="font-semibold text-xs">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((profile, _) => (
          <TableRow key={profile.id}>
            <TableCell>
              <div className="flex items-center gap-3 lg:py-1 xl:py-1.5">
                <Avatar className="size-10">
                  <AvatarImage
                    src={profile.profile.thumbnail as string}
                    className="object"
                  />
                  <AvatarFallback>
                    {profile.profile.surname.at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">
                  {profile.profile.surname} {profile.profile.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-medium text-sm">{profile.email}</span>
            </TableCell>
            <TableCell>
              <span className="font-medium text-sm">
                {profile.profile.contact}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-medium text-sm">{profile.role}</span>
            </TableCell>
            <TableCell>
              <span className="font-medium text-sm"></span>
            </TableCell>
            <TableCell>
              <div className="flex">
                <UpdateUserButton
                  disabled={status?.role === "USER"}
                  user={profile}
                />
                <DeleteUserButton
                  disabled={status?.role === "USER" || isLoading}
                  action={() =>
                    deleteUser({
                      id: profile.id,
                      params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
                    })
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
