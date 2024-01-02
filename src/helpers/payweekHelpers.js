import {convertSinglesToDoubles, daysInMonth} from "./dateHelpers";

export function getPayweekDays(date){
    const daysInGivenMonth = daysInMonth(date.getMonth(), date.getFullYear());
    const startDateDay = date.getUTCDate();
    let expectedEndDate = startDateDay+14;
    let daysPassedCounter = 0;
    let payweekDates = [];

    for (let i = startDateDay; i < expectedEndDate; i++) {
        daysPassedCounter++;
        if (i > daysInGivenMonth){
            i = 1;
            expectedEndDate = 16-daysPassedCounter;
        }
        if (payweekDates.length === 7){
            break;
        }

        const newPayweekDate = new Date(date.getFullYear(), date.getMonth(), i);

        payweekDates.push(
            {
                id: daysPassedCounter,
                date: newPayweekDate,
                dayString: i.toString(),
                dayNumber: i,
                weekday: newPayweekDate.toLocaleDateString('en-US',{weekday: 'long'}).slice(0,2),
            }
        );
    }

    return payweekDates;
}
export function getPayweekDates(date) {
    const daysInGivenMonth = daysInMonth(date.getMonth(), date.getFullYear());
    const startDateDay = date.getUTCDate();
    let expectedEndDate = startDateDay+14;
    let daysPassedCounter = 0;
    let payweekDates = [];

    for (let i = startDateDay; i < expectedEndDate; i++) {
        daysPassedCounter++;
        if (i > daysInGivenMonth){
            i = 1;
            expectedEndDate = 16-daysPassedCounter;
        }

        const newPayweekDate = new Date(date.getFullYear(), date.getMonth(), i);

        payweekDates.push(
            {
                id: daysPassedCounter,
                date: newPayweekDate,
                dayString: i.toString(),
                dayNumber: i,
                weekday: newPayweekDate.toLocaleDateString('en-US',{weekday: 'long'}).slice(0,2),
            }
        );
    }

    return payweekDates;
}
export function getPayweekCalendarRows(payweekDates, payFrequency){
    let paycheckRow1 =[];
    let paycheckRow2=[];
    let calendarDateRows = [];

    //get payweekDates
    switch (payFrequency) {
        case 'weekly':
            paycheckRow1 = payweekDates ? payweekDates.slice(0,7) : [];
            paycheckRow1 = convertSinglesToDoubles(paycheckRow1);
            break;
        case 'bi-weekly':
            paycheckRow1 = payweekDates ? payweekDates.slice(0,7) : [];
            paycheckRow1 = convertSinglesToDoubles(paycheckRow1);

            paycheckRow2 = payweekDates ? payweekDates.slice(7,14) : [];
            paycheckRow2 = convertSinglesToDoubles(paycheckRow2);
            break;
        default:
            break;
    }

    calendarDateRows.push(paycheckRow1);
    calendarDateRows.push(paycheckRow2);
    //return array with number of rows equal to payFrequency
    console.log('calendar date rows : ', calendarDateRows)
    return calendarDateRows;
}

export function getPayweekExpenseTotal(payweekDates, repeatingExpenseAmount, date, payments) {
    let payweek = payweekDates ? payweekDates : getPayweekDates(date);
    let paymentTotals = 0;
    let allPayments = payments;
    console.log(allPayments)

    for (let i = 0; i < allPayments.length; i++) {
        payweek.forEach(pd => {
            if (allPayments[i].expense_due_date === pd.dayNumber) {
                paymentTotals = paymentTotals + allPayments[i].expense_amount;
            }
        })
    }

    return paymentTotals + repeatingExpenseAmount;
}
export function getPayweekRemainingAmount(incomeAmount, expenseAmount) {
    return incomeAmount - expenseAmount;
}