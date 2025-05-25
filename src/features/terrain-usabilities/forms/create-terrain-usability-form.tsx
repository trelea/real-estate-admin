import React from "react";
import { useCreateTerrainUsability } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateTerrainUsabilityForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateTerrainUsability();

  return (
    <CreateMultilingualForm
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
