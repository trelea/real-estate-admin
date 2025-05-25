import React from "react";
import { useCreateHousingStock } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateHousingStockForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useCreateHousingStock();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Tip locuință (română)",
          placeholder: "Ex: Bloc, Casă, Vilă",
        },
        ru: {
          label: "Тип жилья (русский)",
          placeholder: "Напр: Квартира, Дом, Особняк",
        },
        en: {
          label: "Housing stock type (English)",
          placeholder: "e.g. Apartment, House, Villa",
        },
      }}
    />
  );
};
