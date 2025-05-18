import { useDebounce } from "@/hooks/use-debounce";
import { useUpdateServiceMutation } from "../api";

export const useChangeStatus = () => {
  const [setStatus, states] = useUpdateServiceMutation();

  const changeStatus = async (id: string, value?: boolean) => {
    const response = await setStatus({
      id,
      blog: {
        status: value ? "PUBLIC" : "PRIVATE",
      },
      // invalidate: false,
    });

    if (response.error) {
    }
  };

  return { action: useDebounce(changeStatus, 500), states };
};
