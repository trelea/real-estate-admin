import { deserializeRtkQueryError } from "@/utils";
import { useDeleteGarageFeatureMutation } from "../api";

export const useDeleteGarageFeature = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteGarageFeature, { isLoading }] =
    useDeleteGarageFeatureMutation();

  return [
    async (id: number) => {
      const { error } = await deleteGarageFeature({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err?.data?.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
