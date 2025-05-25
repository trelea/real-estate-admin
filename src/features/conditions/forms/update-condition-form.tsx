import React from "react";
import { ConditionType } from "../types";
import { useUpdateCondition } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";

interface Props {
  condition: ConditionType;
}

export const UpdateConditionForm: React.FC<Props> = ({ condition }) => {
  const { form, onSubmit, isLoading } = useUpdateCondition({ condition });

  return (
    <UpdateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: "Stare (română)",
          placeholder: "Ex: Nou, Folosit, De renovat",
        },
        ru: {
          label: "Состояние (русский)",
          placeholder: "Напр: Новое, Б/у, Требует ремонта",
        },
        en: {
          label: "Condition (English)",
          placeholder: "e.g. New, Used, Needs renovation",
        },
      }}
    />
  );
};
