import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetConditionsQuery } from "@/features/conditions/api";
import { MultilingualItemType } from "@/features/multilingual/types";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  params?: {
    page: number;
    limit: number;
    search: string;
  };
}

export const HousingConditionsField: React.FC<Props> = ({
  control,
  name,
  label,
  params = { page: 1, limit: 1000, search: "" },
}) => {
  const { data } = useGetConditionsQuery(params, {
    refetchOnMountOrArgChange: false,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value?.length && "text-muted-foreground"
                  )}
                >
                  {field.value?.length
                    ? (
                        data?.data
                          ?.filter((d: MultilingualItemType<{}>) =>
                            field.value.includes(d.id)
                          )
                          .map((d: MultilingualItemType<{}>) => d.en)
                          .join(", ") as string
                      )
                        .slice(0, 25)
                        .concat("...")
                    : "Select Housing Conditions"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] max-h-96 overflow-auto">
              <Command>
                <CommandInput placeholder="Search housing condition" />
                <CommandList>
                  <CommandEmpty>No housing condition found.</CommandEmpty>
                  <CommandGroup>
                    {data?.data?.map((item: MultilingualItemType<{}>) => (
                      <CommandItem value={item.id.toString()} key={item.id}>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          className="mr-2"
                          tabIndex={-1}
                          onCheckedChange={() => {
                            const exists = field.value?.includes(item.id);
                            field.onChange(
                              exists
                                ? field.value.filter(
                                    (id: number) => id !== item.id
                                  )
                                : [...(field.value || []), item.id]
                            );
                          }}
                        />
                        {item.en}
                        <Check
                          className={cn(
                            "ml-auto",
                            field.value?.includes(item.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
