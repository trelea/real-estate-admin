import { useForm } from "react-hook-form";
import { z } from "zod";
import { createHouseSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/features/auth/types";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const useCreateHouse = ({ user }: Props) => {
  const form = useForm<z.infer<typeof createHouseSchema>>({
    resolver: zodResolver(createHouseSchema),
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
      features: undefined,
      media: undefined,

      /**
       * house caracteristics
       */
      rooms: undefined,
      bathrooms: undefined,
      area: undefined,
      floors: undefined,
      balcony: 0,
      housing_stock: undefined,
      housing_conditions: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = ({
    place,
    ...values
  }: z.infer<typeof createHouseSchema>) => {
    console.log(values);
  };

  return { form, onSubmit };
};
