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
  maxFiles = 50,
  maxSizeMB = 5,
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
                      crossOrigin="anonymous"
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

// ------------------------------------------------------------

// import React from "react";
// import { Controller } from "react-hook-form";
// import {
//   FileUpload,
//   FileUploadDropzone,
//   FileUploadItem,
//   FileUploadItemDelete,
//   FileUploadItemMetadata,
//   FileUploadItemPreview,
//   FileUploadList,
//   FileUploadTrigger,
// } from "@/components/ui/file-upload";
// import { Button } from "@/components/ui/button";
// import {
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormControl,
// } from "@/components/ui/form";
// import { Upload, X, Image } from "lucide-react";
// import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

// interface MediaFieldProps {
//   control: any;
//   name: string;
//   label?: string;
//   maxFiles?: number;
//   maxSizeMB?: number;
//   existingMediaName?: string; // Optional field name for existing S3 media
// }

// type ExistingMedia = { id: string; url: string };

// export const MediaField: React.FC<MediaFieldProps> = ({
//   control,
//   name,
//   label = "Media",
//   maxFiles = 10,
//   maxSizeMB = 5,
//   existingMediaName = "existingMedia", // Default name for existing media field
// }) => {
//   const [previewItem, setPreviewItem] = React.useState<File | string | null>(
//     null
//   );

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field, fieldState }) => {
//         // Get existing media from form (if any)
//         const existingMedia: ExistingMedia[] =
//           control._formValues[existingMediaName] || [];
//         const newFiles: File[] = field.value || [];
//         const totalMedia = existingMedia.length + newFiles.length;

//         const handleRemoveExisting = (index: number) => {
//           const updated = existingMedia.filter((_, i) => i !== index);
//           control._formValues[existingMediaName] = updated;
//           // Trigger re-render
//           field.onChange([...newFiles]);
//         };

//         return (
//           <FormItem>
//             {label && <FormLabel>{label}</FormLabel>}
//             <FormControl>
//               <div className="space-y-4">
//                 {/* Show existing S3 images */}
//                 {existingMedia.length > 0 && (
//                   <div className="space-y-2">
//                     <p className="text-sm text-muted-foreground">
//                       Existing images ({existingMedia.length})
//                     </p>
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                       {existingMedia.map((media, index) => (
//                         <div
//                           key={`existing-${media.id}`}
//                           className="relative group rounded-lg overflow-hidden border bg-muted/10"
//                         >
//                           <div
//                             className="aspect-square cursor-pointer"
//                             onClick={() => setPreviewItem(media.url)}
//                           >
//                             <img
//                               src={media.url}
//                               alt={`Existing ${index + 1}`}
//                               className="w-full h-full object-cover"
//                               loading="lazy"
//                             />
//                           </div>
//                           <Button
//                             type="button"
//                             variant="destructive"
//                             size="icon"
//                             className="absolute top-1 right-1 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
//                             onClick={() => handleRemoveExisting(index)}
//                           >
//                             <X className="size-3" />
//                           </Button>
//                           <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                             Existing (S3)
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* File upload for new images */}
//                 {totalMedia < maxFiles && (
//                   <FileUpload
//                     accept="image/png,image/jpeg,image/jpg,image/webp"
//                     maxFiles={maxFiles - existingMedia.length}
//                     maxSize={maxSizeMB * 1024 * 1024}
//                     value={newFiles}
//                     onValueChange={(files) => {
//                       field.onChange(files);
//                       field.onBlur();
//                     }}
//                     multiple
//                     className="w-full"
//                   >
//                     <FileUploadDropzone>
//                       <div className="flex flex-col items-center gap-1 text-center">
//                         <div className="flex items-center justify-center rounded-full border p-2.5">
//                           <Upload className="size-6 text-muted-foreground" />
//                         </div>
//                         <p className="font-medium text-sm">
//                           Drag & drop images here
//                         </p>
//                         <p className="text-muted-foreground text-xs">
//                           Or click to browse (can add {maxFiles - totalMedia}{" "}
//                           more files, up to {maxSizeMB} MB each)
//                         </p>
//                       </div>
//                       <FileUploadTrigger asChild>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="mt-2 w-fit"
//                         >
//                           Browse files
//                         </Button>
//                       </FileUploadTrigger>
//                     </FileUploadDropzone>

//                     {newFiles.length > 0 && (
//                       <>
//                         <p className="text-sm text-muted-foreground mt-4">
//                           New uploads ({newFiles.length})
//                         </p>
//                         <FileUploadList>
//                           {newFiles.map((file: File, index: number) => (
//                             <FileUploadItem key={index} value={file}>
//                               <div className="flex items-center gap-2">
//                                 <div
//                                   className="cursor-pointer"
//                                   onClick={() => setPreviewItem(file)}
//                                 >
//                                   <FileUploadItemPreview />
//                                 </div>
//                                 <FileUploadItemMetadata
//                                   size="sm"
//                                   className="max-w-[140px] truncate"
//                                 />
//                               </div>
//                               <FileUploadItemDelete asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   className="size-7"
//                                 >
//                                   <X />
//                                 </Button>
//                               </FileUploadItemDelete>
//                             </FileUploadItem>
//                           ))}
//                         </FileUploadList>
//                       </>
//                     )}
//                   </FileUpload>
//                 )}

//                 {totalMedia >= maxFiles && (
//                   <div className="text-sm text-muted-foreground text-center py-4 border-2 border-dashed rounded-lg">
//                     Maximum of {maxFiles} images reached
//                   </div>
//                 )}

//                 {/* Preview Dialog */}
//                 <Dialog
//                   open={!!previewItem}
//                   onOpenChange={() => setPreviewItem(null)}
//                 >
//                   <DialogContent className="flex flex-col items-center justify-center max-w-2xl">
//                     <DialogClose />
//                     {previewItem && (
//                       <img
//                         src={
//                           typeof previewItem === "string"
//                             ? previewItem
//                             : URL.createObjectURL(previewItem)
//                         }
//                         alt="Preview"
//                         className="max-h-[70vh] max-w-full rounded shadow"
//                         onLoad={(e) => {
//                           // Clean up blob URL after load
//                           if (previewItem instanceof File) {
//                             const src = e.currentTarget.src;
//                             setTimeout(() => URL.revokeObjectURL(src), 100);
//                           }
//                         }}
//                       />
//                     )}
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </FormControl>
//             {fieldState.error && (
//               <FormMessage className="text-xs">
//                 {fieldState.error.message}
//               </FormMessage>
//             )}
//           </FormItem>
//         );
//       }}
//     />
//   );
// };
