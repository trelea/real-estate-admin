import { useForm } from "react-hook-form";
import { HousingStockType } from "../types";
import { z } from "zod";
import { updateHousingStockSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useUpdateHousingStockMutation } from "../api";
import React from "react";
import {
  HousingStocksContext,
  HousingStocksContextProps,
} from "@/pages/housing-stocks/context";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  housingStock: HousingStockType;
}

export const useUpdateHousingStock = ({ housingStock }: Props) => {
  const {
    meta: {
      uriQueries: { page, search },
    },
  } = React.useContext<HousingStocksContextProps>(HousingStocksContext);

  const [updateHousingStock, { isError, error, isLoading }] =
    useUpdateHousingStockMutation();
  const form = useForm<z.infer<typeof updateHousingStockSchema>>({
    resolver: zodResolver(updateHousingStockSchema),
    defaultValues: {
      ro: housingStock.ro,
      ru: housingStock.ru,
      en: housingStock.en,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateHousingStockSchema>) => {
    const { ro, ru, en } = housingStock;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateHousingStock({
      id: housingStock.id,
      data,
      params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
  };

  return { form, onSubmit, isError, error, isLoading };
};
