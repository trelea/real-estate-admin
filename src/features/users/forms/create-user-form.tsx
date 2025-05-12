import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { FieldItem } from "../components";
import { Button } from "@/components/ui/button";

interface Props {}

export const CreateUserForm: React.FC<Props> = ({}) => {
  const form = useForm();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="flex flex-col gap-4"
      >
        <FieldItem
          name="name"
          type="text"
          control={form}
          label="Name"
          placeholder="John"
        />

        <FieldItem
          name="surname"
          type="text"
          control={form}
          label="Surname"
          placeholder="Michael"
        />

        <FieldItem
          name="email"
          type="email"
          control={form}
          label="Email"
          placeholder="name@email.com"
        />

        <FieldItem
          name="password"
          type="password"
          control={form}
          label="Password"
          placeholder="*************"
        />

        <Button
          type="submit"
          className="w-full font-normal text-base h-fit p-0 m-0 py-3 rounded-xl"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
