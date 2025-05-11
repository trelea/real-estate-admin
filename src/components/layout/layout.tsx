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
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar user={status as User} loading={loading} />
      <main className="w-screen h-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
