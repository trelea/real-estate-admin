import React from "react";
import { useCreateApartmentFeature } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateApartmentFeatureForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useCreateApartmentFeature();

  return (
    <CreateMultilingualForm
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
