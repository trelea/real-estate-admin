import React from "react";
import { HouseFeatureType } from "../types";
import { useUpdateHouseFeature } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  houseFeature: HouseFeatureType;
}

export const UpdateHouseFeatureForm: React.FC<Props> = ({ houseFeature }) => {
  const { form, onSubmit, isLoading } = useUpdateHouseFeature({
    houseFeature,
  });

  return (
    <UpdateMultilingualForm
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
