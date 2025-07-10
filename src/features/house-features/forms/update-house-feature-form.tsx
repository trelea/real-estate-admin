import React from "react";
import { HouseFeatureType } from "../types";
import { useUpdateHouseFeature } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {
  houseFeature: HouseFeatureType;
}

export const UpdateHouseFeatureForm: React.FC<Props> = ({ houseFeature }) => {
  const { form, onSubmit, isLoading } = useUpdateHouseFeature({
    houseFeature,
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
