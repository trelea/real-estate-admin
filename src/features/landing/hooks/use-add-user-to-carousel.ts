import { useCreateUserCarouselMutation } from "@/features/users/api";
import { deserializeRtkQueryError } from "@/utils";
import React from "react";

export const useAddUserToCarousel = () => {
  const [newUser, { isLoading }] = useCreateUserCarouselMutation();

  const addNewUser = React.useCallback(async (id: string) => {
    const { error } = await newUser({ user: id });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
  }, []);

  return { addNewUser, isLoading };
};
