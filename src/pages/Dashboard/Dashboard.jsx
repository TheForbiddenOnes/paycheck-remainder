import React, {useEffect, useState} from 'react';
import {Navbar} from "../../components/Navbar";
import {PaycheckCalendarPaymentInfo} from '../../components/PaycheckCalendarPaymentInfo'
import {PaycheckCalendar} from "../../components/PaycheckCalendar"
import {PaycheckCalculationTable} from "../../components/PaycheckCalculationTable"
import {getCorrectDate, formatDate} from "../../helpers/dateHelpers";
import {
    getPayweekCalendarRows,
    getPayweekDates,
    getPayweekExpenseTotal,
    getPayweekRemainingAmount, getSelectedDateExpenses
} from "../../helpers/payweekHelpers";
import {CustomNumberInput} from "../../components/CustomNumberInput";
import supabase from "../../config/supabaseClient";

export const DashboardPage = () => {

    const [date, setDate] = useState(getCorrectDate(new Date().toLocaleDateString()));
    const [startDate, setStartDate] = useState('')
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

    //get payments
    useEffect(() => {
        const getPayments = async () => {
            const {data, error} = await supabase
                .from('payments')
                .select()

            if (error) {
                setPayments([]);
            }
            if (data) {
                setPayments(data);
            }
        };
        getPayments();

    }, []);
    //get paycheck frequencies
    useEffect(() => {
        const getPaycheckFrequencies = async() => {

            let { data, error } = await supabase
                .from('pay_frequencies')
                .select('*')

            if(error){
                setPayFrequencies([]);
            }
            if(data){
                setPayFrequencies(data);
            }
        };
        getPaycheckFrequencies();

    }, [])
    //get user income
    useEffect(() => {
        const getIncomeAmount = async () => {
            const { data, error } = await supabase
                .from('paycheck_info')
                .select('income_amount')

            // console.log('income amount data :', data)
            if(error){
                setIncomeAmount(0);
            }
            if (data){
                data.map(d => {
                    setIncomeAmount(d.income_amount);
                })
            }
        };
        getIncomeAmount();

    }, []);
    //get user paycheck frequency
    useEffect(() => {
        const getPaycheckFrequency = async () => {

            let { data, error } = await supabase
                .from('paycheck_info')
                .select('paycheck_frequency')

            if (error){
                setPayFrequency('weekly')
            }
            if (data){
                data.map(d => {
                    setPayFrequency(d.paycheck_frequency);
                })
            }
        };
        getPaycheckFrequency();
    }, [])

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
        setSelectedDateExpenses(getSelectedDateExpenses(selectedDate, payments))
    },[])

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
                    <div className="grid h-full w-full">
                        <div className="grid content-center p-4 bg-slate-800 rounded-tr-xl">
                            <PaycheckCalculationTable income={incomeAmount} expense={expenseAmount}/>
                        </div>
                        <div className="grid content-center p-4 bg-slate-900 rounded-br-xl">
                            <div>
                                {/*{Todo: map through array of paycheckCalendarPaymentInfo's}*/}
                                {selectedDateExpenses.map(dateExpense => (
                                    <PaycheckCalendarPaymentInfo weekday={dateExpense.weekday} amount={dateExpense.amount} expense={dateExpense.expense}/>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}