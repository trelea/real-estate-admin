import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { FieldItem, FieldItemFile } from "../components";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

interface Props {
  step: number;
  prev?: () => void;
  next?: () => void;
}

export const CreateBlogForm: React.FC<Props> = ({ step, next, prev }) => {
  const form = useForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(console.log)}
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
              type="text"
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
              type="text"
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
              type="text"
              control={form}
              label="Description"
              placeholder="Description"
              displayErrorMessage
            />
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

            <Button
              className="text-base font-medium px-6 py-2 h-fit w-fit rounded-lg"
              onClick={() => step !== 4 && next && next()}
              type={step === 4 ? "submit" : "button"}
            >
              {step === 4 ? "Create" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};
