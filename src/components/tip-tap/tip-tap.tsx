"use client";

import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";

import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { UndoToolbar } from "@/components/toolbars/undo";
import {
  EditorContent,
  type Extension as ExtensionType,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { HeadingToolbar } from "../toolbars/heading";
import React from "react";
import { cn } from "@/lib/utils";
import TextStyle from "@tiptap/extension-text-style";
import { FontSizeToolbar } from "../toolbars/font-size";
import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    code: {
      HTMLAttributes: {
        class: "bg-accent rounded-md p-1",
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "my-2",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
      },
    },
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
  }),
  FontSize,
  TextStyle.configure({ mergeNestedSpanStyles: true }),
];

interface Props {
  placeholder?: string;
  value?: string;
  onValueChange?: (data?: string) => void;
  className?: string;
  withSubmitButton?: React.ReactNode;
}

const TipTapKit: React.FC<Props> = ({
  placeholder,
  value,
  onValueChange,
  className = false,
  withSubmitButton,
}) => {
  const editor = useEditor({
    extensions: extensions as ExtensionType[],
    content: value || placeholder,
    immediatelyRender: false,
    editable: true,
    onUpdate: ({ editor }) => onValueChange && onValueChange(editor.getHTML()),
  });

  React.useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }
  return (
    <div className="border w-full relative rounded-md overflow-hidden">
      <div className="flex p-2 justify-between items-center w-full border-b sticky top-0 left-0 bg-background z-20">
        <ToolbarProvider editor={editor}>
          <div className="flex items-center p-1 gap-2 max-w-full overflow-x-scroll">
            <UndoToolbar />
            <RedoToolbar />
            {/* font size */}
            <FontSizeToolbar />
            <HeadingToolbar />
            <BoldToolbar />
            <ItalicToolbar />
            <StrikeThroughToolbar />
            <BulletListToolbar />
            <OrderedListToolbar />
            <HorizontalRuleToolbar />
            <BlockquoteToolbar />
            <HardBreakToolbar />
          </div>
        </ToolbarProvider>
        {withSubmitButton}
      </div>

      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="cursor-text bg-background"
      >
        {/* min-h-72 || h-[84vh] */}
        <EditorContent
          className={cn(
            "tiptap outline-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-10",
            className
          )}
          editor={editor}
        />
      </div>
    </div>
  );
};

export default TipTapKit;
