import { PropertiesTable } from "@/components/property/properties-table";
import { useGetCommercialsQuery } from "@/features/commercials/api";
import { Commercial } from "@/features/commercials/types";
import { User } from "@/features/auth/types";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useQueryState, parseAsInteger } from "nuqs";
import { useNavigate } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDeleteCommercial } from "@/features/commercials/hooks/use-delete-commercial";

interface Props {
  status: User;
}

export const IndexCommercials: React.FC<Props> = ({}) => {
  const redirect = useNavigate();
  const { currentLang } = useChangeLanguage();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data, isFetching, isLoading } = useGetCommercialsQuery({
    page,
    limit: 10,
    search: "",
  });
  const [deleteCommercial, isDeletingCommercial] = useDeleteCommercial();

  return (
    <section className="w-full h-full">
      <PropertiesTable<Commercial>
        loading={isFetching || isLoading || isDeletingCommercial}
        header={{
          title: "Manage Commercials",
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
          data: data?.data as Commercial[],
          headers: [
            "ID",
            "Address",
            "Offert",
            "Status",
            "Agent",
            "Publishing Date",
            "Price",
          ],
          rows: (item: Commercial) => [
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
        onDelete={({ id }) => deleteCommercial(id)}
        onEdit={({ id }) => redirect({ pathname: `${id}/edit` })}
        onSearch={(id) => redirect({ pathname: `${id}/edit` })}
      />
    </section>
  );
};
