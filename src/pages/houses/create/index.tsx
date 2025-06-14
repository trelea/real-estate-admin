import { CreateOffertCardInfo } from "@/components/create-offert-card-info";
import { CreateHouseOffertForm } from "@/features/houses/forms/create-house-offert-form";
import { User } from "@/features/auth/types";
import { APIProvider } from "@vis.gl/react-google-maps";

interface Props {
  status: User;
}

export const CreateHouse: React.FC<Props> = ({ status }) => {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <CreateOffertCardInfo />
      <APIProvider
        apiKey={import.meta.env.VITE_MAPS_API}
        libraries={["places"]}
      >
        <CreateHouseOffertForm user={{ role: status?.role, id: status?.id }} />
      </APIProvider>
    </section>
  );
};
