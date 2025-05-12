import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

export const UsersDataTableSkeleton: React.FC<Props> = ({}) => (
  <Card className="h-full">
    <CardContent className="h-full flex flex-col justify-between">
      {Array(15)
        .fill(null)
        .map((_, __) => (
          <Skeleton key={__} className="h-12 w-full" />
        ))}
    </CardContent>
  </Card>
);
