import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateOffertCardInfo: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">
          {t("createOffertCardInfo.createOffert")}
        </CardTitle>
        <CardDescription className="text-base">
          {t("createOffertCardInfo.createOffertDescription")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
