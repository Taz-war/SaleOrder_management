import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Button, Select, Text, Grid, GridItem, Checkbox } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { products, customers, dummyActiveOrderData } from '../../data/data'; // Assuming you have a data.js file exporting products, customers, and dummyActiveOrderData

const OrderForm = ({ onClose, order, readOnly = false }) => {
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

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const watchItems = watch('items') || [];
  const watchCustomerID = watch('customer_id');
  const watchCustomerName = watch('customer_name');
  const watchInvoiceDate = watch('invoice_date');

  useEffect(() => {
    if (order) {
      const customer = customers.find(c => c.customer_profile.id === order.customer_id);
      if (customer) {
        setValue('customer_id', customer.customer_profile.id);
        setValue('customer_name', customer.customer_profile.name);
      }

      const product = products.find(p => p.sku.some(sku => sku.id === order.items[0].sku_id));
      if (product) {
        setSelectedProduct(product);
        setValue('product', product.id);
        setSelectedSKU(product.sku.find(sku => sku.id === order.items[0].sku_id));
      }
    }
  }, [order, setValue]);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find(p => p.id === parseInt(productId));
    setSelectedProduct(product);
    setSelectedSKU(null); // Reset selected SKU when product changes
    reset({
      customer_id: watchCustomerID,
      customer_name: watchCustomerName,
      items: [{ sku_id: '', price: '', quantity: '' }],
      invoice_no: '',
      invoice_date: watchInvoiceDate,
      status: false,
    }); // Reset form when product changes
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const selectedCustomer = customers.find(c => c.customer_profile.id === parseInt(customerId));
    if (selectedCustomer) {
      setValue('customer_id', selectedCustomer.customer_profile.id);
      setValue('customer_name', selectedCustomer.customer_profile.name);
    }
  };

  const handleSelectSKU = (sku, index) => {
    setSelectedSKU({ ...sku, price: watchItems[index].price, quantity: watchItems[index].quantity });
    update(0, { sku_id: sku.id, price: watchItems[index].price, quantity: watchItems[index].quantity });
  };

  const onSubmit = (data) => {
    const invoiceDate = new Date(data.invoice_date);
    const existingOrderIndex = dummyActiveOrderData.findIndex(o => o.customer_id === data.customer_id);

    const payload = {
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      items: [{
        sku_id: selectedSKU?.id || '',
        price: selectedSKU?.price || '',
        quantity: selectedSKU?.quantity || '',
        selling_rate: watchItems[0]?.price || '',
      }],
      paid: data.status,
      invoice_no: data.invoice_no,
      invoice_date: invoiceDate.toLocaleDateString('en-GB'),
    };

    if (existingOrderIndex >= 0) {
      dummyActiveOrderData[existingOrderIndex] = payload; // Update existing order
    } else {
      dummyActiveOrderData.push(payload); // Add new order
    }

    console.log(payload);
    onClose();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4}>
        <FormLabel>Customer Name</FormLabel>
        <Select onChange={handleCustomerChange} value={watchCustomerID} isReadOnly={readOnly}>
          <option value="">Select Customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.customer_profile.id}>
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
        <Select {...register('product')} onChange={handleProductChange} isReadOnly={readOnly} defaultValue={selectedProduct?.id || ''}>
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
                    <Input type="number" {...register(`items.${index}.price`)} defaultValue={sku.selling_price} readOnly={readOnly} />
                  </FormControl>
                  <FormControl mb={2}>
                    <FormLabel>Total Items</FormLabel>
                    <Input type="number" {...register(`items.${index}.quantity`)} readOnly={readOnly} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <Text color="green.500">{sku.quantity_in_inventory} Item(s) Remaining</Text>
                </GridItem>
                {!readOnly && (
                  <GridItem colSpan={4} display="flex" justifyContent="flex-end">
                    <Button
                      colorScheme="teal"
                      onClick={() => handleSelectSKU(sku, index)}
                      isDisabled={!watchItems[index]?.price || !watchItems[index]?.quantity}
                    >
                      Select
                    </Button>
                  </GridItem>
                )}
              </Grid>
            </Box>
          ))}
        </>
      )}

      <FormControl mb={4}>
        <FormLabel>Invoice Number</FormLabel>
        <Input type="text" {...register('invoice_no')} readOnly={readOnly} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Invoice Date</FormLabel>
        <DatePicker
          selected={watchInvoiceDate instanceof Date ? watchInvoiceDate : new Date(watchInvoiceDate)}
          onChange={(date) => setValue('invoice_date', date)}
          readOnly={readOnly}
        />
      </FormControl>

      {!readOnly && (
        <FormControl mb={4}>
          <FormLabel>Status</FormLabel>
          <Checkbox {...register('status')} isReadOnly={readOnly}>Paid</Checkbox>
        </FormControl>
      )}

      {!readOnly && (
        <Box display={'flex'} justifyContent={'space-between'}>
        <Button type="submit" colorScheme="teal" isDisabled={!selectedSKU}>
          Submit
        </Button>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OrderForm;
