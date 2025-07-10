import { CreateOffertCardInfo } from "@/components/create-offert-card-info";
import { CreateApartmentOffertForm } from "@/features/apartments/forms";
import { User } from "@/features/auth/types";
import { APIProvider } from "@vis.gl/react-google-maps";

interface Props {
  status: User;
}

export const CreateApartment: React.FC<Props> = ({ status }) => {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <CreateOffertCardInfo />
      <APIProvider
        apiKey={import.meta.env.VITE_MAPS_API}
        libraries={["places"]}
      >
        <CreateApartmentOffertForm
          user={{ role: status?.role, id: status?.id }}
        />
      </APIProvider>
    </section>
  );
};
