import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Transaction from "./Transaction";

function SkeletonRow() {
  return (
    <li className="skeleton-row">
      <div className="skeleton skeleton-icon" />
      <div className="skeleton-info">
        <div className="skeleton skeleton-text-lg" />
        <div className="skeleton skeleton-text-sm" />
      </div>
      <div className="skeleton skeleton-amount" />
    </li>
  );
}

function TransactionList() {
  const { transactions, loading } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateRange, setDateRange] = useState('all');

  const currentMonthStr = new Date().toISOString().substring(0, 7);
  const now = new Date();
  const lastMonthStr = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    .toISOString().substring(0, 7);

  const filteredTransactions = transactions
    .filter(t => {
      if (selectedCategory && t.category !== selectedCategory) return false;
      if (dateRange === 'this-month' && !t.date.startsWith(currentMonthStr)) return false;
      if (dateRange === 'last-month' && !t.date.startsWith(lastMonthStr)) return false;
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const downloadCSV = () => {
    if (filteredTransactions.length === 0) { alert("No data available to export."); return; }
    const headers = ["ID", "Amount (INR)", "Category", "Date", "Note"];
    const csvRows = filteredTransactions.map(t =>
      [t.id, t.amount, t.category, t.date, `"${t.note || ''}"`].join(",")
    );
    const blob = new Blob([[headers.join(","), ...csvRows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `expense_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="section-header">
        <span className="section-title">
          <span className="section-icon">🗂️</span>
          History
        </span>
        {!loading && filteredTransactions.length > 0 && (
          <button className="btn-export" onClick={downloadCSV}>↓ Export CSV</button>
        )}
      </div>

      <div className="filter-bar">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          <option value="all">All Dates</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
        </select>
      </div>

      {loading ? (
        <ul className="transaction-list">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </ul>
      ) : filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>No matching expenses found.</p>
        </div>
      ) : (
        <ul className="transaction-list">
          {filteredTransactions.map(transaction => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
