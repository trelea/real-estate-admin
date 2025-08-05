import { useForm } from "react-hook-form";
import { z } from "zod";
import { signinSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSigninMutation } from "../api";
import { deserializeRtkQueryError } from "@/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useSignin = () => {
  const redirect = useNavigate();
  const [mutate, { isError, error, isLoading }] = useSigninMutation();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: undefined, password: undefined },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    const response = await mutate(data);
    if (response.error) {
      return deserializeRtkQueryError<{ message: string }>(response.error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
    console.log(response);

    /**
     * dev stage stuff
     */
    toast("Successfully Authenticated", {
      action: { label: "Close", onClick: () => {} },
    });
    redirect("/dashboard/users", { replace: true });
  };

  return { form, onSubmit, error, isError, isLoading };
};
