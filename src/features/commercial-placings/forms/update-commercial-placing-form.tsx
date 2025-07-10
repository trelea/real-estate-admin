import React from "react";
import { CommercialPlacingType } from "../types";
import { useUpdateCommercialPlacing } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  commercialPlacing: CommercialPlacingType;
}

export const UpdateCommercialPlacingForm: React.FC<Props> = ({
  commercialPlacing,
}) => {
  const { form, onSubmit, isLoading } = useUpdateCommercialPlacing({
    commercialPlacing,
  });

  return (
    <UpdateMultilingualForm
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
