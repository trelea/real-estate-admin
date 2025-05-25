import { useForm } from "react-hook-form";
import { useCreateApartmentFeatureMutation } from "../api";
import { z } from "zod";
import { createApartmentFeatureSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  ApartmentFeaturesContext,
  ApartmentFeaturesContextProps,
} from "@/pages/apartments/features/context";

export const useCreateApartmentFeature = () => {
  const {
    meta: { setOpenDialogCreateApartmentFeature },
  } = React.useContext<ApartmentFeaturesContextProps>(ApartmentFeaturesContext);

  const [createApartmentFeature, { isLoading, isError, error }] =
    useCreateApartmentFeatureMutation();

  const form = useForm<z.infer<typeof createApartmentFeatureSchema>>({
    resolver: zodResolver(createApartmentFeatureSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof createApartmentFeatureSchema>
  ) => {
    const { error } = await createApartmentFeature({
      data,
      // params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }

    setOpenDialogCreateApartmentFeature(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
