import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { DialogState } from "./types";

interface Props {
  disabled?: boolean;
  onDelete?: () => void;
  dialogState?: DialogState;
}

export const DeleteItem: React.FC<Props> = ({
  disabled = true,
  onDelete,
  dialogState,
}: Props) => (
  <AlertDialog
    onOpenChange={dialogState?.onOpenChange}
    open={dialogState?.open}
  >
    <AlertDialogTrigger
      asChild
      className="m-0 p-0 h-fit flex justify-center items-center"
    >
      <Button
        variant={"ghost"}
        className="p-0 m-0 h-fit w-fit"
        disabled={disabled}
      >
        <Trash2 className="size-5 text-destructive" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-destructive" onClick={onDelete}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
