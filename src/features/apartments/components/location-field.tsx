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
import {
  useGetLocationCategoriesQuery,
  useGetLocationSubCategoriesQuery,
} from "@/features/locations/api";
import { MultilingualItemType } from "@/features/multilingual/types";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Control } from "react-hook-form";

interface Props {
  category: {
    controll: Control<any>;
    name: string;
    label?: string;
    onSelect?: (data: MultilingualItemType<{}>) => void;
  };
  subcategory: {
    controll: Control<any>;
    name: string;
    label?: string;
    onSelect?: (data: MultilingualItemType<{}>) => void;
    category?: number;
  };
  params?: {
    page: number;
    limit: number;
    search: string;
    id?: number;
  };
}

export const LocationField: React.FC<Props> = ({
  category,
  subcategory,
  params = { page: 1, limit: 1000, search: "", id: subcategory.category },
}) => {
  const { currentLang: language } = useChangeLanguage();

  const { data } = useGetLocationCategoriesQuery(params);
  const { data: subcategories } = useGetLocationSubCategoriesQuery(params, {
    skip: !subcategory.category,
  });

  return (
    <>
      <FormField
        control={category.controll}
        name={category.name}
        render={({ field }) => (
          <FormItem className="w-full">
            {category.label && <FormLabel>{category.label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data?.data?.find(
                          (d: MultilingualItemType<{}>) => d?.id === field.value
                        )?.en
                      : "Select Category"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search location category..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {data?.data?.map((data: MultilingualItemType<{}>) => (
                        <CommandItem
                          value={data.id.toString()}
                          key={data.id}
                          onSelect={() => {
                            if (category?.onSelect) {
                              category?.onSelect(data);
                            }
                          }}
                        >
                          {/* @ts-ignore */}
                          {data[language]}
                          <Check
                            className={cn(
                              "ml-auto",
                              data.id === field.value
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

      <FormField
        control={subcategory.controll}
        name={subcategory.name}
        render={({ field }) => (
          <FormItem>
            {subcategory.label && <FormLabel>{subcategory.label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? subcategories?.data?.find(
                          (d: MultilingualItemType<{}>) => d?.id === field.value
                        )?.en
                      : "Select Subcategory"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search location subcategory..." />
                  <CommandList>
                    <CommandEmpty>No subcategory found.</CommandEmpty>
                    <CommandGroup>
                      {subcategories?.data?.map(
                        (data: MultilingualItemType<{}>) => (
                          <CommandItem
                            value={data.id.toString()}
                            key={data.id}
                            onSelect={() => {
                              if (subcategory?.onSelect) {
                                subcategory?.onSelect(data);
                              }
                            }}
                          >
                            {data.en}
                            <Check
                              className={cn(
                                "ml-auto",
                                data.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        )
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  );
};
