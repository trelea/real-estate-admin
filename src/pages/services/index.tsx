import { ManageData } from "@/components/manage-data-table/manage-data";
import { User } from "@/features/auth/types";
import { type Service } from "@/features/services/types";
import React from "react";
import { ServicesContext, ServicesContextProps } from "./context";
import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SetStatus } from "@/features/services/components";
import { useDeleteService } from "@/features/services/hooks";
import {
  CreateServiceForm,
  UpdateServiceForm,
} from "@/features/services/forms";

interface Props {
  status?: User;
}
export const Services: React.FC<Props> = ({ status }) => {
  const {
    data: { services },
    meta: {
      setUriQueries,
      uriQueries: { search },
      //
      stepCreateServiceForm,
      setStepCreateServiceForm,
      //
      stepUpdateServiceForm,
      setStepUpdateServiceForm,
      //
      openDialogCreateService,
      setOpenDialogCreateService,
    },
  } = React.useContext<ServicesContextProps>(ServicesContext);
  const [deleteService, deleteServiceLoading] = useDeleteService();
  return (
    <ManageData<Service>
      loading={{
        state: services.isLoading || services.isFetching,
        component: <TableSkeleton previewThumbSkeleton />,
      }}
      header={{
        title: "Services",
        badge: `${services.data?.meta.total} services`,
        search: {
          defaultValue: search,
          onValueChange: (value) =>
            setUriQueries(({ search, ...rest }) => ({
              search: value,
              ...rest,
            })),
        },
        create: {
          trigger: {
            label: "Create service",
            disabled: status?.role !== "ADMIN",
          },
          content: {
            title: "Create Service",
            description:
              "Provide the necessary details to create a new service. Once submitted, the service will be added to the system and made available for use.",
            children: (
              <CreateServiceForm
                step={stepCreateServiceForm}
                prev={() => setStepCreateServiceForm((_) => _ - 1)}
                next={() => setStepCreateServiceForm((_) => _ + 1)}
              />
            ),
          },

          dialogState: {
            onOpenChange: (open) => {
              if (open && stepCreateServiceForm === 1)
                setOpenDialogCreateService(true);

              if (!open) {
                setStepCreateServiceForm(1);
                setOpenDialogCreateService(false);
              }
            },
            open: openDialogCreateService,
          },
        },
      }}
      content={{
        table: {
          data: services?.data?.data as Service[],
          headers: ["Title", "Status", "Published", "Views"],
          rows: ({
            thumbnail,
            content,
            created_at,
            views,
            id,
            status: _status,
          }) => [
            <div className="flex items-center gap-3 lg:py-1 xl:py-1.5">
              <Avatar className="size-10">
                <AvatarImage src={thumbnail as string} className="object" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{content.title_en}</span>
            </div>,
            <SetStatus
              id={id}
              disabled={status?.role !== "ADMIN"}
              status={_status}
            />,
            <span className="font-medium text-sm">
              {new Intl.DateTimeFormat("ro", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(created_at))}
            </span>,
            <span className="font-medium text-sm">{views}</span>,
          ],
          /**
           * delete action
           */
          delete: {
            disabled: status?.role !== "ADMIN" || deleteServiceLoading,
            // @ts-ignore
            onDeleteAction: (id) => deleteService(id),
          },
          /**
           * update action
           */
          update: {
            disabled: status?.role !== "ADMIN",
            title: "Update Service",
            description: (
              <React.Fragment>
                {stepUpdateServiceForm === 1 &&
                  "Update the image thumbnail for your blog post. This is the main preview image."}
                {stepUpdateServiceForm === 2 &&
                  "Edit the Romanian title and description for your blog post."}
                {stepUpdateServiceForm === 3 &&
                  "Edit the Russian title and description for your blog post."}
                {stepUpdateServiceForm === 4 &&
                  "Edit the English title and description for your blog post. Adjust the visibility of your blog post. If checked, it will be public and visible to anyone. If unchecked, it will remain private and only accessible to admins and dashboard users."}
              </React.Fragment>
            ),
            children: (service) => (
              <UpdateServiceForm
                service={service}
                step={stepUpdateServiceForm}
                next={() => setStepUpdateServiceForm((_) => _ + 1)}
                prev={() => setStepUpdateServiceForm((_) => _ - 1)}
              />
            ),
            dialogState: {
              onOpenChange: (open) => {
                if (!open) setStepUpdateServiceForm(1);
              },
            },
          },
        },
      }}
      footer={{
        pagination: {
          meta: services.data?.meta,
          next: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page + 1,
              ...rest,
            })),
          prev: () =>
            setUriQueries(({ page, ...rest }) => ({
              page: page - 1,
              ...rest,
            })),
          current: (_) =>
            setUriQueries(({ page, ...rest }) => ({
              page: _,
              ...rest,
            })),
        },
      }}
    />
  );
};
