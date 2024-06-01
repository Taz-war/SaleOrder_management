import React, { useState } from 'react';
import { Box, Button, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import OrderModal from './OrderModal';
import useAuth from '../../hooks/useAuth';
import ActiveOrders from './ActiveOrders';
import CompletedOrders from './CompletedOrders';

const OrderManagement = () => {
    useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentOrder, setCurrentOrder] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleEdit = (order) => {
        setCurrentOrder(order);
        onOpen();
    };

    const handleTabChange = (index) => {
        if (index === 1) {
            navigate('/completed-orders');
        } else {
            navigate('/active-orders');
        }
    };

    return (
        <Box>
            <Box textAlign={'right'}>
                <Button onClick={() => handleEdit(null)} colorScheme="teal" mb={4}>
                    + Sale Order
                </Button>
            </Box>
            <Tabs
                variant='soft-rounded'
                colorScheme='teal'
                index={location.pathname === '/completed-orders' ? 1 : 0}
                onChange={handleTabChange}
            >
                <TabList mb={2}>
                    <Tab>Active Orders</Tab>
                    <Tab>Completed Orders</Tab>
                </TabList>
            </Tabs>
            <Box>
                <Routes>
                    <Route path="active-orders" element={<ActiveOrders onEdit={handleEdit} />} />
                    <Route path="completed-orders" element={<CompletedOrders />} />
                    <Route path="*" element={<ActiveOrders onEdit={handleEdit} />} />
                </Routes>
            </Box>
            <OrderModal isOpen={isOpen} onClose={onClose} order={currentOrder} />
        </Box>
    );
};

export default OrderManagement;
