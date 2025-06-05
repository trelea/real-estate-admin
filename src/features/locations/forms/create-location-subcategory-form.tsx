import React from "react";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useCreateLocationSubCategory } from "../hooks";

interface Props {
  category: number;
}

export const CreateLocationSubCategoryForm: React.FC<Props> = ({
  category,
}) => {
  const { form, onSubmit, isLoading } = useCreateLocationSubCategory({
    category,
  });

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Subcategorie locație (română)",
          placeholder: "Ex: Centru, Cartier rezidențial, Zonă industrială",
        },
        ru: {
          label: "Подкатегория местоположения (русский)",
          placeholder: "Напр: Центр, Жилой район, Промзона",
        },
        en: {
          label: "Location Subcategory (English)",
          placeholder: "e.g. Downtown, Residential area, Industrial zone",
        },
      }}
    />
  );
};
