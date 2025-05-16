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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  action?: (data?: unknown) => void;
  disabled?: boolean;
}

export const DeleteBlogButton: React.FC<Props> = ({
  action,
  disabled = false,
}) => (
  <AlertDialog>
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
        <AlertDialogAction className="bg-destructive" onClick={action}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
