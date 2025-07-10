import { deserializeRtkQueryError } from "@/utils";
import { useDeleteCommercialPlacingMutation } from "../api";

export const useDeleteCommercialPlacing = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteCommercialPlacing, { isLoading }] =
    useDeleteCommercialPlacingMutation();

  return [
    async (id: number) => {
      const { error } = await deleteCommercialPlacing({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
