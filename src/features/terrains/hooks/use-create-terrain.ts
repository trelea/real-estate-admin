import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTerrainSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/features/auth/types";
import {
  useCreateTerrainMutation,
  useUploadTerrainMediaMutation,
} from "../api";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const useCreateTerrain = ({ user }: Props) => {
  const [createTerrain, { isLoading: isLoadingCreateTerrain }] =
    useCreateTerrainMutation();
  const [uploadTerrainMedia, { isLoading: isLoadingUploadTerrainMedia }] =
    useUploadTerrainMediaMutation();

  const form = useForm<z.infer<typeof createTerrainSchema>>({
    resolver: zodResolver(createTerrainSchema),
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
      /** terrain characteristics */
      area: undefined,
      usability: undefined,
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
  }: z.infer<typeof createTerrainSchema>) => {
    const { error, data } = await createTerrain({
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
        const { error } = await uploadTerrainMedia({
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
    isLoading: isLoadingCreateTerrain || isLoadingUploadTerrainMedia,
  };
};
