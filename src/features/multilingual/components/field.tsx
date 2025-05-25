import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES } from "@/consts";
import React, { HTMLInputTypeAttribute } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface Props {
  control: UseFormReturn<any>;
  name: string;
  label?: string;
  description?: string;
  displayErrorMessage?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | Partial<"select" | "contact">;
  select?: {
    defaultValue?: string;
    values: ROLES[];
  };
  defaultValue?: unknown;
}

export const FieldItem: React.FC<Props> = ({
  control,
  name,
  label,
  description,
  displayErrorMessage,
  placeholder,
  type = "text",
  select,
  defaultValue,
}) => {
  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          {label && <FormLabel className="text-sm">{label}</FormLabel>}
          <FormControl>
            <RenderFieldBsedOnType
              type={type as HTMLInputTypeAttribute & "select"}
              placeholder={placeholder}
              field={field}
              select={select ? select : undefined}
              defaultValue={defaultValue}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {displayErrorMessage && <FormMessage className="text-xs" />}
        </FormItem>
      )}
    />
  );
};

function RenderFieldBsedOnType({
  type,
  placeholder,
  field,
  select,
  defaultValue,
}: {
  type: HTMLInputTypeAttribute | Partial<"select" | "contact">;
  placeholder?: string;
  field: ControllerRenderProps;
  select?: {
    defaultValue?: string;
    values: ROLES[];
  };
  defaultValue: unknown;
}) {
  if (type === "select" && select)
    return (
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value || defaultValue}
      >
        <FormControl>
          <SelectTrigger className="ring-0 focus-visible:ring-0 font-normal text-base w-full h-fit p-3 rounded-xl py-[22px]">
            <SelectValue
              placeholder={field.value || select.defaultValue}
              className="m-0 p-0 h-fit w-full flex-none"
            />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {select.values.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

  if (type === "contact")
    return (
      <FormControl>
        <PhoneInput
          placeholder={placeholder}
          {...field}
          className="ring-0 focus-visible:ring-0 font-normal text-base w-full h-fit p-3 rounded-r-xl"
          defaultValue={defaultValue as string}
        />
      </FormControl>
    );

  if (type === "password")
    return (
      <FormControl>
        <PasswordInput
          placeholder={placeholder}
          {...field}
          className="ring-0 focus-visible:ring-0 font-normal text-base w-full h-fit p-3 rounded-xl"
          defaultValue={defaultValue as string}
        />
      </FormControl>
    );

  return (
    <FormControl>
      <Input
        type={type}
        placeholder={placeholder}
        {...field}
        className="ring-0 focus-visible:ring-0 font-normal text-base w-full h-fit p-3 rounded-xl"
        defaultValue={defaultValue as string}
      />
    </FormControl>
  );
}
