import React from "react";
import { useCreateCondition } from "../hooks";
import { CreateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateConditionForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useCreateCondition();
  const { t } = useTranslation();

  return (
    <CreateMultilingualForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fields={{
        ro: {
          label: t("conditions.form.condition.ro.label", "Stare (română)"),
          placeholder: t(
            "conditions.form.condition.ro.placeholder",
            "Ex: Nou, Folosit, De renovat"
          ),
        },
        ru: {
          label: t("conditions.form.condition.ru.label", "Состояние (русский)"),
          placeholder: t(
            "conditions.form.condition.ru.placeholder",
            "Напр: Новое, Б/у, Требует ремонта"
          ),
        },
        en: {
          label: t("conditions.form.condition.en.label", "Condition (English)"),
          placeholder: t(
            "conditions.form.condition.en.placeholder",
            "e.g. New, Used, Needs renovation"
          ),
        },
      }}
    />
  );
};
