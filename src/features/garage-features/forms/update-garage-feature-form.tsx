import React from "react";
import { GarageFeatureType } from "../types";
import { useUpdateGarageFeature } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {
  garageFeature: GarageFeatureType;
}

export const UpdateGarageFeatureForm: React.FC<Props> = ({
  garageFeature,
}) => {
  const { form, onSubmit, isLoading } = useUpdateGarageFeature({
    garageFeature,
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
            "garageFeatures.form.feature.ro.label",
            "Caracteristică teren (română)"
          ),
          placeholder: t(
            "garageFeatures.form.feature.ro.placeholder",
            "Ex: Pădure, Lac, Deal"
          ),
        },
        ru: {
          label: t(
            "garageFeatures.form.feature.ru.label",
            "Особенность участка (русский)"
          ),
          placeholder: t(
            "garageFeatures.form.feature.ru.placeholder",
            "Напр: Лес, Озеро, Холм"
          ),
        },
        en: {
          label: t(
            "garageFeatures.form.feature.en.label",
            "Garage feature (English)"
          ),
          placeholder: t(
            "garageFeatures.form.feature.en.placeholder",
            "e.g. Forest, Lake, Hill"
          ),
        },
      }}
    />
  );
};
