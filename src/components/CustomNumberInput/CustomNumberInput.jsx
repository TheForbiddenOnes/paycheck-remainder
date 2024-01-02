import React, {useEffect, useState} from 'react';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid";
import supabase from "../../config/supabaseClient";

export const CustomNumberInput = ({id, inputValue, setInputValue, numberType, adjustBy}) => {

    const adjustByValue = (adjustBy, numberType) => {
        let adjustValue = 1;

        if (!adjustBy) {return adjustValue;}
        switch(numberType){
            case 'number':
                adjustValue = parseInt(adjustBy);
                break;
            case 'decimal':
                adjustValue = parseFloat(adjustBy);
                break;
            default:
                adjustValue = parseInt(adjustBy);
                break;
        }
        return adjustValue;
    }

    return (
        <div id={id} className="flex flex-row">
            <input type="number" inputMode="decimal" min="0.01" step="0.01" placeholder="..."
                   className="custom-number-input w-5/6"
                   onChange={(e) => {
                       switch(numberType){
                           case 'number':
                               setInputValue(parseInt(e.target.value))
                               break;
                           case 'decimal':
                               setInputValue(parseFloat(e.target.value))
                               break;
                           default:
                               setInputValue(parseInt(e.target.value))
                               break;
                       }
                   }}
                   value={inputValue}
            />
            <div className="flex flex-col w-1/6">
                <button id="numUp"
                        type="button"
                        className="rounded-tr-md bg-slate-800 hover:bg-slate-700 h-4 flex content-center items-center"
                        onClick={() => {
                            setInputValue(inputValue+adjustByValue(adjustBy, numberType));
                        }}
                >
                    <ChevronUpIcon className="fill-white scale-50"></ChevronUpIcon>
                </button>

                <button id="numDown"
                        type="button"
                        className="rounded-br-md bg-slate-800 hover:bg-slate-700 h-4 flex content-center items-center"
                        onClick={() => {
                            if (inputValue !== 0){
                                setInputValue(inputValue-adjustByValue(adjustBy, numberType));
                            }
                        }}
                >
                    <ChevronDownIcon className="fill-white scale-50"></ChevronDownIcon>
                </button>
            </div>
        </div>
    );
};