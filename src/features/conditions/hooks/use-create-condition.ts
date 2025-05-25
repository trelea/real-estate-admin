import { useForm } from "react-hook-form";
import { useCreateConditionMutation } from "../api";
import { z } from "zod";
import { createConditionSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  ConditionsContext,
  ConditionsContextProps,
} from "@/pages/conditions/context";

export const useCreateCondition = () => {
  const {
    meta: {
      // uriQueries: { page, search },
      setOpenDialogCreateCondition,
    },
  } = React.useContext<ConditionsContextProps>(ConditionsContext);
  const [createCondition, { isLoading, isError, error }] =
    useCreateConditionMutation();

  const form = useForm<z.infer<typeof createConditionSchema>>({
    resolver: zodResolver(createConditionSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createConditionSchema>) => {
    const { error } = await createCondition({
      data,
      // params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });
    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
    setOpenDialogCreateCondition(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
