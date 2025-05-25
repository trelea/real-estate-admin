import { deserializeRtkQueryError } from "@/utils";
import { useDeleteApartmentFeatureMutation } from "../api";

export const useDeleteApartmentFeature = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteApartmentFeature, { isLoading }] =
    useDeleteApartmentFeatureMutation();

  return [
    async (id: number) => {
      const { error } = await deleteApartmentFeature({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
