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
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
