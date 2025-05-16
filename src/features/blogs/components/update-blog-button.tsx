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

interface Props {
  disabled?: boolean;
  blog: Blog;
}

export const UpdateBlogButton: React.FC<Props> = ({ disabled, blog }) => {
  return (
    <Dialog>
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
            Edit the details of the blog post below. Once you're done, click
            save to apply the changes.
          </DialogDescription>
        </DialogHeader>
        {/* <UpdateuserForm user={user} /> */}
      </DialogContent>
    </Dialog>
  );
};
