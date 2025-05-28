import { Form } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { type PrivacyPolicyType } from "../types";
import { TipTapField } from "../components";
import { Button } from "@/components/ui/button";
import { usePatchPrivacyPolicyContent } from "../hooks";

interface Props {
  content: PrivacyPolicyType;
  disabled?: boolean;
}

export const PatchPrivacyPolicyContentForm: React.FC<Props> = ({
  content,
  disabled,
}) => {
  const { form, onSubmit, isLoading } = usePatchPrivacyPolicyContent({
    content,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TabsContent value="romanian">
          <TipTapField
            withSubmitButton={
              <Button disabled={isLoading || disabled} type="submit">
                Save Content
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
                Save Content
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
                Save Content
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
