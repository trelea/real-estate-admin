import { useForm } from "react-hook-form";
import { z } from "zod";
import { createApartmentSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/features/auth/types";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const useCreateApartment = ({ user }: Props) => {
  const form = useForm<z.infer<typeof createApartmentSchema>>({
    resolver: zodResolver(createApartmentSchema),
    defaultValues: {
      user: user.role === "ADMIN" ? undefined : user.id,
      lat: 47.0105,
      lng: 28.8638,
      desc_en: undefined,
      desc_ro: undefined,
      desc_ru: undefined,
      hot: undefined,
      location_category: undefined,
      location_subcategory: undefined,
      offert: undefined,
      place: undefined,
      price: undefined,
      status: undefined,
      street_en: undefined,
      street_ro: undefined,
      street_ru: undefined,

      /**
       * apartment caracteristics
       */
      features: undefined,
      floor: undefined,
      floors: undefined,
      housing_conditions: undefined,
      housing_stock: undefined,
      rooms: undefined,
      sanitaries: undefined,
      surface: undefined,

      /**
       * media
       */
      media: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = ({
    place,
    ...values
  }: z.infer<typeof createApartmentSchema>) => {
    console.log(values);
  };

  return { form, onSubmit };
};
