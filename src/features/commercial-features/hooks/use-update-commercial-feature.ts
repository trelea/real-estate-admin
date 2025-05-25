import { useForm } from "react-hook-form";
import { useUpdateCommercialFeatureMutation } from "../api";
import { CommercialFeatureType } from "../types";
import { updateCommercialFeatureSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  commercialFeature: CommercialFeatureType;
}

export const useUpdateCommercialFeature = ({ commercialFeature }: Props) => {
  const [updateCommercialFeature, { isError, error, isLoading }] =
    useUpdateCommercialFeatureMutation();

  const form = useForm<z.infer<typeof updateCommercialFeatureSchema>>({
    resolver: zodResolver(updateCommercialFeatureSchema),
    defaultValues: {
      ro: commercialFeature.ro,
      ru: commercialFeature.ru,
      en: commercialFeature.en,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof updateCommercialFeatureSchema>
  ) => {
    const { ro, ru, en } = commercialFeature;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateCommercialFeature({
      id: commercialFeature.id,
      data,
    });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
  };

  return { form, onSubmit, isError, error, isLoading };
};
