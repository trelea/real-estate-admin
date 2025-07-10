import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCommercialSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/features/auth/types";
import {
  useCreateCommercialMutation,
  useUploadCommercialMediaMutation,
} from "../api";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const useCreateCommercial = ({ user }: Props) => {
  const [createCommercial, { isLoading: isLoadingCreateCommercial }] =
    useCreateCommercialMutation();
  const [uploadCommercialMedia, { isLoading: isLoadingUploadCommercialMedia }] =
    useUploadCommercialMediaMutation();

  const form = useForm<z.infer<typeof createCommercialSchema>>({
    resolver: zodResolver(createCommercialSchema),
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

      /**
       * commercial characteristics
       */
      area: undefined,
      floors: undefined,
      first_line: undefined,
      commercial_destinations: undefined,
      commercial_placings: undefined,
      features: undefined,
      housing_conditions: undefined,

      /**
       * media
       */
      media: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async ({
    place,
    media,
    ...values
  }: z.infer<typeof createCommercialSchema>) => {
    // console.log(values);
    const { error, data } = await createCommercial({
      ...values,
      // @ts-ignore
      status: values.status ? "PUBLIC" : "PRIVATE",
    });
    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
    media.forEach(async (image) => {
      const { error } = await uploadCommercialMedia({
        id: data.id,
        data: (() => {
          const media = new FormData();
          media.append("media", image);
          return media;
        })(),
      });
      if (error) {
        return deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    });
  };

  return {
    form,
    onSubmit,
    isLoading: isLoadingCreateCommercial || isLoadingUploadCommercialMedia,
  };
};
