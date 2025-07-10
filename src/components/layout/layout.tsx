import { User } from "@/features/auth/types";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../sidebar/app-sidebar";
// import { HoverCard, HoverCardContent } from "../ui/hover-card";
// import { HoverCardTrigger } from "@radix-ui/react-hover-card";

interface Props {
  status?: User;
  loading?: boolean;
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ status, loading, children }) => {
  return (
    <SidebarProvider
      style={{
        // @ts-ignore
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar user={status as User} loading={loading} />
      <main className="w-screen h-screen bg-primary/[2.5%] relative pt-9 pb-6 px-4 max-h-screen">
        <SidebarTrigger className="absolute top-0 left-0">
          {/* @ts-ignore */}
          {(open) => (
            <span className="font-semibold text-foreground/75">
              {open ? "Close Sidebar" : "Open Sidebar"}
            </span>
          )}
        </SidebarTrigger>
        {children}
        <footer className="fixed bg-background w-screen max-w-screen right-0 bottom-0 border-t shadow flex justify-end px-4">
          {/* <HoverCard>
            <HoverCardTrigger asChild className="p-0 m-0 h-fit w-fit">
              <h3 className="text-sm text-foreground/75 font-semibold py-0.5">
                Built by: <span>DevCompare</span>
              </h3>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>DevCompare</strong> is a software development company
                  focused on building modern, scalable, and maintainable web
                  solutions.
                </p>
                <a
                  href="https://devcompare.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Visit devcompare.md ↗
                </a>
              </div>
            </HoverCardContent>
          </HoverCard> */}
        </footer>
      </main>
    </SidebarProvider>
  );
};
