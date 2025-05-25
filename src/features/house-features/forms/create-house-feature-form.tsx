import React from "react";
import { useCreateHouseFeature } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateHouseFeatureForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateHouseFeature();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Caracteristică casă (română)",
          placeholder: "Ex: Grădină, Garaj, Terasă",
        },
        ru: {
          label: "Особенность дома (русский)",
          placeholder: "Напр: Сад, Гараж, Терраса",
        },
        en: {
          label: "House feature (English)",
          placeholder: "e.g. Garden, Garage, Terrace",
        },
      }}
    />
  );
};
