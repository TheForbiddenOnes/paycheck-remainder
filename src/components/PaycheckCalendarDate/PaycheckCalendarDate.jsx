import React, {useEffect, useState} from 'react';

export const PaycheckCalendarDate = ({date, selectedDate, setSelectedDate}) => {

    const [clicked, setClicked] = useState(false);
    //Todo: figure out how to apply classes to only one calendar date div
    let customCss = clicked ? "px-2 py-8 cursor-pointer flex w-full justify-center bg-slate-400" : "px-2 py-8 cursor-pointer flex w-full justify-center hover:bg-slate-400 active:bg-slate-400";

    const handleClick = () => {
        setSelectedDate(date)
    }

    return (
        <td>
            <div onClick={handleClick} className={customCss}>
                <p className="text-base text-gray-500 dark:text-gray-100">{date}</p>
            </div>
        </td>
    );
}