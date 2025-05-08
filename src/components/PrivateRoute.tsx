import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Check if there was a previous session that expired
    const sessionData = localStorage.getItem('wedding_session');
    if (sessionData) {
      const { expiry } = JSON.parse(sessionData);
      if (new Date().getTime() >= expiry) {
        // Clear expired session and redirect to login with expiry notice
        localStorage.removeItem('wedding_session');
        return <Navigate to="/login?expired=true" state={{ from: location }} replace />;
      }
    }
    
    // Regular redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{element}</>;
};

export default PrivateRoute;
