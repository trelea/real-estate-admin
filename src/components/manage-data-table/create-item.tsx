import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { HeaderCreateSectionProps } from "./types";

interface Props extends HeaderCreateSectionProps {}

export const CreateItem: React.FC<Props> = ({
  trigger: { label, disabled },
  content: { children, description, title },
  dialogState,
}) => (
  <Dialog onOpenChange={dialogState?.onOpenChange} open={dialogState?.open}>
    <DialogTrigger asChild>
      <Button
        disabled={disabled}
        className="flex w-fit h-fit m-0 p-0 py-1.5 xl:py-2.5 px-4"
      >
        <Plus className="size-4 xl:size-5" />
        <span className="font-medium text-sm">{label}</span>
      </Button>
    </DialogTrigger>
    <DialogContent
      onInteractOutside={(_) => _.preventDefault()}
      className="m-0 p-10 sm:min-w-xl"
    >
      <DialogHeader>
        <DialogTitle className="font-semibold text-2xl">{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-base">{description}</DialogDescription>
      {children}
    </DialogContent>
  </Dialog>
);
