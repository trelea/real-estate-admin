import { AxiosBaseQueryError } from "@/services";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const deserializeRtkQueryError = <R = unknown>(
  error: AxiosBaseQueryError | SerializedError | undefined,
  options?: {
    toasts: ((error: AxiosBaseQueryError<R>) => string)[];
  }
): AxiosBaseQueryError<R> => {
  let status: number | null = null;
  if (error && "status" in error) status = error.status as number;

  let message: string | null = null;
  if (error && "message" in error) message = error.message as string;

  let data: R | null = null;
  if (error && "data" in error) data = error.data as R;

  const __error__: AxiosBaseQueryError<R> = {
    status: status as number,
    message: message as string,
    data: data as R,
  };

  if (options?.toasts.length) {
    for (const option of options.toasts) {
      if (option(__error__)) {
        toast(option(__error__), {
          action: { label: "Close", onClick: () => {} },
        });
        break;
      }
    }
  }
  return __error__;
};
