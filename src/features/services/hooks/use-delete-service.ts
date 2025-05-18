import { deserializeRtkQueryError } from "@/utils";
import { useDeleteServiceMutation } from "../api";

export const useDeleteService = (): [
  (id: string) => Promise<void>,
  boolean
] => {
  const [deleteService, { isLoading }] = useDeleteServiceMutation();

  return [
    async (id: string) => {
      const response = await deleteService({ id });
      if (response.error) {
        deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
