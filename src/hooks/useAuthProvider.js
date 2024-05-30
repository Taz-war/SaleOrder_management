import { useState } from 'react';

const useAuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = (navigate) => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuthProvider;
