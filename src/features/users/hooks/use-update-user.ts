import { User } from "@/features/auth/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserMutation, useUpdateUserThumbnailMutation } from "../api";
import React from "react";
import { UsersContext, UsersContextProps } from "@/pages/users/context";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import { deserializeRtkQueryError, ImageUrlToBlob } from "@/utils";
import { isEqual } from "lodash";

interface Props {
  user: User;
}

export const useUpdateUser = ({ user }: Props) => {
  const {
    meta: {
      uriQueries: { page, search },
    },
  } = React.useContext<UsersContextProps>(UsersContext);
  const [updateUser, { isError, error, isLoading }] = useUpdateUserMutation();
  const [updateUserThumbnail] = useUpdateUserThumbnailMutation();

  React.useEffect(() => {
    (async () => {
      if (
        user.profile.thumbnail !== null &&
        user.profile.thumbnail !== undefined
      ) {
        const image = await ImageUrlToBlob(user.profile.thumbnail as string);
        form.setValue("thumbnail", image as File[]);
      }
    })();
  }, []);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.profile.name,
      surname: user.profile.surname,
      email: user.email,
      // password: undefined,
      contact: user.profile.contact || "",
      role: user.role,
      thumbnail: user.profile.thumbnail || undefined,
      /**
       * social contacts
       */
      viber: user.profile?.viber || undefined,
      whatsapp: user.profile?.whatsapp || undefined,
      telegram: user.profile?.telegram || undefined,
    },
  });

  const onSubmit = async ({
    thumbnail,
    ..._user
  }: z.infer<typeof updateUserSchema>) => {
    const {
      email,
      role,
      profile: { contact, name, surname },
    } = user;

    if (_user && !isEqual(_user, { email, role, contact, name, surname })) {
      const response = await updateUser({
        id: user.id,
        user: _user,
        params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
      });
      if (response.error) {
        return deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    }

    if (thumbnail) {
      const data = new FormData();
      data.append("thumbnail", thumbnail[0]);
      const response = await updateUserThumbnail({
        id: user.id,
        thumbnail: data,
        params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
      });
      if (response.error) {
        return deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    }
  };

  return { form, onSubmit, isError, error, isLoading };
};
