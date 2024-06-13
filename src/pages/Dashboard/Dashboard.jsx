import React, {useEffect, useState} from 'react';
import {Navbar} from "../../components/Navbar";
import {PaycheckCalendarPaymentInfo} from '../../components/PaycheckCalendarPaymentInfo'
import {PaycheckCalendar} from "../../components/PaycheckCalendar"
import {PaycheckCalculations} from "../../components/PaycheckCalculations"
import {getCorrectDate, formatDate, AddDueDateSuffix} from "../../helpers/dateHelpers";
import {
    getDefaultSelectedDate,
    getPayweekCalendarRows,
    getPayweekDates,
    getPayweekExpenseTotal,
    getPayweekRemainingAmount, getSelectedDate, getSelectedDateExpenses
} from "../../helpers/payweekHelpers";
import {CustomNumberInput} from "../../components/CustomNumberInput";
import supabase from "../../config/supabaseClient";
import {getAllPayments} from "../../services/PaymentsService";
import {getPaycheckFrequencies} from "../../services/PaycheckFrequenciesService";
import {getPaycheckCalculations} from "../../services/PaycheckCalculationsService";
import {getIncomeAmount, getPaycheckFrequency} from "../../services/PaycheckInfoService";

export const DashboardPage = () => {

    const [date, setDate] = useState(getCorrectDate(new Date().toLocaleDateString()));
    const [startDate, setStartDate] = useState('');
    console.log("startDate: ", startDate);
    const [payweekDates, setPayweekDates] = useState(null);
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [remainingAmount, setRemainingAmount] = useState(0);
    const [repeatingExpenseAmount, setRepeatingExpenseAmount] = useState(0)
    const [payFrequency, setPayFrequency] = useState('Weekly');
    const [payFrequencies, setPayFrequencies] = useState([]);
    const [payweekCalendarRows, setPayweekCalendarRows] = useState(null);
    const [payments, setPayments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
    const [paycheckCalculations, setPaycheckCalculations] = useState([]);
    // const [selectedDate, setSelectedDate] = useState(getDefaultSelectedDate());
    // const [selectedDateExpenses, setSelectedDateExpenses] = useState(getSelectedDateExpenses());y
    const [fetchError, setFetchError] = useState(null);

    //get payments
    useEffect(() => {
        getAllPayments(setPayments, setFetchError);
    }, []);
    //get paycheck frequencies
    useEffect(() => {
        getPaycheckFrequencies(setPayFrequencies, setFetchError);
    }, [])
    //get paycheck calculations
    useEffect(() => {
        getPaycheckCalculations(setPaycheckCalculations, setFetchError);
    }, [])
    //get user income
    useEffect(() => {
        getIncomeAmount(setIncomeAmount, setFetchError);
    }, []);
    //get user paycheck frequency
    useEffect(() => {
        getPaycheckFrequency(setPayFrequency, setFetchError);
    }, []);

    //date setter
    useEffect(() => {
        setStartDate(formatDate(date));
        setPayweekDates(getPayweekDates(date));
    }, [date]);
    //amount setter
    useEffect( () => {
        setExpenseAmount(getPayweekExpenseTotal(payweekDates, repeatingExpenseAmount, date, payments));
        setRemainingAmount(getPayweekRemainingAmount(incomeAmount, expenseAmount));
    }, [payweekDates, incomeAmount, repeatingExpenseAmount, payments]);
    //calendar setter
    useEffect(() => {
        setPayweekCalendarRows(getPayweekCalendarRows(payweekDates, payFrequency));
    }, [payweekDates, payFrequency]);
    //selected date expenses setter
    useEffect(() => {
        setSelectedDateExpenses(getSelectedDateExpenses(selectedDate, payweekDates, date, payments));
    },[selectedDate])
    //calculations setter
    // useEffect(() => {
    //     setPaycheckCalculations([payweekDates, payFrequency, selectedDate, payments]);
    // }, [payweekDates, payFrequency, selectedDate, payments]);

    return (
        <div className="grid h-screen">
            <div className="flex flex-col">

                {/*--------Navbar--------*/}
                <Navbar/>

                {/*--------Main Content--------*/}
                <div className="grid grid-cols-2 h-full p-4">
                    {/*--------First Column (Left Half)--------*/}
                    <div className="flex flex-col justify-center space-y-4 h-full w-full p-4 bg-slate-700 rounded-l-xl">

                        <p className="bg-slate-900 text-lg p-3 font-thin rounded-md w-full text-center">Calculate your paycheck remainder after monthly expenses</p>

                        <div className="flex items-center justify-between">
                            <PaycheckCalendar date={date} calendarRows={payweekCalendarRows} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                        </div>

                        <div className="pt-4 flex">
                            <div className="grid grid-cols-3 gap-4 w-full bg-slate-600 rounded-l-xl rounded-r-xl p-2">
                                <div className="col-span-1">
                                    <label htmlFor="current_avg_income" className="calendar-input-label">Current Income Average...</label>
                                    <CustomNumberInput id="current_avg_income" inputValue={incomeAmount} setInputValue={setIncomeAmount} numberType="decimal" adjustBy="100"></CustomNumberInput>
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="repeating_expense" className="calendar-input-label">Repeating Expenses...</label>
                                    <CustomNumberInput id="repeating_expense" inputValue={repeatingExpenseAmount} setInputValue={setRepeatingExpenseAmount} numberType="decimal" adjustBy="50"></CustomNumberInput>
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="pay_frequency" className="calendar-input-label">How do you get paid...</label>
                                    <select id="pay_frequency"
                                            className="calendar-input"
                                            value={payFrequency}
                                            onChange={(e) => {
                                                setPayFrequency(e.target.value)}}>
                                        {payFrequencies.map(payFreq => (<option key={payFreq.frequency_id} value={payFreq.pay_frequency}>{payFreq.pay_frequency}</option>))}
                                    </select>
                                </div>
                                <div className="col-span-3 bg-slate-900 rounded-bl-xl rounded-br-xl p-2 -m-2">
                                    <div>
                                        <label htmlFor="start_date" className="calendar-input-label">Find Pay date remainder...</label>
                                        <input className="calendar-input"
                                               type="date"
                                               name="startDate"
                                               id="start_date"
                                               value={startDate}
                                               onChange = {(e) => {setDate(getCorrectDate(e.target.value))}}>
                                        </input>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/*--------Second Column (Right Half)--------*/}
                    <div className="flex flex-col h-full w-full">
                        <div className="grid h-full content-center p-4 bg-slate-800 rounded-tr-xl">
                            <PaycheckCalculations paycheckCalculations={paycheckCalculations} startDate={startDate}/>
                        </div>
                        <div className="h-full content-center p-4 bg-slate-900 rounded-br-xl">
                            <div>Payments on the {AddDueDateSuffix(selectedDate)}</div>
                            <div>
                                {selectedDateExpenses.map(dateExpense => (
                                    <PaycheckCalendarPaymentInfo key={dateExpense.id} weekday={dateExpense.expense_due_date} amount={dateExpense.expense_amount} expense={dateExpense.expense_name}/>
                                ))
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}