import { useForm } from "react-hook-form";
import { useUpdateConditionMutation } from "../api";
import { ConditionType } from "../types";
import { updateConditionSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  condition: ConditionType;
}

export const useUpdateCondition = ({ condition }: Props) => {
  // const {
  //   meta: {
  //     uriQueries: { page, search },
  //   },
  // } = React.useContext<HousingStocksContextProps>(HousingStocksContext);

  const [updateCondition, { isError, error, isLoading }] =
    useUpdateConditionMutation();
  const form = useForm<z.infer<typeof updateConditionSchema>>({
    resolver: zodResolver(updateConditionSchema),
    defaultValues: {
      ro: condition.ro,
      ru: condition.ru,
      en: condition.en,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateConditionSchema>) => {
    const { ro, ru, en } = condition;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateCondition({
      id: condition.id,
      data,
      // params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
  };

  return { form, onSubmit, isError, error, isLoading };
};
