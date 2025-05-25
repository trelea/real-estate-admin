import { deserializeRtkQueryError } from "@/utils";
import { useDeleteHousingStockMutation } from "../api";

export const useDeleteHousingStock = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteHousingStock, { isLoading }] = useDeleteHousingStockMutation();

  return [
    async (id: number) => {
      const { error } = await deleteHousingStock({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
