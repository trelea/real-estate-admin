import { useForm } from "react-hook-form";
import { z } from "zod";
import { createHouseSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/features/auth/types";
import { useCreateHouseMutation, useUploadHouseMediaMutation } from "../api";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const useCreateHouse = ({ user }: Props) => {
  const [createHouse, { isLoading: isLoadingCreate }] =
    useCreateHouseMutation();
  const [uploadHouseMedia, { isLoading: isLoadingUpload }] =
    useUploadHouseMediaMutation();

  const form = useForm<z.infer<typeof createHouseSchema>>({
    resolver: zodResolver(createHouseSchema),
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
      features: undefined,
      media: undefined,

      /**
       * house characteristics
       */
      rooms: undefined,
      bathrooms: undefined,
      area: undefined,
      floors: undefined,
      balcony: 0,
      housing_stock: undefined,
      housing_conditions: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async ({
    place,
    media,
    ...values
  }: z.infer<typeof createHouseSchema>) => {
    const { error, data } = await createHouse({
      ...values,
      // @ts-ignore convert boolean checkbox to enum
      status: values.status ? "PUBLIC" : "PRIVATE",
    });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }

    if (media && media.length) {
      for (const file of media) {
        const { error } = await uploadHouseMedia({
          id: data.id,
          data: (() => {
            const formData = new FormData();
            formData.append("media", file);
            return formData;
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
    isLoading: isLoadingCreate || isLoadingUpload,
  };
};
