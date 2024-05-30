import React, { useState } from 'react';
import { Box, Heading, Button, Table, Tbody, Td, Th, Thead, Tr, IconButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import OrderModal from './OrderModal';
import useAuth from '../../hooks/useAuth';

const dummyData = [
  { id: 1, customer: 'John Doe', date: '2024-05-01', amount: '$100', status: 'Active' },
  { id: 2, customer: 'Jane Smith', date: '2024-05-02', amount: '$200', status: 'Active' },
];

const ActiveOrders = () => {
  useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleEdit = (order) => {
    setCurrentOrder(order);
    onOpen();
  };

  return (
    <Box>
      <Heading mb={4}>Active Orders</Heading>
      <Button onClick={() => handleEdit(null)} colorScheme="teal" mb={4}>
        + Sale Order
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dummyData.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.date}</Td>
              <Td>{order.amount}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEdit(order)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <OrderModal isOpen={isOpen} onClose={onClose} order={currentOrder} />
    </Box>
  );
};

export default ActiveOrders;