import React from 'react';

export const PaycheckCalendarDate = ({date}) => {
    return (
        <td>
            <div className="px-2 py-8 cursor-pointer flex w-full justify-center">
                <p className="text-base text-gray-500 dark:text-gray-100">{date}</p>
            </div>
        </td>
    );
}