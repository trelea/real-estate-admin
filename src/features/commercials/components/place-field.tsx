import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, ControllerRenderProps } from "react-hook-form";
import { useAutocompleteSuggestions } from "@/hooks/use-autocomplete-suggestions";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  AdvancedMarker,
  ControlPosition,
  Map,
  MapControl,
  MapProps,
  Pin,
} from "@vis.gl/react-google-maps";
import {
  fetchPlaceDetails,
  PlaceDeletailRes,
} from "@/utils/fetch-place-details";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";

interface Props {
  control: Control<any>;
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  map?: MapProps;
  onSelectStreet?: ({
    location,
    address,
  }: {
    location: PlaceDeletailRes["location"];
    address: {
      en: Pick<PlaceDeletailRes, "name" | "address">;
      ro: Pick<PlaceDeletailRes, "name" | "address">;
      ru: Pick<PlaceDeletailRes, "name" | "address">;
    };
  }) => void;
  defaultCoordinates?: PlaceDeletailRes["location"];
}

export const PlaceField: React.FC<Props> = ({
  control,
  name,
  label,
  placeholder,
  map,
  onSelectStreet,
  defaultCoordinates,
}) => {
  const { currentLang: language } = useChangeLanguage();
  const { t } = useTranslation();
  const [place, setPlace] = React.useState<undefined | PlaceDeletailRes>(
    undefined
  );
  const [search, setSearch] = React.useState<string | null>("");
  const { suggestions, isLoading, reset } = useAutocompleteSuggestions(
    search as string
  );

  const handleSelect = React.useCallback(
    async (
      place: google.maps.places.AutocompleteSuggestion,
      field: ControllerRenderProps<any, string>
    ) => {
      const details = await fetchPlaceDetails(
        place.placePrediction?.placeId as string
      );
      setSearch("");
      // @ts-ignore
      setPlace(details);
      // @ts-ignore
      field.onChange(details.translations[language].address);
      onSelectStreet &&
        onSelectStreet({
          location: details.location,
          address: details.translations,
        });
      reset();
    },
    []
  );

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Command
              shouldFilter={false}
              className="rounded-lg border shadow-md w-full relative"
            >
              <CommandInput
                value={field.value || search}
                placeholder={placeholder || t("place.search")}
                onValueChange={(value) => {
                  setSearch(value);
                  field.onChange(value);
                }}
              />
              {suggestions && suggestions.length !== 0 && !isLoading && (
                <CommandList>
                  <CommandGroup>
                    {suggestions.map((place, _) => (
                      <CommandItem
                        key={place.placePrediction?.placeId}
                        value={place.placePrediction?.placeId}
                        onSelect={() => handleSelect(place, field)}
                      >
                        {/* @ts-ignore */}
                        {place.placePrediction?.mainText?.text}
                        {", "}
                        {/* @ts-ignore */}
                        {place.placePrediction?.secondaryText?.text}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <Map
        {...map}
        center={place?.location || defaultCoordinates}
        defaultZoom={15}
      >
        {place && (
          <AdvancedMarker position={place.location} title={place.name}>
            <Pin
              background={place.iconBackgroundColor || "#EA4335"}
              glyph={
                place.svgIconMaskURI ? new URL(place.svgIconMaskURI) : undefined
              }
              borderColor="#137333"
            />
          </AdvancedMarker>
        )}

        {place && (
          <MapControl position={ControlPosition.TOP_LEFT}>
            <div className="bg-white p-2 m-2 rounded shadow-md max-w-xs">
              <h3 className="font-medium text-sm">
                {/* @ts-ignore */}
                {place.translations.en.name}
              </h3>
              <p className="text-xs text-gray-600">
                {/* @ts-ignore */}
                {place.translations.en.address}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {place.location.lat.toFixed(6)}, {place.location.lng.toFixed(6)}
              </p>
            </div>
          </MapControl>
        )}
      </Map>
    </>
  );
};
