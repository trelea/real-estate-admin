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
import { StockField } from "../components/stock-field";
import { HousingConditionsField } from "../components";
import { ApartmentFeaturesField } from "../components";
import { MediaField } from "@/components/media-field";
import { useUpdateApartment } from "../hooks/use-update-apartment";
import { Apartment } from "../types/index.d";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTranslation } from "react-i18next";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
  apartment: Apartment;
}

export const UpdateApartmentForm: React.FC<Props> = ({ user, apartment }) => {
  const { form, onSubmit } = useUpdateApartment({ apartment });
  const { t } = useTranslation();
  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* accordion generals */}
        <AccordionCard trigger={t("updateApartment.general_info")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-center">
            <OffertField
              controll={form.control}
              name="offert"
              label={t("updateApartment.offert_type")}
            />

            <UserField
              control={form.control}
              name="user"
              label={t("updateApartment.select_agent")}
              disabled={user.role !== "ADMIN"}
            />

            <Field
              control={form.control}
              name="price"
              label={t("updateApartment.price")}
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
                  {t("updateApartment.hot_offert")}{" "}
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
                  {t("updateApartment.status")}:{" "}
                  {form.watch("status")
                    ? t("updateApartment.public")
                    : t("updateApartment.private")}{" "}
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
                    label={t("updateApartment.description")}
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
                    label={t("updateApartment.description")}
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
                    label={t("updateApartment.description")}
                    displayErrorMessage
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AccordionCard>

        {/* acordion location */}
        <AccordionCard trigger={t("updateApartment.location")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <LocationField
              category={{
                controll: form.control,
                name: "location_category",
                label: t("updateApartment.location_category"),
                onSelect: (data) => form.setValue("location_category", data.id),
              }}
              subcategory={{
                controll: form.control,
                name: "location_subcategory",
                label: t("updateApartment.location_subcategory"),
                onSelect: (data) =>
                  form.setValue("location_subcategory", data.id),
                category: form.watch().location_category,
              }}
            />
            <PlaceField
              control={form.control}
              label={t("updateApartment.street")}
              name="place"
              placeholder={t("updateApartment.street")}
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

        {/* acordion caracteristics */}
        <AccordionCard trigger={t("updateApartment.caracteristics")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <Field
              control={form.control}
              name="rooms"
              label={t("updateApartment.rooms")}
              placeholder="3"
              type="number"
              className="w-full"
              displayErrorMessage
            />
            <Field
              control={form.control}
              name="sanitaries"
              label={t("updateApartment.sanitaries")}
              placeholder="1"
              type="number"
              className="w-full"
              displayErrorMessage
            />
            <Field
              control={form.control}
              name="surface"
              label={t("updateApartment.surface")}
              placeholder="54mp2"
              type="number"
              className="w-full"
              displayErrorMessage
            />
            <Field
              control={form.control}
              name="floor"
              label={t("updateApartment.floor")}
              placeholder="12"
              type="number"
              className="w-full"
              displayErrorMessage
            />
            <Field
              control={form.control}
              name="floors"
              label={t("updateApartment.total_floors")}
              placeholder="20"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <StockField
              control={form.control}
              name="housing_stock"
              label={t("updateApartment.housing_type")}
              onSelect={({ id }) => form.setValue("housing_stock", id)}
            />

            <HousingConditionsField
              control={form.control}
              name="housing_conditions"
              label={t("updateApartment.housing_conditions")}
            />

            <ApartmentFeaturesField
              control={form.control}
              name="features"
              label={t("updateApartment.apartment_features")}
            />
          </div>
        </AccordionCard>

        {/* acordion media */}
        <AccordionCard trigger={t("updateApartment.media")}>
          <MediaField
            control={form.control}
            name="media"
            label={t("updateApartment.apartment_images")}
          />
        </AccordionCard>
        <Button type="submit">{t("updateApartment.submit")}</Button>
      </form>
      {form.formState.isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <LoadingSpinner className="h-10 w-10 text-white" />
        </div>
      )}
    </Form>
  );
};
