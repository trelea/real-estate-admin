import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

export const UsersDataTableSkeleton: React.FC<Props> = ({}) => (
  <CardContent className="h-full flex flex-col justify-between">
    {Array(10)
      .fill(null)
      .map((_, __) => (
        <div className="flex gap-2" key={__}>
          <Skeleton className="aspect-square rounded-full h-16 w-16" />
          <Skeleton className="h-16 w-full" />
        </div>
      ))}
  </CardContent>
);
