import {
  ManageServices,
  ManageUsersCarousel,
} from "@/features/landing/components";
import React from "react";
import { LandingContext, LandingContextProps } from "./context";
import { User } from "@/features/auth/types";

interface Props {
  status?: User;
}

export const Landing: React.FC<Props> = ({ status }) => {
  const {
    data: { services, services_on_landing, users, users_on_carosel },
  } = React.useContext<LandingContextProps>(LandingContext);

  return (
    <div className="flex flex-col">
      <ManageUsersCarousel
        disabled={status?.role !== "ADMIN"}
        loading={users_on_carosel?.isLoading || users?.isLoading}
        users_on_carousel={users_on_carosel?.data}
        users={users?.data?.data}
      />
      <ManageServices
        disabled={status?.role !== "ADMIN"}
        loading={services_on_landing?.isLoading || services?.isLoading}
        services_on_landing={services_on_landing?.data}
        services={services?.data?.data}
      />
    </div>
  );
};
