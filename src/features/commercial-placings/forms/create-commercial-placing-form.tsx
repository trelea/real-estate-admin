import React from "react";
import { useCreateCommercialPlacing } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateCommercialPlacingForm: React.FC<Props> = () => {
  const { form, onSubmit, isLoading } = useCreateCommercialPlacing();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Amplasare comercială (română)",
          placeholder: "Ex: Etaj 1, Parter, Exterior",
        },
        ru: {
          label: "Коммерческое размещение (русский)",
          placeholder: "Напр: Первый этаж, Цоколь, Снаружи",
        },
        en: {
          label: "Commercial placing (English)",
          placeholder: "e.g. First floor, Ground floor, Outside",
        },
      }}
    />
  );
};
