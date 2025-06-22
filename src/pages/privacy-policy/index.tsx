import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/features/auth/types";
import { useGetPrivacyPolicyContentQuery } from "@/features/privacy-policy/api";
import { PatchPrivacyPolicyContentForm } from "@/features/privacy-policy/forms";
import { PrivacyPolicyType } from "@/features/privacy-policy/types";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  status?: User;
}

export const PrivacyPolicy: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = useGetPrivacyPolicyContentQuery(null);
  return (
    <section className="h-full">
      <Card>
        <CardContent>
          <Tabs
            className="w-full h-full gap-0 space-y-0"
            defaultValue="romanian"
          >
            <div className="flex w-full justify-between items-center mb-4">
              <h1 className="text-xl font-medium">{t("privacy.edit")}</h1>
              <TabsList className="flex space-x-4">
                <TabsTrigger
                  value="romanian"
                  className="text-xs xl:text-sm w-fit"
                >
                  {t("privacy.romanian")}
                </TabsTrigger>
                <TabsTrigger
                  value="russian"
                  className="text-xs xl:text-sm w-fit"
                >
                  {t("privacy.russian")}
                </TabsTrigger>
                <TabsTrigger
                  value="english"
                  className="text-xs xl:text-sm w-fit"
                >
                  {t("privacy.english")}
                </TabsTrigger>
              </TabsList>
            </div>

            {isLoading || isFetching ? (
              <TableSkeleton />
            ) : (
              <PatchPrivacyPolicyContentForm
                content={data as PrivacyPolicyType}
                disabled={status?.role !== "ADMIN"}
              />
            )}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};
