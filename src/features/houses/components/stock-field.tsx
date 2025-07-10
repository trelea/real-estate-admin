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
import { useGetHousingStocksQuery } from "@/features/housing-stocks/api";
import { MultilingualItemType } from "@/features/multilingual/types";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  onSelect?: (data: MultilingualItemType<{}>) => void;
  params?: {
    page: number;
    limit: number;
    search: string;
  };
}

export const StockField: React.FC<Props> = ({
  control,
  name,
  label,
  onSelect,
  params = { page: 1, limit: 1000, search: "" },
}) => {
  const { t } = useTranslation();
  const { currentLang: language } = useChangeLanguage();
  const { data } = useGetHousingStocksQuery(params, {
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
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? data?.data?.find(
                        (d: MultilingualItemType<{}>) => d?.id === field.value
                      )?.[language]
                    : t("createHouse.select_housing_stock")}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput
                  placeholder={t("createHouse.search_housing_stock")}
                />
                <CommandList>
                  <CommandEmpty>
                    {t("createHouse.no_housing_stock_found")}
                  </CommandEmpty>
                  <CommandGroup>
                    {data?.data?.map((item: MultilingualItemType<{}>) => (
                      <CommandItem
                        value={item.id.toString()}
                        key={item.id}
                        onSelect={() => {
                          field.onChange(item.id);
                          onSelect && onSelect(item);
                        }}
                      >
                        {/* @ts-ignore */}
                        {item[language]}
                        <Check
                          className={cn(
                            "ml-auto",
                            item.id === field.value
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
