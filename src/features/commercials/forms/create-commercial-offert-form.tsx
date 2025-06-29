import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import { AccordionCard } from "@/components/accordion-card";
import {
  Field,
  OffertField,
  UserField,
  LocationField,
  PlaceField,
  HousingConditionsField,
  CommercialDestinationsField,
  CommercialPlacingsField,
} from "../components";
import { Eye, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateCommercial } from "../hooks/use-create-commercial";
import { Button } from "@/components/ui/button";
import { User } from "@/features/auth/types";
import { MediaField } from "@/components/media-field";
import { CommercialFeaturesField } from "../components/commercial-features-field";
import { MultilingualItemType } from "@/features/multilingual/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTranslation } from "react-i18next";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const CreateCommercialOffertForm: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const { form, onSubmit, isLoading } = useCreateCommercial({ user });
  const [activeTab, setActiveTab] = useState(
    (() => {
      if (form.formState.errors.desc_en) return "en";
      if (form.formState.errors.desc_ro) return "ro";
      if (form.formState.errors.desc_ru) return "ru";
      return "ro";
    })()
  );

  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* accordion generals */}
        <AccordionCard trigger={t("createCommercial.general_info")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-center">
            <OffertField
              controll={form.control}
              name="offert"
              label={t("createCommercial.offert_type")}
            />

            <UserField
              control={form.control}
              name="user"
              label={t("createCommercial.select_agent")}
              disabled={user.role !== "ADMIN"}
            />

            <Field
              control={form.control}
              name="price"
              label={t("createCommercial.price")}
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
                  {t("createCommercial.hot_offert")}{" "}
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
                  {t("createCommercial.status")}:{" "}
                  {form.watch("status")
                    ? t("createCommercial.public")
                    : t("createCommercial.private")}{" "}
                  <Eye className="size-5" />
                </span>
              }
            />

            <div className="w-full col-span-1 md:col-span-2 lg:col-span-3 row-start-3">
              <Tabs
                className="w-full"
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="ro"
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
                    label={t("createCommercial.description")}
                    displayErrorMessage
                  />
                </TabsContent>
                <TabsContent value="ru">
                  <Field
                    control={form.control}
                    name="desc_ru"
                    type="tip-tap"
                    className="w-full"
                    label={t("createCommercial.description")}
                    displayErrorMessage
                  />
                </TabsContent>
                <TabsContent value="en">
                  <Field
                    control={form.control}
                    name="desc_en"
                    type="tip-tap"
                    className="w-full"
                    label={t("createCommercial.description")}
                    displayErrorMessage
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AccordionCard>

        {/* accordion location */}
        <AccordionCard trigger={t("createCommercial.location")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <LocationField
              category={{
                controll: form.control,
                name: "location_category",
                label: t("createCommercial.location_category"),
                onSelect: (data: MultilingualItemType<{}>) =>
                  form.setValue("location_category", data.id),
              }}
              subcategory={{
                controll: form.control,
                name: "location_subcategory",
                label: t("createCommercial.location_subcategory"),
                onSelect: (data: MultilingualItemType<{}>) =>
                  form.setValue("location_subcategory", data.id),
                category: form.watch().location_category,
              }}
            />
            <PlaceField
              control={form.control}
              label={t("createCommercial.street")}
              name="place"
              placeholder={t("createCommercial.street")}
              map={{
                className: "w-full h-[500px] md:col-span-2 lg:col-span-3",
                mapId: "49ae42fed52588c3",
                defaultZoom: 10,
              }}
              onSelectStreet={({
                location,
                address,
              }: {
                location: { lat: number; lng: number };
                address: {
                  en: { address: string };
                  ro: { address: string };
                  ru: { address: string };
                };
              }) => {
                form.setValue("lat", location.lat);
                form.setValue("lng", location.lng);
                form.setValue("street_en", address.en.address);
                form.setValue("street_ro", address.ro.address);
                form.setValue("street_ru", address.ru.address);
              }}
              defaultCoordinates={{
                lat: form.getValues("lat"),
                lng: form.getValues("lng"),
              }}
            />
          </div>
        </AccordionCard>

        {/* caracteristics */}
        <AccordionCard trigger={t("createCommercial.caracteristics")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <Field
              control={form.control}
              name="floors"
              label={t("createCommercial.total_floors")}
              placeholder="5"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <Field
              control={form.control}
              name="area"
              label={t("createCommercial.area")}
              placeholder="120"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <HousingConditionsField
              control={form.control}
              name="housing_conditions"
              label={t("createCommercial.housing_conditions")}
            />

            <CommercialDestinationsField
              control={form.control}
              name="commercial_destinations"
              label={t("createCommercial.commercial_destinations")}
            />

            <CommercialPlacingsField
              control={form.control}
              name="commercial_placings"
              label={t("createCommercial.commercial_placings")}
            />

            <CommercialFeaturesField
              control={form.control}
              name="features"
              label={t("createCommercial.commercial_features")}
            />

            <Field
              control={form.control}
              name="first_line"
              label={t("createCommercial.first_line")}
              type="check"
              className="flex flex-row-reverse justify-end items-center w-full"
            />
          </div>
        </AccordionCard>

        {/* media */}
        <AccordionCard trigger={t("createCommercial.media")}>
          <MediaField
            control={form.control}
            name="media"
            label={t("createCommercial.commercial_images")}
          />
        </AccordionCard>
        <Button type="submit">{t("createCommercial.submit")}</Button>
      </form>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <LoadingSpinner className="h-10 w-10 text-white" />
        </div>
      )}
    </Form>
  );
};
