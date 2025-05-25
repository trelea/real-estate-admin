import { Form } from "@/components/ui/form";
import React from "react";
import { FieldItem } from "../components/field";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { LanguagesFieldsType } from "@/types";
import { z } from "zod";
import { updateMultilingualSchema } from "../validation";

interface Props {
  form: UseFormReturn<Partial<LanguagesFieldsType>>;
  onSubmit: (
    _: z.infer<typeof updateMultilingualSchema>
  ) => void | unknown | undefined;
  isLoading?: boolean;
  fields?: Partial<{
    ro: Partial<{ label: string; placeholder: string }>;
    ru: Partial<{ label: string; placeholder: string }>;
    en: Partial<{ label: string; placeholder: string }>;
  }>;
}

export const UpdateMultilingualForm: React.FC<Props> = ({
  form,
  onSubmit,
  isLoading,
  fields,
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FieldItem
          name="ro"
          type="text"
          control={form}
          label={fields?.ro?.label}
          placeholder={fields?.ro?.placeholder}
          displayErrorMessage
        />

        <FieldItem
          name="ru"
          type="text"
          control={form}
          label={fields?.ru?.label}
          placeholder={fields?.ru?.placeholder}
          displayErrorMessage
        />

        <FieldItem
          name="en"
          type="text"
          control={form}
          label={fields?.en?.label}
          placeholder={fields?.en?.placeholder}
          displayErrorMessage
        />

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full font-normal text-base h-fit p-0 m-0 py-3 rounded-xl"
        >
          Update
        </Button>
      </form>
    </Form>
  );
};
