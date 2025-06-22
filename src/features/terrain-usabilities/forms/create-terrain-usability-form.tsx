import React from "react";
import { useCreateTerrainUsability } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateTerrainUsabilityForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateTerrainUsability();
  const { t } = useTranslation();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: t(
            "terrainUsabilities.form.usability.ro.label",
            "Utilizare teren (română)"
          ),
          placeholder: t(
            "terrainUsabilities.form.usability.ro.placeholder",
            "Ex: Agricol, Rezidențial, Industrial"
          ),
        },
        ru: {
          label: t(
            "terrainUsabilities.form.usability.ru.label",
            "Использование участка (русский)"
          ),
          placeholder: t(
            "terrainUsabilities.form.usability.ru.placeholder",
            "Напр: Сельское хозяйство, Жилой, Промышленный"
          ),
        },
        en: {
          label: t(
            "terrainUsabilities.form.usability.en.label",
            "Terrain usability (English)"
          ),
          placeholder: t(
            "terrainUsabilities.form.usability.en.placeholder",
            "e.g. Agricultural, Residential, Industrial"
          ),
        },
      }}
    />
  );
};
