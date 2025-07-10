import { useForm } from "react-hook-form";
import { TermsAndConditionsType } from "../types";
import { z } from "zod";
import { patchTermsAndConditionsContentSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatchTermsAndConditionsContentMutation } from "../api";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  content: TermsAndConditionsType;
}

export const usePatchTermsAndConditionsContent = ({ content }: Props) => {
  const [patchTermsAndConditionsContent, { isLoading }] =
    usePatchTermsAndConditionsContentMutation();

  const form = useForm<z.infer<typeof patchTermsAndConditionsContentSchema>>({
    resolver: zodResolver(patchTermsAndConditionsContentSchema),
    defaultValues: {
      content_en: content.content_en,
      content_ro: content.content_ro,
      content_ru: content.content_ru,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof patchTermsAndConditionsContentSchema>
  ) => {
    const data: Pick<
      Partial<TermsAndConditionsType>,
      "content_en" | "content_ro" | "content_ru"
    > = {};

    (
      Object.entries(values) as [
        keyof Pick<
          TermsAndConditionsType,
          "content_en" | "content_ro" | "content_ru"
        >,
        string
      ][]
    ).map(([key, val]) => {
      if (content[key] !== val) {
        data[key] = val;
      }
    });

    if (Object.keys(data).length !== 0) {
      const { error } = await patchTermsAndConditionsContent(data);

      if (error) {
        return deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    }
  };

  return { form, onSubmit, isLoading };
};
