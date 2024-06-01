import React, { useState } from 'react';
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import useAuth from '../../hooks/useAuth';
import { dummyActiveOrderData } from '../../data/data';
import OrderForm from './OrderForm';

const CompletedOrders = () => {
  useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

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
                <IconButton icon={<EditIcon />} onClick={() => handleViewOrder(order)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && (
              <OrderForm order={selectedOrder} readOnly={true} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CompletedOrders;
