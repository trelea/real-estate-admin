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
import { useTranslation } from "react-i18next";

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
      //
      openDialogCreateBlog,
      setOpenDialogCreateBlog,
    },
    data: {
      blogs: { data, isLoading, isFetching },
    },
  } = React.useContext<BlogsContextProps>(BlogsContext);
  const [deleteBlog, deleteBlogLoading] = useDeleteBlog();
  const { t } = useTranslation();

  return (
    <ManageData<Blog>
      loading={{
        state: isLoading || isFetching,
        component: <TableSkeleton previewThumbSkeleton />,
      }}
      header={{
        title: t("blogs.manageTitle", "Blogs"),
        badge: t("blogs.badge", {
          count: data?.meta.total ?? 0,
          defaultValue: "{{count}} blogs",
        }),
        search: {
          defaultValue: search,
          onValueChange: (value) =>
            setUriQueries(({ search, ...rest }) => ({
              search: value,
              ...rest,
            })),
        },
        create: {
          trigger: {
            label: t("blogs.create.trigger", "Create blog"),
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: t("blogs.create.title", "Create blog"),
            description: (
              <React.Fragment>
                {stepCreateBlogForm === 1 &&
                  t(
                    "blogs.create.description.step1",
                    "Choose a thumbnail for your blog post. This image will be displayed as the preview on the blog list."
                  )}
                {stepCreateBlogForm === 2 &&
                  t(
                    "blogs.create.description.step2",
                    "Write the Romanian title, description, and content for your blog post. Please make sure everything is well-formed."
                  )}
                {stepCreateBlogForm === 3 &&
                  t(
                    "blogs.create.description.step3",
                    "Write the Russian title, description, and content for your blog post. This will be the Russian version of your content."
                  )}
                {stepCreateBlogForm === 4 &&
                  t(
                    "blogs.create.description.step4",
                    "Write the English title, description, and content for your blog post. Ensure the content is accurate and clear."
                  )}
                {stepCreateBlogForm === 5 &&
                  t(
                    "blogs.create.description.step5",
                    "Choose whether to make the blog post public or private. If public, it will be visible to everyone. If private, only admins and users with proper access can view it."
                  )}
              </React.Fragment>
            ),
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
              open
                ? setOpenDialogCreateBlog(true)
                : setOpenDialogCreateBlog(false);

              setStepCreateBlogForm(1);
            },
            open: openDialogCreateBlog,
          },
        },
      }}
      content={{
        table: {
          data: data?.data as Blog[],
          headers: [
            t("blogs.tableHeaders.title", "Title"),
            t("blogs.tableHeaders.status", "Status"),
            t("blogs.tableHeaders.published", "Published"),
            t("blogs.tableHeaders.views", "Views"),
          ],
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
            title: t("blogs.update.title", "Update Blog"),
            description: (
              <React.Fragment>
                {stepUpdateBlogForm === 1 &&
                  t(
                    "blogs.update.description.step1",
                    "Update the image thumbnail for your blog post. This is the main preview image."
                  )}
                {stepUpdateBlogForm === 2 &&
                  t(
                    "blogs.update.description.step2",
                    "Edit the Romanian title and description for your blog post."
                  )}
                {stepUpdateBlogForm === 3 &&
                  t(
                    "blogs.update.description.step3",
                    "Edit the Russian title and description for your blog post."
                  )}
                {stepUpdateBlogForm === 4 &&
                  t(
                    "blogs.update.description.step4",
                    "Edit the English title and description for your blog post. Adjust the visibility of your blog post. If checked, it will be public and visible to anyone. If unchecked, it will remain private and only accessible to admins and dashboard users."
                  )}
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
