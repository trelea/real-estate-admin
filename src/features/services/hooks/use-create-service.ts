import {
  ServicesContext,
  ServicesContextProps,
} from "@/pages/services/context";
import React from "react";
import { useCreateServiceMutation } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ServiceStatus } from "../types";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import { deserializeRtkQueryError } from "@/utils";
import { createServiceSchema } from "../validation";

export const useCreateService = () => {
  const {
    meta: {
      uriQueries: { page, search },
      setOpenDialogCreateService,
    },
  } = React.useContext<ServicesContextProps>(ServicesContext);

  const [createService, { isError, isLoading, isSuccess }] =
    useCreateServiceMutation();
  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      thumbnail: undefined,
      status: undefined,
      title_en: undefined,
      title_ro: undefined,
      title_ru: undefined,
      desc_en: undefined,
      desc_ro: undefined,
      desc_ru: undefined,
      content_en: undefined,
      content_ro: undefined,
      content_ru: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof createServiceSchema>) => {
    const data = new FormData();
    values.thumbnail && data.append("thumbnail", values.thumbnail[0]);
    values.status &&
      data.append(
        "status",
        values.status
          ? ("PUBLIC" as ServiceStatus)
          : ("PRIVATE" as ServiceStatus)
      );
    data.append("title_en", values.title_en);
    data.append("title_ro", values.title_ro);
    data.append("title_ru", values.title_ru);
    data.append("desc_en", values.desc_en);
    data.append("desc_ro", values.desc_ro);
    data.append("desc_ru", values.desc_ru);
    data.append("content_en", values.content_en);
    data.append("content_ro", values.content_ro);
    data.append("content_ru", values.content_ru);

    const response = await createService({
      data,
      params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });
    if (response.error) {
      return deserializeRtkQueryError<{ message: string }>(response.error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
    setOpenDialogCreateService(false);
  };

  return { form, onSubmit, isError, isLoading, isSuccess };
};
