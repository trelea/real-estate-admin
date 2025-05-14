import { User } from "@/features/auth/types";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../sidebar/app-sidebar";

interface Props {
  status?: User;
  children: React.ReactNode;
  loading?: boolean;
}

export const Layout: React.FC<Props> = ({ status, children, loading }) => {
  return (
    <SidebarProvider
      style={{
        // @ts-ignore
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar user={status as User} loading={loading} />
      <main className="w-screen h-screen bg-primary/[2.5%] relative py-9 px-4">
        <SidebarTrigger className="absolute top-0 left-0">
          {/* @ts-ignore */}
          {(open) => (
            <span className="font-semibold text-foreground/75">
              {open ? "Close Sidebar" : "Open Sidebar"}
            </span>
          )}
        </SidebarTrigger>
        {children}
        <footer className="fixed bg-background w-full right-0 bottom-0 border-t shadow flex justify-end px-4 py-1">
          <h3 className="text-sm text-foreground/50 font-semibold">
            Build By: <span>{"<Author/>"}</span>
          </h3>
        </footer>
      </main>
    </SidebarProvider>
  );
};
