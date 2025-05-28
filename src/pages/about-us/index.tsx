import { TableSkeleton } from "@/components/table-skeleton/table-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAboutUsContentQuery } from "@/features/about-us/api";
import { PatchAboutUsContentForm } from "@/features/about-us/forms";
import { AboutUsType } from "@/features/about-us/types";
import { User } from "@/features/auth/types";
import React from "react";

interface Props {
  status?: User;
}

export const AboutUs: React.FC<Props> = ({ status }) => {
  const { data, isLoading, isFetching } = useGetAboutUsContentQuery(null);

  return (
    <section className="h-full">
      <Card>
        <CardContent>
          <Tabs
            className="w-full h-full gap-0 space-y-0"
            defaultValue="romanian"
          >
            <div className="flex w-full justify-between items-center mb-4">
              <h1 className="text-xl font-medium">Edit About Us</h1>
              <TabsList className="flex space-x-4">
                <TabsTrigger
                  value="romanian"
                  className="text-xs xl:text-sm w-fit"
                >
                  Română
                </TabsTrigger>
                <TabsTrigger
                  value="russian"
                  className="text-xs xl:text-sm w-fit"
                >
                  Русский
                </TabsTrigger>
                <TabsTrigger
                  value="english"
                  className="text-xs xl:text-sm w-fit"
                >
                  English
                </TabsTrigger>
              </TabsList>
            </div>

            {isLoading || isFetching ? (
              <TableSkeleton />
            ) : (
              <PatchAboutUsContentForm
                content={data as AboutUsType}
                disabled={status?.role !== "ADMIN"}
              />
            )}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};
