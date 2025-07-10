import { PropertiesTable } from "@/components/property/properties-table";
import { useGetHousesQuery } from "@/features/houses/api";
import { House } from "@/features/houses/types";
import { User } from "@/features/auth/types";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useQueryState, parseAsInteger } from "nuqs";
import { useNavigate } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDeleteHouse } from "@/features/houses/hooks/use-delete-house";

interface Props {
  status: User;
}

export const IndexHouses: React.FC<Props> = ({}) => {
  const redirect = useNavigate();
  const { currentLang } = useChangeLanguage();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isFetching, isLoading } = useGetHousesQuery({
    page,
    limit: 10,
    search: "",
  });

  const [deleteHouse, isDeletingHouse] = useDeleteHouse();

  return (
    <section className="w-full h-full">
      <PropertiesTable<House>
        loading={isFetching || isLoading || isDeletingHouse}
        header={{
          title: "Manage Houses",
          redirect: { pathname: "create" },
          total: data?.meta.total,
        }}
        footer={{
          meta: data?.meta,
          next: () => setPage((p) => p + 1),
          prev: () => setPage((p) => p - 1),
          access: setPage,
        }}
        table={{
          data: data?.data as House[],
          headers: [
            "ID",
            "Address",
            "Offert",
            "Status",
            "Agent",
            "Publishing Date",
            "Price",
          ],
          rows: (item: House) => [
            <span className="font-medium text-sm">{item.id}</span>,
            <span className="font-medium text-sm flex items-center gap-3">
              <Avatar className="size-12 rounded-md">
                <AvatarImage
                  src={item.media[0]?.url}
                  alt={item.location.street_en}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-md">
                  {item.location.street_en.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {item.location.street_en.slice(0, 50)}
              {"..."}
            </span>,
            <span className="font-medium text-sm">
              {item.offert.join(" ")}
            </span>,
            <span
              className={`font-medium text-sm ${
                item.status === "PRIVATE" || item.status === false
                  ? "text-destructive"
                  : "text-green-600"
              }`}
            >
              {item.status}
            </span>,
            <span className="font-medium text-sm">
              {item.user.profile.surname}
            </span>,
            <span className="font-medium text-sm">
              {new Intl.DateTimeFormat(currentLang, {
                dateStyle: "long",
              }).format(new Date(item.created_at))}
            </span>,
            <span className="font-medium text-sm">{item.price}</span>,
          ],
        }}
        onDelete={({ id }) => deleteHouse(id)}
        onEdit={({ id }) => redirect({ pathname: `${id}/edit` })}
        onSearch={(id) => redirect({ pathname: `${id}/edit` })}
      />
    </section>
  );
};
