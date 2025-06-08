import { User } from "@/features/auth/types";
import {
  useGetServicesOnLandingQuery,
  useGetServicesQuery,
} from "@/features/services/api";
import {
  useGetUsersCarouselQuery,
  useGetUsersQuery,
} from "@/features/users/api";
import { cn } from "@/lib/utils";
import { ContextProps } from "@/types";
import React from "react";

export interface LandingContextProps
  extends ContextProps<
    {},
    {
      services: ReturnType<typeof useGetServicesQuery>;
      services_on_landing: ReturnType<typeof useGetServicesOnLandingQuery>;

      users: ReturnType<typeof useGetUsersQuery>;
      users_on_carosel: ReturnType<typeof useGetUsersCarouselQuery>;
    }
  > {}

export const LandingContext = React.createContext<LandingContextProps>(
  {} as LandingContextProps
);

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const LandingContextProvider: React.FC<Props> = ({
  children,
  className,
  status,
}) => {
  const services_on_landing = useGetServicesOnLandingQuery(null);
  const services = useGetServicesQuery({ page: 1, limit: 1000, search: "" });

  const users_on_carosel = useGetUsersCarouselQuery();
  const users = useGetUsersQuery({ page: 1, limit: 1000, search: "" });

  return (
    <LandingContext.Provider
      value={{
        meta: { status },
        data: { services, services_on_landing, users, users_on_carosel },
      }}
    >
      <section className={cn("h-full w-full", className)}>{children}</section>
    </LandingContext.Provider>
  );
};
