import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface Props {
  trigger: string;
  children?: React.ReactNode;
}

export const AccordionCard: React.FC<Props> = ({ trigger, children }) => {
  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible defaultValue={"pizdet"}>
          <AccordionItem value={"pizdet"}>
            <AccordionTrigger className="font-semibold text-xl p-0 m-0 hover:no-underline">
              {trigger}
            </AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
