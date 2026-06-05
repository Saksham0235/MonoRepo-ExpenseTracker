import { useContext, React } from 'react';
import { GlobalContext } from "../context/GlobalState";

function Balance() {
  const { transactions } = useContext(GlobalContext);

  const total = transactions.reduce((acc, item) => acc + item.amount, 0);

  const formatCurrency = (num) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);

  return (
    <div className="balance-card">
      <div className="balance-label">Total Outflow</div>
      <div className="balance-amount">{formatCurrency(total)}</div>
      <div className="balance-note">All-time tracked expenses</div>
    </div>
  );
}

export default Balance;
