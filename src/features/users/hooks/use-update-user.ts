import { User } from "@/features/auth/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
// import { ImageUrlToBlob } from "@/utils";

interface Props {
  user: User;
}

export const useUpdateUser = ({ user }: Props) => {
  console.log(user);
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.profile.name,
      surname: user.profile.surname,
      email: user.email,
      // password: undefined,
      contact: user.profile.contact || "",
      role: user.role,
      // thumbnail: await ImageUrlToBlob(
      //   user.profile.thumbnail as string,
      //   "thumbanil"
      // ),
    },
  });

  const onSubmit = (values: z.infer<typeof updateUserSchema>) => {
    console.log(values);
  };

  return { form, onSubmit };
};
