import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const CATEGORY_META = {
  Food:          { icon: '🍔', cls: 'cat-food' },
  Transport:     { icon: '🚗', cls: 'cat-transport' },
  Bills:         { icon: '🧾', cls: 'cat-bills' },
  Entertainment: { icon: '🎬', cls: 'cat-entertainment' },
  Other:         { icon: '📦', cls: 'cat-other' },
};

function Transaction({ transaction }) {
  const { deleteTransaction, updateTransaction } = useContext(GlobalContext);

  const [isEditing, setIsEditing]       = useState(false);
  const [confirming, setConfirming]     = useState(false);
  const [amount, setAmount]             = useState(transaction.amount);
  const [category, setCategory]         = useState(transaction.category);
  const [date, setDate]                 = useState(transaction.date);
  const [note, setNote]                 = useState(transaction.note || '');

  const formatCurrency = (num) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) { alert('Amount must be a positive number.'); return; }
    if (!category) { alert('Category is required.'); return; }
    updateTransaction(transaction.id, { amount: parseFloat(amount), category, date, note: note.trim() });
    setIsEditing(false);
  };

  const handleDeleteClick = () => setConfirming(true);
  const handleDeleteConfirm = () => deleteTransaction(transaction.id);
  const handleDeleteCancel = () => setConfirming(false);

  const meta = CATEGORY_META[transaction.category] || CATEGORY_META.Other;

  if (isEditing) {
    return (
      <li className="edit-form-item">
        <form onSubmit={handleUpdate}>
          <div className="edit-form-row">
            <input
              type="number" step="0.01" value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="date" value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="edit-form-row">
            <input
              type="text" value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (optional)"
            />
          </div>
          <div className="edit-actions">
            <button type="button" className="btn-sm cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            <button type="submit" className="btn-sm save">Save</button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="transaction-item">
      <div className={`cat-badge ${meta.cls}`}>{meta.icon}</div>
      <div className="transaction-info">
        <div className="t-category">{transaction.category}</div>
        <div className="t-date">{transaction.date}</div>
        {transaction.note && <div className="t-note">{transaction.note}</div>}
      </div>
      <div className="transaction-right">
        <span className="t-amount">{formatCurrency(transaction.amount)}</span>

        {confirming ? (
          <div className="confirm-delete">
            <span className="confirm-label">Delete?</span>
            <button className="btn-sm save" onClick={handleDeleteConfirm}>Yes</button>
            <button className="btn-sm cancel" onClick={handleDeleteCancel}>No</button>
          </div>
        ) : (
          <div className="action-btns">
            <button className="btn-icon edit" onClick={() => setIsEditing(true)} title="Edit">✏️</button>
            <button className="btn-icon delete" onClick={handleDeleteClick} title="Delete">✕</button>
          </div>
        )}
      </div>
    </li>
  );
}

export default Transaction;
