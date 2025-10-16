import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useUpdateHouseMutation,
  useUploadHouseMediaMutation,
  useRemoveHouseMediaMutation,
} from "../api";
import { House } from "../types/index.d";
import { toast } from "sonner";
import { createHouseSchema } from "../validation";
import { z } from "zod";
import { useEffect } from "react";
import { axiosInstance } from "@/services";
import { useTranslation } from "react-i18next";

// derive an update schema where all fields optional
const updateHouseFormSchema = createHouseSchema.partial();

type FormValues = z.infer<typeof updateHouseFormSchema> & {
  media?: (string | File)[];
};

interface Props {
  house: House;
}

export const useUpdateHouse = ({ house }: Props) => {
  const { i18n } = useTranslation();
  const currentLanguage = (i18n.language || "en") as "ro" | "ru" | "en";
  const [updateHouse] = useUpdateHouseMutation();
  const [uploadHouseMedia] = useUploadHouseMediaMutation();
  const [removeHouseMedia] = useRemoveHouseMediaMutation();

  // Get street value based on current admin language
  const getStreetForCurrentLanguage = () => {
    if (currentLanguage === "ro") return house.location.street_ro;
    if (currentLanguage === "ru") return house.location.street_ru;
    return house.location.street_en;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(updateHouseFormSchema),
    defaultValues: {
      offert: house.offert,
      user: house.user.id,
      price: Number(house.price),
      hot: house.hot,
      // @ts-ignore
      status: house.status === "PUBLIC" ? true : false,
      desc_ro: house.desc_ro,
      desc_ru: house.desc_ru,
      desc_en: house.desc_en,
      location_category: house.location.location_category.id,
      location_subcategory: house.location.location_subcategory.id,
      lat: Number(house.location.lat),
      lng: Number(house.location.lng),
      street_ro: house.location.street_ro,
      street_ru: house.location.street_ru,
      street_en: house.location.street_en,
      rooms: house.rooms,
      bathrooms: house.bathrooms,
      area: house.area,
      floors: house.floors,
      balcony: house.balcony,
      housing_stock: house.housing_stock.id,
      housing_conditions: house.housing_conditions.map((c) => c.id),
      features: house.features.map((f) => f.id),
      place: getStreetForCurrentLanguage(),
    },
  });

  /* Load existing media into file upload for preview */
  useEffect(() => {
    const loadExistingMedia = async () => {
      try {
        if (!house.media?.length) return;

        const current = form.getValues("media") as File[] | undefined;
        if (current && current.length) return;

        const files: File[] = await Promise.all(
          house.media.map(async (m) => {
            const response = await axiosInstance.get("/proxy-media", {
              params: {
                url: m.url,
              },
              responseType: "blob",
            });

            const blob = response.data;
            const extension = blob.type.split("/").pop() ?? "jpg";
            const file = new File([blob], `existing-${m.id}.${extension}`, {
              type: blob.type,
            });

            (file as any).existingId = m.id;
            return file;
          })
        );

        form.setValue("media", files, { shouldDirty: false });
      } catch (err) {
        console.error("Failed to load existing media", err);
      }
    };

    loadExistingMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [house.id]);

  const isDifferent = (a: any, b: any) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      const sa = [...a].sort();
      const sb = [...b].sort();
      return JSON.stringify(sa) !== JSON.stringify(sb);
    }
    return a !== b;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const { status, place, media, ...val } = values;

      const payload: Record<string, any> = {};
      if (isDifferent(val.price, Number(house.price)))
        payload.price = val.price;
      if (isDifferent(val.hot, house.hot)) payload.hot = val.hot;

      const originalStatusBool = house.status === "PUBLIC";
      if (isDifferent(status, originalStatusBool)) {
        payload.status = status ? "PUBLIC" : "PRIVATE";
      }

      if (isDifferent(val.offert, house.offert)) payload.offert = val.offert;

      if (isDifferent(val.desc_ro, house.desc_ro))
        payload.desc_ro = val.desc_ro;
      if (isDifferent(val.desc_ru, house.desc_ru))
        payload.desc_ru = val.desc_ru;
      if (isDifferent(val.desc_en, house.desc_en))
        payload.desc_en = val.desc_en;

      if (
        isDifferent(val.location_category, house.location.location_category.id)
      )
        payload.location_category = val.location_category;
      if (
        isDifferent(
          val.location_subcategory,
          house.location.location_subcategory.id
        )
      )
        payload.location_subcategory = val.location_subcategory;
      if (isDifferent(val.lat, Number(house.location.lat)))
        payload.lat = val.lat;
      if (isDifferent(val.lng, Number(house.location.lng)))
        payload.lng = val.lng;
      if (isDifferent(val.street_ro, house.location.street_ro))
        payload.street_ro = val.street_ro;
      if (isDifferent(val.street_ru, house.location.street_ru))
        payload.street_ru = val.street_ru;
      if (isDifferent(val.street_en, house.location.street_en))
        payload.street_en = val.street_en;

      if (isDifferent(val.rooms, house.rooms)) payload.rooms = val.rooms;
      if (isDifferent(val.bathrooms, house.bathrooms))
        payload.bathrooms = val.bathrooms;
      if (isDifferent(val.area, house.area)) payload.area = val.area;
      if (isDifferent(val.floors, house.floors)) payload.floors = val.floors;
      if (isDifferent(val.balcony, house.balcony))
        payload.balcony = val.balcony;

      if (isDifferent(val.housing_stock, house.housing_stock.id))
        payload.housing_stock = val.housing_stock;
      if (
        isDifferent(
          val.housing_conditions,
          house.housing_conditions.map((c) => c.id)
        )
      )
        payload.housing_conditions = val.housing_conditions;
      if (
        isDifferent(
          val.features,
          house.features.map((f) => f.id)
        )
      )
        payload.features = val.features;
      // user
      if (isDifferent(val.user, house.user.id)) payload.user = val.user;

      /* media diff */
      const origIds = house.media.map((m) => m.id);
      let newFiles: File[] = [];
      let toRemove: string[] = [];
      if (media) {
        const submitted = media as (string | File)[];
        const existingIdsInSubmitted: string[] = [];
        newFiles = [];
        submitted.forEach((m) => {
          if (m instanceof File) {
            const exId = (m as any).existingId;
            if (exId && origIds.includes(exId)) {
              existingIdsInSubmitted.push(exId);
            } else {
              newFiles.push(m);
            }
          }
        });
        // @ts-ignore
        toRemove = origIds.filter(
          (id) => !existingIdsInSubmitted.includes(id as any)
        );
      }

      const hasUpdatePayload = Object.keys(payload).length > 0;
      const hasMediaChanges = newFiles.length > 0 || toRemove.length > 0;

      if (!hasUpdatePayload && !hasMediaChanges) {
        toast.info("Nothing to update");
        return;
      }

      /* perform requests */
      if (hasUpdatePayload) {
        // @ts-ignore
        await updateHouse({
          id: house.id,
          data: payload as any,
        }).unwrap();
      }

      if (toRemove.length) {
        await Promise.all(
          toRemove.map((media_id) =>
            // @ts-ignore
            removeHouseMedia({
              id: house.id,
              media_id,
            }).unwrap()
          )
        );
      }

      if (newFiles.length) {
        await Promise.all(
          newFiles.map((file) => {
            const fd = new FormData();
            fd.append("media", file);
            // @ts-ignore
            return uploadHouseMedia({
              id: house.id,
              data: fd,
            }).unwrap();
          })
        );
      }

      toast.success("House updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update house");
    }
  };

  return { form, onSubmit };
};
