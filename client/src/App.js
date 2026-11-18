import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider, GlobalContext } from './context/GlobalState';
import ExpenseChart from './components/ExpenseChart';
import Toast from './components/Toast';
import { useEffect, useContext } from 'react';
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

function AppContent() {
  const {
    isAuthenticated,
    authLoading,
    checkAuth,
    logout
  } = useContext(GlobalContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authLoading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Header onLogout={logout} />
      <MainLayout />
      <Toast />
    </>
  );
}

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
    
  );
}


export default App;
