import { useForm } from "react-hook-form";
import { useCreateHousingStockMutation } from "../api";
import { z } from "zod";
import { createHousingStockSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  HousingStocksContext,
  HousingStocksContextProps,
} from "@/pages/housing-stocks/context";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

export const useCreateHousingStock = () => {
  const {
    meta: {
      uriQueries: { page, search },
      setOpenDialogCreateHousingStock,
    },
  } = React.useContext<HousingStocksContextProps>(HousingStocksContext);
  const [createHousingStock, { isLoading, isError, error }] =
    useCreateHousingStockMutation();

  const form = useForm<z.infer<typeof createHousingStockSchema>>({
    resolver: zodResolver(createHousingStockSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createHousingStockSchema>) => {
    const { error } = await createHousingStock({
      data,
      params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });
    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
    setOpenDialogCreateHousingStock(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
