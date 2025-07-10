import { deserializeRtkQueryError } from "@/utils";
import { useDeleteCommercialMutation } from "../api";

export const useDeleteCommercial = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteCommercial, { isLoading }] = useDeleteCommercialMutation();

  return [
    async (id: number) => {
      const { error } = await deleteCommercial({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
