import { useForm } from "react-hook-form";
import { useUpdateGarageFeatureMutation } from "../api";
import { GarageFeatureType } from "../types";
import { updateGarageFeatureSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  garageFeature: GarageFeatureType;
}

export const useUpdateGarageFeature = ({ garageFeature }: Props) => {
  const [updateGarageFeature, { isError, error, isLoading }] =
    useUpdateGarageFeatureMutation();

  const form = useForm<z.infer<typeof updateGarageFeatureSchema>>({
    resolver: zodResolver(updateGarageFeatureSchema),
    defaultValues: {
      ro: garageFeature.ro,
      ru: garageFeature.ru,
      en: garageFeature.en,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateGarageFeatureSchema>) => {
    const { ro, ru, en } = garageFeature;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateGarageFeature({
      id: garageFeature.id,
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
