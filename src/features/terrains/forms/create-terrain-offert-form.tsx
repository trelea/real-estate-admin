import { Form } from "@/components/ui/form";
import React from "react";
import { AccordionCard } from "@/components/accordion-card";
import {
  Field,
  OffertField,
  UserField,
  LocationField,
  PlaceField,
  TerrainUsabilitiesField,
  TerrainFeaturesField,
} from "../components";
import { Eye, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateTerrain } from "../hooks/use-create-terrain";
import { Button } from "@/components/ui/button";
import { User } from "@/features/auth/types";
import { MediaField } from "@/components/media-field";
import { MultilingualItemType } from "@/features/multilingual/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTranslation } from "react-i18next";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const CreateTerrainOffertForm: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const { form, onSubmit, isLoading } = useCreateTerrain({ user });

  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* accordion generals */}
        <AccordionCard trigger={t("createTerrain.general_info")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-center">
            <OffertField
              controll={form.control}
              name="offert"
              label={t("createTerrain.offert_type")}
            />

            <UserField
              control={form.control}
              name="user"
              label={t("createTerrain.select_agent")}
              disabled={user.role !== "ADMIN"}
            />

            <Field
              control={form.control}
              name="price"
              label={t("createTerrain.price")}
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
                  {t("createTerrain.hot_offert")}{" "}
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
                  {t("createTerrain.status")}:{" "}
                  {form.watch("status")
                    ? t("createTerrain.public")
                    : t("createTerrain.private")}{" "}
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
                  <TabsTrigger value="ro">{t("createTerrain.ro")}</TabsTrigger>
                  <TabsTrigger value="ru">{t("createTerrain.ru")}</TabsTrigger>
                  <TabsTrigger value="en">{t("createTerrain.en")}</TabsTrigger>
                </TabsList>
                <TabsContent value="ro">
                  <Field
                    control={form.control}
                    name="desc_ro"
                    type="tip-tap"
                    className="w-full"
                    placeholder={t("createTerrain.description_ro")}
                    label={t("createTerrain.description")}
                    displayErrorMessage
                  />
                </TabsContent>
                <TabsContent value="ru">
                  <Field
                    control={form.control}
                    name="desc_ru"
                    type="tip-tap"
                    className="w-full"
                    placeholder={t("createTerrain.description_ru")}
                    label={t("createTerrain.description")}
                    displayErrorMessage
                  />
                </TabsContent>
                <TabsContent value="en">
                  <Field
                    control={form.control}
                    name="desc_en"
                    type="tip-tap"
                    className="w-full"
                    placeholder={t("createTerrain.description_en")}
                    label={t("createTerrain.description")}
                    displayErrorMessage
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AccordionCard>

        {/* accordion location */}
        <AccordionCard trigger={t("createTerrain.location")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <LocationField
              category={{
                controll: form.control,
                name: "location_category",
                label: t("createTerrain.location_category"),
                onSelect: (data: MultilingualItemType<{}>) =>
                  form.setValue("location_category", data.id),
              }}
              subcategory={{
                controll: form.control,
                name: "location_subcategory",
                label: t("createTerrain.location_subcategory"),
                onSelect: (data: MultilingualItemType<{}>) =>
                  form.setValue("location_subcategory", data.id),
                category: form.watch().location_category,
              }}
            />
            <PlaceField
              control={form.control}
              label={t("createTerrain.street")}
              name="place"
              placeholder={t("createTerrain.street")}
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
        <AccordionCard trigger={t("createTerrain.caracteristics")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <Field
              control={form.control}
              name="area"
              label={t("createTerrain.area")}
              placeholder={t("createTerrain.area")}
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <TerrainUsabilitiesField
              control={form.control}
              name="usability"
              label={t("createTerrain.terrain_usabilities")}
            />

            <TerrainFeaturesField
              control={form.control}
              name="features"
              label={t("createTerrain.terrain_features")}
            />
          </div>
        </AccordionCard>

        {/* media */}
        <AccordionCard trigger={t("createTerrain.media")}>
          <MediaField
            control={form.control}
            name="media"
            label={t("createTerrain.terrain_images")}
          />
        </AccordionCard>
        <Button type="submit">{t("createTerrain.submit")}</Button>
      </form>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <LoadingSpinner className="h-10 w-10 text-white" />
        </div>
      )}
    </Form>
  );
};
