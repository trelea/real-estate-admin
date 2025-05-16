import { useDebounce } from "@/hooks/use-debounce";
import { useUpdateBlogMutation } from "../api";

export const useChangeStatus = () => {
  const [setStatus, states] = useUpdateBlogMutation();

  const changeStatus = (id: string, value?: boolean) => {
    setStatus({
      id,
      blog: {
        status: value ? "PUBLIC" : "PRIVATE",
      },
    });
  };

  return { action: useDebounce(changeStatus, 500), states };
};
