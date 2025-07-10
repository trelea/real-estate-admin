import React from "react";
import { CommercialDestinationType } from "../types";
import { useUpdateCommercialDestination } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  commercialDestination: CommercialDestinationType;
}

export const UpdateCommercialDestinationForm: React.FC<Props> = ({
  commercialDestination,
}) => {
  const { form, onSubmit, isLoading } = useUpdateCommercialDestination({
    commercialDestination,
  });

  return (
    <UpdateMultilingualForm
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
