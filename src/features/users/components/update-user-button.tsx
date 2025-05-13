import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { User } from "@/features/auth/types";
import { Pencil } from "lucide-react";
import React from "react";
import { UpdateuserForm } from "../forms";

interface Props {
  disabled?: boolean;
  user: User;
}

export const UpdateUserButton: React.FC<Props> = ({ disabled, user }) => {
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
            Update User
          </DialogTitle>
          <DialogDescription className="text-base">
            Make changes to the user’s information below. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <UpdateuserForm user={user} />
      </DialogContent>
    </Dialog>
  );
};
