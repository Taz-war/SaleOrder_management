import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import OrderForm from './OrderForm';

const OrderModal = ({ isOpen, onClose, order }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <OrderForm onClose={onClose} order={order} />
        </ModalBody>
        <ModalFooter>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
