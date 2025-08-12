import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useUpdateApartmentMutation,
  useUploadApartmentMediaMutation,
  useRemoveApartmentMediaMutation,
} from "../api";
import { Apartment } from "../types/index.d";
import { toast } from "sonner";
import { updateApartmentFormSchema } from "../validation";
import { z } from "zod";
import { useEffect } from "react";

interface Props {
  apartment: Apartment;
}

type FormValues = z.infer<typeof updateApartmentFormSchema>;

export const useUpdateApartment = ({ apartment }: Props) => {
  const [updateApartment] = useUpdateApartmentMutation();
  const [uploadApartmentMedia] = useUploadApartmentMediaMutation();
  const [removeApartmentMedia] = useRemoveApartmentMediaMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(updateApartmentFormSchema),
    defaultValues: {
      // @ts-ignore
      offert: apartment.offert,
      user: apartment.user.id,
      price: Number(apartment.price),
      hot: apartment.hot,
      // @ts-ignore
      status: apartment.status === "PUBLIC" ? true : false,
      desc_ro: apartment.desc_ro,
      desc_ru: apartment.desc_ru,
      desc_en: apartment.desc_en,
      location_category: apartment.location.location_category.id,
      location_subcategory: apartment.location.location_subcategory.id,
      lat: Number(apartment.location.lat),
      lng: Number(apartment.location.lng),
      street_ro: apartment.location.street_ro,
      street_ru: apartment.location.street_ru,
      street_en: apartment.location.street_en,
      rooms: apartment.rooms,
      sanitaries: apartment.sanitaries,
      surface: apartment.surface,
      floor: apartment.floor,
      floors: apartment.floors,
      housing_stock: apartment.housing_stock.id,
      housing_conditions: apartment.housing_conditions.map((c) => c.id),
      features: apartment.features.map((f) => f.id),
      // hui snim
      place: apartment.location.street_ro,
    },
  });

  /* ------------------------------------------------------------------
   * LOAD EXISTING MEDIA INTO FILE UPLOAD FOR PREVIEW
   * ------------------------------------------------------------------*/
  useEffect(() => {
    const loadExistingMedia = async () => {
      try {
        if (!apartment.media?.length) return;

        // avoid re-adding if already set
        const current = form.getValues("media") as
          | (File | string)[]
          | undefined;
        if (current && current.length) return;

        const files: File[] = await Promise.all(
          apartment.media.map(async (m) => {
            const response = await fetch(m.url);
            const blob = await response.blob();
            const extension = blob.type.split("/").pop() ?? "jpg";
            const file = new File([blob], `existing-${m.id}.${extension}`, {
              type: blob.type,
            });
            // attach the original id so we can discriminate later
            (file as any).existingId = m.id;
            return file;
          })
        );

        form.setValue("media", files, { shouldDirty: false });
      } catch (err) {
        console.error("Failed to load existing media for preview", err);
      }
    };

    // fire once on mount
    loadExistingMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartment.id]);

  const onSubmit = async (values: FormValues) => {
    try {
      const { place, status, ...val } = values;

      // helper to compare primitive or array values
      const isDifferent = (a: any, b: any) => {
        if (Array.isArray(a) && Array.isArray(b)) {
          const sa = [...a].sort();
          const sb = [...b].sort();
          return JSON.stringify(sa) !== JSON.stringify(sb);
        }
        return a !== b;
      };

      const payload: Record<string, any> = {};

      if (isDifferent(val.price, Number(apartment.price)))
        payload.price = val.price;
      if (isDifferent(val.hot, apartment.hot)) payload.hot = val.hot;

      // status: boolean form -> string in DB
      const originalStatusBool = apartment.status === "PUBLIC";
      if (isDifferent(status, originalStatusBool)) {
        payload.status = status ? "PUBLIC" : "PRIVATE";
      }

      if (isDifferent(val.offert, apartment.offert))
        payload.offert = val.offert;

      // descriptions
      if (isDifferent(val.desc_ro, apartment.desc_ro))
        payload.desc_ro = val.desc_ro;
      if (isDifferent(val.desc_ru, apartment.desc_ru))
        payload.desc_ru = val.desc_ru;
      if (isDifferent(val.desc_en, apartment.desc_en))
        payload.desc_en = val.desc_en;

      // location related
      if (
        isDifferent(
          val.location_category,
          apartment.location.location_category.id
        )
      )
        payload.location_category = val.location_category;
      if (
        isDifferent(
          val.location_subcategory,
          apartment.location.location_subcategory.id
        )
      )
        payload.location_subcategory = val.location_subcategory;
      if (isDifferent(val.lat, Number(apartment.location.lat)))
        payload.lat = val.lat;
      if (isDifferent(val.lng, Number(apartment.location.lng)))
        payload.lng = val.lng;
      if (isDifferent(val.street_ro, apartment.location.street_ro))
        payload.street_ro = val.street_ro;
      if (isDifferent(val.street_ru, apartment.location.street_ru))
        payload.street_ru = val.street_ru;
      if (isDifferent(val.street_en, apartment.location.street_en))
        payload.street_en = val.street_en;

      // characteristics
      if (isDifferent(val.rooms, apartment.rooms)) payload.rooms = val.rooms;
      if (isDifferent(val.sanitaries, apartment.sanitaries))
        payload.sanitaries = val.sanitaries;
      if (isDifferent(val.surface, apartment.surface))
        payload.surface = val.surface;
      if (isDifferent(val.floor, apartment.floor)) payload.floor = val.floor;
      if (isDifferent(val.floors, apartment.floors))
        payload.floors = val.floors;

      // relations
      if (isDifferent(val.housing_stock, apartment.housing_stock.id))
        payload.housing_stock = val.housing_stock;
      if (
        isDifferent(
          val.housing_conditions,
          apartment.housing_conditions.map((c) => c.id)
        )
      )
        payload.housing_conditions = val.housing_conditions;
      if (
        isDifferent(
          val.features,
          apartment.features.map((f) => f.id)
        )
      )
        payload.features = val.features;

      // user
      if (isDifferent(val.user, apartment.user)) payload.user = val.user;

      /* -------------------- MEDIA CHANGES -------------------- */
      const originalMediaIds = apartment.media.map((m) => m.id);

      let newFiles: File[] = [];
      let toRemove: string[] = [];

      if (val.media) {
        const submittedMedia = val.media as (string | File)[];

        const existingIdsInSubmitted: string[] = [];

        newFiles = [];

        submittedMedia.forEach((item) => {
          if (typeof item === "string") {
            existingIdsInSubmitted.push(item);
          } else if (item instanceof File) {
            const existingId = (item as any).existingId as string | undefined;
            if (existingId) {
              existingIdsInSubmitted.push(existingId);
            } else {
              newFiles.push(item);
            }
          }
        });

        // @ts-ignore
        toRemove = originalMediaIds.filter(
          // @ts-ignore
          (id) => !existingIdsInSubmitted.includes(id)
        );
      }

      const hasUpdatePayload = Object.keys(payload).length > 0;
      const hasMediaChanges = newFiles.length > 0 || toRemove.length > 0;

      if (!hasUpdatePayload && !hasMediaChanges) {
        toast.info("Nothing to update");
        return;
      }

      /* -------------------- UPDATE DATA -------------------- */
      if (hasUpdatePayload) {
        // @ts-ignore
        await updateApartment({ id: apartment.id, data: payload }).unwrap();
      }

      /* -------------------- REMOVE MEDIA -------------------- */
      if (toRemove.length) {
        await Promise.all(
          toRemove.map((media_id) =>
            // @ts-ignore
            removeApartmentMedia({ id: apartment.id, media_id }).unwrap()
          )
        );
      }

      /* -------------------- UPLOAD NEW MEDIA -------------------- */
      if (newFiles.length) {
        await Promise.all(
          newFiles.map((file) => {
            const fd = new FormData();
            fd.append("media", file);
            // @ts-ignore
            return uploadApartmentMedia({
              id: apartment.id,
              data: fd,
            }).unwrap();
          })
        );
      }

      toast.success("Apartment updated successfully");
    } catch (error) {
      toast.error("Failed to update apartment");
    }
  };

  return {
    form,
    onSubmit,
  };
};
