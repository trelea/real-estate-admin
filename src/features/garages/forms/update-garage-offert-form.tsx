import { Form } from "@/components/ui/form";
import React from "react";
import { AccordionCard } from "@/components/accordion-card";
import {
  Field,
  OffertField,
  UserField,
  LocationField,
  PlaceField,
  GarageFeaturesField,
} from "../components";
import { Eye, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User } from "@/features/auth/types";
import { MediaField } from "@/components/media-field";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useUpdateGarage } from "../hooks/use-update-garage";
import { Garage } from "../types";
import { MultilingualItemType } from "@/features/multilingual/types";
import { useTranslation } from "react-i18next";

interface Props {
  user: { id: string; role: User["role"] };
  garage: Garage;
}

export const UpdateGarageOffertForm: React.FC<Props> = ({ user, garage }) => {
  const { t } = useTranslation();
  const { form, onSubmit, isLoading } = useUpdateGarage({ garage });
  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* General */}
        <AccordionCard trigger={t("updateGarage.general_info")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-center">
            <OffertField
              controll={form.control}
              name="offert"
              label={t("updateGarage.offert_type")}
            />
            <UserField
              control={form.control}
              name="user"
              label={t("updateGarage.select_agent")}
              disabled={user.role !== "ADMIN"}
            />
            <Field
              control={form.control}
              name="price"
              label={t("updateGarage.price")}
              placeholder="24000$"
              type="number"
              className="w-full"
              displayErrorMessage
            />
            <Field
              control={form.control}
              name="hot"
              label={
                <span className="flex items-center gap-1">
                  {t("updateGarage.hot_offert")}{" "}
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
                  {t("updateGarage.status")}:{" "}
                  {form.watch("status")
                    ? t("updateGarage.public")
                    : t("updateGarage.private")}{" "}
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
                  <TabsTrigger value="ro">{t("updateGarage.ro")}</TabsTrigger>
                  <TabsTrigger value="ru">{t("updateGarage.ru")}</TabsTrigger>
                  <TabsTrigger value="en">{t("updateGarage.en")}</TabsTrigger>
                </TabsList>
                <TabsContent value="ro">
                  <Field
                    control={form.control}
                    name="desc_ro"
                    type="tip-tap"
                    className="w-full"
                    placeholder={form.getValues("desc_ro")}
                    label={t("updateGarage.description")}
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
                    label={t("updateGarage.description")}
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
                    label={t("updateGarage.description")}
                    displayErrorMessage
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AccordionCard>

        {/* Location */}
        <AccordionCard trigger={t("updateGarage.location")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <LocationField
              category={{
                controll: form.control,
                name: "location_category",
                label: t("updateGarage.location_category"),
                onSelect: (d: MultilingualItemType<{}>) =>
                  form.setValue("location_category", d.id),
              }}
              subcategory={{
                controll: form.control,
                name: "location_subcategory",
                label: t("updateGarage.location_subcategory"),
                onSelect: (d: MultilingualItemType<{}>) =>
                  form.setValue("location_subcategory", d.id),
                category: form.watch().location_category,
              }}
            />
            <PlaceField
              control={form.control}
              label={t("updateGarage.street")}
              name="place"
              placeholder={t("updateGarage.street")}
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

        {/* Characteristics */}
        <AccordionCard trigger={t("updateGarage.caracteristics")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <Field
              control={form.control}
              name="area"
              label={t("updateGarage.area")}
              placeholder={t("updateGarage.area")}
              type="number"
              className="w-full"
              displayErrorMessage
            />
            <GarageFeaturesField
              control={form.control}
              name="features"
              label={t("updateGarage.garage_features")}
            />
          </div>
        </AccordionCard>

        {/* Media */}
        <AccordionCard trigger={t("updateGarage.media")}>
          <MediaField
            control={form.control}
            name="media"
            label={t("updateGarage.garage_images")}
          />
        </AccordionCard>
        <Button type="submit">{t("updateGarage.submit")}</Button>
      </form>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <LoadingSpinner className="h-10 w-10 text-white" />
        </div>
      )}
    </Form>
  );
};
