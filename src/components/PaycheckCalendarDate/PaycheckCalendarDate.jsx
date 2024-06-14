import React, { useEffect, useState } from "react";

export const PaycheckCalendarDate = ({
  date,
  selectedDate,
  setSelectedDate,
}) => {
  const isSelected = selectedDate === date;

  let customCss = isSelected
    ? "py-4 px-2 cursor-pointer flex w-full justify-center rounded-sm bg-slate-800 outline outline-offset-0 outline-1 outline-slate-600 active:bg-slate-700"
    : "py-4 px-2 cursor-pointer flex w-full justify-center hover:rounded-sm hover:bg-slate-800 hover:outline hover:outline-offset-0 hover:outline-1 hover:outline-slate-600 active:bg-slate-700";

  const handleClick = () => {
    setSelectedDate(date);
  };

  return (
    <td className="px-1 py-1">
      <div onMouseDown={handleClick} className="">
        <div className={customCss}>
          <p className="text-base text-gray-500 dark:text-gray-100">{date}</p>
        </div>
      </div>
    </td>
  );
};
