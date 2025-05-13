import React from "react";
import { useUpdateUser } from "../hooks/use-update-user";
import { User } from "@/features/auth/types";
import { Form } from "@/components/ui/form";
import { FieldItem } from "../components";
import { ROLES } from "@/consts";
import { Button } from "@/components/ui/button";

interface Props {
  user: User;
}

export const UpdateuserForm: React.FC<Props> = ({ user }) => {
  const { form, onSubmit } = useUpdateUser({ user });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* <FieldItemFile
            name="thumbnail"
            control={form}
            label="Thumbnail"
            className="p-2 rounded-xl"
            displayErrorMessage
          /> */}

          <FieldItem
            name="name"
            type="text"
            control={form}
            label="Name"
            placeholder="John"
            displayErrorMessage
          />

          <FieldItem
            name="surname"
            type="text"
            control={form}
            label="Surname"
            placeholder="Michael"
            displayErrorMessage
          />
        </div>

        <FieldItem
          name="email"
          type="email"
          control={form}
          label="Email"
          placeholder="name@email.com"
          displayErrorMessage
        />

        {/* <FieldItem
          name="password"
          type="password"
          control={form}
          label="Password"
          placeholder="*************"
          displayErrorMessage
        /> */}

        <FieldItem
          name="contact"
          type="contact"
          control={form}
          label="Contact"
          placeholder="699 89 120"
          displayErrorMessage
        />

        <FieldItem
          name="role"
          type="select"
          control={form}
          label="Role"
          select={{
            defaultValue: ROLES.USER,
            values: [ROLES.USER, ROLES.ADMIN],
          }}
          displayErrorMessage
        />

        <Button
          type="submit"
          className="w-full font-normal text-base h-fit p-0 m-0 py-3 rounded-xl"
        >
          Update
        </Button>
      </form>
    </Form>
  );
};
