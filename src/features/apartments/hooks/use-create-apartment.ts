import { useForm } from "react-hook-form";
import { z } from "zod";
import { createApartmentSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/features/auth/types";
import {
  useCreateApartmentMutation,
  useUploadApartmentMediaMutation,
} from "../api";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const useCreateApartment = ({ user }: Props) => {
  const [createApartment, { isLoading: isLoadingCreateApartment }] =
    useCreateApartmentMutation();
  const [uploadApartmentMedia, { isLoading: isLoadingUploadApartmentMedia }] =
    useUploadApartmentMediaMutation();

  const form = useForm<z.infer<typeof createApartmentSchema>>({
    resolver: zodResolver(createApartmentSchema),
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
       * apartment caracteristics
       */
      features: undefined,
      floor: undefined,
      floors: undefined,
      housing_conditions: undefined,
      housing_stock: undefined,
      rooms: undefined,
      sanitaries: undefined,
      surface: undefined,

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
  }: z.infer<typeof createApartmentSchema>) => {
    const { error, data } = await createApartment({
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
      const { error } = await uploadApartmentMedia({
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
    isLoading: isLoadingCreateApartment || isLoadingUploadApartmentMedia,
  };
};
