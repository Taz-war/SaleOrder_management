import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Auth/Login';
import ActiveOrders from './components/Orders/ActiveOrders';
import CompletedOrders from './components/Orders/CompletedOrders';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import AuthProvider, { AuthContext } from './context/AuthContext';
import './index.css';

const queryClient = new QueryClient();

function PrivateRoute({ children }) {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {showNavbar && <Navbar />}
          {/* {showNavbar && <ThemeToggle />} */}
          <Box p={4}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/active-orders"
                element={
                  <PrivateRoute>
                    <ActiveOrders />
                  </PrivateRoute>
                }
              />
              <Route
                path="/completed-orders"
                element={
                  <PrivateRoute>
                    <CompletedOrders />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Box>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
