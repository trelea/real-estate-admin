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
import { UsersContext, UsersContextProps } from "@/pages/users/context";

interface Props {
  disabled?: boolean;
}

export const CreateUserButton: React.FC<Props> = ({ disabled = false }) => {
  const {
    meta: { openDialogCreateUser, setOpenDialogCreateUser },
  } = React.useContext<UsersContextProps>(UsersContext);
  return (
    <Dialog open={openDialogCreateUser} onOpenChange={setOpenDialogCreateUser}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="flex w-fit h-fit m-0 p-0 py-1.5 xl:py-2.5 px-4"
        >
          <Plus className="size-4 xl:size-5" />
          <span className="font-medium text-sm">Create User</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(_) => _.preventDefault()}
        className="m-0 p-10 sm:min-w-xl"
      >
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            Create User
          </DialogTitle>
          <DialogDescription className="text-base">
            Enter the required information to create a new user. After
            submission, the user will be added to the system.
          </DialogDescription>
        </DialogHeader>
        <CreateUserForm />
      </DialogContent>
    </Dialog>
  );
};
