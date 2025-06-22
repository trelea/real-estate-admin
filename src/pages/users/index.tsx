import { User } from "@/features/auth/types";
import React from "react";
import { UsersContext, UsersContextProps } from "./context";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { CreateUserForm, UpdateUserForm } from "@/features/users/forms";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteUser } from "@/features/users/hooks";
import { useTranslation } from "react-i18next";

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
      //
      openDialogCreateUser,
      setOpenDialogCreateUser,
    },
  } = React.useContext<UsersContextProps>(UsersContext);
  const [deleteUser, deleteUserLoading] = useDeleteUser();
  const { t } = useTranslation();

  return (
    <ManageData<User & { posts?: number }>
      /**
       * loading
       */
      loading={{
        state: isLoading || isFetching,
        component: <TableSkeleton previewThumbSkeleton />,
      }}
      /**
       * header
       */
      header={{
        title: t("users.title"),
        badge: `${data?.meta.total} ${t("users.badge")}`,
        search: {
          defaultValue: search,
          onValueChange: (value) =>
            setUriQueries(({ search, ...rest }) => ({
              search: value,
              ...rest,
            })),
        },
        create: {
          trigger: {
            label: t("users.createUser"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t("users.createUserTitle"),
            description: t("users.createUserDescription"),
            children: <CreateUserForm />,
          },
          dialogState: {
            open: openDialogCreateUser,
            onOpenChange: setOpenDialogCreateUser,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as (User & { posts?: number })[],
          headers: [
            t("users.name"),
            t("users.email"),
            t("users.contact"),
            t("users.role"),
            t("users.posts"),
          ],
          rows: ({
            profile: { contact, name, surname, thumbnail },
            email,
            role,
            posts,
          }) => [
            <div className="flex items-center gap-3 lg:py-1 xl:py-1.5">
              <Avatar className="size-10">
                <AvatarImage src={thumbnail as string} />
                <AvatarFallback>{surname.at(0)?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">
                {surname} {name}
              </span>
            </div>,
            <span className="font-medium text-sm">{email}</span>,
            <span className="font-medium text-sm">{contact}</span>,
            <span className="font-medium text-sm">{role}</span>,
            <span className="font-medium text-sm">{posts}</span>,
          ],
          /**
           * delete action
           */
          delete: {
            disabled: status?.role !== "ADMIN" || deleteUserLoading,
            // @ts-ignore
            onDeleteAction: (id) => deleteUser(id),
          },
          /**
           * update action
           */
          update: {
            disabled: status?.role !== "ADMIN",
            title: t("users.updateUserTitle"),
            description: t("users.updateUserDescription"),
            children: (user) => <UpdateUserForm user={user} />,
          },
        },
      }}
      /**
       * footer
       */
      footer={{
        pagination: {
          meta: data?.meta,
          next: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page + 1,
              ...rest,
            })),
          prev: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page - 1,
              ...rest,
            })),
          current: (_) =>
            setUriQueries(({ page, ...rest }) => ({
              page: _,
              ...rest,
            })),
        },
      }}
    />
  );
};
