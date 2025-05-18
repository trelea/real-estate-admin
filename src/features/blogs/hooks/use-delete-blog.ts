import { deserializeRtkQueryError } from "@/utils";
import { useDeleteBlogMutation } from "../api";

export const useDeleteBlog = (): [(id: string) => Promise<void>, boolean] => {
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  return [
    async (id: string) => {
      const response = await deleteBlog({ id });
      if (response.error) {
        deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
