import React from 'react';
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { dummyActiveOrderData } from '../../data/data';

const ActiveOrders = ({ onEdit }) => {
  return (
    <Box>
      <Heading mb={4}>Active Orders</Heading>
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
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => onEdit(order)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ActiveOrders;
