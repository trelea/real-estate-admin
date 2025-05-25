import { useForm } from "react-hook-form";
import { useUpdateCommercialPlacingMutation } from "../api";
import { CommercialPlacingType } from "../types";
import { updateCommercialPlacingSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  commercialPlacing: CommercialPlacingType;
}

export const useUpdateCommercialPlacing = ({ commercialPlacing }: Props) => {
  const [updateCommercialPlacing, { isError, error, isLoading }] =
    useUpdateCommercialPlacingMutation();

  const form = useForm<z.infer<typeof updateCommercialPlacingSchema>>({
    resolver: zodResolver(updateCommercialPlacingSchema),
    defaultValues: {
      ro: commercialPlacing.ro,
      ru: commercialPlacing.ru,
      en: commercialPlacing.en,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof updateCommercialPlacingSchema>
  ) => {
    const { ro, ru, en } = commercialPlacing;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateCommercialPlacing({
      id: commercialPlacing.id,
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
