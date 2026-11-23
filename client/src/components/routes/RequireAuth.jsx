import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

const RequireAuth = () => {
  const { isAuthenticated, authLoading } = useContext(GlobalContext);

  if (authLoading) return <div>Checking authentication...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
