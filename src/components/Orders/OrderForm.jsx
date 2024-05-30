import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderForm = ({ onClose, order }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: order || {
      customer_id: '',
      sku_id: '',
      price: '',
      quantity: '',
      invoice_no: '',
      invoice_date: new Date(),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4}>
        <FormLabel>Customer ID</FormLabel>
        <Input type="text" {...register('customer_id')} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>SKU ID</FormLabel>
        <Input type="text" {...register('sku_id')} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <Input type="text" {...register('price')} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Quantity</FormLabel>
        <Input type="text" {...register('quantity')} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Invoice Number</FormLabel>
        <Input type="text" {...register('invoice_no')} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Invoice Date</FormLabel>
        <DatePicker
          selected={watch('invoice_date')}
          onChange={(date) => setValue('invoice_date', date)}
        />
      </FormControl>
      <Button type="submit" colorScheme="teal">
        Submit
      </Button>
    </Box>
  );
};

export default OrderForm;