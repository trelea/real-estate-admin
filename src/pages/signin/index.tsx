import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { SigninForm } from "@/features/auth/forms";
import React from "react";
import logo from "@/assets/logo.png";
import { useTranslation } from "react-i18next";

interface Props {}

export const SignIn: React.FC<Props> = ({}) => {
  const { t } = useTranslation();

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <Card className=" m-0 p-0 w-full max-sm:shadow-none max-sm:border-none sm:w-[415px]  py-12">
        <CardHeader className="text-center flex flex-col items-center gap-8">
          <img src={logo} alt="logo" className="w-[50%] justify-center" />
          <CardDescription className="text-base">
            {t("signin.title")}
          </CardDescription>
        </CardHeader>
        <CardContent className="m-0 px-8">
          <SigninForm />
        </CardContent>
      </Card>
    </main>
  );
};
