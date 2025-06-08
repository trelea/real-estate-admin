import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import React from "react";

interface Props {
  open: boolean;
  setOpenUsersCommand: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode[];
}

export const UsersCommand: React.FC<Props> = ({
  children,
  open,
  setOpenUsersCommand,
}) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpenUsersCommand}>
      <CommandInput placeholder="Search Agents" />
      <CommandList className="min-h-[500px]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Services">{children}</CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
