import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <UpdateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: t(
            "locations.form.subcategory.ro.label",
            "Subcategorie locație (română)"
          ),
          placeholder: t(
            "locations.form.subcategory.ro.placeholder",
            "Ex: Centru, Cartier rezidențial, Zonă industrială"
          ),
        },
        ru: {
          label: t(
            "locations.form.subcategory.ru.label",
            "Подкатегория местоположения (русский)"
          ),
          placeholder: t(
            "locations.form.subcategory.ru.placeholder",
            "Напр: Центр, Жилой район, Промзона"
          ),
        },
        en: {
          label: t(
            "locations.form.subcategory.en.label",
            "Location Subcategory (English)"
          ),
          placeholder: t(
            "locations.form.subcategory.en.placeholder",
            "e.g. Downtown, Residential area, Industrial zone"
          ),
        },
      }}
    />
  );
};
