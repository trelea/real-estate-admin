import { deserializeRtkQueryError } from "@/utils";
import { useDeleteHouseFeatureMutation } from "../api";

export const useDeleteHouseFeature = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteHouseFeature, { isLoading }] = useDeleteHouseFeatureMutation();

  return [
    async (id: number) => {
      const { error } = await deleteHouseFeature({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
