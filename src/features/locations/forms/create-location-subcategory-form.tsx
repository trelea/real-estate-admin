import React from "react";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useCreateLocationSubCategory } from "../hooks";
import { useTranslation } from "react-i18next";

interface Props {
  category: number;
}

export const CreateLocationSubCategoryForm: React.FC<Props> = ({
  category,
}) => {
  const { form, onSubmit, isLoading } = useCreateLocationSubCategory({
    category,
  });
  const { t } = useTranslation();

  return (
    <CreateMultilingualForm
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
