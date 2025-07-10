import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUsersQuery } from "@/features/users/api";
import { useDebounce } from "@/hooks/use-debounce";
import React from "react";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  disabled?: boolean;
}

export const UserField: React.FC<Props> = ({
  control,
  name,
  label,
  disabled,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [openSelect, setOpenSelect] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = React.useState<string>("");

  const debouncedSetSearch = useDebounce(setDebouncedSearch, 1000);

  React.useEffect(() => {
    debouncedSetSearch(search);
  }, [search, debouncedSetSearch]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (openSelect) {
      timer = setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => clearTimeout(timer);
  }, [openSelect]);

  const { data, isLoading, isFetching } = useGetUsersQuery(
    {
      page: 1,
      limit: 10,
      search: debouncedSearch,
    },
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      skip: !openSelect,
    }
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            open={openSelect}
            onOpenChange={setOpenSelect}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Agent" className="w-full" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <div className="p-2">
                <Input
                  ref={inputRef}
                  placeholder="Search Agent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mb-2"
                />
              </div>

              {(isFetching || isLoading) && debouncedSearch !== search ? (
                <div className="flex justify-center items-center py-4">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  {data?.data?.map(
                    ({ id, profile: { name, surname, thumbnail }, role }) => (
                      <SelectItem key={id} value={id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={thumbnail as string} />
                            <AvatarFallback className="text-xs">
                              {surname?.at(0)?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {surname} {name} - {role}
                          </span>
                        </div>
                      </SelectItem>
                    )
                  )}

                  {data?.meta?.total === 0 && (
                    <div className="flex justify-center items-center py-6">
                      <span className="text-center w-full text-sm text-muted-foreground">
                        No Agents Found.
                      </span>
                    </div>
                  )}
                </>
              )}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
