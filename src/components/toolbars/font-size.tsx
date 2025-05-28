"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import React from "react";
const fontSizes = [
  "10px",
  "11px",
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "30px",
  "32px",
  "36px",
  "40px",
  "48px",
  "56px",
  "64px",
  "72px",
];

const FontSizeToolbar = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
  // @ts-ignore
>(({ className, onClick, children, ...props }, ref) => {
  const { editor } = useToolbar();

  if (!editor) {
    return null;
  }

  const currentFontSize: Partial<{ fontSize: string }> =
    editor.getAttributes("textStyle").fontSize;

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
          <span className="text-sm">{currentFontSize?.fontSize || "A"}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {fontSizes.map((size) => (
          <Tooltip key={size}>
            <TooltipTrigger asChild>
              <DropdownMenuItem
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setMark("textStyle", { fontSize: size })
                    .run();
                }}
                disabled={
                  !editor
                    .can()
                    .chain()
                    .focus()
                    .setMark("textStyle", { fontSize: size })
                    .run()
                }
                className={cn(
                  currentFontSize === size && "bg-accent",
                  "px-4 py-2 text-sm"
                )}
              >
                {size}
              </DropdownMenuItem>
            </TooltipTrigger>
          </Tooltip>
        ))}

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

FontSizeToolbar.displayName = "FontSizeToolbar";

export { FontSizeToolbar };
