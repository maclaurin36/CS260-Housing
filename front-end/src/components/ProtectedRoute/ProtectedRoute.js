import { Navigate } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider.js';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(authContext);

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;