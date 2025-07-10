import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link, LinkProps } from "react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { TablePagination } from "../pagination/table-pagination";
import { PaginationMeta } from "@/types";
import { TableSkeleton } from "../table-skeleton/table-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { isNumeric } from "@/utils/is-numeric";

interface Props<T> {
  loading?: boolean;
  header: {
    title: React.ReactNode;
    redirect: LinkProps["to"];
    total?: number;
  };
  footer: {
    prev?: () => void;
    next?: () => void;
    access?: (page: number) => void;
    meta?: PaginationMeta;
  };
  table: {
    data: T[];
    headers: string[];
    rows: (data: T) => React.ReactNode[];
  };
  onDelete?: (data: T) => void;
  onEdit?: (data: T) => void;
  onSearch?: (value: number) => void;
}

export const PropertiesTable = <T extends { id: number }>({
  header,
  footer,
  loading,
  table,
  onDelete,
  onEdit,
  onSearch,
}: Props<T>) => {
  const { t } = useTranslation();

  const onChange = useDebounce((value: number) => {
    onSearch && onSearch(value);
  }, 1000);

  return (
    <Card className="h-full w-full p-0 m-0 gap-0">
      <CardHeader className="p-0 m-0 px-4 py-2 xl:p-6">
        <div className="flex flex-col md:flex-row md:justify-between">
          <CardTitle className="font-medium text-xl flex items-center gap-4 m-0 p-0">
            {header.title}

            <Badge className="bg-[#EBF4FF] text-primary">
              {t("propertiesTable.badge", {
                count: header.total ?? 0,
                defaultValue: "{{count}} properties",
              })}
            </Badge>
          </CardTitle>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder={t("propertiesTable.searchById", "Search by ID")}
              className="rounded-xl"
              onChange={(e) => {
                if (isNumeric(e.target.value)) {
                  onChange(Number(e.target.value));
                }
                return;
              }}
            />
            <Link
              to={header.redirect}
              className="w-full justify-center bg-primary flex items-center text-white py-2.5 px-4 shadow-2xl rounded-xl gap-2"
            >
              <Plus className="size-4" />
              <span className="text-xs lg:text-sm">
                {t("propertiesTable.createOffert", "Create Offert")}
              </span>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-full w-full">
        {loading ? (
          <TableSkeleton />
        ) : (
          <Table>
            <TableHeader className="m-0 p-0">
              <TableRow>
                {table.headers?.map((headKey, _) => (
                  <TableHead key={_} className="font-semibold text-xs">
                    {t(headKey as any, headKey)}
                  </TableHead>
                ))}
                <TableHead className="font-semibold text-xs">
                  {t("propertiesTable.actions", "Actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.data.map((item: T) => (
                <TableRow key={item.id}>
                  {table.rows &&
                    table
                      .rows(item)
                      .map((element, _) => (
                        <TableCell key={_}>{element}</TableCell>
                      ))}
                  <TableCell>
                    <div className="flex">
                      <Button
                        variant={"ghost"}
                        className="p-0 m-0 h-fit w-fit"
                        onClick={() => onEdit && onEdit(item)}
                      >
                        <Pencil className="size-5" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="p-0 m-0 h-fit w-fit"
                          >
                            <Trash2 className="size-5 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t("delete.title", "Are you absolutely sure?")}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t(
                                "delete.description",
                                "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                              )}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              {t("delete.cancel", "Cancel")}
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive"
                              onClick={() => onDelete && onDelete(item)}
                            >
                              {t("delete.continue", "Continue")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <CardFooter className="h-fit flex items-end w-full m-0 p-0">
        <div className="w-full px-6 py-2 border-t">
          <TablePagination
            meta={footer.meta}
            access={footer.access}
            next={footer.next}
            prev={footer.prev}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
