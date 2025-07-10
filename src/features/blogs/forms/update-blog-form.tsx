import React from "react";
import { type Blog } from "../types";
import { useUpdateBlog } from "../hooks";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { FieldItem, FieldItemFile } from "../components";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Props {
  blog: Blog;
  step: number;
  prev?: () => void;
  next?: () => void;
}

export const UpdateBlogForm: React.FC<Props> = ({ step, blog, next, prev }) => {
  const { form, onSubmit, isLoading } = useUpdateBlog({ blog });
  const { t } = useTranslation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {step === 1 && (
          <FieldItemFile
            name="thumbnail"
            control={form}
            label={t("blogs.update.thumbnail", "Thumbnail")}
            className="h-96 rounded-xl"
            displayErrorMessage
          />
        )}

        {step === 2 && (
          <React.Fragment>
            <FieldItem
              name="title_ro"
              type="text"
              control={form}
              label={t("blogs.update.title_ro", "Title (RO)")}
              placeholder={t("blogs.update.title_ro_placeholder", "Titlu")}
              displayErrorMessage
            />

            <FieldItem
              name="desc_ro"
              type="textarea"
              control={form}
              label={t("blogs.update.desc_ro", "Description (RO)")}
              placeholder={t("blogs.update.desc_ro_placeholder", "Descriere")}
              displayErrorMessage
            />

            <FieldItem
              name="content_ro"
              type="tip-tap"
              control={form}
              label={t("blogs.update.content_ro", "Content (RO)")}
              displayErrorMessage
              placeholder={blog.content.content_ro}
            />
          </React.Fragment>
        )}

        {step === 3 && (
          <React.Fragment>
            <FieldItem
              name="title_ru"
              type="text"
              control={form}
              label={t("blogs.update.title_ru", "Заголовок (RU)")}
              placeholder={t(
                "blogs.update.title_ru_placeholder",
                "Введите заголовок"
              )}
              displayErrorMessage
            />

            <FieldItem
              name="desc_ru"
              type="textarea"
              control={form}
              label={t("blogs.update.desc_ru", "Описание (RU)")}
              placeholder={t(
                "blogs.update.desc_ru_placeholder",
                "Введите описание"
              )}
              displayErrorMessage
            />

            <FieldItem
              name="content_ru"
              type="tip-tap"
              control={form}
              label={t("blogs.update.content_ru", "Контент (RU)")}
              displayErrorMessage
              placeholder={blog.content.content_ru}
            />
          </React.Fragment>
        )}

        {step === 4 && (
          <React.Fragment>
            <FieldItem
              name="title_en"
              type="text"
              control={form}
              label={t("blogs.update.title_en", "Title (EN)")}
              placeholder={t("blogs.update.title_en_placeholder", "Title")}
              displayErrorMessage
            />

            <FieldItem
              name="desc_en"
              type="textarea"
              control={form}
              label={t("blogs.update.desc_en", "Description (EN)")}
              placeholder={t("blogs.update.desc_en_placeholder", "Description")}
              displayErrorMessage
            />

            <FieldItem
              name="content_en"
              type="tip-tap"
              control={form}
              label={t("blogs.update.content_en", "Content (EN)")}
              displayErrorMessage
              placeholder={blog.content.content_en}
            />
          </React.Fragment>
        )}

        {step === 5 && (
          <div className="border p-4 rounded-xl shadow-xs">
            <FieldItem
              name="status"
              type="check"
              control={form}
              label={
                <div className="space-y-1">
                  <FormLabel>
                    {t("blogs.update.makePublic", "Make this blog post public")}
                  </FormLabel>
                  <FormDescription>
                    {t(
                      "blogs.update.publicDescription",
                      "If checked, the blog post will be visible to everyone. If unchecked, it will be private and only accessible by admins and dashboard users."
                    )}
                  </FormDescription>
                </div>
              }
              className="flex-row-reverse w-fit items-start gap-4"
            />
          </div>
        )}

        <DialogFooter className="w-full h-fit m-0 p-0">
          <div className="flex justify-between items-center w-full">
            {step === 1 && (
              <DialogClose asChild>
                <Button
                  className="text-base font-medium px-6 py-2 h-fit w-fit rounded-lg"
                  variant={"outline"}
                >
                  {t("common.close", "Close")}
                </Button>
              </DialogClose>
            )}
            {step >= 2 && (
              <Button
                className="text-base font-medium px-6 py-2 h-fit w-fit rounded-lg"
                variant={"outline"}
                onClick={prev}
                type="button"
              >
                {t("common.back", "Back")}
              </Button>
            )}

            <span className="font-semibold text-base text-foreground">
              {step}/5
            </span>

            {step !== 5 && (
              <Button
                className="text-base font-medium px-6 py-2 h-fit w-fit rounded-lg"
                onClick={async () => {
                  // setp one
                  if (step === 1)
                    if (!(await form.trigger("thumbnail"))) return;

                  // setp two
                  if (step === 2) {
                    if (
                      !(
                        (await form.trigger("title_ro")) &&
                        (await form.trigger("desc_ro")) &&
                        (await form.trigger("content_ro"))
                      )
                    )
                      return;
                  }

                  // setp three
                  if (step === 3) {
                    if (
                      !(
                        (await form.trigger("title_ru")) &&
                        (await form.trigger("desc_ru")) &&
                        (await form.trigger("content_ru"))
                      )
                    )
                      return;
                  }

                  // setp four
                  if (step === 4) {
                    if (
                      !(
                        (await form.trigger("title_en")) &&
                        (await form.trigger("desc_en")) &&
                        (await form.trigger("content_en"))
                      )
                    )
                      return;
                  }

                  next && next();
                }}
                type={"button"}
              >
                {t("common.next", "Next")}
              </Button>
            )}

            {step === 5 && (
              <Button
                disabled={isLoading}
                className="text-base font-medium px-6 py-2 h-fit w-fit rounded-lg"
                type="submit"
              >
                {t("common.update", "Update")}
              </Button>
            )}
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};
