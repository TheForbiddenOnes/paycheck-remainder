import React, {useEffect, useState} from 'react';
import {PaycheckCalendarDate} from "../PaycheckCalendarDate";
import {PaycheckCalendarHeader} from "../PaycheckCalendarHeader";
import {getPayweekDays} from "../../helpers/payweekHelpers";
import {convertSinglesToDoubles} from "../../helpers/dateHelpers";

export const PaycheckCalendar = ({date, calendarRows}) => {

    const paycheckWeekdays = getPayweekDays(date);

    return (
        <table className="w-full overflow-hidden rounded-md">
            <thead>
            <tr className="bg-slate-900 divide-x divide-solid divide-slate-400">
                { paycheckWeekdays.map((weekday) => (
                    <PaycheckCalendarHeader key={weekday.id} weekday={weekday.weekday}/>
                ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-solid divide-slate-600">
            {calendarRows && <tr className="bg-slate-500 divide-x divide-solid divide-slate-600">
                { calendarRows[0].map((paydate) => (
                    <PaycheckCalendarDate key={paydate} date={paydate}/>
                ))}
            </tr>}

            {calendarRows && <tr className="bg-slate-500 divide-x divide-solid divide-slate-600">
                { calendarRows[1].map((paydate) => (
                    <PaycheckCalendarDate key={paydate} date={paydate}/>
                ))}
            </tr>}

            </tbody>
        </table>

    );
};
