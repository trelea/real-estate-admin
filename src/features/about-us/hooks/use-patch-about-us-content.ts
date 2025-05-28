import { useForm } from "react-hook-form";
import { AboutUsType } from "../types";
import { z } from "zod";
import { patchAboutUsContentSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatchAboutUsContentMutation } from "../api";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  content: AboutUsType;
}

export const usePatchAboutUsContent = ({ content }: Props) => {
  const [patchAboutUsContent, { isLoading }] = usePatchAboutUsContentMutation();
  const form = useForm<z.infer<typeof patchAboutUsContentSchema>>({
    resolver: zodResolver(patchAboutUsContentSchema),
    defaultValues: {
      content_en: content.content_en,
      content_ro: content.content_ro,
      content_ru: content.content_ru,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof patchAboutUsContentSchema>
  ) => {
    const data: Pick<
      Partial<AboutUsType>,
      "content_en" | "content_ro" | "content_ru"
    > = {};

    (
      Object.entries(values) as [
        keyof Pick<AboutUsType, "content_en" | "content_ro" | "content_ru">,
        string
      ][]
    ).map(([key, val]) => {
      if (content[key] !== val) {
        data[key] = val;
      }
    });

    if (Object.keys(data).length === 0) return;

    const { error } = await patchAboutUsContent(data);
    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
  };

  return { form, onSubmit, isLoading };
};
