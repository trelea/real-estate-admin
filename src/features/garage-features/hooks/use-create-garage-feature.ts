import { useForm } from "react-hook-form";
import { useCreateGarageFeatureMutation } from "../api";
import { z } from "zod";
import { createGarageFeatureSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  GarageFeaturesContext,
  GarageFeaturesContextProps,
} from "@/pages/garages/features/context";

export const useCreateGarageFeature = () => {
  const {
    meta: { setOpenDialogCreateGarageFeature },
  } = React.useContext<GarageFeaturesContextProps>(GarageFeaturesContext);

  const [createGarageFeature, { isLoading, isError, error }] =
    useCreateGarageFeatureMutation();

  const form = useForm<z.infer<typeof createGarageFeatureSchema>>({
    resolver: zodResolver(createGarageFeatureSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createGarageFeatureSchema>) => {
    const { error } = await createGarageFeature({ data });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err?.data?.message, (err) => err.message],
      });
    }

    setOpenDialogCreateGarageFeature(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
