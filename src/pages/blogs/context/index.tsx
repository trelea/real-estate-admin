import { User } from "@/features/auth/types";
import { useGetBlogsQuery } from "@/features/blogs/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import React from "react";

export type BlogsContextUrlQueriesType = UrlQueriesType;
export type SetBlogsContextUrlQueriesType = (
  query:
    | BlogsContextUrlQueriesType
    | ((query: BlogsContextUrlQueriesType) => void)
) => void;

export interface BlogsContextProps
  extends ContextProps<
    {
      uriQueries: BlogsContextUrlQueriesType;
      setUriQueries: SetBlogsContextUrlQueriesType;
      status?: User;
      /**
       * create
       */
      openDialogCreateBlog: boolean;
      setOpenDialogCreateBlog: React.Dispatch<React.SetStateAction<boolean>>;
      stepCreateBlogForm: number;
      setStepCreateBlogForm: React.Dispatch<React.SetStateAction<number>>;
      /**
       * update
       */
      openDialogUpdateBlog: boolean;
      setOpenDialogUpdateBlog: React.Dispatch<React.SetStateAction<boolean>>;
      stepUpdateBlogForm: number;
      setStepUpdateBlogForm: React.Dispatch<React.SetStateAction<number>>;
    },
    {
      blogs: ReturnType<typeof useGetBlogsQuery>;
    }
  > {}

export const BlogsContext = React.createContext<BlogsContextProps>(
  {} as BlogsContextProps
);

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const BlogsContextLayout: React.FC<Props> = ({
  children,
  className,
  status,
}) => {
  const [uriQueries, setUriQueries] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(""),
    },
    { history: "push" }
  );

  React.useEffect(() => {
    if (uriQueries.page !== 1) setUriQueries({ page: 1 });
  }, [uriQueries.search]);

  /**
   * for create
   */
  const [openDialogCreateBlog, setOpenDialogCreateBlog] =
    React.useState<boolean>(false);
  const [stepCreateBlogForm, setStepCreateBlogForm] = React.useState<number>(1);

  /**
   * for update
   */
  const [openDialogUpdateBlog, setOpenDialogUpdateBlog] =
    React.useState<boolean>(false);
  const [stepUpdateBlogForm, setStepUpdateBlogForm] = React.useState<number>(1);

  const blogs = useGetBlogsQuery(
    { page: uriQueries.page, search: uriQueries.search },
    { refetchOnMountOrArgChange: false }
  );

  return (
    <BlogsContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetBlogsContextUrlQueriesType,
          status,
          /**
           * create
           */
          openDialogCreateBlog,
          setOpenDialogCreateBlog,
          stepCreateBlogForm,
          setStepCreateBlogForm,
          /**
           * update
           */
          openDialogUpdateBlog,
          setOpenDialogUpdateBlog,
          stepUpdateBlogForm,
          setStepUpdateBlogForm,
        },
        data: {
          blogs,
        },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </BlogsContext.Provider>
  );
};
