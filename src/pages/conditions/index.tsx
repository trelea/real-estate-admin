import { User } from "@/features/auth/types";
import React from "react";
import { ConditionsContext, ConditionsContextProps } from "./context";
import { useDeleteCondition } from "@/features/conditions/hooks";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { ConditionType } from "@/features/conditions/types";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import {
  CreateConditionForm,
  UpdateConditionForm,
} from "@/features/conditions/forms";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const Conditions: React.FC<Props> = ({ status }) => {
  const {
    data: {
      conditions: { data, isLoading, isFetching },
    },
    meta: {
      uriQueries: { search },
      setUriQueries,
      openDialogCreateCondition,
      setOpenDialogCreateCondition,
    },
  } = React.useContext<ConditionsContextProps>(ConditionsContext);
  const [deleteCondition, deleteConditionLoading] = useDeleteCondition();
  const { t } = useTranslation();

  return (
    <ManageData<ConditionType>
      /**
       * loading
       */
      loading={{
        state: isLoading || isFetching,
        component: <TableSkeleton />,
      }}
      /**
       * header
       */
      header={{
        title: t("conditions.manageTitle", "Conditions"),
        badge: t("conditions.badge", {
          count: data?.meta.total ?? 0,
          defaultValue: `${data?.meta.total} conditions`,
        }),
        search: {
          defaultValue: search,
          onValueChange: (value) =>
            setUriQueries(({ search, ...rest }) => ({
              search: value,
              ...rest,
            })),
        },
        create: {
          trigger: {
            label: t("conditions.create.trigger", "Create condition"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t("conditions.create.title", "Create Condition"),
            description: t(
              "conditions.create.description",
              "Fill in the housing condition details in all supported languages. Once submitted, the condition will be added to the system and available for use in relevant modules."
            ),
            children: <CreateConditionForm />,
          },
          dialogState: {
            open: openDialogCreateCondition,
            onOpenChange: setOpenDialogCreateCondition,
          },
        },
      }}
      /**
       * content
       */
      content={{
        table: {
          data: data?.data as ConditionType[],
          headers: [
            t("conditions.tableHeaders.id", "ID"),
            t("conditions.tableHeaders.ro", "Romanian"),
            t("conditions.tableHeaders.ru", "Russian"),
            t("conditions.tableHeaders.en", "English"),
          ],
          rows: ({ ro, ru, en, id }) => [
            <div className="py-2 sm:py-4">
              <span className="font-bold text-sm">{id}</span>
            </div>,
            <span className="font-medium text-sm">{ro}</span>,
            <span className="font-medium text-sm">{ru}</span>,
            <span className="font-medium text-sm">{en}</span>,
          ],
          delete: {
            disabled: status?.role !== "ADMIN" || deleteConditionLoading,
            // @ts-ignore
            onDeleteAction: (id: number) => deleteCondition(Number(id)),
          },
          update: {
            disabled: status?.role !== "ADMIN",
            title: t("conditions.update.title", "Update Condition"),
            description: t(
              "conditions.update.description",
              "Edit the details of an existing housing condition. Update the multilingual names or other relevant fields to ensure the information remains accurate and current."
            ),
            children: (condition) => (
              <UpdateConditionForm condition={condition} />
            ),
          },
        },
      }}
      /**
       * footer
       */
      footer={{
        pagination: {
          meta: data?.meta,
          next: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page + 1,
              ...rest,
            })),
          prev: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page - 1,
              ...rest,
            })),
          current: (_) =>
            setUriQueries(({ page, ...rest }) => ({
              page: _,
              ...rest,
            })),
        },
      }}
    />
  );
};
