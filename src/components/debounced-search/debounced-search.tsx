import React from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  defaultValue?: string;
  onChange?: (_: string) => void;
  debounceFor?: number;
  className?: string;
}

export const DebouncedSearch: React.FC<Props> = ({
  defaultValue,
  onChange,
  debounceFor,
  className,
}) => {
  const debounce = useDebounce((data) => {
    if (onChange) onChange(data);
  }, debounceFor || 500);
  return (
    <div
      className={cn(
        "flex justify-between items-center border shadow rounded-md p-2 px-3",
        className
      )}
    >
      <Input
        className="border-none shadow-none h-fit focus-visible:ring-0 text-sm xl:text-base w-full m-0 p-0"
        placeholder="Search"
        onChange={({ target: { value } }) => debounce(value)}
        defaultValue={defaultValue || ""}
      />
      <Search className="size-4" />
    </div>
  );
};
