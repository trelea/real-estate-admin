import { useParams } from "react-router";
import { useGetApartmentQuery } from "@/features/apartments/api";
import { UpdateApartmentForm } from "@/features/apartments/forms/update-apartment-form";
import { User } from "@/features/auth/types";
import { Apartment } from "@/features/apartments/types";
import { APIProvider } from "@vis.gl/react-google-maps";

interface Props {
  status: User;
}

export const EditApartment: React.FC<Props> = ({ status }) => {
  const { id } = useParams<{ id: string }>();
  const { data: apartment, isLoading } = useGetApartmentQuery(id as string);

  return (
    <section className="w-full h-full flex flex-col gap-4">
      {apartment && !isLoading && (
        <APIProvider
          apiKey={import.meta.env.VITE_MAPS_API}
          libraries={["places"]}
        >
          <UpdateApartmentForm
            user={{ role: status?.role, id: status?.id }}
            apartment={apartment as Apartment}
          />
        </APIProvider>
      )}
    </section>
  );
};
