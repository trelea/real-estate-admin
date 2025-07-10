import React from "react";
import { useCreateHouseFeature } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateHouseFeatureForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateHouseFeature();
  const { t } = useTranslation();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: t(
            "houseFeatures.form.feature.ro.label",
            "Caracteristică casă (română)"
          ),
          placeholder: t(
            "houseFeatures.form.feature.ro.placeholder",
            "Ex: Grădină, Garaj, Terasă"
          ),
        },
        ru: {
          label: t(
            "houseFeatures.form.feature.ru.label",
            "Особенность дома (русский)"
          ),
          placeholder: t(
            "houseFeatures.form.feature.ru.placeholder",
            "Напр: Сад, Гараж, Терраса"
          ),
        },
        en: {
          label: t(
            "houseFeatures.form.feature.en.label",
            "House feature (English)"
          ),
          placeholder: t(
            "houseFeatures.form.feature.en.placeholder",
            "e.g. Garden, Garage, Terrace"
          ),
        },
      }}
    />
  );
};
