import { useForm } from "react-hook-form";
import { type Blog } from "../types";
import { z } from "zod";
import { updateBlogSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { deserializeRtkQueryError, ImageUrlToBlob } from "@/utils";
import { useRemoveBlogThumbMutation, useUpdateBlogMutation } from "../api";
import { isEqual } from "lodash";
import { BlogsContext, BlogsContextProps } from "@/pages/blogs/context";
// import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

interface Props {
  blog: Blog;
}

export const useUpdateBlog = ({ blog }: Props) => {
  const {
    meta: {
      // uriQueries: { page, search },
      setStepUpdateBlogForm,
    },
  } = React.useContext<BlogsContextProps>(BlogsContext);

  const [
    removeBlogThumb,
    { isLoading: removeBlogThumbLoading, isSuccess: removeBlogThumbSuccess },
  ] = useRemoveBlogThumbMutation();
  const [
    updateBlog,
    { isLoading: updateBlogLoading, isSuccess: updateBlogSuccess },
  ] = useUpdateBlogMutation();

  React.useEffect(() => {
    (async () => {
      if (blog.thumbnail !== null && blog.thumbnail !== undefined) {
        const image = await ImageUrlToBlob(blog.thumbnail as string);
        form.setValue("thumbnail", image as File[]);
      }
    })();
  }, []);
  const form = useForm<z.infer<typeof updateBlogSchema>>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      thumbnail: blog.thumbnail || undefined,
      status: blog.status === "PUBLIC" ? true : false,
      /**
       * langs
       */
      title_en: blog.content.title_en,
      title_ro: blog.content.title_ro,
      title_ru: blog.content.title_ru,
      desc_en: blog.content.desc_en,
      desc_ro: blog.content.desc_ro,
      desc_ru: blog.content.desc_ru,
    },
  });

  const onSubmit = async ({
    thumbnail,
    ...updated_data
  }: z.infer<typeof updateBlogSchema>) => {
    if (
      thumbnail !== undefined &&
      ((thumbnail as File[])[0] as File)?.name !== "undefined"
    ) {
      if (thumbnail.length === 0) {
        await removeBlogThumb({ id: blog.id });
      } else {
        const data = new FormData();
        data.append("thumbnail", thumbnail[0]);
        const response = await updateBlog({ id: blog.id, thumbnail: data });
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
    } = blog;

    if (
      !isEqual(updated_data, {
        ...rest,
        status: status === "PRIVATE" ? false : true,
      })
    ) {
      const response = await updateBlog({
        id: blog.id,
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

    setStepUpdateBlogForm(1);
  };

  return {
    form,
    onSubmit,
    isLoading: updateBlogLoading || removeBlogThumbLoading,
    isSuccess: updateBlogSuccess || removeBlogThumbSuccess,
  };
};
