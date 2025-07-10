import { TableOfContents } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DeleteItem } from "./delete-item";
import { ContentProps } from "./types";
import { UpdateItem } from "./update-item";
import { Link, LinkProps, useNavigate } from "react-router";
import { Button } from "../ui/button";

interface Props<T extends { id: string }> extends ContentProps<T> {}

export const ManageDataTable = <T extends { id: string }>({
  table,
}: Props<T>) => {
  const redirect = useNavigate();
  return (
    <Table>
      <TableHeader className="m-0 p-0">
        <TableRow>
          {table?.headers?.map((head, _) => (
            <TableHead key={_} className="font-semibold text-xs">
              {head}
            </TableHead>
          ))}
          <TableHead className="font-semibold text-xs">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {table?.data?.map((item: T) => (
          <TableRow key={item.id}>
            {table.rows &&
              table.rows(item).map((element, _) => (
                <TableCell
                  key={_}
                  onClick={() =>
                    table.access &&
                    redirect(
                      (table.access?.href &&
                        table.access?.href(item as T)) as LinkProps["to"]
                    )
                  }
                >
                  {element}
                </TableCell>
              ))}

            <TableCell>
              <div className="flex">
                {table.update && (
                  <UpdateItem<T>
                    disabled={table.update.disabled}
                    title={table.update.title}
                    description={table.update.description}
                    children={table.update.children}
                    data={item}
                    dialogState={{
                      open: table.update.dialogState?.open,
                      onOpenChange: table.update.dialogState?.onOpenChange,
                    }}
                  />
                )}
                {table.access && (
                  <Link
                    to={
                      (table.access.href &&
                        table.access.href(item)) as LinkProps["to"]
                    }
                  >
                    <Button variant={"ghost"} className="p-0 m-0 h-fit w-fit">
                      <TableOfContents className="size-5" />
                    </Button>
                  </Link>
                )}
                {table.delete && (
                  <DeleteItem
                    disabled={table.delete.disabled}
                    onDelete={() =>
                      table.delete?.onDeleteAction &&
                      table.delete?.onDeleteAction(item.id)
                    }
                    dialogState={{
                      open: table.delete.dialogState?.open,
                      onOpenChange: table.delete.dialogState?.onOpenChange,
                    }}
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
