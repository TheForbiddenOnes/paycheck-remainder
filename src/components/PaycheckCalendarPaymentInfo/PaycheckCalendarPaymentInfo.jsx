import React from 'react';
import {addCurrencyZeroes} from "../../helpers/numberFormatHelper";
import {AbrieviateDueDate} from "../../helpers/dateHelpers";

export const PaycheckCalendarPaymentInfo = ({weekday, amount, expense}) => {

    return (
        <div className="border-b pb-4 border-gray-400 border-dashed">
            <p className="pt-2 text-xs font-light leading-3 text-gray-500 dark:text-gray-300">{AbrieviateDueDate(weekday)}</p>
            <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">{addCurrencyZeroes(amount)}</a>
            <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">{expense}</p>
        </div>
    );
}