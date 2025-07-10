import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateCommercialSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Commercial } from "../types";
import {
  useUpdateCommercialMutation,
  useUploadCommercialMediaMutation,
  useRemoveCommercialMediaMutation,
} from "../api";
import { toast } from "sonner";
import { useEffect } from "react";

interface Props {
  commercial: Commercial;
}

type FormValues = z.infer<typeof updateCommercialSchema>;

export const useUpdateCommercial = ({ commercial }: Props) => {
  const [updateCommercial, { isLoading: isLoadingUpdateCommercial }] =
    useUpdateCommercialMutation();
  const [uploadCommercialMedia, { isLoading: isLoadingUpdateCommercialMedia }] =
    useUploadCommercialMediaMutation();
  const [removeCommercialMedia, { isLoading: isLoadingRemoveCommercialMedia }] =
    useRemoveCommercialMediaMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(updateCommercialSchema),
    defaultValues: {
      offert: commercial.offert,
      user: commercial.user.id,
      price: Number(commercial.price),
      hot: commercial.hot,
      status: commercial.status === "PUBLIC" ? true : false,
      desc_ro: commercial.desc_ro,
      desc_ru: commercial.desc_ru,
      desc_en: commercial.desc_en,
      location_category: commercial.location.location_category.id,
      location_subcategory: commercial.location.location_subcategory.id,
      lat: Number(commercial.location.lat),
      lng: Number(commercial.location.lng),
      street_ro: commercial.location.street_ro,
      street_ru: commercial.location.street_ru,
      street_en: commercial.location.street_en,
      area: commercial.area,
      floors: commercial.floors,
      // @ts-ignore
      first_line: commercial.first_line,
      // @ts-ignore
      commercial_destinations: commercial.commercial_destinations.map(
        (d) => d.id
      ),
      // @ts-ignore
      commercial_placings: commercial.commercial_placings.map((p) => p.id),
      housing_conditions: commercial.housing_conditions.map((c) => c.id),
      features: commercial.features.map((f) => f.id),
      place: commercial.location.street_ro,
    },
  });

  /* ------------------------------------------------------------------
   * LOAD EXISTING MEDIA INTO FILE UPLOAD FOR PREVIEW (same as apartment)
   * ------------------------------------------------------------------*/
  useEffect(() => {
    const loadExistingMedia = async () => {
      try {
        if (!commercial.media?.length) return;

        const current = form.getValues("media") as
          | (File | string)[]
          | undefined;
        if (current && current.length) return;

        const files: File[] = await Promise.all(
          commercial.media.map(async (m) => {
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
      } catch (err) {
        console.error("Failed to load existing media", err);
      }
    };

    loadExistingMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commercial.id]);

  const onSubmit = async (values: FormValues) => {
    try {
      const { place, status, media, ...val } = values;

      const isDifferent = (a: any, b: any) => {
        if (Array.isArray(a) && Array.isArray(b)) {
          const sa = [...a].sort();
          const sb = [...b].sort();
          return JSON.stringify(sa) !== JSON.stringify(sb);
        }
        return a !== b;
      };

      const payload: Record<string, any> = {};

      if (isDifferent(val.price, Number(commercial.price)))
        payload.price = val.price;
      if (isDifferent(val.hot, commercial.hot)) payload.hot = val.hot;

      const originalStatusBool = commercial.status === "PUBLIC";
      if (isDifferent(status, originalStatusBool)) {
        payload.status = status ? "PUBLIC" : "PRIVATE";
      }

      if (isDifferent(val.offert, commercial.offert))
        payload.offert = val.offert;

      // descriptions
      if (isDifferent(val.desc_ro, commercial.desc_ro))
        payload.desc_ro = val.desc_ro;
      if (isDifferent(val.desc_ru, commercial.desc_ru))
        payload.desc_ru = val.desc_ru;
      if (isDifferent(val.desc_en, commercial.desc_en))
        payload.desc_en = val.desc_en;

      // location related
      if (
        isDifferent(
          val.location_category,
          commercial.location.location_category.id
        )
      )
        payload.location_category = val.location_category;
      if (
        isDifferent(
          val.location_subcategory,
          commercial.location.location_subcategory.id
        )
      )
        payload.location_subcategory = val.location_subcategory;
      if (isDifferent(val.lat, Number(commercial.location.lat)))
        payload.lat = val.lat;
      if (isDifferent(val.lng, Number(commercial.location.lng)))
        payload.lng = val.lng;
      if (isDifferent(val.street_ro, commercial.location.street_ro))
        payload.street_ro = val.street_ro;
      if (isDifferent(val.street_ru, commercial.location.street_ru))
        payload.street_ru = val.street_ru;
      if (isDifferent(val.street_en, commercial.location.street_en))
        payload.street_en = val.street_en;

      // characteristics
      if (isDifferent(val.area, commercial.area)) payload.area = val.area;
      if (isDifferent(val.floors, commercial.floors))
        payload.floors = val.floors;
      // @ts-ignore
      if (isDifferent(val.first_line, (commercial as any).first_line))
        payload.first_line = val.first_line;

      // relations arrays
      if (
        isDifferent(
          val.commercial_destinations,
          commercial.commercial_destinations.map((d) => d.id)
        )
      )
        payload.commercial_destinations = val.commercial_destinations;
      if (
        isDifferent(
          val.commercial_placings,
          commercial.commercial_placings.map((p) => p.id)
        )
      )
        payload.commercial_placings = val.commercial_placings;
      if (
        isDifferent(
          val.housing_conditions,
          commercial.housing_conditions.map((c) => c.id)
        )
      )
        payload.housing_conditions = val.housing_conditions;
      if (
        isDifferent(
          val.features,
          commercial.features.map((f) => f.id)
        )
      )
        payload.features = val.features;

      /* -------------------- MEDIA CHANGES -------------------- */
      const originalMediaIds = commercial.media.map((m) => m.id);

      let newFiles: File[] = [];
      let toRemove: string[] = [];

      if (media) {
        const submittedMedia = media as (string | File)[];

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
        await updateCommercial({ id: commercial.id, data: payload }).unwrap();
      }

      /* -------------------- REMOVE MEDIA -------------------- */
      if (toRemove.length) {
        await Promise.all(
          toRemove.map((media_id) =>
            // @ts-ignore
            removeCommercialMedia({ id: commercial.id, media_id }).unwrap()
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
            return uploadCommercialMedia({
              id: commercial.id,
              data: fd,
            }).unwrap();
          })
        );
      }

      toast.success("Commercial updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update commercial");
    }
  };

  return {
    form,
    onSubmit,
    isLoading:
      isLoadingUpdateCommercial ||
      isLoadingUpdateCommercialMedia ||
      isLoadingRemoveCommercialMedia,
  };
};
