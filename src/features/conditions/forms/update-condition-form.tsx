import React from "react";
import { ConditionType } from "../types";
import { useUpdateCondition } from "../hooks";
import { UpdateMultilingualForm } from "@/features/multilingual/forms";
import { useTranslation } from "react-i18next";

interface Props {
  condition: ConditionType;
}

export const UpdateConditionForm: React.FC<Props> = ({ condition }) => {
  const { form, onSubmit, isLoading } = useUpdateCondition({ condition });
  const { t } = useTranslation();

  return (
    <UpdateMultilingualForm
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
