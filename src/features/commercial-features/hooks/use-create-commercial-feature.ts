import { useForm } from "react-hook-form";
import { useCreateCommercialFeatureMutation } from "../api";
import { z } from "zod";
import { createCommercialFeatureSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  CommercialFeaturesContext,
  CommercialFeaturesContextProps,
} from "@/pages/commercials/features/context";

export const useCreateCommercialFeature = () => {
  const {
    meta: { setOpenDialogCreateCommercialFeature },
  } = React.useContext<CommercialFeaturesContextProps>(
    CommercialFeaturesContext
  );

  const [createCommercialFeature, { isLoading, isError, error }] =
    useCreateCommercialFeatureMutation();

  const form = useForm<z.infer<typeof createCommercialFeatureSchema>>({
    resolver: zodResolver(createCommercialFeatureSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof createCommercialFeatureSchema>
  ) => {
    const { error } = await createCommercialFeature({ data });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }

    setOpenDialogCreateCommercialFeature(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
