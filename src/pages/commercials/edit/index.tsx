import { useParams } from "react-router";
import { useGetCommercialQuery } from "@/features/commercials/api";
import { UpdateCommercialOffertForm } from "@/features/commercials/forms/update-commercial-offert-form";
import { User } from "@/features/auth/types";
import { Commercial } from "@/features/commercials/types";
import { APIProvider } from "@vis.gl/react-google-maps";

interface Props {
  status: User;
}

export const EditCommercial: React.FC<Props> = ({ status }) => {
  const { id } = useParams<{ id: string }>();
  const { data: commercial, isLoading } = useGetCommercialQuery(id as string);

  return (
    <section className="w-full h-full flex flex-col gap-4">
      {commercial && !isLoading && (
        <APIProvider
          apiKey={import.meta.env.VITE_MAPS_API}
          libraries={["places"]}
        >
          <UpdateCommercialOffertForm
            user={{ role: status?.role, id: status?.id }}
            commercial={commercial as Commercial}
          />
        </APIProvider>
      )}
    </section>
  );
};
