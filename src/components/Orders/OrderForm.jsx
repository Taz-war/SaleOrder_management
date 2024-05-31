import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Button, Select, Text, Grid, GridItem, Checkbox } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { products, customers, dummyActiveOrderData } from '../../data/data'; // Assuming you have a data.js file exporting products, customers, and dummyActiveOrderData

const OrderForm = ({ onClose, order }) => {
  const { register, handleSubmit, watch, setValue, control, reset } = useForm({
    defaultValues: order || {
      customer_id: '',
      customer_name: '',
      items: [{ sku_id: '', price: '', quantity: '' }],
      invoice_no: '',
      invoice_date: new Date(),
      status: false,
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'items',
  });
 console.log(dummyActiveOrderData)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const watchItems = watch('items') || [];
  const watchCustomerID = watch('customer_id');
  const watchCustomerName = watch('customer_name');

  const onSubmit = (data) => {
    const payload = {
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      items: [{
        sku_id: selectedSKU.id,
        price: selectedSKU.price,
        quantity: selectedSKU.quantity,
        selling_rate: watchItems[0].price,
      }],
      status: data.status,
      invoice_no: data.invoice_no,
      invoice_date: data.invoice_date.toLocaleDateString('en-GB'),
    };

    console.log(payload);
    dummyActiveOrderData.push(payload); // Push the payload to dummyActiveOrderData
    console.log(dummyActiveOrderData)
    onClose();
  };

  useEffect(() => {
    if (order) {
      setSelectedProduct(products.find(p => p.id === order.product_id));
    }
  }, [order]);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(products.find(p => p.id === parseInt(productId)));
    setSelectedSKU(null); // Reset selected SKU when product changes
    reset({
      customer_id: watchCustomerID,
      customer_name: watchCustomerName,
      items: [{ sku_id: '', price: '', quantity: '' }],
      invoice_no: '',
      invoice_date: new Date(),
      status: false,
    }); // Reset form when product changes
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const selectedCustomer = customers.find(c => c.id === parseInt(customerId));
    if (selectedCustomer) {
      setValue('customer_id', selectedCustomer.customer_profile.id);
      setValue('customer_name', selectedCustomer.customer_profile.name);
    }
  };

  const handleSelectSKU = (sku, index) => {
    setSelectedSKU({ ...sku, price: watchItems[index].price, quantity: watchItems[index].quantity });
    update(0, { sku_id: sku.id, price: watchItems[index].price, quantity: watchItems[index].quantity });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4}>
        <FormLabel>Customer Name</FormLabel>
        <Select onChange={handleCustomerChange} value={watchCustomerID}>
          <option value="">Select Customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.customer_profile.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Customer ID</FormLabel>
        <Input type="text" {...register('customer_id')} readOnly />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Product</FormLabel>
        <Select onChange={handleProductChange}>
          <option value="">Select Product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {selectedProduct && (
        <>
          {selectedProduct.sku.map((sku, index) => (
            <Box key={sku.id} mb={4} p={4} borderWidth="1px" borderRadius="md">
              <Grid templateColumns="repeat(4, 1fr)" gap={4} alignItems="center">
                <GridItem colSpan={4}>
                  <Text fontWeight="bold">{`${index + 1}. SKU ${sku.id} (${sku.amount} ${sku.unit})`}</Text>
                  <Text>Rate: ₹ {sku.selling_price}</Text>
                </GridItem>
                <GridItem colSpan={4} display={'flex'}>
                  <FormControl mb={2} mr={2}>
                    <FormLabel>Selling Rate</FormLabel>
                    <Input type="number" {...register(`items.${index}.price`)} defaultValue={sku.selling_price} />
                  </FormControl>
                  <FormControl mb={2}>
                    <FormLabel>Total Items</FormLabel>
                    <Input type="number" {...register(`items.${index}.quantity`)} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <Text color="green.500">{sku.quantity_in_inventory} Item(s) Remaining</Text>
                </GridItem>
                <GridItem colSpan={4} display="flex" justifyContent="flex-end">
                  <Button
                    colorScheme="teal"
                    onClick={() => handleSelectSKU(sku, index)}
                    isDisabled={!watchItems[index]?.price || !watchItems[index]?.quantity}
                  >
                    Select
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          ))}
        </>
      )}

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

      <FormControl mb={4}>
        <FormLabel>Status</FormLabel>
        <Checkbox {...register('status')}>Paid</Checkbox>
      </FormControl>

      <Button type="submit" colorScheme="teal" isDisabled={!selectedSKU}>
        Submit
      </Button>
    </Box>
  );
};

export default OrderForm;
