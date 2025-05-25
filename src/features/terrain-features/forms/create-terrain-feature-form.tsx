import React from "react";
import { useCreateTerrainFeature } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateTerrainFeatureForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateTerrainFeature();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Caracteristică teren (română)",
          placeholder: "Ex: Pădure, Lac, Deal",
        },
        ru: {
          label: "Особенность участка (русский)",
          placeholder: "Напр: Лес, Озеро, Холм",
        },
        en: {
          label: "Terrain feature (English)",
          placeholder: "e.g. Forest, Lake, Hill",
        },
      }}
    />
  );
};
