import TipTapKit from "@/components/tip-tap/tip-tap";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  control: UseFormReturn<any>;
  name: string;
  placeholder?: string;
  withSubmitButton?: React.ReactNode;
}

export const TipTapField: React.FC<Props> = ({
  control,
  name,
  placeholder,
  withSubmitButton,
}) => {
  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <TipTapKit
              withSubmitButton={withSubmitButton}
              className="h-[76vh]"
              placeholder={placeholder}
              onValueChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
