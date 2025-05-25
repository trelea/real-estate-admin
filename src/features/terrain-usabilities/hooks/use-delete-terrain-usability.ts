import { deserializeRtkQueryError } from "@/utils";
import { useDeleteTerrainUsabilityMutation } from "../api";

export const useDeleteTerrainUsability = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteTerrainUsability, { isLoading }] =
    useDeleteTerrainUsabilityMutation();

  return [
    async (id: number) => {
      const { error } = await deleteTerrainUsability({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err?.data?.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
