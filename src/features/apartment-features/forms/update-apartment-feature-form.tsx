import React from "react";
import { ApartmentFeatureType } from "../types";
import { useUpdateApartmentFeature } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  apartmentFeature: ApartmentFeatureType;
}

export const UpdateApartmentFeatureForm: React.FC<Props> = ({
  apartmentFeature,
}) => {
  const { form, onSubmit, isLoading } = useUpdateApartmentFeature({
    apartmentFeature,
  });

  return (
    <UpdateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Caracteristică apartament (română)",
          placeholder: "Ex: Balcon, Lift, Parcare",
        },
        ru: {
          label: "Особенность квартиры (русский)",
          placeholder: "Напр: Балкон, Лифт, Парковка",
        },
        en: {
          label: "Apartment feature (English)",
          placeholder: "e.g. Balcony, Elevator, Parking",
        },
      }}
    />
  );
};
