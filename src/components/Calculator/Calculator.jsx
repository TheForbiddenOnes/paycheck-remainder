import React from "react";
import Draggable from "react-draggable";
import {
  BackspaceIcon,
  DivideIcon,
  EqualsIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const Calculator = ({ setCalculatorOpen }) => {
  const closeCalculator = () => {
    setCalculatorOpen(false);
  };

  return (
    <Draggable
      bounds="body"
      defaultPosition={{
        x: window.innerWidth / 10,
        y: window.innerHeight / 18,
      }}
    >
      <div className="absolute z-10 flex h-1/2 w-1/6 flex-row justify-between rounded-sm bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700">
        <div className="grid-rows-7 grid h-full w-full text-center">
          <div className="col-span-full row-span-1 grid grid-cols-4 rounded-sm bg-emerald-950 text-center">
            <div className="col-span-3 rounded-tl-sm bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700"></div>
            <div
              onMouseDown={closeCalculator}
              className="col-span-1 flex cursor-pointer items-center justify-center rounded-tr-sm bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </div>
          </div>

          <div className="col-span-full row-span-1 flex grid-cols-4 items-center justify-end bg-emerald-900 pr-7 text-xl outline outline-1 outline-offset-0 outline-emerald-700">
            0
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              AC
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              <BackspaceIcon className="h-6 w-6" />
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              .
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              %
            </div>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              7
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              8
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              9
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              <DivideIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              4
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              5
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              6
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              <XMarkIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              1
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              2
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              3
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              <MinusIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <div className="col-span-3 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              0
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              <PlusIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 rounded-b-sm bg-emerald-950 text-center">
            <div className="col-span-full flex cursor-pointer items-center justify-center rounded-b-sm bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700">
              <EqualsIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
