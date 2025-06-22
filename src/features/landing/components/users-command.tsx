import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <CommandDialog open={open} onOpenChange={setOpenUsersCommand}>
      <CommandInput placeholder={t("landing.searchAgents")} />
      <CommandList className="min-h-[500px]">
        <CommandEmpty>{t("landing.noResultsFound")}</CommandEmpty>
        <CommandGroup heading={t("landing.agents")}>{children}</CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
