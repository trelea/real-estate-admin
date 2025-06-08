import { useDeleteUserCarouselMutation } from "@/features/users/api";
import { deserializeRtkQueryError } from "@/utils";

export const useDeleteUserFromCarousel = (): [
  (id: string) => Promise<void>,
  boolean
] => {
  const [deleteUserFromCarousel, { isLoading }] =
    useDeleteUserCarouselMutation();

  return [
    async (id: string) => {
      const { error } = await deleteUserFromCarousel({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
