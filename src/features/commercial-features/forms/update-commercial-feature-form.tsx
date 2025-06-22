import React from "react";
import { CommercialFeatureType } from "../types";
import { useUpdateCommercialFeature } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {
  commercialFeature: CommercialFeatureType;
}

export const UpdateCommercialFeatureForm: React.FC<Props> = ({
  commercialFeature,
}) => {
  const { form, onSubmit, isLoading } = useUpdateCommercialFeature({
    commercialFeature,
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
            "commercialFeatures.form.feature.ro.label",
            "Funcționalitate comercială (română)"
          ),
          placeholder: t(
            "commercialFeatures.form.feature.ro.placeholder",
            "Ex: Parcare, Recepție, Sala conferințe"
          ),
        },
        ru: {
          label: t(
            "commercialFeatures.form.feature.ru.label",
            "Коммерческая функция (русский)"
          ),
          placeholder: t(
            "commercialFeatures.form.feature.ru.placeholder",
            "Напр: Парковка, Ресепшн, Конференц-зал"
          ),
        },
        en: {
          label: t(
            "commercialFeatures.form.feature.en.label",
            "Commercial feature (English)"
          ),
          placeholder: t(
            "commercialFeatures.form.feature.en.placeholder",
            "e.g. Parking, Reception, Conference room"
          ),
        },
      }}
    />
  );
};
