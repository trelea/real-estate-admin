import { useForm } from "react-hook-form";
import { useUpdateCommercialDestinationMutation } from "../api";
import { CommercialDestinationType } from "../types";
import { updateCommercialDestinationSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  commercialDestination: CommercialDestinationType;
}

export const useUpdateCommercialDestination = ({
  commercialDestination,
}: Props) => {
  const [updateCommercialDestination, { isError, error, isLoading }] =
    useUpdateCommercialDestinationMutation();

  const form = useForm<z.infer<typeof updateCommercialDestinationSchema>>({
    resolver: zodResolver(updateCommercialDestinationSchema),
    defaultValues: {
      ro: commercialDestination.ro,
      ru: commercialDestination.ru,
      en: commercialDestination.en,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof updateCommercialDestinationSchema>
  ) => {
    const { ro, ru, en } = commercialDestination;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateCommercialDestination({
      id: commercialDestination.id,
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
