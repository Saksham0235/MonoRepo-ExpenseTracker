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
import Register from './components/RegisterForm/RegisterForm';
import PublicOnly from './components/routes/PublicOnly';
import { Navigate, Route,Routes} from 'react-router-dom';
import RequireAuth from './components/routes/RequireAuth';

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
function Dashboard() {
  const { logout } = useContext(GlobalContext);
  return (
    <>
      <Header onLogout={logout} />
      <MainLayout />
      <Toast />
    </>
  );
}

function AppRoutes() {
  const { checkAuth } = useContext(GlobalContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route element={<PublicOnly />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
function App() {
  return (
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  );
}


export default App;
