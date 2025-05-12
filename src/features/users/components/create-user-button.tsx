import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { CreateUserForm } from "../forms";

interface Props {
  disabled?: boolean;
}

export const CreateUserButton: React.FC<Props> = ({ disabled = false }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        disabled={disabled}
        className="flex w-fit h-fit m-0 p-0 py-2.5 px-4"
      >
        <Plus className="size-5" />
        <span className="font-medium text-sm">Create User</span>
      </Button>
    </DialogTrigger>
    <DialogContent
      onInteractOutside={(_) => _.preventDefault()}
      className="min-w-xl"
    >
      <DialogHeader>
        <DialogTitle>Create User</DialogTitle>
        <DialogDescription>
          Enter the required information to create a new user. After submission,
          the user will be added to the system.
        </DialogDescription>
      </DialogHeader>
      <CreateUserForm />
    </DialogContent>
  </Dialog>
);
