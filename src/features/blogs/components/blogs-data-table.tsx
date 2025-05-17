import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBlogMutation } from "../api";
import { DeleteBlogButton } from "./delete-blog-button";
import { BlogsContext, BlogsContextProps } from "@/pages/blogs/context";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useChangeStatus } from "../hooks";
import { UpdateBlogButton } from "./update-blog-button";
import { type Blog } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  data?: Blog[];
}

export const BlogsDataTable: React.FC<Props> = ({ data }) => {
  const {
    meta: {
      status,
      uriQueries: { page, search },
    },
  } = React.useContext<BlogsContextProps>(BlogsContext);
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const { action, states } = useChangeStatus();
  return (
    <Table>
      <TableHeader className="m-0 p-0">
        <TableRow>
          <TableHead className="font-semibold text-xs">Title</TableHead>
          <TableHead className="font-semibold text-xs">Status</TableHead>
          <TableHead className="font-semibold text-xs">Published</TableHead>
          <TableHead className="font-semibold text-xs">Views</TableHead>
          <TableHead className="font-semibold text-xs">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((blog) => (
          <TableRow key={blog.id}>
            <TableCell>
              <div className="flex items-center gap-3 lg:py-1 xl:py-1.5">
                <Avatar className="size-10">
                  <AvatarImage
                    src={blog.thumbnail as string}
                    className="object"
                  />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">
                  {blog.content.title_en}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div
                className={`flex justify-center items-center gap-1 w-24 py-1.5 rounded-2xl shadow ${
                  blog.status === "PUBLIC"
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : "bg-[#FDECEC] text-[#7A0202]"
                }`}
              >
                <Switch
                  defaultChecked={blog.status === "PUBLIC"}
                  onCheckedChange={(_) => action(blog.id, _)}
                  disabled={states.isLoading || status?.role === "USER"}
                  id="status"
                  aria-readonly
                  className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500`}
                />
                <Label htmlFor="status" className="font-medium text-xs">
                  {blog.status
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </Label>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-medium text-sm">
                {new Intl.DateTimeFormat("ro", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(blog.created_at))}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-medium text-sm">{blog.views}</span>
            </TableCell>
            <TableCell>
              <div className="flex">
                <UpdateBlogButton
                  disabled={status?.role === "USER"}
                  blog={blog}
                />
                <DeleteBlogButton
                  disabled={status?.role === "USER" || isLoading}
                  action={() =>
                    deleteBlog({
                      id: blog.id,
                      params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
                    })
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
