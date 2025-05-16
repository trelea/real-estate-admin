import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  previewThumbSkeleton?: boolean;
}

export const TableSkeleton: React.FC<Props> = ({ previewThumbSkeleton }) => (
  <div className="w-full h-full flex flex-col gap-2">
    {Array(11)
      .fill(null)
      .map((_, __) => (
        <div className="flex gap-2" key={__}>
          {previewThumbSkeleton && (
            <Skeleton className="aspect-square rounded-full h-12 w-12 xl:h-14 xl:w-14" />
          )}
          <Skeleton className="h-12 xl:h-14 w-full" />
        </div>
      ))}
  </div>
);
