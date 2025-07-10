import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTermsAndConditionsContentQuery } from "@/features/terms-and-conditions/api";
import { PatchTermsAndConditionsContentForm } from "@/features/terms-and-conditions/forms";
import { TermsAndConditionsType } from "@/features/terms-and-conditions/types";
import { User } from "@/features/auth/types";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const TermsAndConditions: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation();
  const { data, isLoading, isFetching } =
    useGetTermsAndConditionsContentQuery(null);

  return (
    <section className="h-full">
      <Card>
        <CardContent>
          <Tabs
            className="w-full h-full gap-0 space-y-0"
            defaultValue="romanian"
          >
            <div className="flex w-full justify-between items-center mb-4">
              <h1 className="text-xl font-medium">{t("terms.edit")}</h1>
              <TabsList className="flex space-x-4">
                <TabsTrigger
                  value="romanian"
                  className="text-xs xl:text-sm w-fit"
                >
                  {t("terms.romanian")}
                </TabsTrigger>
                <TabsTrigger
                  value="russian"
                  className="text-xs xl:text-sm w-fit"
                >
                  {t("terms.russian")}
                </TabsTrigger>
                <TabsTrigger
                  value="english"
                  className="text-xs xl:text-sm w-fit"
                >
                  {t("terms.english")}
                </TabsTrigger>
              </TabsList>
            </div>

            {isLoading || isFetching ? (
              <TableSkeleton />
            ) : (
              <PatchTermsAndConditionsContentForm
                content={data as TermsAndConditionsType}
                disabled={status?.role !== "ADMIN"}
              />
            )}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};
