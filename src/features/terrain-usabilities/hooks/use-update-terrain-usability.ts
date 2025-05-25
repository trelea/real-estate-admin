import { useForm } from "react-hook-form";
import { useUpdateTerrainUsabilityMutation } from "../api";
import { TerrainUsabilityType } from "../types";
import { updateTerrainUsabilitySchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  terrainUsability: TerrainUsabilityType;
}

export const useUpdateTerrainUsability = ({ terrainUsability }: Props) => {
  const [updateTerrainUsability, { isError, error, isLoading }] =
    useUpdateTerrainUsabilityMutation();

  const form = useForm<z.infer<typeof updateTerrainUsabilitySchema>>({
    resolver: zodResolver(updateTerrainUsabilitySchema),
    defaultValues: {
      ro: terrainUsability.ro,
      ru: terrainUsability.ru,
      en: terrainUsability.en,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof updateTerrainUsabilitySchema>
  ) => {
    const { ro, ru, en } = terrainUsability;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateTerrainUsability({
      id: terrainUsability.id,
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
