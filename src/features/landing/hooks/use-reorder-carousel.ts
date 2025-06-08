import { useUpdateUserCarouselMutation } from "@/features/users/api";
import { GetUsersCarouselResType } from "@/features/users/types";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";

/**
 *
 */

export const useReorderCarousel = () => {
  const [update] = useUpdateUserCarouselMutation();
  const reorder = React.useCallback(
    ({ carousel }: { carousel: GetUsersCarouselResType["data"] }) => {
      const reorders = carousel.map(({ id }, index) => {
        return { id, priority: carousel.length - index };
      });

      reorders.map(async ({ id, priority }) => {
        const { error } = await update({ id, priority });

        if (error) {
          return deserializeRtkQueryError<{ message: string }>(error, {
            toasts: [(err) => err.data.message, (err) => err.message],
          });
        }
      });
    },
    []
  );
  return { reorder };
};
