import React from "react";
import { useCreateTerrainFeature } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateTerrainFeatureForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateTerrainFeature();
  const { t } = useTranslation();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: t(
            "terrainFeatures.form.feature.ro.label",
            "Caracteristică teren (română)"
          ),
          placeholder: t(
            "terrainFeatures.form.feature.ro.placeholder",
            "Ex: Pădure, Lac, Deal"
          ),
        },
        ru: {
          label: t(
            "terrainFeatures.form.feature.ru.label",
            "Особенность участка (русский)"
          ),
          placeholder: t(
            "terrainFeatures.form.feature.ru.placeholder",
            "Напр: Лес, Озеро, Холм"
          ),
        },
        en: {
          label: t(
            "terrainFeatures.form.feature.en.label",
            "Terrain feature (English)"
          ),
          placeholder: t(
            "terrainFeatures.form.feature.en.placeholder",
            "e.g. Forest, Lake, Hill"
          ),
        },
      }}
    />
  );
};
