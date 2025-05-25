import { useForm } from "react-hook-form";
import { useCreateCommercialPlacingMutation } from "../api";
import { z } from "zod";
import { createCommercialPlacingSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  CommercialPlacingsContext,
  CommercialPlacingsContextProps,
} from "@/pages/commercials/placings/context";

export const useCreateCommercialPlacing = () => {
  const {
    meta: { setOpenDialogCreateCommercialPlacing },
  } = React.useContext<CommercialPlacingsContextProps>(
    CommercialPlacingsContext
  );

  const [createCommercialPlacing, { isLoading, isError, error }] =
    useCreateCommercialPlacingMutation();

  const form = useForm<z.infer<typeof createCommercialPlacingSchema>>({
    resolver: zodResolver(createCommercialPlacingSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof createCommercialPlacingSchema>
  ) => {
    const { error } = await createCommercialPlacing({ data });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }

    setOpenDialogCreateCommercialPlacing(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
