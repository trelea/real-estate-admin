import { useRemoveServiceFromLandingMutation } from "@/features/services/api";
import { deserializeRtkQueryError } from "@/utils";

export const useDeleteServiceFromLanding = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteServiceFromLanding, { isLoading }] =
    useRemoveServiceFromLandingMutation();

  return [
    async (id: number) => {
      const { error } = await deleteServiceFromLanding({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
