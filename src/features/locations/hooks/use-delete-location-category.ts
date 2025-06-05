import { deserializeRtkQueryError } from "@/utils";
import { useDeleteLocationCategoryMutation } from "../api";

export const useDeleteLocationCategory = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteLocationCategory, { isLoading }] =
    useDeleteLocationCategoryMutation();

  return [
    async (id: number) => {
      const { error } = await deleteLocationCategory({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
