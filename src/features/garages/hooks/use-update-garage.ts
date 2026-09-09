import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateGarageSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Garage } from "../types";
import {
  useUpdateGarageMutation,
  useUploadGarageMediaMutation,
  useRemoveGarageMediaMutation,
} from "../api";
import { toast } from "sonner";
import { useEffect } from "react";

interface Props {
  garage: Garage;
}

type FormValues = z.infer<typeof updateGarageSchema>;

export const useUpdateGarage = ({ garage }: Props) => {
  const [updateGarage, { isLoading: isLoadingUpdate }] =
    useUpdateGarageMutation();
  const [uploadGarageMedia, { isLoading: isLoadingUpload }] =
    useUploadGarageMediaMutation();
  const [removeGarageMedia, { isLoading: isLoadingRemove }] =
    useRemoveGarageMediaMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(updateGarageSchema),
    defaultValues: {
      offert: garage.offert,
      user: garage.user.id,
      price: Number(garage.price),
      hot: garage.hot,
      status: garage.status === "PUBLIC" ? true : false,
      desc_ro: garage.desc_ro,
      desc_ru: garage.desc_ru,
      desc_en: garage.desc_en,
      location_category: garage.location.location_category.id,
      location_subcategory: garage.location.location_subcategory.id,
      lat: Number(garage.location.lat),
      lng: Number(garage.location.lng),
      street_ro: garage.location.street_ro,
      street_ru: garage.location.street_ru,
      street_en: garage.location.street_en,
      area: garage.area,
      features: garage.features.map((f) => f.id),
      place: garage.location.street_ro,
    },
  });

  /* preload existing media into file input */
  useEffect(() => {
    const loadMedia = async () => {
      if (!garage.media?.length) return;
      const current = form.getValues("media") as (File | string)[] | undefined;
      if (current && current.length) return;
      const files: File[] = await Promise.all(
        garage.media.map(async (m) => {
          const resp = await fetch(m.url);
          const blob = await resp.blob();
          const ext = blob.type.split("/").pop() ?? "jpg";
          const file = new File([blob], `existing-${m.id}.${ext}`, {
            type: blob.type,
          });
          (file as any).existingId = m.id;
          return file;
        })
      );
      form.setValue("media", files, { shouldDirty: false });
    };
    loadMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [garage.id]);

  const onSubmit = async (values: FormValues) => {
    try {
      const { status, media, place, ...val } = values;
      const diff: Record<string, any> = {};
      const isDifferent = (a: any, b: any) => {
        if (Array.isArray(a) && Array.isArray(b)) {
          return (
            JSON.stringify([...a].sort()) !== JSON.stringify([...b].sort())
          );
        }
        return a !== b;
      };

      if (isDifferent(val.price, Number(garage.price))) diff.price = val.price;
      if (isDifferent(val.hot, garage.hot)) diff.hot = val.hot;

      const originalStatusBool = garage.status === "PUBLIC";
      if (isDifferent(status, originalStatusBool)) {
        diff.status = status ? "PUBLIC" : "PRIVATE";
      }

      if (isDifferent(val.offert, garage.offert)) diff.offert = val.offert;

      // descs
      if (isDifferent(val.desc_ro, garage.desc_ro)) diff.desc_ro = val.desc_ro;
      if (isDifferent(val.desc_ru, garage.desc_ru)) diff.desc_ru = val.desc_ru;
      if (isDifferent(val.desc_en, garage.desc_en)) diff.desc_en = val.desc_en;

      // location
      if (
        isDifferent(
          val.location_category,
          garage.location.location_category.id
        )
      )
        diff.location_category = val.location_category;
      if (
        isDifferent(
          val.location_subcategory,
          garage.location.location_subcategory.id
        )
      )
        diff.location_subcategory = val.location_subcategory;
      if (isDifferent(val.lat, Number(garage.location.lat)))
        diff.lat = val.lat;
      if (isDifferent(val.lng, Number(garage.location.lng)))
        diff.lng = val.lng;
      if (isDifferent(val.street_ro, garage.location.street_ro))
        diff.street_ro = val.street_ro;
      if (isDifferent(val.street_ru, garage.location.street_ru))
        diff.street_ru = val.street_ru;
      if (isDifferent(val.street_en, garage.location.street_en))
        diff.street_en = val.street_en;

      // characteristics
      if (isDifferent(val.area, garage.area)) diff.area = val.area;
      if (
        isDifferent(
          val.features,
          garage.features.map((f) => f.id)
        )
      )
        diff.features = val.features;

      /* media diff */
      const originalIds = garage.media.map((m) => m.id);
      let newFiles: File[] = [];
      let toRemove: string[] = [];
      if (media) {
        const existingIdsInSubmitted: string[] = [];
        (media as (string | File)[]).forEach((item) => {
          if (typeof item === "string") existingIdsInSubmitted.push(item);
          else {
            const ex = (item as any).existingId as string | undefined;
            if (ex) existingIdsInSubmitted.push(ex);
            else newFiles.push(item);
          }
        });
        // @ts-ignore
        toRemove = originalIds.filter(
          // @ts-ignore
          (id) => !existingIdsInSubmitted.includes(id)
        );
      }

      const needUpdate = Object.keys(diff).length > 0;
      const needMedia = newFiles.length > 0 || toRemove.length > 0;
      if (!needUpdate && !needMedia) {
        toast.info("Nothing to update");
        return;
      }

      if (needUpdate) {
        await updateGarage({ id: garage.id, data: diff }).unwrap();
      }

      if (toRemove.length) {
        await Promise.all(
          toRemove.map((id) =>
            removeGarageMedia({ id: garage.id, media_id: id }).unwrap()
          )
        );
      }

      if (newFiles.length) {
        await Promise.all(
          newFiles.map((file) => {
            const fd = new FormData();
            fd.append("media", file);
            return uploadGarageMedia({ id: garage.id, data: fd }).unwrap();
          })
        );
      }

      toast.success("Garage updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update garage");
    }
  };

  return {
    form,
    onSubmit,
    isLoading: isLoadingUpdate || isLoadingUpload || isLoadingRemove,
  };
};
