import React from 'react';
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import useAuth from '../../hooks/useAuth';
import {  dummyActiveOrderData } from '../../data/data'

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
          {dummyActiveOrderData.filter(entry => !entry.status).map((order) => (
            <Tr key={order.customer_id}>
              <Td>{order.customer_id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>{order.items[0].price}</Td>
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