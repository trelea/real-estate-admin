import { useForm } from "react-hook-form";
import { useUpdateApartmentFeatureMutation } from "../api";
import { ApartmentFeatureType } from "../types";
import { updateApartmentFeatureSchema } from "../validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { deserializeRtkQueryError } from "@/utils";

interface Props {
  apartmentFeature: ApartmentFeatureType;
}

export const useUpdateApartmentFeature = ({ apartmentFeature }: Props) => {
  // Uncomment and adjust if context and pagination needed
  // const {
  //   meta: {
  //     uriQueries: { page, search },
  //   },
  // } = React.useContext<ApartmentFeaturesContextProps>(ApartmentFeaturesContext);

  const [updateApartmentFeature, { isError, error, isLoading }] =
    useUpdateApartmentFeatureMutation();

  const form = useForm<z.infer<typeof updateApartmentFeatureSchema>>({
    resolver: zodResolver(updateApartmentFeatureSchema),
    defaultValues: {
      ro: apartmentFeature.ro,
      ru: apartmentFeature.ru,
      en: apartmentFeature.en,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof updateApartmentFeatureSchema>
  ) => {
    const { ro, ru, en } = apartmentFeature;
    if (isEqual(data, { ro, ru, en })) return;

    const { error } = await updateApartmentFeature({
      id: apartmentFeature.id,
      data,
      // params: { page, limit: DEFAULT_PAGINATION_LIMIT, search },
    });

    if (error) {
      return deserializeRtkQueryError<{ message: string }>(error, {
        toasts: [(err) => err.data.message, (err) => err.message],
      });
    }
  };

  return { form, onSubmit, isError, error, isLoading };
};
