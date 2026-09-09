import { useParams } from "react-router";
import { useGetGarageQuery } from "@/features/garages/api";
import { UpdateGarageOffertForm } from "@/features/garages/forms/update-garage-offert-form";
import { APIProvider } from "@vis.gl/react-google-maps";
import { User } from "@/features/auth/types";
import { Garage } from "@/features/garages/types";

interface Props {
  status: User;
}

export const EditGarage: React.FC<Props> = ({ status }) => {
  const { id } = useParams<{ id: string }>();
  const { data: garage, isLoading } = useGetGarageQuery(Number(id));

  return (
    <section className="w-full h-full flex flex-col gap-4">
      {garage && !isLoading && (
        <APIProvider
          apiKey={import.meta.env.VITE_MAPS_API}
          libraries={["places"]}
        >
          <UpdateGarageOffertForm
            user={{ role: status?.role, id: status?.id }}
            garage={garage as Garage}
          />
        </APIProvider>
      )}
    </section>
  );
};
