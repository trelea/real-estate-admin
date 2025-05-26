import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUserSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserMutation } from "../api";
import React from "react";
import { UsersContext, UsersContextProps } from "@/pages/users/context";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import { deserializeRtkQueryError } from "@/utils";

export const useCreateUser = () => {
  const {
    meta: {
      uriQueries: { page, search },
      setOpenDialogCreateUser,
    },
  } = React.useContext<UsersContextProps>(UsersContext);
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      thumbnail: undefined,
      name: undefined,
      surname: undefined,
      email: undefined,
      password: undefined,
      contact: undefined,
      role: undefined,
      viber: undefined,
      whatsapp: undefined,
      telegram: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
    const data = new FormData();
    values.thumbnail && data.append("thumbnail", values.thumbnail[0]);
    data.append("name", values.name);
    data.append("surname", values.surname);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("contact", values.contact);
    values.role && data.append("role", values.role);
    /**
     * socials contacts
     */
    values.viber && data.append("viber", values.viber);
    values.whatsapp && data.append("whatsapp", values.whatsapp);
    values.telegram && data.append("telegram", values.telegram);

    const response = await createUser({
      data,
      params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });
    if (response.error) {
      return deserializeRtkQueryError<{ message: string }>(response.error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
    setOpenDialogCreateUser(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
