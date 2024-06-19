import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { CustomNumberInput } from "../../components/CustomNumberInput";
import { PaymentsTableRow } from "../../components/PaymentsTableRow";
import { addPayment, getAllPayments } from "../../services/PaymentsService";

export const PaymentsPage = ({ expenseTotal }) => {
  const [fetchError, setFetchError] = useState(null);
  const [payments, setPayments] = useState(null);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseDueDate, setExpenseDueDate] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !expenseAmount || !expenseDueDate) {
      return;
    }

    addPayment(expenseName, expenseAmount, expenseDueDate);
  };

  useEffect(() => {
    getAllPayments(setPayments, setFetchError);
  }, [payments]);

  return (
    <article className="col-span-1 row-span-full grid h-screen grid-cols-12 grid-rows-9 bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="col-span-full row-span-1 flex flex-row items-end justify-center gap-4 p-6"
      >
        <div>
          <label
            htmlFor="expense_name"
            className="mb-2 block text-base text-gray-600"
          >
            Name of Expense...
          </label>
          <input
            type="text"
            id="expense_name"
            className="block h-8 w-full rounded-sm bg-gray-850 pl-2 outline outline-1 outline-offset-0 outline-gray-700"
            onChange={(e) => {
              setExpenseName(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="expense_amount"
            className="mb-2 block text-base text-gray-600"
          >
            Expense Amount...
          </label>
          <CustomNumberInput
            id="expense_amount"
            numberType="decimal"
            adjustBy="10"
            inputValue={expenseAmount}
            setInputValue={setExpenseAmount}
          />
        </div>
        <div>
          <label
            htmlFor="expense_due_date"
            className="mb-2 block text-base text-gray-600"
          >
            Date Expense is Due...
          </label>
          <CustomNumberInput
            id="expense_due_date"
            inputValue={expenseDueDate}
            setInputValue={setExpenseDueDate}
          />
        </div>
        <button
          type="submit"
          className="h-8 w-1/12 rounded-sm bg-emerald-950 text-center text-sm outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 hover:outline-emerald-600 active:bg-emerald-800"
        >
          Add
        </button>
      </form>
      <div className="col-span-full row-span-8 pb-10">
        <table className="h-full w-full text-center text-sm text-white">
          <thead className="bg-gray-900 text-xs uppercase text-gray-500 outline outline-1 outline-offset-0 outline-gray-700">
            <tr className="flex w-full items-center justify-evenly">
              <th scope="col" className="w-1/4 p-2">
                Expense
              </th>
              <th scope="col" className="w-1/4 p-2">
                Amount
              </th>
              <th scope="col" className="w-1/4 p-2">
                Due Date
              </th>
              <th scope="col" className="w-1/4 p-2">
                <div className="flex flex-row items-center justify-center">
                  Total
                  <p className="pl-2 font-thin text-white">
                    {expenseTotal
                      ? `${"$" + expenseTotal.toFixed(2)}`
                      : `${"$" + "0.00"}`}
                  </p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="flex h-full w-full flex-col items-center overflow-y-scroll">
            {fetchError && <p>{fetchError}</p>}
            {payments &&
              payments.map((payment) => (
                <PaymentsTableRow key={payment.id} payment={payment} />
              ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};
