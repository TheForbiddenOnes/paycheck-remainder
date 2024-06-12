import React from 'react';
import {CalculationBox} from "../CalculationBox";

export const PaycheckCalculations = ({paycheckCalculations, startDate}) => {

    return (
        <>
            {paycheckCalculations.map(calculation => (
                <div key={calculation.id}>
                    <p className='text-lg font-bold z-10 p-2 mt-2 -mb-2.5 h-fit bg-slate-900 rounded-l rounded-r'>{calculation.start_date === startDate ? "Current" : calculation.start_date}</p>
                    <div className="p-2 grid grid-cols-3 text-center">
                        <CalculationBox title={"Income"} amount={calculation.income_amount} customClasses='underline decoration-sky-500'/>
                        <CalculationBox title={"Expense"} amount={calculation.expense_amount} customClasses='underline decoration-pink-500'/>
                        <CalculationBox title={"Remainder"} amount={calculation.income_amount-calculation.expense_amount} customClasses='underline decoration-lime-500'/>
                    </div>
                </div>
            ))}
        </>
    );
};