import React from "react";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useCreateLocationCategory } from "../hooks";

interface Props {}

export const CreateLocationCategoryForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useCreateLocationCategory();
  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Categorie locație (română)",
          placeholder: "Ex: Urban, Rural, Suburban",
        },
        ru: {
          label: "Категория местоположения (русский)",
          placeholder: "Напр: Город, Деревня, Пригород",
        },
        en: {
          label: "Location Category (English)",
          placeholder: "e.g. Urban, Rural, Suburban",
        },
      }}
    />
  );
};
