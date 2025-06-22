import { deserializeRtkQueryError } from "@/utils";
import { useDeleteHouseMutation } from "../api";

export const useDeleteHouse = (): [(id: number) => Promise<void>, boolean] => {
  const [deleteHouse, { isLoading }] = useDeleteHouseMutation();

  return [
    async (id: number) => {
      const response = await deleteHouse({ id });
      if (response.error) {
        deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
