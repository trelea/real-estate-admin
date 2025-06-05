import React from "react";
import { LocationSubCategoryType } from "../types";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";
import { useUpdateLocationSubCategory } from "../hooks";

interface Props {
  subcategory: LocationSubCategoryType;
  category: number;
}

export const UpdateLocationSubCategoryForm: React.FC<Props> = ({
  subcategory,
  category,
}) => {
  const { form, onSubmit, isLoading } = useUpdateLocationSubCategory({
    subcategory,
    category,
  });

  return (
    <UpdateMultilingualForm
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
