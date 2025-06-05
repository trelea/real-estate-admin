import React from "react";
import { LocationCategoryType } from "../types";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";
import { useUpdateLocationCategory } from "../hooks";

interface Props {
  category: LocationCategoryType;
}

export const UpdateLocationCategoryForm: React.FC<Props> = ({ category }) => {
  const { form, onSubmit, isLoading } = useUpdateLocationCategory({
    category,
  });

  return (
    <UpdateMultilingualForm
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
