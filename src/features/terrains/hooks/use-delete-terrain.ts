import { deserializeRtkQueryError } from "@/utils";
import { useDeleteTerrainMutation } from "../api";

export const useDeleteTerrain = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteTerrain, { isLoading }] = useDeleteTerrainMutation();

  return [
    async (id: number) => {
      const response = await deleteTerrain({ id });
      if (response.error) {
        deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
