import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

const PublicOnly = () => {
  const { isAuthenticated, authLoading } = useContext(GlobalContext);

  if (authLoading) return <div>Checking authentication...</div>;
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnly;
