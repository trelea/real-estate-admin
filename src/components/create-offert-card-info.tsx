import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Props {}

export const CreateOffertCardInfo: React.FC<Props> = ({}) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-semibold text-2xl">Create Offert</CardTitle>
      <CardDescription className="text-base">
        Adaugă o proprietate nouă în platformă, completând formularul de mai
        jos.
      </CardDescription>
    </CardHeader>
  </Card>
);
