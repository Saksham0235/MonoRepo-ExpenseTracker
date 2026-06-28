import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider, GlobalContext } from './context/GlobalState';
import ExpenseChart from './components/ExpenseChart';
import Toast from './components/Toast';
import { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/LoginForm/LoginForm';

function MainLayout() {
  const { getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="page-wrapper">
      <div className="left-panel">
        <Balance />
        <IncomeExpenses />
        <div className="card">
          <div className="section-header">
            <span className="section-title">
              <span className="section-icon">➕</span>
              Add Expense
            </span>
          </div>
          <AddTransaction />
        </div>
      </div>
      <div className="right-panel">
        <ExpenseChart />
        <div className="card">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(  localStorage.getItem("isLoggedIn") === "true");
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false);
  };
  return (
    <GlobalProvider>
      {isLoggedIn ? (
        <>
          <Header  onLogout={handleLogout}/>
          <MainLayout />
          <Toast />
        </>
      ) : (
        <Login onSubmit={handleLogin} />
      )}
    </GlobalProvider>
  );
}

export default App;
