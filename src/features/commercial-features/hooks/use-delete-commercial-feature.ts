import { deserializeRtkQueryError } from "@/utils";
import { useDeleteCommercialFeatureMutation } from "../api";

export const useDeleteCommercialFeature = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteCommercialFeature, { isLoading }] =
    useDeleteCommercialFeatureMutation();

  return [
    async (id: number) => {
      const { error } = await deleteCommercialFeature({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
