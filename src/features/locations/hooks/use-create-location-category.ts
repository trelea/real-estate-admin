import { useForm } from "react-hook-form";
import { useCreateLocationCategoryMutation } from "../api";
import { z } from "zod";
import { createLocationCategorySchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  LocationsContext,
  LocationsContextProps,
} from "@/pages/locations/context";

export const useCreateLocationCategory = () => {
  const {
    meta: {
      // uriQueries: { page, search },
      setOpenDialogCreateLocationCategory,
    },
  } = React.useContext<LocationsContextProps>(LocationsContext);
  const [createLocationCategory, { isLoading, isError, error }] =
    useCreateLocationCategoryMutation();

  const form = useForm<z.infer<typeof createLocationCategorySchema>>({
    resolver: zodResolver(createLocationCategorySchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof createLocationCategorySchema>
  ) => {
    const { error } = await createLocationCategory({
      data,
      // params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });
    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
    setOpenDialogCreateLocationCategory(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
