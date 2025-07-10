import React from "react";
import { Sidebar, useSidebar } from "../ui/sidebar";
import { User } from "@/features/auth/types";
import { useSignoutMutation } from "@/features/auth/api";
import logo from "@/assets/logo.png";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarHeader } from "./app-sidebar-header";
import { AppSidebarContent } from "./app-sidebar-content";

interface Props {
  user: User;
  loading?: boolean;
}

export const AppSidebar: React.FC<Props> = ({ loading, user }) => {
  const [signout] = useSignoutMutation();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar
      className={
        state !== "collapsed"
          ? `m-0 p-0 h-screen justify-between flex flex-col`
          : undefined
      }
      variant="sidebar"
      side="left"
      collapsible="icon"
    >
      {/* header */}
      <AppSidebarHeader logo={logo} />

      {/* content */}
      <AppSidebarContent state={state} toggleSidebar={toggleSidebar} />

      {/* footer */}
      <AppSidebarFooter
        state={state}
        toggleSidebar={toggleSidebar}
        user={user}
        loading={loading}
        onClick={() => signout({})}
      />
    </Sidebar>
  );
};
