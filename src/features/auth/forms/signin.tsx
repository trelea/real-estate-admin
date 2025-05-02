import { Form } from "@/components/ui/form";
import React from "react";
import { FieldItem } from "../components";
import { Button } from "@/components/ui/button";
import { useSignin } from "../hooks";

interface Props {}

export const SigninForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useSignin();
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldItem
          control={form}
          type="email"
          name="email"
          placeholder="name@email.com"
          label="Email"
          displayErrorMessage
        />

        <FieldItem
          control={form}
          type="password"
          name="password"
          placeholder="password"
          label="Password"
          displayErrorMessage
        />

        <Button
          disabled={isLoading}
          type="submit"
          className="text-base font-medium h-fit py-3 rounded-lg mt-2 disabled:cursor-not-allowed w-full"
        >
          Log In
        </Button>
      </form>
    </Form>
  );
};
