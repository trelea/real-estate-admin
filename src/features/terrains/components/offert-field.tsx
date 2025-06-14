import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Control } from "react-hook-form";

interface Props {
  controll: Control<any>;
  name: string;
  label?: string;
}

const items = [
  {
    id: "SALE",
    label: "Sale",
  },
  { id: "RENT", label: "Rent" },
];

export const OffertField: React.FC<Props> = ({ controll, name, label }) => {
  return (
    <FormField
      control={controll}
      name={name}
      render={() => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <div className="flex gap-4">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={controll}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex w-fit flex-row-reverse">
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([
                                ...(() => (field?.value ? field?.value : []))(),
                                item.id,
                              ])
                            : field.onChange(
                                field?.value?.filter(
                                  (value: string) => value !== item.id
                                )
                              )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
