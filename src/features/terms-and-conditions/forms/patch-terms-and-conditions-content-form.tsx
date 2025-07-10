import { Form } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { type TermsAndConditionsType } from "../types";
import { TipTapField } from "../components";
import { Button } from "@/components/ui/button";
import { usePatchTermsAndConditionsContent } from "../hooks";
import { useTranslation } from "react-i18next";

interface Props {
  content: TermsAndConditionsType;
  disabled?: boolean;
}

export const PatchTermsAndConditionsContentForm: React.FC<Props> = ({
  content,
  disabled,
}) => {
  const { t } = useTranslation();
  const { form, onSubmit, isLoading } = usePatchTermsAndConditionsContent({
    content,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TabsContent value="romanian">
          <TipTapField
            withSubmitButton={
              <Button disabled={isLoading || disabled} type="submit">
                {t("terms.saveContent")}
              </Button>
            }
            control={form}
            name="content_ro"
            placeholder={content.content_ro}
          />
        </TabsContent>

        <TabsContent value="russian">
          <TipTapField
            withSubmitButton={
              <Button disabled={isLoading || disabled} type="submit">
                {t("terms.saveContent")}
              </Button>
            }
            control={form}
            name="content_ru"
            placeholder={content.content_ru}
          />
        </TabsContent>

        <TabsContent value="english">
          <TipTapField
            withSubmitButton={
              <Button disabled={isLoading || disabled} type="submit">
                {t("terms.saveContent")}
              </Button>
            }
            control={form}
            name="content_en"
            placeholder={content.content_en}
          />
        </TabsContent>
      </form>
    </Form>
  );
};
