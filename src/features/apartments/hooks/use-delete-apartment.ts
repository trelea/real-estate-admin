import { deserializeRtkQueryError } from "@/utils";
import { useDeleteApartmentMutation } from "../api";

export const useDeleteApartment = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteApartment, { isLoading }] = useDeleteApartmentMutation();

  return [
    async (id: number) => {
      const response = await deleteApartment({ id });
      if (response.error) {
        deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
