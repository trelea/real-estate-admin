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
import { useTranslation } from "react-i18next";

interface Props {}

export const CreateUserForm: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
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
            label={t("users.thumbnail")}
            className="p-2 rounded-xl"
            displayErrorMessage
          />

          <FieldItem
            name="name"
            type="text"
            control={form}
            label={t("users.name")}
            placeholder={t("users.namePlaceholder")}
            displayErrorMessage
          />

          <FieldItem
            name="surname"
            type="text"
            control={form}
            label={t("users.surname")}
            placeholder={t("users.surnamePlaceholder")}
            displayErrorMessage
          />
        </div>

        <FieldItem
          name="email"
          type="email"
          control={form}
          label={t("users.email")}
          placeholder={t("users.emailPlaceholder")}
          displayErrorMessage
        />

        <FieldItem
          name="password"
          type="password"
          control={form}
          label={t("users.password")}
          placeholder={t("users.passwordPlaceholder")}
          displayErrorMessage
        />

        <FieldItem
          name="contact"
          type="contact"
          control={form}
          label={t("users.contact")}
          placeholder={t("users.contactPlaceholder")}
          displayErrorMessage
        />

        <FieldItem
          name="role"
          type="select"
          control={form}
          label={t("users.role")}
          select={{
            defaultValue: ROLES.USER,
            values: [ROLES.USER, ROLES.ADMIN],
          }}
          displayErrorMessage
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="social-contacts">
            <AccordionTrigger>{t("users.socialContacts")}</AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-4">
              <FieldItem
                name="viber"
                type="contact"
                control={form}
                label={t("users.viber")}
                placeholder={t("users.viberPlaceholder")}
                displayErrorMessage
              />
              <FieldItem
                name="whatsapp"
                type="contact"
                control={form}
                label={t("users.whatsapp")}
                placeholder={t("users.whatsappPlaceholder")}
                displayErrorMessage
              />
              <FieldItem
                clasName="col-span-2"
                name="telegram"
                type="text"
                control={form}
                label={t("users.telegram")}
                placeholder={t("users.telegramPlaceholder")}
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
          {t("users.create")}
        </Button>
      </form>
    </Form>
  );
};
