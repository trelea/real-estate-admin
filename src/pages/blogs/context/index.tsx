import { User } from "@/features/auth/types";
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
    },
    {}
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

  return (
    <BlogsContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetBlogsContextUrlQueriesType,
          status,
        },
        data: {},
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </BlogsContext.Provider>
  );
};
