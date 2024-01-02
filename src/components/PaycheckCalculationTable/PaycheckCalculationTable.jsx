import React from 'react';
import {CurrencyResultBox} from "../CurrencyResultBox";

export const PaycheckCalculationTable = ({income, expense}) => {
    return (
        <>
            <p className='text-lg font-bold p-2 mt-2 -mb-2.5 h-fit bg-slate-700 rounded-l rounded-r'>Previous</p>
            <div className="p-2 grid grid-cols-3 text-center">
                <CurrencyResultBox title='Income' amount={income} customClasses='underline decoration-sky-500'/>
                <CurrencyResultBox title='Expense' amount={expense} customClasses='underline decoration-pink-500'/>
                <CurrencyResultBox title='Remainder' amount={income - expense} customClasses='underline decoration-lime-500'/>
            </div>
            <p className='text-lg font-bold z-10 p-2 mt-2 -mb-2.5 h-fit bg-slate-900 rounded-l rounded-r'>Current</p>
            <div className="p-2 grid grid-cols-3 text-center">
                <CurrencyResultBox title='Income' amount={income} customClasses='underline decoration-sky-500'/>
                <CurrencyResultBox title='Expense' amount={expense} customClasses='underline decoration-pink-500'/>
                <CurrencyResultBox title='Remainder' amount={income - expense} customClasses='underline decoration-lime-500'/>
            </div>
            <p className='text-lg font-bold p-2 mt-2 -mb-2.5 h-fit bg-slate-700 rounded-l rounded-r'>Next</p>
            <div className="p-2 grid grid-cols-3 text-center">
                <CurrencyResultBox title='Income' amount={income} customClasses='underline decoration-sky-500'/>
                <CurrencyResultBox title='Expense' amount={expense} customClasses='underline decoration-pink-500'/>
                <CurrencyResultBox title='Remainder' amount={income - expense} customClasses='underline decoration-lime-500'/>
            </div>
        </>
    );
};
