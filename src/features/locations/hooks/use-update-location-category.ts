import { useForm } from "react-hook-form";
import { useUpdateLocationCategoryMutation } from "../api";
import { LocationCategoryType } from "../types";
import { updateLocationCategorySchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  category: LocationCategoryType;
}

export const useUpdateLocationCategory = ({ category }: Props) => {
  // const {
  //   meta: {
  //     uriQueries: { page, search },
  //   },
  // } = React.useContext<HousingStocksContextProps>(HousingStocksContext);

  const [updateLocationCategory, { isError, error, isLoading }] =
    useUpdateLocationCategoryMutation();

  const form = useForm<z.infer<typeof updateLocationCategorySchema>>({
    resolver: zodResolver(updateLocationCategorySchema),
    defaultValues: {
      ro: category.ro,
      ru: category.ru,
      en: category.en,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof updateLocationCategorySchema>
  ) => {
    const { ro, ru, en } = category;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateLocationCategory({
      id: category.id,
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
