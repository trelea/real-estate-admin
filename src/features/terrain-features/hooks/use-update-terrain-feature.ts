import { useForm } from "react-hook-form";
import { useUpdateTerrainFeatureMutation } from "../api";
import { TerrainFeatureType } from "../types";
import { updateTerrainFeatureSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  terrainFeature: TerrainFeatureType;
}

export const useUpdateTerrainFeature = ({ terrainFeature }: Props) => {
  const [updateTerrainFeature, { isError, error, isLoading }] =
    useUpdateTerrainFeatureMutation();

  const form = useForm<z.infer<typeof updateTerrainFeatureSchema>>({
    resolver: zodResolver(updateTerrainFeatureSchema),
    defaultValues: {
      ro: terrainFeature.ro,
      ru: terrainFeature.ru,
      en: terrainFeature.en,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateTerrainFeatureSchema>) => {
    const { ro, ru, en } = terrainFeature;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateTerrainFeature({
      id: terrainFeature.id,
      data,
    });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err?.data?.message, (err) => err.message],
      });
    }
  };

  return { form, onSubmit, isError, error, isLoading };
};
