import { PropertiesTable } from "@/components/property/properties-table";
import { useGetApartmentsQuery } from "@/features/apartments/api";
import { Apartment } from "@/features/apartments/types";
import { User } from "@/features/auth/types";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useQueryState, parseAsInteger } from "nuqs";
import { useNavigate } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDeleteApartment } from "@/features/apartments/hooks/use-delete-apartment";
import { useTranslation } from "react-i18next";

interface Props {
  status: User;
}

export const IndexApartments: React.FC<Props> = ({}) => {
  const redirect = useNavigate();
  const { currentLang } = useChangeLanguage();
  const { t } = useTranslation();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data, isFetching, isLoading } = useGetApartmentsQuery({
    page,
    limit: 10,
    search: "",
  });
  const [deleteApartment, isDeletingApartment] = useDeleteApartment();

  return (
    <section className="w-full h-full">
      <PropertiesTable<Apartment>
        loading={isFetching || isLoading || isDeletingApartment}
        header={{
          title: t("apartments.manageTitle", "Manage Apartments"),
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
          data: data?.data as Apartment[],
          headers: [
            "apartments.tableHeaders.id",
            "apartments.tableHeaders.address",
            "apartments.tableHeaders.offert",
            "apartments.tableHeaders.status",
            "apartments.tableHeaders.agent",
            "apartments.tableHeaders.publishingDate",
            "apartments.tableHeaders.price",
          ],
          rows: (item: Apartment) => [
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
        onDelete={({ id }) => deleteApartment(id)}
        onEdit={({ id }) => redirect({ pathname: `${id}/edit` })}
        onSearch={(id) => redirect({ pathname: `${id}/edit` })}
      />
    </section>
  );
};
