import { useForm } from "react-hook-form";
import { useCreateCommercialDestinationMutation } from "../api";
import { z } from "zod";
import { createCommercialDestinationSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";
import {
  CommercialDestinationsContext,
  CommercialDestinationsContextProps,
} from "@/pages/commercials/destinations/context";

export const useCreateCommercialDestination = () => {
  const {
    meta: { setOpenDialogCreateCommercialDestination },
  } = React.useContext<CommercialDestinationsContextProps>(
    CommercialDestinationsContext
  );

  const [createCommercialDestination, { isLoading, isError, error }] =
    useCreateCommercialDestinationMutation();

  const form = useForm<z.infer<typeof createCommercialDestinationSchema>>({
    resolver: zodResolver(createCommercialDestinationSchema),
    defaultValues: {
      ro: undefined,
      ru: undefined,
      en: undefined,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof createCommercialDestinationSchema>
  ) => {
    const { error } = await createCommercialDestination({ data });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }

    setOpenDialogCreateCommercialDestination(false);
  };

  return { form, onSubmit, isError, isLoading, error };
};
