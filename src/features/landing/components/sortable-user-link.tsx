import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/features/auth/types";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  id: string | number;
  user: User;
  onDelete?: () => void;
}

export const SortableUserLink: React.FC<Props> = ({ id, user, onDelete }) => {
  const uniqueId = id;
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: uniqueId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isCursorGrabbing = attributes["aria-pressed"];

  return (
    <div className="py-1" ref={setNodeRef} style={style} key={uniqueId}>
      <Card className="m-0 p-3 flex flex-row justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="bg-transparent">
            <AvatarImage
              src={user.profile.thumbnail as string}
              loading="lazy"
            />
            <AvatarFallback>
              {user.profile.surname.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span className="flex justify-center items-center gap-2 text-xs">
            <h1>
              {user.profile.surname} {user.profile.name}
            </h1>
            <Badge>{user.role}</Badge>
          </span>
        </div>

        <div className="flex justify-center items-center gap-1">
          <Button
            variant={"ghost"}
            onClick={onDelete}
            aria-label={t("landing.delete")}
          >
            <Trash2 className="text-destructive" />
          </Button>
          <Button
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className={` ${
              isCursorGrabbing ? "cursor-grabbing" : "cursor-grab"
            }`}
            aria-describedby={`DndContext-${uniqueId}`}
          >
            <svg viewBox="0 0 20 20" width="15">
              <path
                d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
                fill="currentColor"
              ></path>
            </svg>
          </Button>
        </div>
      </Card>
    </div>
  );
};
