import { useForm } from "react-hook-form";
import { useUpdateHouseFeatureMutation } from "../api";
import { HouseFeatureType } from "../types";
import { updateHouseFeatureSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  houseFeature: HouseFeatureType;
}

export const useUpdateHouseFeature = ({ houseFeature }: Props) => {
  const [updateHouseFeature, { isError, error, isLoading }] =
    useUpdateHouseFeatureMutation();

  const form = useForm<z.infer<typeof updateHouseFeatureSchema>>({
    resolver: zodResolver(updateHouseFeatureSchema),
    defaultValues: {
      ro: houseFeature.ro,
      ru: houseFeature.ru,
      en: houseFeature.en,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateHouseFeatureSchema>) => {
    const { ro, ru, en } = houseFeature;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateHouseFeature({
      id: houseFeature.id,
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
