import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Blog } from "../types";
import { Pencil } from "lucide-react";
import { UpdateBlogForm } from "../forms";
import { BlogsContext, BlogsContextProps } from "@/pages/blogs/context";

interface Props {
  disabled?: boolean;
  blog: Blog;
}

export const UpdateBlogButton: React.FC<Props> = ({ disabled, blog }) => {
  const {
    meta: {
      stepUpdateBlogForm,
      setStepUpdateBlogForm,
      // openDialogUpdateBlog,
      // setOpenDialogUpdateBlog,
    },
  } = React.useContext<BlogsContextProps>(BlogsContext);
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setStepUpdateBlogForm(1);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="p-0 m-0 h-fit w-fit"
          disabled={disabled}
        >
          <Pencil className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(_) => _.preventDefault()}
        className="m-0 p-10 sm:min-w-xl"
      >
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            Update Blog
          </DialogTitle>
          <DialogDescription className="text-base">
            {stepUpdateBlogForm === 1 &&
              "Update the image thumbnail for your blog post. This is the main preview image."}
            {stepUpdateBlogForm === 2 &&
              "Edit the Romanian title and description for your blog post."}
            {stepUpdateBlogForm === 3 &&
              "Edit the Russian title and description for your blog post."}
            {stepUpdateBlogForm === 4 &&
              "Edit the English title and description for your blog post. Adjust the visibility of your blog post. If checked, it will be public and visible to anyone. If unchecked, it will remain private and only accessible to admins and dashboard users."}
          </DialogDescription>
        </DialogHeader>

        <UpdateBlogForm
          blog={blog}
          step={stepUpdateBlogForm}
          next={() => setStepUpdateBlogForm((_) => _ + 1)}
          prev={() => setStepUpdateBlogForm((_) => _ - 1)}
        />
      </DialogContent>
    </Dialog>
  );
};
