import React from "react";
import { useCreateCondition } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";

interface Props {}

export const CreateConditionForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useCreateCondition();

  return (
    <CreateMultilingualForm
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
