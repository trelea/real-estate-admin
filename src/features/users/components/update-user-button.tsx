import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import React from "react";

interface Props {}

export const UpdateUserButton: React.FC<Props> = ({}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Pencil className="size-5" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update User</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
    </DialogContent>
    <DialogFooter></DialogFooter>
  </Dialog>
);
