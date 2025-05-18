import { DebouncedSearch } from "../debounced-search/debounced-search";
import { TablePagination } from "../pagination/table-pagination";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { CreateItem } from "./create-item";
import { ManageDataTable } from "./manage-data-table";
import { HeaderCreateSectionProps, ManageDataTableProps } from "./types";

export const ManageData = <T extends {}>({
  header,
  footer,
  loading,
  content,
}: ManageDataTableProps<T>) => {
  return (
    <Card className="m-0 p-0 h-full gap-0 w-full">
      {/* header */}
      {header && (
        <CardHeader className="m-0 p-0 w-full h-fit">
          <div className="px-4 py-2 xl:p-6 grid grid-cols-2 lg:grid-cols-3 items-center border-b gap-2">
            <div className="flex items-center gap-2 order-1">
              {header?.title && (
                <h1 className="font-medium text-base xl:text-lg">
                  {header.title}
                </h1>
              )}
              {header?.badge && (
                <Badge className="font-semibold text-xs text-primary bg-primary/10 h-fit w-fit py-1 px-2 rounded-2xl flex justify-center items-center">
                  {header.badge}
                </Badge>
              )}
            </div>

            {header?.search && (
              <DebouncedSearch
                className="py-1 xl:py-2 w-full col-span-2 lg:col-span-1 order-3 lg:order-2"
                defaultValue={header.search.defaultValue}
                onChange={header.search.onValueChange}
              />
            )}

            <div className="flex justify-end order-2 lg:order-3">
              <CreateItem
                trigger={
                  header.create?.trigger as HeaderCreateSectionProps["trigger"]
                }
                content={
                  header.create?.content as HeaderCreateSectionProps["content"]
                }
                dialogState={{
                  open: header?.create?.dialogState?.open,
                  onOpenChange: header?.create?.dialogState?.onOpenChange,
                }}
              />
            </div>
          </div>
        </CardHeader>
      )}

      {/* content */}
      <CardContent className="h-full w-full">
        {loading?.state ? (
          <>{loading.component}</>
        ) : (
          <>
            {content?.table && (
              <ManageDataTable<T & { id: string }>
                table={{
                  headers: content?.table?.headers as string[],
                  data: content?.table?.data as (T & { id: string })[],
                  rows: content?.table?.rows,
                  /**
                   * delete action
                   */
                  delete: {
                    disabled: content.table.delete?.disabled as boolean,
                    onDeleteAction: ((id) =>
                      content.table?.delete?.onDeleteAction &&
                      content.table?.delete?.onDeleteAction(id)) as (
                      id: string
                    ) => Promise<void>,
                    dialogState: {
                      open: content.table.delete?.dialogState?.open,
                      onOpenChange:
                        content.table.delete?.dialogState?.onOpenChange,
                    },
                  },
                  /**
                   * update action
                   */
                  update: {
                    title: content.table.update?.title,
                    description: content.table.update?.description,
                    disabled: content.table.update?.disabled,
                    children: content.table.update?.children,
                    dialogState: {
                      open: content.table.update?.dialogState?.open,
                      onOpenChange:
                        content.table.update?.dialogState?.onOpenChange,
                    },
                  },
                }}
              />
            )}
          </>
        )}
      </CardContent>

      {/* footer */}
      {footer && (
        <CardFooter className="h-fit flex items-end w-full m-0 p-0">
          <div className="border-t w-full px-6 py-2">
            <TablePagination
              meta={footer.pagination?.meta}
              access={footer.pagination?.current}
              prev={footer.pagination?.prev}
              next={footer.pagination?.next}
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
