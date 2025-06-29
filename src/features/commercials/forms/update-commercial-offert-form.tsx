import { Form } from "@/components/ui/form";
import React from "react";
import { AccordionCard } from "@/components/accordion-card";
import { Field, OffertField, UserField } from "../components";
import { Eye, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocationField } from "../components/location-field";
import { PlaceField } from "../components/place-field";
import { Button } from "@/components/ui/button";
import { User } from "@/features/auth/types";
import { HousingConditionsField } from "../components";
import { CommercialFeaturesField } from "../components";
import { CommercialDestinationsField } from "../components";
import { CommercialPlacingsField } from "../components";
import { MediaField } from "@/components/media-field";
import { useUpdateCommercial } from "../hooks/use-update-commercial";
import { Commercial } from "../types/index.d";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTranslation } from "react-i18next";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
  commercial: Commercial;
}

export const UpdateCommercialOffertForm: React.FC<Props> = ({
  user,
  commercial,
}) => {
  const { t } = useTranslation();
  const { form, onSubmit, isLoading } = useUpdateCommercial({ commercial });

  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* accordion generals */}
        <AccordionCard trigger={t("updateCommercial.general_info")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-center">
            <OffertField
              controll={form.control}
              name="offert"
              label={t("updateCommercial.offert_type")}
            />

            <UserField
              control={form.control}
              name="user"
              label={t("updateCommercial.select_agent")}
              disabled={user.role !== "ADMIN"}
            />

            <Field
              control={form.control}
              name="price"
              label={t("updateCommercial.price")}
              placeholder="24 000$"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <Field
              control={form.control}
              name="hot"
              label={
                <span className="flex items-center gap-1">
                  {t("updateCommercial.hot_offert")}{" "}
                  <Flame className="size-5 text-destructive" />
                </span>
              }
              type="check"
              className="flex flex-row-reverse justify-end items-center w-full"
            />

            <Field
              control={form.control}
              name="status"
              type="switch"
              className="flex flex-row-reverse justify-end items-center w-full"
              label={
                <span className="flex items-center gap-1">
                  {t("updateCommercial.status")}:{" "}
                  {form.watch("status")
                    ? t("updateCommercial.public")
                    : t("updateCommercial.private")}{" "}
                  <Eye className="size-5" />
                </span>
              }
            />

            <div className="w-full col-span-1 md:col-span-2 lg:col-span-3 row-start-3">
              <Tabs
                className="w-full"
                defaultValue={(() => {
                  if (form.formState.errors.desc_en) return "en";
                  if (form.formState.errors.desc_ro) return "ro";
                  if (form.formState.errors.desc_ru) return "ru";
                  return "ro";
                })()}
              >
                <TabsList className="w-full">
                  <TabsTrigger value="ro">Ro</TabsTrigger>
                  <TabsTrigger value="ru">Ru</TabsTrigger>
                  <TabsTrigger value="en">En</TabsTrigger>
                </TabsList>
                <TabsContent value="ro">
                  <Field
                    control={form.control}
                    name="desc_ro"
                    type="tip-tap"
                    className="w-full"
                    placeholder={form.getValues("desc_ro")}
                    label={t("updateCommercial.description")}
                    displayErrorMessage
                  />
                </TabsContent>
                <TabsContent value="ru">
                  <Field
                    control={form.control}
                    name="desc_ru"
                    type="tip-tap"
                    className="w-full"
                    placeholder={form.getValues("desc_ru")}
                    label={t("updateCommercial.description")}
                    displayErrorMessage
                  />
                </TabsContent>
                <TabsContent value="en">
                  <Field
                    control={form.control}
                    name="desc_en"
                    type="tip-tap"
                    className="w-full"
                    placeholder={form.getValues("desc_en")}
                    label={t("updateCommercial.description")}
                    displayErrorMessage
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AccordionCard>

        {/* location */}
        <AccordionCard trigger={t("updateCommercial.location")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <LocationField
              category={{
                controll: form.control,
                name: "location_category",
                label: t("updateCommercial.location_category"),
                onSelect: (data) => form.setValue("location_category", data.id),
              }}
              subcategory={{
                controll: form.control,
                name: "location_subcategory",
                label: t("updateCommercial.location_subcategory"),
                onSelect: (data) =>
                  form.setValue("location_subcategory", data.id),
                category: form.watch().location_category,
              }}
            />
            <PlaceField
              control={form.control}
              label={t("updateCommercial.street")}
              name="place"
              placeholder={t("updateCommercial.street")}
              map={{
                className: "w-full h-[500px] md:col-span-2 lg:col-span-3",
                mapId: "49ae42fed52588c3",
                defaultZoom: 10,
              }}
              onSelectStreet={({
                location: { lat, lng },
                address: { en, ro, ru },
              }) => {
                form.setValue("lat", lat);
                form.setValue("lng", lng);
                form.setValue("street_en", en.address);
                form.setValue("street_ro", ro.address);
                form.setValue("street_ru", ru.address);
              }}
              defaultCoordinates={{
                lat: form.getValues("lat") as number,
                lng: form.getValues("lng") as number,
              }}
            />
          </div>
        </AccordionCard>

        {/* characteristics */}
        <AccordionCard trigger={t("updateCommercial.caracteristics")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <Field
              control={form.control}
              name="area"
              label={t("updateCommercial.area")}
              placeholder="120"
              type="number"
              className="w-full"
              displayErrorMessage
            />
            <Field
              control={form.control}
              name="floors"
              label={t("updateCommercial.total_floors")}
              placeholder="5"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <CommercialDestinationsField
              control={form.control}
              name="commercial_destinations"
              label={t("updateCommercial.commercial_destinations")}
            />

            <CommercialPlacingsField
              control={form.control}
              name="commercial_placings"
              label={t("updateCommercial.commercial_placings")}
            />

            <HousingConditionsField
              control={form.control}
              name="housing_conditions"
              label={t("updateCommercial.housing_conditions")}
            />

            <CommercialFeaturesField
              control={form.control}
              name="features"
              label={t("updateCommercial.commercial_features")}
            />

            <Field
              control={form.control}
              name="first_line"
              label={t("updateCommercial.first_line")}
              type="check"
              className="flex flex-row-reverse justify-end items-center w-full"
            />
          </div>
        </AccordionCard>

        {/* media */}
        <AccordionCard trigger={t("updateCommercial.media")}>
          <MediaField
            control={form.control}
            name="media"
            label={t("updateCommercial.commercial_images")}
          />
        </AccordionCard>
        <Button type="submit">{t("updateCommercial.submit")}</Button>
      </form>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <LoadingSpinner className="h-10 w-10 text-white" />
        </div>
      )}
    </Form>
  );
};
