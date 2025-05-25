import React from "react";
import { useUpdateHousingStock } from "../hooks";
import { HousingStockType } from "../types";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  housingStock: HousingStockType;
}

export const UpdateHousingStockForm: React.FC<Props> = ({ housingStock }) => {
  const { form, onSubmit, isLoading } = useUpdateHousingStock({ housingStock });
  return (
    <UpdateMultilingualForm
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
