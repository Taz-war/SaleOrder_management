import React from 'react';
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import useAuth from '../../hooks/useAuth';

const dummyData = [
  { id: 1, customer: 'John Doe', date: '2024-05-01', amount: '$100', status: 'Completed' },
  { id: 2, customer: 'Jane Smith', date: '2024-05-02', amount: '$200', status: 'Completed' },
];

const CompletedOrders = () => {
  useAuth();

  return (
    <Box>
      <Heading mb={4}>Completed Orders</Heading>
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
                <IconButton icon={<EditIcon />} isDisabled />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompletedOrders;