import { deserializeRtkQueryError } from "@/utils";
import { useDeleteTerrainFeatureMutation } from "../api";

export const useDeleteTerrainFeature = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteTerrainFeature, { isLoading }] =
    useDeleteTerrainFeatureMutation();

  return [
    async (id: number) => {
      const { error } = await deleteTerrainFeature({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err?.data?.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
