import React, { useContext } from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { GlobalContext } from '../context/GlobalState';

const COLORS = {
  Food: '#f97316',
  Transport: '#3b82f6',
  Bills: '#eab308',
  Entertainment: '#06b6d4',
  Other: '#8b5cf6'
};

function ExpenseChart() {
  const { transactions } = useContext(GlobalContext);

  const categoryTotals = transactions.reduce((acc, current) => {
    const cat = current.category || 'Other';
    acc[cat] = (acc[cat] || 0) + current.amount;
    return acc;
  }, {});

  const chartData = Object.keys(categoryTotals).map(category => ({
    name: category,
    value: parseFloat(categoryTotals[category].toFixed(2)),
    fill: COLORS[category] || COLORS.Other
  }));

  return (
    <div className="card">
      <div className="section-header">
        <span className="section-title">
          <span className="section-icon">📊</span>
          Category Breakdown
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📈</div>
          <p>No data yet — add expenses to see the chart.</p>
        </div>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                labelLine={false}
                outerRadius={90}
                dataKey="value"
              />
              <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Spent']} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default ExpenseChart;
