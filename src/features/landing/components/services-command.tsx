import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <CommandDialog open={open} onOpenChange={setOpenServicesCommand}>
      <CommandInput placeholder={t("landing.searchServices")} />
      <CommandList>
        <CommandEmpty>{t("landing.noResultsFound")}</CommandEmpty>
        <CommandGroup heading={t("landing.services")}>{children}</CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
