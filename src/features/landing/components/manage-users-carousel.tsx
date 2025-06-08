import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/features/auth/types";
import { GetUsersCarouselResType } from "@/features/users/types";
import React from "react";
import { UsersCommand } from "./users-command";
import { CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  useAddUserToCarousel,
  useDeleteUserFromCarousel,
  useReorderCarousel,
} from "../hooks";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { SortableUserLink } from "./sortable-user-link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  loading?: boolean;
  users: User[];
  users_on_carousel: GetUsersCarouselResType["data"];
  disabled?: boolean;
}

export const ManageUsersCarousel: React.FC<Props> = ({
  users_on_carousel,
  users,
  loading,
  disabled,
}) => {
  const [openUsersCommand, setOpenUsersCommand] =
    React.useState<boolean>(false);
  const { addNewUser, isLoading } = useAddUserToCarousel();
  const [deleteUser, isLoadingDeleteUser] = useDeleteUserFromCarousel();
  const { reorder } = useReorderCarousel();

  const [usersOnCarousel, setUsersOnCarousel] = React.useState<
    GetUsersCarouselResType["data"]
  >([]);

  React.useEffect(
    () => setUsersOnCarousel(users_on_carousel),
    [users_on_carousel]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = React.useCallback(
    (event: unknown) => {
      // @ts-ignore
      const { active, over } = event;

      // @ts-ignore
      if (active.id !== over.id) {
        setUsersOnCarousel((prevItems) => {
          // @ts-ignore
          const oldIndex = prevItems.findIndex((item) => item.id === active.id);
          // @ts-ignore
          const newIndex = prevItems.findIndex((item) => item.id === over.id);

          return arrayMove(prevItems, oldIndex, newIndex);
        });
      }
    },
    [users_on_carousel, usersOnCarousel]
  );

  return (
    <>
      <Card className="m-0">
        <CardHeader className="m-0 flex justify-between items-center">
          <CardTitle className="font-semibold text-xl m-0 p-0">
            Agents Carousel
          </CardTitle>

          <Button
            className="w-fit"
            onClick={() => reorder({ carousel: usersOnCarousel })}
          >
            Update
          </Button>
        </CardHeader>
        <CardContent className="m-0 h-full">
          <ScrollArea className="h-[35lvh]">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              onDragEnd={handleDragEnd}
            >
              {usersOnCarousel && (
                <SortableContext
                  items={usersOnCarousel}
                  strategy={verticalListSortingStrategy}
                >
                  {usersOnCarousel
                    // ?.sort((_, __) => _.priority - __.priority)
                    ?.map(({ user, id }) => (
                      <SortableUserLink
                        key={id}
                        id={id}
                        user={user}
                        onDelete={() => deleteUser(id)}
                      />
                    ))}
                </SortableContext>
              )}
            </DndContext>
          </ScrollArea>
        </CardContent>
        <CardFooter className="w-full">
          <Button
            className="w-full text-primary border-dashed border-2 font-bold text-sm h-fit py-4 flex items-center justify-center gap-2"
            variant={"outline"}
            onClick={() => {
              if (disabled || isLoading || isLoadingDeleteUser) return;
              setOpenUsersCommand(true);
            }}
          >
            <Plus />
            <span> Add New Agent </span>
          </Button>
        </CardFooter>
      </Card>

      {!loading && (
        <UsersCommand
          open={openUsersCommand}
          setOpenUsersCommand={setOpenUsersCommand}
          children={users
            ?.filter(
              ({ id }) => !users_on_carousel?.map((u) => u.user.id).includes(id)
            )
            .map((item) => (
              <CommandItem
                key={item.id}
                className="bg-transparent"
                onSelect={() => {
                  addNewUser(item.id);
                  setOpenUsersCommand(false);
                }}
              >
                <div className="flex w-full items-center gap-4">
                  <Avatar className="bg-transparent">
                    <AvatarImage
                      src={item.profile.thumbnail as string}
                      loading="lazy"
                    />
                    <AvatarFallback>
                      {item.profile.surname.at(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex justify-between w-full">
                    <h1>
                      {item.profile.surname} {item.profile.name}
                    </h1>
                    <h3>{item.role}</h3>
                  </div>
                </div>
              </CommandItem>
            ))}
        />
      )}
    </>
  );
};
