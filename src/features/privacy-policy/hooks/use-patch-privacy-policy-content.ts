import { useForm } from "react-hook-form";
import { PrivacyPolicyType } from "../types";
import { z } from "zod";
import { patchPrivacyPolicyContentSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatchPrivacyPolicyContentMutation } from "../api";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  content: PrivacyPolicyType;
}

export const usePatchPrivacyPolicyContent = ({ content }: Props) => {
  const [patchPrivacyPolicyContent, { isLoading }] =
    usePatchPrivacyPolicyContentMutation();
  const form = useForm<z.infer<typeof patchPrivacyPolicyContentSchema>>({
    resolver: zodResolver(patchPrivacyPolicyContentSchema),
    defaultValues: {
      content_en: content.content_en,
      content_ro: content.content_ro,
      content_ru: content.content_ru,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof patchPrivacyPolicyContentSchema>
  ) => {
    const data: Pick<
      Partial<PrivacyPolicyType>,
      "content_en" | "content_ro" | "content_ru"
    > = {};

    (
      Object.entries(values) as [
        keyof Pick<
          PrivacyPolicyType,
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
      const { error } = await patchPrivacyPolicyContent(data);

      if (error) {
        return deserializeRtkQueryError<{ message: string }>(error, {
          toasts: [(err) => err.data.message, (err) => err.message],
        });
      }
    }
  };

  return { form, onSubmit, isLoading };
};
