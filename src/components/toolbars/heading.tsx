"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import React from "react";

const HeadingToolbar = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, onClick, children, ...props }) => {
  const { editor } = useToolbar();

  if (!editor) {
    return null;
  }

  const currentHeadingLevel = [1, 2, 3, 4, 5, 6].find((level) =>
    editor.isActive("heading", { level })
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 text-sm font-bold", className)}
          {...props}
        >
          <span className="text-sm">
            {currentHeadingLevel ? `H${currentHeadingLevel}` : "H"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <Tooltip key={level}>
            <TooltipTrigger asChild>
              <DropdownMenuItem
                onClick={() => {
                  // Avoid triggering focus here to prevent recursion
                  if (!editor.isActive("heading", { level })) {
                    // @ts-ignore
                    editor.chain().focus().toggleHeading({ level }).run();
                  }
                }}
                disabled={
                  // @ts-ignore
                  !editor.can().chain().focus().toggleHeading({ level }).run()
                }
                className={cn(
                  editor.isActive("heading", { level }) && "bg-accent",
                  "px-4 py-2 text-sm"
                )}
              >
                {`Heading ${level}`}
              </DropdownMenuItem>
            </TooltipTrigger>
            <TooltipContent>
              <span>{`Heading ${level}`}</span>
            </TooltipContent>
          </Tooltip>
        ))}

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

HeadingToolbar.displayName = "HeadingToolbar";

export { HeadingToolbar };
