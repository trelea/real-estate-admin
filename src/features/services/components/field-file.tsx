import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemPreview,
  FileUploadList,
} from "@/components/ui/file-upload";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CloudUpload, X } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  control: UseFormReturn<any>;
  name: string;
  label?: string;
  description?: string;
  displayErrorMessage?: boolean;
  className?: string;
}

export const FieldItemFile: React.FC<Props> = ({
  control,
  name,
  label,
  description,
  displayErrorMessage,
  className,
}) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1 row-span-2 w-full h-full">
          {label && <FormLabel className="text-sm">{label}</FormLabel>}
          <FormControl className="h-full">
            <FileUpload
              value={field.value}
              onValueChange={field.onChange}
              accept="image/*"
              multiple={false}
              maxFiles={1}
            >
              {field.value &&
              typeof field.value !== "string" &&
              (field.value as File[]).length ? (
                <FileUploadList className="h-full w-full flex justify-center items-center">
                  {(field.value as File[]).map((file: File, _: number) => (
                    <FileUploadItem
                      key={_}
                      value={file}
                      className={cn(
                        "m-0 p-2 h-full w-full flex justify-center items-center relative",
                        className
                      )}
                    >
                      <FileUploadItemPreview className="m-0 p-0 rounded-lg h-full w-fit object-center object-cover" />
                      <FileUploadItemDelete
                        asChild
                        className="absolute top-1 right-1 bg-background"
                      >
                        <Button variant="ghost" size="icon" className="size-7">
                          <X />
                        </Button>
                      </FileUploadItemDelete>
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              ) : (
                <FileUploadDropzone
                  className={cn(
                    "border-solid border w-full h-full",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className
                  )}
                >
                  <CloudUpload />
                  <span className="text-sm text-foreground/50">
                    {t("services.fieldFile.clickToUpload", "Click to upload.")}
                  </span>
                </FileUploadDropzone>
              )}
            </FileUpload>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {displayErrorMessage && <FormMessage className="text-xs" />}
        </FormItem>
      )}
    />
  );
};
