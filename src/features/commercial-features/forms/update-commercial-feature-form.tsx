import React from "react";
import { CommercialFeatureType } from "../types";
import { useUpdateCommercialFeature } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  commercialFeature: CommercialFeatureType;
}

export const UpdateCommercialFeatureForm: React.FC<Props> = ({
  commercialFeature,
}) => {
  const { form, onSubmit, isLoading } = useUpdateCommercialFeature({
    commercialFeature,
  });

  return (
    <UpdateMultilingualForm
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
