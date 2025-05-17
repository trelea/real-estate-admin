import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

interface Props {
  previewThumbSkeleton?: boolean;
}

export const TableSkeleton: React.FC<Props> = ({ previewThumbSkeleton }) => (
  <Table className="w-full h-full">
    <TableBody>
      {Array(11)
        .fill(null)
        .map((_, __) => (
          <TableRow key={__}>
            <TableCell>
              <div className="flex items-center w-full gap-2">
                {previewThumbSkeleton && (
                  <Skeleton className="h-10 w-10 xl:h-12 xl:w-12 rounded-full" />
                )}
                <Skeleton className="w-full h-10 xl:h-12" />
              </div>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);
