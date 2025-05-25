import { useForm } from "react-hook-form";
import { useCreateTerrainUsabilityMutation } from "../api";
import { z } from "zod";
import { createTerrainUsabilitySchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  TerrainUsabilitiesContext,
  TerrainUsabilitiesContextProps,
} from "@/pages/terrains/usabilites/context";

export const useCreateTerrainUsability = () => {
  const {
    meta: { setOpenDialogCreateTerrainUsability },
  } = React.useContext<TerrainUsabilitiesContextProps>(
    TerrainUsabilitiesContext
  );

  const [createTerrainUsability, { isLoading, isError, error }] =
    useCreateTerrainUsabilityMutation();

  const form = useForm<z.infer<typeof createTerrainUsabilitySchema>>({
    resolver: zodResolver(createTerrainUsabilitySchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof createTerrainUsabilitySchema>
  ) => {
    const { error } = await createTerrainUsability({ data });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err?.data?.message, (err) => err.message],
      });
    }

    setOpenDialogCreateTerrainUsability(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
