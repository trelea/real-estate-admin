import { deserializeRtkQueryError } from "@/utils";
import { useDeleteLocationSubCategoryMutation } from "../api";

export const useDeleteLocationSubCategory = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteLocationSubCategory, { isLoading }] =
    useDeleteLocationSubCategoryMutation();

  return [
    async (id: number) => {
      const { error } = await deleteLocationSubCategory({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
