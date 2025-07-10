import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  GetServicesOnLandingResType,
  Service,
} from "@/features/services/types";
import React from "react";
import { ServicesCommand } from "./services-command";
import { CommandItem } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  useDeleteServiceFromLanding,
  usePatchServicesOnLanding,
} from "../hooks";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  loading?: boolean;
  services: Service[];
  services_on_landing: GetServicesOnLandingResType;
  disabled?: boolean;
}

export const ManageServices: React.FC<Props> = ({
  services,
  services_on_landing,
  loading,
  disabled,
}) => {
  const { patchServices, isLoading } = usePatchServicesOnLanding({
    services_on_landing,
    cb: () => setCurrentCard(1),
  });
  const [deleteServiceFromLanding] = useDeleteServiceFromLanding();
  const [openServicesCommand, setOpenServicesCommand] =
    React.useState<boolean>(false);
  const [servicesOnLanding, setServicesOnLanding] =
    React.useState<GetServicesOnLandingResType>([]);
  const [currentCard, setCurrentCard] = React.useState<number>(0);
  const { t } = useTranslation();

  React.useEffect(
    () => setServicesOnLanding(services_on_landing),
    [services_on_landing]
  );

  const handleServiceSelect = React.useCallback(
    (index: number, item: Service) => {
      let updateServicesArray = servicesOnLanding.map((service) => {
        if (service.position === index)
          return {
            position: index,
            service: item,
          };
        return service;
      });

      if (!servicesOnLanding.find((s) => s.id === index))
        updateServicesArray = [
          { position: index, service: item },
          ...updateServicesArray,
        ];

      // @ts-ignore
      setServicesOnLanding(updateServicesArray);
    },
    [servicesOnLanding]
  );

  return (
    <>
      <Card className="m-0">
        <CardHeader className="m-0">
          <CardTitle className="font-semibold text-xl m-0 p-0">
            {t("landing.services")}
          </CardTitle>
        </CardHeader>
        <CardContent className="m-0">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <ul className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                {new Array(4).fill(null).map((_, index) => (
                  <li
                    key={index}
                    className={`border-2 p-4 w-full rounded-xl ${
                      servicesOnLanding?.find((s) => s.position === index + 1)
                        ? ""
                        : "border-dashed"
                    }`}
                    aria-disabled={isLoading}
                  >
                    <div className="flex flex-col gap-2">
                      <Label>{t("landing.card", { number: index + 1 })}</Label>
                      <div
                        className={`flex justify-between items-center 
                          ${
                            servicesOnLanding?.find(
                              (s) => s.position === index + 1
                            )
                              ? "bg-primary rounded-lg p-2 text-white"
                              : ""
                          }
                        `}
                      >
                        <div className="flex justify-between items-center w-full text-xs">
                          {servicesOnLanding?.find(
                            (s) => s.position === index + 1
                          ) ? (
                            <h1>
                              {
                                servicesOnLanding?.find(
                                  (s) => s.position === index + 1
                                )?.service.content.title_en
                              }
                            </h1>
                          ) : (
                            <h1>{t("landing.clickToAddService")}</h1>
                          )}

                          {services_on_landing?.find(
                            (s) => s.position === index + 1
                          ) ? (
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                deleteServiceFromLanding(
                                  servicesOnLanding?.find(
                                    (s) => s.position === index + 1
                                  )?.id as number
                                )
                              }
                            >
                              <X className="size-5" />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                if (isLoading || disabled) return;
                                setCurrentCard(index + 1);
                                setOpenServicesCommand(true);
                              }}
                            >
                              <Plus className="hover:bg-foreground/10 rounded-2xl" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => patchServices(servicesOnLanding)}
                  disabled={isLoading || disabled}
                >
                  {t("landing.update")}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {!loading && (
        <ServicesCommand
          open={openServicesCommand}
          setOpenServicesCommand={setOpenServicesCommand}
          children={services?.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => handleServiceSelect(currentCard, item)}
            >
              <span>{item.content.title_en}</span>
            </CommandItem>
          ))}
        />
      )}
    </>
  );
};
