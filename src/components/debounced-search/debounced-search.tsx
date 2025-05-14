import React from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";

interface Props {
  defaultValue?: string;
  onChange?: (_: string) => void;
  debounceFor?: number;
}

export const DebouncedSearch: React.FC<Props> = ({
  defaultValue,
  onChange,
  debounceFor,
}) => {
  const debounce = useDebounce((data) => {
    if (onChange) onChange(data);
  }, debounceFor || 500);
  return (
    <div className="flex justify-between items-center border shadow rounded-md p-2 px-3">
      <Input
        className="border-none shadow-none h-fit focus-visible:ring-0 text-base w-96 m-0 p-0"
        placeholder="Search"
        onChange={({ target: { value } }) => debounce(value)}
        defaultValue={defaultValue || ""}
      />
      <Search className="size-4" />
    </div>
  );
};
