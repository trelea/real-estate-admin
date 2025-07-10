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
import { useTranslation } from "react-i18next";

interface Props {
  disabled?: boolean;
  onDelete?: () => void;
  dialogState?: DialogState;
}

export const DeleteItem: React.FC<Props> = ({
  disabled = true,
  onDelete,
  dialogState,
}: Props) => {
  const { t } = useTranslation();
  return (
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
          <AlertDialogTitle>{t("delete.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("delete.cancel")}</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={onDelete}>
            {t("delete.continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
