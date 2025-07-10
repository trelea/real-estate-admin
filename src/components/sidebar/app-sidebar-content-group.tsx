import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Link, LinkProps } from "react-router";
import { ChevronDown, LucideProps } from "lucide-react";

interface Props {
  label: string;
  items?: {
    title: React.ReactNode;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    url?: LinkProps["to"];
    collapsible?: {
      title: React.ReactNode;
      icon?: any;
      url?: LinkProps["to"];
    }[];
  }[];
  state?: "expanded" | "collapsed";
  toggleSidebar?: () => void;
}

export const AppSidebarContentGroup: React.FC<Props> = ({
  label,
  items,
  state,
  toggleSidebar,
}) => {
  return (
    <SidebarGroup className={state !== "collapsed" ? "m-0 p-0" : undefined}>
      <SidebarGroupLabel className="text-sm">{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items?.map(({ collapsible, ...item }, key: number) => (
            <React.Fragment key={key}>
              {collapsible ? (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon
                          onClick={() =>
                            state === "collapsed" &&
                            toggleSidebar &&
                            toggleSidebar()
                          }
                        />
                        <span className="text-base">{item.title}</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {collapsible.map((citem, key: number) => (
                        <SidebarMenuSub key={key} className="py-2">
                          <SidebarMenuSubItem>
                            <Link
                              to={citem.url as LinkProps["to"]}
                              className="flex"
                            >
                              {citem.icon && <citem.icon />}
                              <span className="text-sm">{citem.title}</span>
                            </Link>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      ))}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={item.url as LinkProps["to"]}>
                      <item.icon
                        onClick={() =>
                          state === "collapsed" &&
                          toggleSidebar &&
                          toggleSidebar()
                        }
                      />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
