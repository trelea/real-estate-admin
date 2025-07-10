import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateTerrainSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terrain } from "../types";
import {
  useUpdateTerrainMutation,
  useUploadTerrainMediaMutation,
  useRemoveTerrainMediaMutation,
} from "../api";
import { toast } from "sonner";
import { useEffect } from "react";

interface Props {
  terrain: Terrain;
}

type FormValues = z.infer<typeof updateTerrainSchema>;

export const useUpdateTerrain = ({ terrain }: Props) => {
  const [updateTerrain, { isLoading: isLoadingUpdate }] =
    useUpdateTerrainMutation();
  const [uploadTerrainMedia, { isLoading: isLoadingUpload }] =
    useUploadTerrainMediaMutation();
  const [removeTerrainMedia, { isLoading: isLoadingRemove }] =
    useRemoveTerrainMediaMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(updateTerrainSchema),
    defaultValues: {
      offert: terrain.offert,
      user: terrain.user.id,
      price: Number(terrain.price),
      hot: terrain.hot,
      status: terrain.status === "PUBLIC" ? true : false,
      desc_ro: terrain.desc_ro,
      desc_ru: terrain.desc_ru,
      desc_en: terrain.desc_en,
      location_category: terrain.location.location_category.id,
      location_subcategory: terrain.location.location_subcategory.id,
      lat: Number(terrain.location.lat),
      lng: Number(terrain.location.lng),
      street_ro: terrain.location.street_ro,
      street_ru: terrain.location.street_ru,
      street_en: terrain.location.street_en,
      area: terrain.area,
      usability: terrain.usability.map((u) => u.id),
      features: terrain.features.map((f) => f.id),
      place: terrain.location.street_ro,
    },
  });

  /* preload existing media into file input */
  useEffect(() => {
    const loadMedia = async () => {
      if (!terrain.media?.length) return;
      const current = form.getValues("media") as (File | string)[] | undefined;
      if (current && current.length) return;
      const files: File[] = await Promise.all(
        terrain.media.map(async (m) => {
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
  }, [terrain.id]);

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

      if (isDifferent(val.price, Number(terrain.price))) diff.price = val.price;
      if (isDifferent(val.hot, terrain.hot)) diff.hot = val.hot;

      const originalStatusBool = terrain.status === "PUBLIC";
      if (isDifferent(status, originalStatusBool)) {
        diff.status = status ? "PUBLIC" : "PRIVATE";
      }

      if (isDifferent(val.offert, terrain.offert)) diff.offert = val.offert;

      // descs
      if (isDifferent(val.desc_ro, terrain.desc_ro)) diff.desc_ro = val.desc_ro;
      if (isDifferent(val.desc_ru, terrain.desc_ru)) diff.desc_ru = val.desc_ru;
      if (isDifferent(val.desc_en, terrain.desc_en)) diff.desc_en = val.desc_en;

      // location
      if (
        isDifferent(
          val.location_category,
          terrain.location.location_category.id
        )
      )
        diff.location_category = val.location_category;
      if (
        isDifferent(
          val.location_subcategory,
          terrain.location.location_subcategory.id
        )
      )
        diff.location_subcategory = val.location_subcategory;
      if (isDifferent(val.lat, Number(terrain.location.lat)))
        diff.lat = val.lat;
      if (isDifferent(val.lng, Number(terrain.location.lng)))
        diff.lng = val.lng;
      if (isDifferent(val.street_ro, terrain.location.street_ro))
        diff.street_ro = val.street_ro;
      if (isDifferent(val.street_ru, terrain.location.street_ru))
        diff.street_ru = val.street_ru;
      if (isDifferent(val.street_en, terrain.location.street_en))
        diff.street_en = val.street_en;

      // characteristics
      if (isDifferent(val.area, terrain.area)) diff.area = val.area;
      if (
        isDifferent(
          val.usability,
          terrain.usability.map((u) => u.id)
        )
      )
        diff.usability = val.usability;
      if (
        isDifferent(
          val.features,
          terrain.features.map((f) => f.id)
        )
      )
        diff.features = val.features;

      /* media diff */
      const originalIds = terrain.media.map((m) => m.id);
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
        await updateTerrain({ id: terrain.id, data: diff }).unwrap();
      }

      if (toRemove.length) {
        await Promise.all(
          toRemove.map((id) =>
            removeTerrainMedia({ id: terrain.id, media_id: id }).unwrap()
          )
        );
      }

      if (newFiles.length) {
        await Promise.all(
          newFiles.map((file) => {
            const fd = new FormData();
            fd.append("media", file);
            return uploadTerrainMedia({ id: terrain.id, data: fd }).unwrap();
          })
        );
      }

      toast.success("Terrain updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update terrain");
    }
  };

  return {
    form,
    onSubmit,
    isLoading: isLoadingUpdate || isLoadingUpload || isLoadingRemove,
  };
};
