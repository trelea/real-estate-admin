import { User } from "@/features/auth/types";
import { useGetServicesQuery } from "@/features/services/api";
import { cn } from "@/lib/utils";
import { ContextProps, UrlQueriesType } from "@/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import React from "react";

export type ServicesContextUrlQueriesType = UrlQueriesType;
export type SetServicesContextUrlQueriesType = (
  query:
    | ServicesContextUrlQueriesType
    | ((query: ServicesContextUrlQueriesType) => void)
) => void;

export interface ServicesContextProps
  extends ContextProps<
    {
      uriQueries: ServicesContextUrlQueriesType;
      setUriQueries: SetServicesContextUrlQueriesType;
      status?: User;
      /**
       * create
       */
      openDialogCreateService: boolean;
      setOpenDialogCreateService: React.Dispatch<React.SetStateAction<boolean>>;
      stepCreateServiceForm: number;
      setStepCreateServiceForm: React.Dispatch<React.SetStateAction<number>>;
      /**
       * update
       */
      openDialogUpdateService: boolean;
      setOpenDialogUpdateService: React.Dispatch<React.SetStateAction<boolean>>;
      stepUpdateServiceForm: number;
      setStepUpdateServiceForm: React.Dispatch<React.SetStateAction<number>>;
    },
    {
      services: ReturnType<typeof useGetServicesQuery>;
    }
  > {}

export const ServicesContext = React.createContext<ServicesContextProps>(
  {} as ServicesContextProps
);

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  status?: User;
}

export const ServicesContextLayout: React.FC<Props> = ({
  children,
  className,
  status,
}) => {
  const [uriQueries, setUriQueries] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(""),
    },
    { history: "push" }
  );

  React.useEffect(() => {
    if (uriQueries.page !== 1) setUriQueries({ page: 1 });
  }, [uriQueries.search]);

  /**
   * for create
   */
  const [openDialogCreateService, setOpenDialogCreateService] =
    React.useState<boolean>(false);
  const [stepCreateServiceForm, setStepCreateServiceForm] =
    React.useState<number>(1);

  /**
   * for update
   */
  const [openDialogUpdateService, setOpenDialogUpdateService] =
    React.useState<boolean>(false);
  const [stepUpdateServiceForm, setStepUpdateServiceForm] =
    React.useState<number>(1);

  const services = useGetServicesQuery(
    { page: uriQueries.page, search: uriQueries.search },
    { refetchOnMountOrArgChange: false }
  );

  return (
    <ServicesContext.Provider
      value={{
        meta: {
          uriQueries,
          setUriQueries: setUriQueries as SetServicesContextUrlQueriesType,
          status,
          /**
           * create
           */
          openDialogCreateService,
          setOpenDialogCreateService,
          stepCreateServiceForm,
          setStepCreateServiceForm,
          /**
           * update
           */
          openDialogUpdateService,
          setOpenDialogUpdateService,
          stepUpdateServiceForm,
          setStepUpdateServiceForm,
        },
        data: {
          services,
        },
      }}
    >
      <section className={cn("h-full", className)}>{children}</section>
    </ServicesContext.Provider>
  );
};
