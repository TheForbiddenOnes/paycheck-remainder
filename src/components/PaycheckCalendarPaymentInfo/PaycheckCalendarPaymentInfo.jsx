import React from "react";
import { addCurrencyZeroes } from "../../helpers/numberFormatHelper";
import { AddDueDateSuffix } from "../../helpers/dateHelpers";

export const PaycheckCalendarPaymentInfo = ({ weekday, amount, expense }) => {
  const customCss =
    weekday !== "" ? "border-b py-1.5 border-slate-700 border-solid" : "";

  return (
    <div className={customCss}>
      <a
        tabIndex="0"
        className="mt-2 text-lg font-medium leading-5 text-slate-200 focus:outline-none"
      >
        {addCurrencyZeroes(amount)}
      </a>
      <p className="pt-0.5 text-sm leading-none text-slate-400">{expense}</p>
    </div>
  );
};
