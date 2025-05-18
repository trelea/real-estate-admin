import React from "react";

export interface DialogState {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface HeaderCreateSectionProps {
  trigger: {
    label: string;
    disabled?: boolean;
  };
  content: Partial<{
    title: React.ReactNode;
    description: React.ReactNode;
    children: React.ReactNode;
  }>;
  dialogState: DialogState;
}

export interface HeaderProps {
  title: string;
  badge: string;
  search: Partial<{
    defaultValue: string;
    onValueChange: (value: string) => void;
  }>;
  create: Partial<HeaderCreateSectionProps>;
}

export interface ContentUpdateProps<T extends {}> {
  disabled: boolean;
  children: (data: T) => React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  dialogState: DialogState;
}

export interface ContentProps<T extends {}> {
  table?: Partial<{
    data: T[];
    headers: string[];
    rows: (data: T) => React.ReactNode[];

    delete: Partial<{
      disabled: boolean;
      onDeleteAction: (id: string) => Promise<void>;
      dialogState: DialogState;
    }>;

    update: Partial<ContentUpdateProps<T>>;
  }>;
}

export interface FooterProps {
  pagination: Partial<{
    meta: PaginationMeta;
    next: () => void;
    prev: () => void;
    current: (_: number) => void;
  }>;
}

export interface ManageDataTableProps<T extends Object> {
  loading?: Partial<{
    state: boolean;
    component: React.ReactNode;
  }>;
  // UI PARTS
  header?: Partial<HeaderProps>;
  content?: Partial<ContentProps<T>>;
  footer?: Partial<FooterProps>;
}
