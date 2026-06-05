const API_URL = process.env.REACT_APP_API_URL

export const getExpenses = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch expenses");
    return await response.json(); 
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    if (!response.ok) throw new Error("Failed to add expense");
    const data= await response.json();
    return data
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

export const updateExpense = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update expense");
    return await response.json();
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete expense");
    return true;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
