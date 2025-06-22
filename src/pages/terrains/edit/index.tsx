import { useParams } from "react-router";
import { useGetTerrainQuery } from "@/features/terrains/api";
import { UpdateTerrainOffertForm } from "@/features/terrains/forms/update-terrain-offert-form";
import { APIProvider } from "@vis.gl/react-google-maps";
import { User } from "@/features/auth/types";
import { Terrain } from "@/features/terrains/types";

interface Props {
  status: User;
}

export const EditTerrain: React.FC<Props> = ({ status }) => {
  const { id } = useParams<{ id: string }>();
  const { data: terrain, isLoading } = useGetTerrainQuery(Number(id));

  return (
    <section className="w-full h-full flex flex-col gap-4">
      {terrain && !isLoading && (
        <APIProvider
          apiKey={import.meta.env.VITE_MAPS_API}
          libraries={["places"]}
        >
          <UpdateTerrainOffertForm
            user={{ role: status?.role, id: status?.id }}
            terrain={terrain as Terrain}
          />
        </APIProvider>
      )}
    </section>
  );
};
