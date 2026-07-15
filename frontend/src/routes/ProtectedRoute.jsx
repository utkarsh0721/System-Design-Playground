import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PageLoader from '../components/PageLoader';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();
  if (isBootstrapping) return <PageLoader />;
  if (!isAuthenticated && import.meta.env.VITE_DEMO_MODE !== 'true') return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}
