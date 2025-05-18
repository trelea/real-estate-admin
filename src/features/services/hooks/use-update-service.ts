import React from "react";
import { type Service } from "../types";
import {
  ServicesContext,
  ServicesContextProps,
} from "@/pages/services/context";
import {
  useRemoveServiceThumbMutation,
  useUpdateServiceMutation,
} from "../api";
import { deserializeRtkQueryError, ImageUrlToBlob } from "@/utils";
import { useForm } from "react-hook-form";
import { updateServiceSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";

interface Props {
  service: Service;
}

export const useUpdateService = ({ service }: Props) => {
  const {
    meta: {
      // uriQueries: { page, search },
      setStepUpdateServiceForm,
    },
  } = React.useContext<ServicesContextProps>(ServicesContext);

  const [
    removeServiceThumb,
    { isLoading: removeBlogThumbLoading, isSuccess: removeBlogThumbSuccess },
  ] = useRemoveServiceThumbMutation();
  const [
    updateService,
    { isLoading: updateBlogLoading, isSuccess: updateBlogSuccess },
  ] = useUpdateServiceMutation();

  React.useEffect(() => {
    (async () => {
      if (service.thumbnail !== null && service.thumbnail !== undefined) {
        const image = await ImageUrlToBlob(service.thumbnail as string);
        form.setValue("thumbnail", image as File[]);
      }
    })();
  }, []);
  const form = useForm<z.infer<typeof updateServiceSchema>>({
    resolver: zodResolver(updateServiceSchema),
    defaultValues: {
      thumbnail: service.thumbnail || undefined,
      status: service.status === "PUBLIC" ? true : false,
      /**
       * langs
       */
      title_en: service.content.title_en,
      title_ro: service.content.title_ro,
      title_ru: service.content.title_ru,
      desc_en: service.content.desc_en,
      desc_ro: service.content.desc_ro,
      desc_ru: service.content.desc_ru,
    },
  });

  const onSubmit = async ({
    thumbnail,
    ...updated_data
  }: z.infer<typeof updateServiceSchema>) => {
    if (
      thumbnail !== undefined &&
      ((thumbnail as File[])[0] as File)?.name !== "undefined"
    ) {
      if (thumbnail.length === 0) {
        await removeServiceThumb({ id: service.id });
      } else {
        const data = new FormData();
        data.append("thumbnail", thumbnail[0]);
        const response = await updateService({
          id: service.id,
          thumbnail: data,
        });
        if (response.error) {
          deserializeRtkQueryError<{ message: string }>(response.error, {
            toasts: [(err) => err.data.message, (err) => err.message],
          });
        }
      }
    }

    /**
     * object destructuring
     */
    const {
      content: { created_at, updated_at, id, ...rest },
      status,
    } = service;

    if (
      !isEqual(updated_data, {
        ...rest,
        status: status === "PRIVATE" ? false : true,
      })
    ) {
      const response = await updateService({
        id: service.id,
        blog: {
          ...updated_data,
          status: updated_data.status ? "PUBLIC" : "PRIVATE",
        },
        // params: { page, search, limit: DEFAULT_PAGINATION_LIMIT },
      });
      if (response.error) {
        deserializeRtkQueryError<{ message: string }>(response.error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    }

    setStepUpdateServiceForm(1);
  };

  return {
    form,
    onSubmit,
    isLoading: updateBlogLoading || removeBlogThumbLoading,
    isSuccess: updateBlogSuccess || removeBlogThumbSuccess,
  };
};
