import { React, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const currentMonthStr = new Date().toISOString().substring(0, 7);

  const currentMonthExpenses = transactions.filter(
    t => t.date && t.date.startsWith(currentMonthStr)
  );

  const monthlyTotal = currentMonthExpenses.reduce((acc, t) => acc + t.amount, 0);

  const highestExpense = transactions.length > 0
    ? Math.max(...transactions.map(t => t.amount))
    : 0;

  const formatCurrency = (num) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);

  return (
    <div className="stats-grid">
      <div className="stat-card danger">
        <div className="stat-label">This Month</div>
        <div className="stat-value">{formatCurrency(monthlyTotal)}</div>
      </div>
      <div className="stat-card success">
        <div className="stat-label">Highest Spend</div>
        <div className="stat-value">{formatCurrency(highestExpense)}</div>
      </div>
    </div>
  );
};

export default IncomeExpenses;
