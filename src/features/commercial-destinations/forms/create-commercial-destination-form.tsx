import React from "react";
import { useCreateCommercialDestination } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateCommercialDestinationForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateCommercialDestination();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Destinație comercială (română)",
          placeholder: "Ex: Centru comercial, Birouri, Mall",
        },
        ru: {
          label: "Коммерческое назначение (русский)",
          placeholder: "Напр: Торговый центр, Офисы, Молл",
        },
        en: {
          label: "Commercial destination (English)",
          placeholder: "e.g. Shopping center, Offices, Mall",
        },
      }}
    />
  );
};
