import { useForm } from "react-hook-form";
import { useCreateLocationSubCategoryMutation } from "../api";
import { z } from "zod";
import { createLocationSubCategorySchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  LocationsContext,
  LocationsContextProps,
} from "@/pages/locations/context";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

interface Props {
  category: number;
}

export const useCreateLocationSubCategory = ({ category }: Props) => {
  const {
    meta: {
      uriQueries: { page, search },
      setOpenDialogCreateLocationSubCategory,
    },
  } = React.useContext<LocationsContextProps>(LocationsContext);
  const [createLocationSubCategory, { isLoading, isError, error }] =
    useCreateLocationSubCategoryMutation();

  const form = useForm<z.infer<typeof createLocationSubCategorySchema>>({
    resolver: zodResolver(createLocationSubCategorySchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof createLocationSubCategorySchema>
  ) => {
    const { error } = await createLocationSubCategory({
      data: { category, ...data },
      params: { page, limit: DEFAULT_PAGINATION_LIMIT, search, category },
    });
    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
    setOpenDialogCreateLocationSubCategory(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
