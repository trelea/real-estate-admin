import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import React from "react";
import { BlogsContext, BlogsContextProps } from "./context";
import { ManageData } from "@/components/manage-data-table/manage-data";
import { CreateBlogForm, UpdateBlogForm } from "@/features/blogs/forms";
import { type Blog } from "@/features/blogs/types";
import { User } from "@/features/auth/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SetStatus } from "@/features/blogs/components/set-status";
import { useDeleteBlog } from "@/features/blogs/hooks";

interface Props {
  status?: User;
}

export const Blogs: React.FC<Props> = ({ status }) => {
  const {
    meta: {
      setUriQueries,
      uriQueries: { search },
      //
      stepCreateBlogForm,
      setStepCreateBlogForm,
      //
      stepUpdateBlogForm,
      setStepUpdateBlogForm,
    },
    data: {
      blogs: { data, isLoading, isFetching },
    },
  } = React.useContext<BlogsContextProps>(BlogsContext);
  const [deleteBlog, deleteBlogLoading] = useDeleteBlog();

  return (
    <ManageData<Blog>
      loading={{
        state: isLoading || isFetching,
        component: <TableSkeleton previewThumbSkeleton />,
      }}
      header={{
        title: "Blogs",
        badge: `${data?.meta.total} blogs`,
        search: {
          defaultValue: search,
          onValueChange: (value) =>
            setUriQueries(({ search, ...rest }) => ({
              search: value,
              ...rest,
            })),
        },
        create: {
          trigger: { label: "Create blog", disabled: status?.role !== "ADMIN" },
          content: {
            title: "Create blog",
            description:
              "Enter the required information to create a new user. After submission, the user will be added to the system.",
            children: (
              <CreateBlogForm
                step={stepCreateBlogForm}
                prev={() => setStepCreateBlogForm((_) => _ - 1)}
                next={() => setStepCreateBlogForm((_) => _ + 1)}
              />
            ),
          },
          dialogState: {
            onOpenChange: (open) => {
              if (!open) setStepCreateBlogForm(1);
            },
          },
        },
      }}
      content={{
        table: {
          data: data?.data as Blog[],
          headers: ["Title", "Status", "Published", "Views"],
          rows: ({
            thumbnail,
            content,
            created_at,
            views,
            id,
            status: _status,
          }) => [
            <div className="flex items-center gap-3 lg:py-1 xl:py-1.5">
              <Avatar className="size-10">
                <AvatarImage src={thumbnail as string} className="object" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{content.title_en}</span>
            </div>,
            <SetStatus
              id={id}
              disabled={status?.role !== "ADMIN"}
              status={_status}
            />,
            <span className="font-medium text-sm">
              {new Intl.DateTimeFormat("ro", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(created_at))}
            </span>,
            <span className="font-medium text-sm">{views}</span>,
          ],
          /**
           * delete action
           */
          delete: {
            disabled: status?.role !== "ADMIN" || deleteBlogLoading,
            // @ts-ignore
            onDeleteAction: (id) => deleteBlog(id),
          },
          /**
           * update action
           */
          update: {
            disabled: status?.role !== "ADMIN",
            title: "Update User",
            description: (
              <React.Fragment>
                {stepUpdateBlogForm === 1 &&
                  "Update the image thumbnail for your blog post. This is the main preview image."}
                {stepUpdateBlogForm === 2 &&
                  "Edit the Romanian title and description for your blog post."}
                {stepUpdateBlogForm === 3 &&
                  "Edit the Russian title and description for your blog post."}
                {stepUpdateBlogForm === 4 &&
                  "Edit the English title and description for your blog post. Adjust the visibility of your blog post. If checked, it will be public and visible to anyone. If unchecked, it will remain private and only accessible to admins and dashboard users."}
              </React.Fragment>
            ),
            children: (blog) => (
              <UpdateBlogForm
                blog={blog}
                step={stepUpdateBlogForm}
                next={() => setStepUpdateBlogForm((_) => _ + 1)}
                prev={() => setStepUpdateBlogForm((_) => _ - 1)}
              />
            ),
            dialogState: {
              onOpenChange: (open) => {
                if (!open) setStepUpdateBlogForm(1);
              },
            },
          },
        },
      }}
      footer={{
        pagination: {
          meta: data?.meta,
          next: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page + 1,
              ...rest,
            })),
          prev: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page - 1,
              ...rest,
            })),
          current: (_) =>
            setUriQueries(({ page, ...rest }) => ({
              page: _,
              ...rest,
            })),
        },
      }}
    />
  );
};
