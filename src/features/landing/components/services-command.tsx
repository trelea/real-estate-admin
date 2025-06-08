import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import React from "react";

interface Props {
  open: boolean;
  setOpenServicesCommand: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const ServicesCommand: React.FC<Props> = ({
  open,
  setOpenServicesCommand,
  children,
}) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpenServicesCommand}>
      <CommandInput placeholder="Search Services" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Services">{children}</CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
