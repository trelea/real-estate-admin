import { PropertiesTable } from "@/components/property/properties-table";
import { useGetTerrainsQuery } from "@/features/terrains/api";
import { Terrain } from "@/features/terrains/types";
import { User } from "@/features/auth/types";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useQueryState, parseAsInteger } from "nuqs";
import { useNavigate } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDeleteTerrain } from "@/features/terrains/hooks/use-delete-terrain";

interface Props {
  status: User;
}

export const IndexTerrains: React.FC<Props> = ({}) => {
  const redirect = useNavigate();
  const { currentLang } = useChangeLanguage();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data, isFetching, isLoading } = useGetTerrainsQuery({
    page,
    limit: 10,
    search: "",
  });

  const [deleteTerrain, isDeletingTerrain] = useDeleteTerrain();

  return (
    <section className="w-full h-full">
      <PropertiesTable<Terrain>
        loading={isFetching || isLoading || isDeletingTerrain}
        header={{
          title: "Manage Terrains",
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
          data: data?.data as Terrain[],
          headers: [
            "ID",
            "Address",
            "Offert",
            "Status",
            "Agent",
            "Publishing Date",
            "Price",
          ],
          rows: (item: Terrain) => [
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
              {item.user.profile?.surname}
            </span>,
            <span className="font-medium text-sm">
              {new Intl.DateTimeFormat(currentLang, {
                dateStyle: "long",
              }).format(new Date(item.created_at))}
            </span>,
            <span className="font-medium text-sm">{item.price}</span>,
          ],
        }}
        onDelete={({ id }) => deleteTerrain(id)}
        onEdit={({ id }) => redirect({ pathname: `${id}/edit` })}
        onSearch={(id) => redirect({ pathname: `${id}/edit` })}
      />
    </section>
  );
};
