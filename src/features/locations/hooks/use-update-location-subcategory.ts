import { useForm } from "react-hook-form";
import { useUpdateLocationSubCategoryMutation } from "../api";
import { LocationSubCategoryType } from "../types";
import { updateLocationSubCategorySchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  LocationsContext,
  LocationsContextProps,
} from "@/pages/locations/context";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

interface Props {
  subcategory: LocationSubCategoryType;
  category: number;
}

export const useUpdateLocationSubCategory = ({
  subcategory,
  category,
}: Props) => {
  const {
    meta: {
      uriQueries: { page, search },
    },
  } = React.useContext<LocationsContextProps>(LocationsContext);

  const [updateLocationSubCategory, { isError, error, isLoading }] =
    useUpdateLocationSubCategoryMutation();

  const form = useForm<z.infer<typeof updateLocationSubCategorySchema>>({
    resolver: zodResolver(updateLocationSubCategorySchema),
    defaultValues: {
      ro: subcategory.ro,
      ru: subcategory.ru,
      en: subcategory.en,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof updateLocationSubCategorySchema>
  ) => {
    const { ro, ru, en } = subcategory;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateLocationSubCategory({
      id: subcategory.id,
      data,
      params: { page, limit: DEFAULT_PAGINATION_LIMIT, search, category },
    });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
  };

  return { form, onSubmit, isError, error, isLoading };
};
