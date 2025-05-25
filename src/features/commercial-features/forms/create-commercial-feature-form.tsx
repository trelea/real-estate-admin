import React from "react";
import { useCreateCommercialFeature } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateCommercialFeatureForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateCommercialFeature();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Funcționalitate comercială (română)",
          placeholder: "Ex: Parcare, Recepție, Sala conferințe",
        },
        ru: {
          label: "Коммерческая функция (русский)",
          placeholder: "Напр: Парковка, Ресепшн, Конференц-зал",
        },
        en: {
          label: "Commercial feature (English)",
          placeholder: "e.g. Parking, Reception, Conference room",
        },
      }}
    />
  );
};
