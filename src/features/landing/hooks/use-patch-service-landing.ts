import { usePatchServiceOnLandingMutation } from "@/features/services/api";
import { GetServicesOnLandingResType } from "@/features/services/types";
import { deserializeRtkQueryError } from "@/utils";
import { isEqual } from "lodash";

interface Props {
  services_on_landing: GetServicesOnLandingResType;
  cb?: () => void;
}

export const usePatchServicesOnLanding = ({
  services_on_landing,
  cb,
}: Props) => {
  const [patch, { isLoading }] = usePatchServiceOnLandingMutation();

  const patchServices = async (services: GetServicesOnLandingResType) => {
    cb && cb();

    if (!isEqual(services_on_landing, services)) {
      services.map(async ({ position, service }) => {
        const { error } = await patch({
          id: position,
          data: { service: service.id },
        });
        if (error) {
          return deserializeRtkQueryError<{ message: string }>(error, {
            toasts: [(err) => err.data.message, (err) => err.message],
          });
        }
      });
    }
  };

  return { patchServices, isLoading };
};
