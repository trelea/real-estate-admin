import { CreateOffertCardInfo } from "@/components/create-offert-card-info";
import { CreateCommercialOffertForm } from "@/features/commercials/forms/create-commercial-offert-form";
import { User } from "@/features/auth/types";
import { APIProvider } from "@vis.gl/react-google-maps";

interface Props {
  status: User;
}

export const CreateCommercial: React.FC<Props> = ({ status }) => {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <CreateOffertCardInfo />
      <APIProvider
        apiKey={import.meta.env.VITE_MAPS_API}
        libraries={["places"]}
      >
        <CreateCommercialOffertForm
          user={{ role: status?.role, id: status?.id }}
        />
      </APIProvider>
    </section>
  );
};
