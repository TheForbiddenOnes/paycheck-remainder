import React, { useRef } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getCorrectDate } from "../../helpers/dateHelpers";

export const CustomDateInput = ({ startDate, setDate }) => {
  const inputRef = useRef(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker(); // Use showPicker to display the date picker
    }
  };

  return (
    <div
      className="bg-slate-850 flex cursor-pointer items-center rounded-sm px-2 text-xs text-slate-200 outline outline-1 outline-offset-0 outline-slate-700"
      onClick={handleContainerClick}
    >
      <input
        ref={inputRef}
        className="bg-slate-850 rounded-xs block h-8 w-full pl-2 text-sm outline outline-1 outline-offset-0 outline-slate-700"
        type="date"
        name="startDate"
        id="start_date"
        value={startDate}
        onChange={(e) => {
          setDate(getCorrectDate(e.target.value));
        }}
      ></input>
      <CalendarDaysIcon className="h-6 w-6 text-slate-700 hover:text-slate-200" />
    </div>
  );
};
