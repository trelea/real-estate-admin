import { useApiIsLoaded } from "@vis.gl/react-google-maps";
import React from "react";

export const useAutocompleteSuggestions = (input: string | null) => {
  const loaded = useApiIsLoaded();
  const [suggestions, setSuggestions] = React.useState<
    google.maps.places.AutocompleteSuggestion[] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!loaded) return;

    const request: google.maps.places.AutocompleteRequest = {
      input: input as string,
    };

    if (input === "") {
      return setSuggestions(undefined);
    }

    google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
      request
    ).then((res) => {
      setSuggestions(res.suggestions);
      setIsLoading(false);
    });
  }, [loaded, input]);

  return {
    suggestions,
    isLoading,
    reset: () => {
      setSuggestions(undefined);
      setIsLoading(false);
    },
  };
};
