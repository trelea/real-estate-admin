import { Form } from "@/components/ui/form";
import React from "react";
import { AccordionCard } from "@/components/accordion-card";
import {
  Field,
  OffertField,
  UserField,
  StockField,
  HousingConditionsField,
  HouseFeaturesField,
} from "../components";
import { LocationField } from "../components/location-field";
import { PlaceField } from "../components/place-field";
import { Eye, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCreateHouse } from "../hooks/use-create-house";
import { Button } from "@/components/ui/button";
import { User } from "@/features/auth/types";
import { MediaField } from "@/components/media-field";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const CreateHouseOffertForm: React.FC<Props> = ({ user }) => {
  const { form, onSubmit } = useCreateHouse({ user });

  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* accordion generals */}
        <AccordionCard trigger="General Info">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-center">
            <OffertField
              controll={form.control}
              name="offert"
              label="Offert Type"
            />

            <UserField
              controll={form.control}
              name="user"
              label="Select Agent"
              disabled={user.role !== "ADMIN"}
            />

            <Field
              control={form.control}
              name="price"
              label="Price"
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
                  Hot Offert <Flame className="size-5 text-destructive" />
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
                  Status: {form.watch("status") ? "Public" : "Private"}{" "}
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
                    placeholder="Description Romanian"
                    label={"Description"}
                    displayErrorMessage
                  />
                </TabsContent>
                <TabsContent value="ru">
                  <Field
                    control={form.control}
                    name="desc_ru"
                    type="tip-tap"
                    className="w-full"
                    placeholder="Description Russian"
                    label={"Description"}
                    displayErrorMessage
                  />
                </TabsContent>
                <TabsContent value="en">
                  <Field
                    control={form.control}
                    name="desc_en"
                    type="tip-tap"
                    className="w-full"
                    placeholder="Description English"
                    label={"Description"}
                    displayErrorMessage
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AccordionCard>

        {/* acordion location */}
        <AccordionCard trigger="Location">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <LocationField
              category={{
                controll: form.control,
                name: "location_category",
                label: "Location Category",
                onSelect: (data) => form.setValue("location_category", data.id),
              }}
              subcategory={{
                controll: form.control,
                name: "location_subcategory",
                label: "Location Subcategory",
                onSelect: (data) =>
                  form.setValue("location_subcategory", data.id),
                category: form.watch().location_category,
              }}
            />
            <PlaceField
              control={form.control}
              label="Street"
              name="place"
              placeholder="Street"
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
                lat: form.getValues("lat"),
                lng: form.getValues("lng"),
              }}
            />
          </div>
        </AccordionCard>

        {/* caracteristics */}
        <AccordionCard trigger="Caracteristics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6 w-full justify-between items-start">
            <Field
              control={form.control}
              name="rooms"
              label="Rooms"
              placeholder="3"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <Field
              control={form.control}
              name="bathrooms"
              label="Bathrooms"
              placeholder="1"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <Field
              control={form.control}
              name="area"
              label="Area (m²)"
              placeholder="120"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <Field
              control={form.control}
              name="floors"
              label="Floors"
              placeholder="2"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <Field
              control={form.control}
              name="balcony"
              label="Balcony"
              placeholder="0"
              type="number"
              className="w-full"
              displayErrorMessage
            />

            <StockField
              control={form.control}
              name="housing_stock"
              label="Housing Stock"
              onSelect={({ id }) => form.setValue("housing_stock", id)}
            />

            <HousingConditionsField
              control={form.control}
              name="housing_conditions"
              label="Housing Conditions"
            />

            <HouseFeaturesField
              control={form.control}
              name="features"
              label="House Features"
            />
          </div>
        </AccordionCard>

        {/* media */}
        <AccordionCard trigger="Media">
          <MediaField
            control={form.control}
            name="media"
            label="House Images"
          />
        </AccordionCard>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
