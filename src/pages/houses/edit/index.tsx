import { useParams } from "react-router";
import { useGetHouseQuery } from "@/features/houses/api";
import { UpdateHouseOffertForm } from "@/features/houses/forms/update-house-offert-form";
import { User } from "@/features/auth/types";
import { House } from "@/features/houses/types";
import { APIProvider } from "@vis.gl/react-google-maps";

interface Props {
  status: User;
}

export const EditHouse: React.FC<Props> = ({ status }) => {
  const { id } = useParams<{ id: string }>();
  const { data: house, isLoading } = useGetHouseQuery(Number(id));

  return (
    <section className="w-full h-full flex flex-col gap-4">
      {house && !isLoading && (
        <APIProvider
          apiKey={import.meta.env.VITE_MAPS_API}
          libraries={["places"]}
        >
          <UpdateHouseOffertForm
            user={{ role: status?.role, id: status?.id }}
            house={house as House}
          />
        </APIProvider>
      )}
    </section>
  );
};
