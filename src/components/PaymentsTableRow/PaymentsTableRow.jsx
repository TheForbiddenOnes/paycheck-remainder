import React from 'react';
import supabase from "../../config/supabaseClient";
import {addCurrencyZeroes} from "../../helpers/numberFormatHelper";
import {AddDueDateSuffix} from "../../helpers/dateHelpers";

export const PaymentsTableRow = ({payment}) => {

    const editPaymentRow = async (payment) => {
        const { data, error } = await supabase
            .from('payments')
            .update({ other_column: 'otherValue' })
            .eq('some_column', 'someValue')
            .select()
    }

    const deletePaymentRow = async (payment) => {
        const { error } = await supabase
            .from('payments')
            .delete()
            .eq('some_column', 'someValue')
    }

    return (
        <tr className="flex items-center w-full border-b bg-slate-500 border-slate-900">
            <th scope="row" className="p-4 w-1/4 font-medium uppercase whitespace-nowrap text-white">
                {payment.expense_name}
            </th>
            <td className="p-4 w-1/4">
                {addCurrencyZeroes(payment.expense_amount)}
            </td>
            <td className="p-4 w-1/4">
                {AddDueDateSuffix(payment.expense_due_date)}
            </td>
            <td className="p-4 w-1/4">
                <button type="button" className="bg-slate-800 w-1/3 ml-2 py-2 rounded-md" onClick={editPaymentRow}>
                    Edit
                </button>
                <button type="button" className="bg-slate-800 w-1/3 ml-2 py-2 rounded-md" onClick={deletePaymentRow}>
                    Delete
                </button>
            </td>
        </tr>
    );
};
