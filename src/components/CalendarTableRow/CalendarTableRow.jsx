import React from 'react';

export const CalendarTableRow = ({rowType}) => {
    return (
        <tr className="bg-slate-900 divide-x divide-solid divide-slate-400">
            {/*Todo: Write if check for rowType=header to show either <PaycheckCalendarHeader/>(<th> tag) or <PaycheckCalendarDate/>(<td> tag)*/}


            <th>
                <div className="w-full flex justify-center">
                    <p className="text-base font-medium text-center">{rowType}</p>
                </div>
            </th>
        </tr>
    );
};