import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTerrainSchema } from "../validation";
import { User } from "@/features/auth/types";

interface Props {
  user: {
    id: string;
    role: User["role"];
  };
}

export const useCreateTerrain = ({ user }: Props) => {
  const form = useForm<z.infer<typeof createTerrainSchema>>({
    resolver: zodResolver(createTerrainSchema),
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
      /** caracteristics */
      area: undefined,
      usability: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = ({
    place,
    ...values
  }: z.infer<typeof createTerrainSchema>) => {
    console.log(values);
  };

  return { form, onSubmit };
};
