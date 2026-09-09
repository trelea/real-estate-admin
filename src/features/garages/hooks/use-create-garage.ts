import { useForm } from "react-hook-form";
import { z } from "zod";
import { createGarageSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/features/auth/types";
import {
  useCreateGarageMutation,
  useUploadGarageMediaMutation,
} from "../api";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const useCreateGarage = ({ user }: Props) => {
  const [createGarage, { isLoading: isLoadingCreateGarage }] =
    useCreateGarageMutation();
  const [uploadGarageMedia, { isLoading: isLoadingUploadGarageMedia }] =
    useUploadGarageMediaMutation();

  const form = useForm<z.infer<typeof createGarageSchema>>({
    resolver: zodResolver(createGarageSchema),
    defaultValues: {
      user: user.role === "ADMIN" ? undefined : user.id,
      lat: 47.0105,
      lng: 28.8638,
      desc_en: undefined,
      desc_ro: undefined,
      desc_ru: undefined,
      hot: undefined,
      location_category: undefined,
      location_subcategory: undefined,
      offert: undefined,
      place: undefined,
      price: undefined,
      status: undefined,
      street_en: undefined,
      street_ro: undefined,
      street_ru: undefined,
      /** garage characteristics */
      area: undefined,
      features: undefined,
      /** media */
      media: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async ({
    place,
    media,
    ...values
  }: z.infer<typeof createGarageSchema>) => {
    const { error, data } = await createGarage({
      ...values,
      // @ts-ignore convert boolean checkbox to enum string
      status: values.status ? "PUBLIC" : "PRIVATE",
    });
    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }

    if (media && media.length) {
      for (const file of media) {
        const { error } = await uploadGarageMedia({
          id: data.id,
          data: (() => {
            const fd = new FormData();
            fd.append("media", file);
            return fd;
          })(),
        });
        if (error) {
          return deserializeRtkQueryError<{ message: string }>(error, {
            toasts: [(err) => err.data.message, (err) => err.message],
          });
        }
      }
    }
  };

  return {
    form,
    onSubmit,
    isLoading: isLoadingCreateGarage || isLoadingUploadGarageMedia,
  };
};
