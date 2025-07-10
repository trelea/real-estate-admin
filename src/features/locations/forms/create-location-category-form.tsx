import React from "react";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useCreateLocationCategory } from "../hooks";
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateLocationCategoryForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useCreateLocationCategory();
  const { t } = useTranslation();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: t(
            "locations.form.category.ro.label",
            "Categorie locație (română)"
          ),
          placeholder: t(
            "locations.form.category.ro.placeholder",
            "Ex: Urban, Rural, Suburban"
          ),
        },
        ru: {
          label: t(
            "locations.form.category.ru.label",
            "Категория местоположения (русский)"
          ),
          placeholder: t(
            "locations.form.category.ru.placeholder",
            "Напр: Город, Деревня, Пригород"
          ),
        },
        en: {
          label: t(
            "locations.form.category.en.label",
            "Location Category (English)"
          ),
          placeholder: t(
            "locations.form.category.en.placeholder",
            "e.g. Urban, Rural, Suburban"
          ),
        },
      }}
    />
  );
};
