export interface PlaceDeletailRes {
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  iconBackgroundColor?: string;
  svgIconMaskURI?: string;
}

export const fetchPlace = (
  placeId: string,
  language: "ro" | "ru" | "en" = "en"
): Promise<PlaceDeletailRes> => {
  return new Promise((resolve, reject) => {
    const _ = window.document.createElement("p");
    new google.maps.places.PlacesService(_).getDetails(
      {
        placeId,
        language,
        fields: [
          "place_id",
          "name",
          "formatted_address",
          "geometry",
          "icon_background_color",
        ],
      },
      (place, status) => {
        _.remove();
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place?.geometry?.location
        ) {
          return resolve({
            placeId: place.place_id as string,
            name: place.name || "",
            address: place.formatted_address || "",
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            iconBackgroundColor: place.icon_background_color,
          });
        }

        reject(new Error("Error fetching place"));
      }
    );
  });
};

export const fetchPlaceDetails = async (placeId: string) => {
  const [ro, ru, en] = await Promise.all([
    fetchPlace(placeId, "ro"),
    fetchPlace(placeId, "ru"),
    fetchPlace(placeId, "en"),
  ]);

  return {
    placeId: en.placeId,
    location: {
      lat: en.location.lat,
      lng: ro.location.lng,
    },
    translations: {
      ro: { name: ro.name, address: ro.address },
      en: { name: en.name, address: en.address },
      ru: { name: ru.name, address: ru.address },
    },
    iconBackgroundColor: en.iconBackgroundColor,
    svgIconMaskURI: en.svgIconMaskURI,
  };
};
