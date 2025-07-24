import React from "react";
import { Controller } from "react-hook-form";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface MediaFieldProps {
  control: any;
  name: string;
  label?: string;
  maxFiles?: number;
  maxSizeMB?: number;
}

export const MediaField: React.FC<MediaFieldProps> = ({
  control,
  name,
  label = "Media",
  maxFiles = 100,
  maxSizeMB = 100,
}) => {
  const [previewFile, setPreviewFile] = React.useState<File | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div>
              <FileUpload
                accept="image/png,image/jpeg,image/jpg,image/webp"
                maxFiles={maxFiles}
                maxSize={maxSizeMB * 1024 * 1024}
                value={field.value || []}
                onValueChange={(files) => {
                  field.onChange(files);
                  field.onBlur();
                }}
                multiple
                className="w-full"
              >
                <FileUploadDropzone>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                      <Upload className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">
                      Drag & drop images here
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Or click to browse (max {maxFiles} files, up to{" "}
                      {maxSizeMB}
                      MB each)
                    </p>
                  </div>
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                      Browse files
                    </Button>
                  </FileUploadTrigger>
                </FileUploadDropzone>
                <FileUploadList>
                  {(field.value || []).map((file: File, index: number) => (
                    <FileUploadItem key={index} value={file}>
                      <div className="flex items-center gap-2">
                        <div
                          className="cursor-pointer"
                          onClick={() => setPreviewFile(file)}
                        >
                          <FileUploadItemPreview />
                        </div>
                        <FileUploadItemMetadata
                          size="sm"
                          className="max-w-[140px] truncate"
                        />
                      </div>
                      <FileUploadItemDelete asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <X />
                        </Button>
                      </FileUploadItemDelete>
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              </FileUpload>
              <Dialog
                open={!!previewFile}
                onOpenChange={() => setPreviewFile(null)}
              >
                <DialogContent className="flex flex-col items-center justify-center max-w-2xl">
                  <DialogClose asChild />
                  {previewFile && (
                    <img
                      src={URL.createObjectURL(previewFile)}
                      alt={previewFile.name}
                      className="max-h-[70vh] max-w-full rounded shadow"
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </FormControl>
          {fieldState.error && (
            <FormMessage className="text-xs">
              {fieldState.error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
