import { deserializeRtkQueryError } from "@/utils";
import { useDeleteUserMutation } from "../api";

export const useDeleteUser = (): [(id: string) => Promise<void>, boolean] => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  return [
    async (id: string) => {
      const response = await deleteUser({ id });
      if (response.error) {
        deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
