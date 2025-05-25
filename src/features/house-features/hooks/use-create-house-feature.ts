import { useForm } from "react-hook-form";
import { useCreateHouseFeatureMutation } from "../api";
import { z } from "zod";
import { createHouseFeatureSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  HouseFeaturesContext,
  HouseFeaturesContextProps,
} from "@/pages/houses/features/context";

export const useCreateHouseFeature = () => {
  const {
    meta: { setOpenDialogCreateHouseFeature },
  } = React.useContext<HouseFeaturesContextProps>(HouseFeaturesContext);

  const [createHouseFeature, { isLoading, isError, error }] =
    useCreateHouseFeatureMutation();

  const form = useForm<z.infer<typeof createHouseFeatureSchema>>({
    resolver: zodResolver(createHouseFeatureSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createHouseFeatureSchema>) => {
    const { error } = await createHouseFeature({ data });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }

    setOpenDialogCreateHouseFeature(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
