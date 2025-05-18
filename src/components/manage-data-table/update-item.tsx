import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ContentUpdateProps } from "./types";
import { Pencil } from "lucide-react";

interface Props<T extends {}> extends Partial<ContentUpdateProps<T>> {
  data: T;
}

export const UpdateItem = <T extends {}>({
  children,
  description,
  title,
  disabled = true,
  data,
  dialogState,
}: Props<T>) => (
  <Dialog open={dialogState?.open} onOpenChange={dialogState?.onOpenChange}>
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
        <DialogTitle className="font-semibold text-2xl">{title}</DialogTitle>
        <DialogDescription className="text-base">
          {description}
        </DialogDescription>
      </DialogHeader>
      {children && children(data as T)}
    </DialogContent>
  </Dialog>
);
