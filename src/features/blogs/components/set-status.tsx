import React from "react";
import { type BlogStatus } from "../types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useChangeStatus } from "../hooks";

interface Props {
  id: string;
  status: BlogStatus;
  disabled?: boolean;
}

export const SetStatus: React.FC<Props> = ({ status, id, disabled }) => {
  const { action, states } = useChangeStatus();

  return (
    <div
      className={`flex justify-center items-center gap-1 w-24 py-1.5 rounded-2xl shadow ${
        status === "PUBLIC"
          ? "bg-[#ECFDF3] text-[#027A48]"
          : "bg-[#FDECEC] text-[#7A0202]"
      }`}
    >
      <Switch
        defaultChecked={status === "PUBLIC"}
        onCheckedChange={(_) => action(id, _)}
        disabled={states.isLoading || disabled}
        id="status"
        aria-readonly
        className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500`}
      />
      <Label htmlFor="status" className="font-medium text-xs">
        {status
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")}
      </Label>
    </div>
  );
};
