import supabase from "../config/supabaseClient";

export const getIds = async (setIds, setFetchError) => {
  const { data, error } = await supabase.from("paycheck_info").select("id");

  if (error) {
    setFetchError("Could not fetch the paycheck info");
    console.log(error);
  }
  if (data) {
    setIds(data);
  }
};

export const getId = async (userId) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("id")
    .eq("id", userId);

  if (error) {
    console.log("PaycheckInfoService getId error : ", error);
  }
  if (data) {
    return data;
  }
};

export const getIncomeAmount = async (setIncomeAmount, setFetchError) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .select("income_amount");

  // console.log('income amount data :', data)
  if (error) {
    setFetchError("Could not fetch the income amount");
    setIncomeAmount(0);
    console.log(error);
  }
  if (data) {
    data.map((d) => {
      setIncomeAmount(d.income_amount);
    });
    setFetchError(null);
  }
};

export const getPaycheckFrequency = async (setPayFrequency, setFetchError) => {
  let { data, error } = await supabase
    .from("paycheck_info")
    .select("paycheck_frequency");

  if (error) {
    setFetchError("Could not fetch the paycheck frequency");
    console.log("getPaycheckFrequency Service: ", error);
  }
  if (data) {
    data.map((d) => {
      setPayFrequency(d.paycheck_frequency);
    });
    setFetchError(null);
  }
};

export const getPerPaycheckExpenses = async (
  setPerPaycheckExpenses,
  setFetchError,
) => {
  let { data, error } = await supabase
    .from("paycheck_info")
    .select("per_paycheck_expenses");

  if (error) {
    setFetchError("Could not fetch the per paycheck expenses");
    // setPerPaycheckExpenses({});
    console.log("getPerPaycheckExpenses Service: ", error);
  }
  if (data) {
    setPerPaycheckExpenses(data);
    setFetchError(null);
  }
};

export const updatePerPaycheckExpenses = async (
  userId,
  perPaycheckExpenses,
  setPerPaycheckExpenses,
  setFetchError,
) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .update({ per_paycheck_expenses: perPaycheckExpenses })
    .eq("id", userId)
    .single();

  if (error) {
    setFetchError("Could not update the per paycheck expenses");
    console.log("updatePerPaycheckExpenses Service: ", error);
  }
  if (data) {
    setPerPaycheckExpenses(perPaycheckExpenses);
    setFetchError(null);
  }
};

export const addPaycheckInfo = async (
  userId,
  incomeAmount,
  paycheckFrequency,
  perPaycheckExpenses,
  setIncomeAmount,
  setPaycheckFrequency,
  setPerPaycheckExpenses,
  setFetchError,
) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .insert({
      id: userId,
      income_amount: incomeAmount,
      paycheck_frequency: paycheckFrequency,
      per_paycheck_expenses: perPaycheckExpenses,
    })
    .single();

  if (error) {
    console.log("Error in addPaycheckInfo : ", error);
    setFetchError(error);
  }
  if (data) {
    console.log("Data in addPaycheckInfo : ", data);
    setIncomeAmount(incomeAmount);
    setPaycheckFrequency(paycheckFrequency);
    setPerPaycheckExpenses(perPaycheckExpenses);
    setFetchError(null);
  }
};

export const updatePaycheckInfo = async (
  userId,
  incomeAmount,
  paycheckFrequency,
  perPaycheckExpenses,
  setIncomeAmount,
  setPaycheckFrequency,
  setPerPaycheckExpenses,
  setFetchError,
) => {
  const { data, error } = await supabase
    .from("paycheck_info")
    .update({
      income_amount: incomeAmount,
      paycheck_frequency: paycheckFrequency,
      per_paycheck_expenses: perPaycheckExpenses,
    })
    .eq("id", userId)
    .single();

  if (error) {
    setFetchError(error);
  }
  if (data) {
    setIncomeAmount(incomeAmount);
    setPaycheckFrequency(paycheckFrequency);
    setPerPaycheckExpenses(perPaycheckExpenses);
    setFetchError(null);
  }
};
