import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlogsContext, BlogsContextProps } from "@/pages/blogs/context";
import { Plus } from "lucide-react";
import React from "react";
import { CreateBlogForm } from "../forms";

interface Props {
  disabled?: boolean;
}

export const CreateBlogButton: React.FC<Props> = ({ disabled = false }) => {
  const {
    meta: {
      stepCreateBlogForm,
      setStepCreateBlogForm,
      openDialogCreateBlog,
      setOpenDialogCreateBlog,
    },
  } = React.useContext<BlogsContextProps>(BlogsContext);

  React.useEffect(() => {
    return () => {
      if (openDialogCreateBlog) setStepCreateBlogForm(1);
    };
  }, [openDialogCreateBlog]);

  return (
    <Dialog open={openDialogCreateBlog} onOpenChange={setOpenDialogCreateBlog}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="flex w-fit h-fit m-0 p-0 py-1.5 xl:py-2.5 px-4"
        >
          <Plus className="size-4 xl:size-5" />
          <span className="font-medium text-sm">Create Blog</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(_) => _.preventDefault()}
        className="m-0 p-10 sm:min-w-xl"
      >
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            Create Blog
          </DialogTitle>
          <DialogDescription className="text-base">
            {stepCreateBlogForm === 1 &&
              "Upload an image thumbnail for your blog post. This will be displayed as the main preview image."}
            {stepCreateBlogForm === 2 &&
              "Fill in the Romanian title and description for your blog post."}
            {stepCreateBlogForm === 3 &&
              "Fill in the Russian title and description for your blog post."}
            {stepCreateBlogForm === 4 &&
              "Fill in the English title and description for your blog post."}
          </DialogDescription>
        </DialogHeader>
        <CreateBlogForm
          step={stepCreateBlogForm}
          next={() => setStepCreateBlogForm((_) => _ + 1)}
          prev={() => setStepCreateBlogForm((_) => _ - 1)}
        />
      </DialogContent>
    </Dialog>
  );
};
