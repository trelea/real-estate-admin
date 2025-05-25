import React from "react";
import { TerrainFeatureType } from "../types";
import { useUpdateTerrainFeature } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  terrainFeature: TerrainFeatureType;
}

export const UpdateTerrainFeatureForm: React.FC<Props> = ({
  terrainFeature,
}) => {
  const { form, onSubmit, isLoading } = useUpdateTerrainFeature({
    terrainFeature,
  });

  return (
    <UpdateMultilingualForm
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
