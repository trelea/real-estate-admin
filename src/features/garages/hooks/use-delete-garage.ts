import { deserializeRtkQueryError } from "@/utils";
import { useDeleteGarageMutation } from "../api";

export const useDeleteGarage = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteGarage, { isLoading }] = useDeleteGarageMutation();

  return [
    async (id: number) => {
      const response = await deleteGarage({ id });
      if (response.error) {
        deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
