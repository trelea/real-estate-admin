import React from "react";
import { TerrainUsabilityType } from "../types";
import { useUpdateTerrainUsability } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  terrainUsability: TerrainUsabilityType;
}

export const UpdateTerrainUsabilityForm: React.FC<Props> = ({
  terrainUsability,
}) => {
  const { form, onSubmit, isLoading } = useUpdateTerrainUsability({
    terrainUsability,
  });

  return (
    <UpdateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Utilizare teren (română)",
          placeholder: "Ex: Agricol, Rezidențial, Industrial",
        },
        ru: {
          label: "Использование участка (русский)",
          placeholder: "Напр: Сельское хозяйство, Жилой, Промышленный",
        },
        en: {
          label: "Terrain usability (English)",
          placeholder: "e.g. Agricultural, Residential, Industrial",
        },
      }}
    />
  );
};
