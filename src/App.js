import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Auth/Login';
import ActiveOrders from './components/Orders/ActiveOrders';
import CompletedOrders from './components/Orders/CompletedOrders';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import AuthProvider from './context/AuthContext';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>

            <Navbar />
            <ThemeToggle />
            <Box p={4}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/active-orders" element={<ActiveOrders />} />
                <Route path="/completed-orders" element={<CompletedOrders />} />
              </Routes>
            </Box>

        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
