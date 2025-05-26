import { Form } from "@/components/ui/form";
import React from "react";
import { FieldItem, FieldItemFile } from "../components";
import { Button } from "@/components/ui/button";
import { ROLES } from "@/consts";
import { useCreateUser } from "../hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {}

export const CreateUserForm: React.FC<Props> = ({}) => {
  const { form, onSubmit, isLoading } = useCreateUser();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FieldItemFile
            name="thumbnail"
            control={form}
            label="Thumbnail"
            className="p-2 rounded-xl"
            displayErrorMessage
          />

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

        <FieldItem
          name="password"
          type="password"
          control={form}
          label="Password"
          placeholder="*************"
          displayErrorMessage
        />

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
        <Accordion type="single" collapsible>
          <AccordionItem value="social-contacts">
            <AccordionTrigger>Social Contacts</AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-4">
              <FieldItem
                name="viber"
                type="contact"
                control={form}
                label="Viber"
                placeholder="Viber phone number"
                displayErrorMessage
              />
              <FieldItem
                name="whatsapp"
                type="contact"
                control={form}
                label="WhatsApp"
                placeholder="WhatsApp phone number"
                displayErrorMessage
              />
              <FieldItem
                clasName="col-span-2"
                name="telegram"
                type="text"
                control={form}
                label="Telegram"
                placeholder="Enter Telegram username or URL (e.g., https://t.me/username)"
                displayErrorMessage
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full font-normal text-base h-fit p-0 m-0 py-3 rounded-xl"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
