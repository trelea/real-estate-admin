import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SigninForm } from "@/features/auth/forms";
import React from "react";
import { Link } from "react-router";

interface Props {}

export const SignIn: React.FC<Props> = ({}) => {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <Card className=" m-0 p-0 w-full max-sm:shadow-none max-sm:border-none sm:w-[415px]  py-12">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl sm:text-2xl font-semibold">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="m-0 px-8">
          <SigninForm />
        </CardContent>
        <CardFooter className="flex justify-center m-0 p-0">
          <p className="text-center text-sm">
            Have you changed your mind?{" "}
            <Link to={"#"} className="font-bold hover:underline">
              Back home
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
};
