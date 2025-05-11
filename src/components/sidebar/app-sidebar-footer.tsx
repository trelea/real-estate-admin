import React from "react";
import { SidebarFooter, SidebarMenu } from "../ui/sidebar";
import { User } from "@/features/auth/types";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

interface Props {
  user: User;
  loading?: boolean;
  onClick?: () => void;
  state?: "expanded" | "collapsed";
  toggleSidebar?: () => void;
}

export const AppSidebarFooter: React.FC<Props> = ({
  user,
  loading,
  onClick,
  state,
  toggleSidebar,
}) => {
  return (
    <SidebarFooter className={state !== "collapsed" ? "m-0 p-6" : undefined}>
      <SidebarMenu>
        {loading ? (
          <div className="flex w-full gap-3 items-center">
            <Skeleton className="rounded-full h-10 w-10 bg-primary/20" />

            <div className="flex flex-col gap-2 h-full items-center">
              <Skeleton className="w-32 h-3 bg-primary/20" />
              <Skeleton className="w-32 h-3 bg-primary/20" />
            </div>
          </div>
        ) : (
          <div
            className="w-full flex justify-between"
            onClick={() =>
              state === "collapsed" && toggleSidebar && toggleSidebar()
            }
          >
            <div className="flex items-center gap-3">
              <Avatar
                className={`${
                  state !== "collapsed" ? "h-10 w-10" : "h-8 w-8"
                } border`}
              >
                <AvatarFallback className="flex justify-center items-center">
                  <span className="text-center">
                    {user?.profile?.surname?.at(0)?.toUpperCase()}
                  </span>
                </AvatarFallback>
                <AvatarImage
                  className="h-10 w-10"
                  src={user?.profile?.thumbnail as string}
                />
              </Avatar>
              {state !== "collapsed" && (
                <ul className="flex flex-col gap-1 justify-center">
                  <li className="text-sm font-medium">
                    {user?.profile?.surname} {user?.profile?.name}
                  </li>
                  <li className="text-xs">{user?.email}</li>
                </ul>
              )}
            </div>
            {state !== "collapsed" && (
              <Button variant={"ghost"} onClick={onClick}>
                <LogOut className="text-destructive size-5" />
              </Button>
            )}
          </div>
        )}
      </SidebarMenu>
    </SidebarFooter>
  );
};
