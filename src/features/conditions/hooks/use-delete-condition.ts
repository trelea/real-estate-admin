import { deserializeRtkQueryError } from "@/utils";
import { useDeleteConditionMutation } from "../api";

export const useDeleteCondition = (): [
  (id: number) => Promise<void>,
  boolean
] => {
  const [deleteCondition, { isLoading }] = useDeleteConditionMutation();

  return [
    async (id: number) => {
      const { error } = await deleteCondition({ id });
      if (error) {
        deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    },
    isLoading,
  ];
};
