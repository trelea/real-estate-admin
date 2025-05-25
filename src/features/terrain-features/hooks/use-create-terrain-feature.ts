import { useForm } from "react-hook-form";
import { useCreateTerrainFeatureMutation } from "../api";
import { z } from "zod";
import { createTerrainFeatureSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  TerrainFeaturesContext,
  TerrainFeaturesContextProps,
} from "@/pages/terrains/features/context";

export const useCreateTerrainFeature = () => {
  const {
    meta: { setOpenDialogCreateTerrainFeature },
  } = React.useContext<TerrainFeaturesContextProps>(TerrainFeaturesContext);

  const [createTerrainFeature, { isLoading, isError, error }] =
    useCreateTerrainFeatureMutation();

  const form = useForm<z.infer<typeof createTerrainFeatureSchema>>({
    resolver: zodResolver(createTerrainFeatureSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createTerrainFeatureSchema>) => {
    const { error } = await createTerrainFeature({ data });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err?.data?.message, (err) => err.message],
      });
    }

    setOpenDialogCreateTerrainFeature(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
