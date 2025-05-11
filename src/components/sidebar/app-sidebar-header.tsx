import React from "react";
import { SidebarHeader, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

interface Props {
  logo: string;
}

export const AppSidebarHeader: React.FC<Props> = ({ logo }) => {
  return (
    <SidebarHeader className="p-6 m-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <img src={logo} alt="logo" className="w-32" loading="lazy" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
