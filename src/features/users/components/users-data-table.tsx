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

interface Props {
  data?: (User & { posts?: number })[];
}

export const UsersDataTable: React.FC<Props> = ({ data }) => (
  <Table>
    <TableHeader className="m-0 p-0">
      <TableRow>
        <TableHead className="font-medium text-xs">Name</TableHead>
        <TableHead className="font-medium text-xs">Email</TableHead>
        <TableHead className="font-medium text-xs">Contact</TableHead>
        <TableHead className="font-medium text-xs">Role</TableHead>
        <TableHead className="font-medium text-xs">Posts</TableHead>
        <TableHead className="font-medium text-xs">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data?.map((profile, _) => (
        <TableRow key={profile.id}>
          <TableCell className="flex items-center gap-3 font-medium text-sm py-4 h-fit">
            <Avatar className="size-10">
              <AvatarImage src={profile.profile.thumbnail as string} />
              <AvatarFallback>
                {profile.profile.surname.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>
              {profile.profile.surname} {profile.profile.name}
            </span>
          </TableCell>
          <TableCell className="font-medium text-sm">{profile.email}</TableCell>
          <TableCell className="font-medium text-sm">
            {profile.profile.contact}
          </TableCell>
          <TableCell className="font-medium text-sm">{profile.role}</TableCell>
          <TableCell></TableCell>
          <TableCell className="flex items-center gap-2">
            <UpdateUserButton />
            <DeleteUserButton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
