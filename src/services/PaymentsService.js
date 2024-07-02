import supabase from "../config/supabaseClient";

export const getAllPayments = async (setPayments, setFetchError) => {
  const { data, error } = await supabase.from("payments").select();

  if (error) {
    setFetchError("Could not fetch the payments");
    setPayments(null);
    console.log(error);
  }
  if (data) {
    setPayments(data);
    console.log("I set it");
    setFetchError(null);
  }
};

export const addPayment = async (
  expenseName,
  expenseAmount,
  expenseDueDate,
) => {
  const { data, error } = await supabase
    .from("payments")
    .insert([
      {
        expense_name: expenseName,
        expense_amount: expenseAmount,
        expense_due_date: expenseDueDate,
      },
    ])
    .select();
};

export const editPaymentRow = async (id) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .update({
        // expense_name: expenseName,
        // expense_amount: expenseAmount,
        // expense_due_date: expenseDueDate,
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    // window.location.reload();
  } catch (error) {
    alert(error.message);
  }
};

export const deletePaymentRow = async (id) => {
  try {
    const { error } = await supabase.from("payments").delete().eq("id", id);

    if (error) throw error;
    // window.location.reload();
  } catch (error) {
    alert(error.message);
  }
};
