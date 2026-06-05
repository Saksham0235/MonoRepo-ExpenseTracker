import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (selectedDate > today) {
      setError("Future dates are not allowed.");
      return;
    }

    addTransaction({
      amount: parseFloat(amount),
      category,
      date,
      note: note.trim(),
    });
    setAmount("");
    setCategory("");
    setNote("");
    setError("");
  };

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <div className="error-alert">
          <span>⚠</span> {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category…</option>
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Bills">🧾 Bills</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Other">📦 Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="form-group">
        <label htmlFor="note">Note (Optional)</label>
        <input
          id="note"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a short description…"
        />
      </div>

      <button className="btn-primary" type="submit">
        Add Expense
      </button>
    </form>
  );
}

export default AddTransaction;
