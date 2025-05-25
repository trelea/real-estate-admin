import { deserializeRtkQueryError } from "@/utils";
import { useDeleteCommercialDestinationMutation } from "../api";

export const useDeleteCommercialDestination = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteCommercialDestination, { isLoading }] =
    useDeleteCommercialDestinationMutation();

  return [
    async (id: number) => {
      const { error } = await deleteCommercialDestination({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
