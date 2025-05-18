import React from "react";
import { type Service } from "../types";
import { useUpdateService } from "../hooks";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { FieldItem, FieldItemFile } from "../components";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  service: Service;
  step: number;
  prev?: () => void;
  next?: () => void;
}

export const UpdateServiceForm: React.FC<Props> = ({
  step,
  service,
  next,
  prev,
}) => {
  const { form, onSubmit, isLoading, isSuccess } = useUpdateService({
    service,
  });

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
            label="Thumbnail"
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
              label="Titu"
              placeholder="Titlu"
              displayErrorMessage
            />
            <FieldItem
              name="desc_ro"
              type="textarea"
              control={form}
              label="Descriere"
              placeholder="Descriere"
              displayErrorMessage
            />
          </React.Fragment>
        )}
        {step === 3 && (
          <React.Fragment>
            <FieldItem
              name="title_ru"
              type="text"
              control={form}
              label="Заголовок"
              placeholder="Введите заголовок"
              displayErrorMessage
            />
            <FieldItem
              name="desc_ru"
              type="textarea"
              control={form}
              label="Описание"
              placeholder="Введите описание"
              displayErrorMessage
            />
          </React.Fragment>
        )}
        {step === 4 && (
          <React.Fragment>
            <FieldItem
              name="title_en"
              type="text"
              control={form}
              label="Title"
              placeholder="Title"
              displayErrorMessage
            />
            <FieldItem
              name="desc_en"
              type="textarea"
              control={form}
              label="Description"
              placeholder="Description"
              displayErrorMessage
            />

            <div className="border p-4 rounded-xl shadow-xs">
              <FieldItem
                name="status"
                type="check"
                control={form}
                label={
                  <div className="space-y-1">
                    <FormLabel>Make this blog post public</FormLabel>
                    <FormDescription>
                      If checked, the blog post will be visible to everyone. If
                      unchecked, it will be private and only accessible by
                      admins and dashboard users.
                    </FormDescription>
                  </div>
                }
                className="flex-row-reverse w-fit items-start gap-4"
              />
            </div>
          </React.Fragment>
        )}
        <DialogFooter className="w-full h-fit m-0 p-0">
          <div className="flex justify-between items-center w-full">
            {step === 1 && (
              <DialogClose asChild>
                <Button
                  className="text-base font-medium px-6 py-2 h-fit w-fit rounded-lg"
                  variant={"outline"}
                >
                  Close
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
                Back
              </Button>
            )}

            <span className="font-semibold text-base text-foreground">
              {step}/4
            </span>

            {step !== 4 && (
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
                        (await form.trigger("desc_ro"))
                      )
                    )
                      return;
                  }

                  // setp two
                  if (step === 3) {
                    if (
                      !(
                        (await form.trigger("title_ru")) &&
                        (await form.trigger("desc_ru"))
                      )
                    )
                      return;
                  }

                  next && next();
                }}
                type={"button"}
              >
                Next
              </Button>
            )}

            {step === 4 && (
              <Button
                disabled={isLoading && isSuccess}
                className="text-base font-medium px-6 py-2 h-fit w-fit rounded-lg"
                type="submit"
              >
                Update
              </Button>
            )}
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};
