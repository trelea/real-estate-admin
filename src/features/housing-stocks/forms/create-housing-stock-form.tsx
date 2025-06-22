import React from "react";
import { useCreateHousingStock } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateHousingStockForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useCreateHousingStock();
  const { t } = useTranslation();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: t(
            "housingStocks.form.housingStock.ro.label",
            "Tip locuință (română)"
          ),
          placeholder: t(
            "housingStocks.form.housingStock.ro.placeholder",
            "Ex: Bloc, Casă, Vilă"
          ),
        },
        ru: {
          label: t(
            "housingStocks.form.housingStock.ru.label",
            "Тип жилья (русский)"
          ),
          placeholder: t(
            "housingStocks.form.housingStock.ru.placeholder",
            "Напр: Квартира, Дом, Особняк"
          ),
        },
        en: {
          label: t(
            "housingStocks.form.housingStock.en.label",
            "Housing stock type (English)"
          ),
          placeholder: t(
            "housingStocks.form.housingStock.en.placeholder",
            "e.g. Apartment, House, Villa"
          ),
        },
      }}
    />
  );
};
