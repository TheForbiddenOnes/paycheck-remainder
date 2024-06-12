import React from 'react';

export const CalculationBox = ({title, amount, customClasses}) => {

    const calculationBoxCustomClasses = customClasses+" pr-2 font-semibold";

    return (
        <div className="p-2 flex justify-center border border-slate-700 h-fit">
            <div>
                <p className={calculationBoxCustomClasses}>{title}</p>
                <p className="text-2xl">${amount.toFixed(2)}</p>
            </div>
        </div>
    );
}