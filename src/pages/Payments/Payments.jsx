import React, {useEffect, useState} from 'react';
import {Navbar} from "../../components/Navbar";
import {CustomNumberInput} from "../../components/CustomNumberInput";
import {PaymentsTableRow} from "../../components/PaymentsTableRow";
import {addPayment, getAllPayments} from "../../services/PaymentsService";

export const PaymentsPage = () => {

    const [fetchError, setFetchError] = useState(null);
    const [payments, setPayments] = useState(null);

    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseDueDate, setExpenseDueDate] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!expenseName || !expenseAmount || !expenseDueDate) {
            return;
        }

        addPayment(expenseName, expenseAmount, expenseDueDate);
    }

    useEffect(() => {
        getAllPayments(setPayments, setFetchError);
    }, [payments]);

    return (
        <div className="grid h-screen">
            <div className="flex flex-col">

                {/*--------Navbar--------*/}
                <Navbar/>

                {/*--------Main Content--------*/}
                <div className="grid grid-cols-1 h-full p-4">
                    {/*--------First Column (Left Half)--------*/}
                    <div className="flex flex-col items-center justify-start space-y-4 h-full w-full p-4 bg-slate-700 rounded-l-xl rounded-r-xl">
                        <p className="bg-slate-900 text-lg p-3 font-thin rounded-md w-full text-center">Add all of your reoccurring monthly payments here</p>
                        <form onSubmit={handleSubmit} className="flex flex-row justify-center items-end gap-4 w-1/2 bg-slate-600 rounded-l-xl rounded-r-xl p-6">
                            <div>
                                <label htmlFor="expense_name" className="calendar-input-label">Name of Expense...</label>
                                <input type="text" id="expense_name"
                                       className="calendar-input"
                                       onChange={(e) => {setExpenseName(e.target.value)}}
                                />
                            </div>
                            <div>
                                <label htmlFor="expense_amount" className="calendar-input-label">Expense Amount...</label>
                                <CustomNumberInput id="expense_amount" numberType="decimal" adjustBy="10" inputValue={expenseAmount} setInputValue={setExpenseAmount}/>
                            </div>
                            <div>
                                <label htmlFor="expense_due_date" className="calendar-input-label">Date Expense is Due...</label>
                                <CustomNumberInput id="expense_due_date" inputValue={expenseDueDate} setInputValue={setExpenseDueDate}/>
                            </div>
                            <button type="submit" className="btn-table-add">Add</button>
                        </form>

                        <div className="w-2/3 h-full bg-slate-600 rounded-lg overflow-hidden">
                            <table className="w-full h-full text-center text-sm text-white">
                                <thead className="text-xs text-white uppercase bg-slate-900">
                                <tr className="flex items-center justify-evenly w-full ">
                                    <th scope="col" className="p-4 w-1/4">
                                        Expense
                                    </th>
                                    <th scope="col" className="p-4 w-1/4">
                                        Amount
                                    </th>
                                    <th scope="col" className="p-4 w-1/4">
                                        Due Date
                                    </th>
                                    <th scope="col" className="p-4 w-1/4">

                                    </th>
                                </tr>
                                </thead>
                                <tbody className="flex flex-col items-center overflow-y-scroll scrollbar scrollbar-thumb-slate-800 scrollbar-track-slate-500 hover:scrollbar-thumb-slate-600 w-full h-full">
                                { fetchError && (<p>{fetchError}</p>)}
                                { payments && (payments.map((payment) => (
                                    <PaymentsTableRow key={payment.id} payment={payment} />
                                )))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};