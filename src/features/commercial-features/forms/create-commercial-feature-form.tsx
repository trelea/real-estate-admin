import React from "react";
import { useCreateCommercialFeature } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateCommercialFeatureForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateCommercialFeature();
  const { t } = useTranslation();

  return (
    <CreateMultilingualForm
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
