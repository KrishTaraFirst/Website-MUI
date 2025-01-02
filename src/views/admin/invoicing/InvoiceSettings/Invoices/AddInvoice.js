import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { IconPlus } from '@tabler/icons-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import CustomDatePicker from '@/utils/CustomDateInput';
import Factory from '@/utils/Factory';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';

const AddItem = ({ getInvoicesList, invoicesList, type, selctedInvoiceData, businessDetailsData, customers, open, onClose }) => {
  const [addInvoiceData] = useState({
    invoice_data: [
      { name: 'customer', label: 'Customer Name' },
      { name: 'place_of_supply', label: 'Place of Supply' },
      { name: 'invoice_number', label: 'Invoice Number' },
      { name: 'invoice_date', label: 'Invoice Date' },
      { name: 'order_number', label: 'Order Number' },
      { name: 'terms', label: 'Terms' },
      { name: 'financial_year', label: 'Financial Year' },
      { name: 'due_date', label: 'Due Date' },
      { name: 'sales_person', label: 'Sales Person' }
    ],
    billing: [
      { name: 'address_line1', label: 'Address' },
      { name: 'country', label: 'Country' },
      { name: 'state', label: 'State' },
      { name: 'postal_code', label: 'Pincode' }
    ],
    shipping: [
      { name: 'address_line1', label: 'Address' },
      { name: 'country', label: 'Country' },
      { name: 'state', label: 'State' },
      { name: 'postal_code', label: 'Pincode' }
    ]
  });

  const [itemsList, setItemsList] = useState([]);
  const [invoiceDate, setInvoiceDate] = useState(dayjs());
  const [dueDate, setDueDate] = useState(dayjs());

  const validationSchema = Yup.object({
    customer: Yup.string().required('Customer name is required'),
    terms: Yup.string().required('Terms are required'),
    financial_year: Yup.string().required('Financial year is required'),
    invoice_number: Yup.string().required('Invoice number is required'),
    invoice_date: Yup.date().required('Invoice date is required'),
    place_of_supply: Yup.string().required('Place of supply is required'),
    due_date: Yup.date().required('Due date is required'),
    order_number: Yup.string().required('Order number is required'),
    sales_person: Yup.string().required('Sales Person is required'),

    billing_address: Yup.object({
      address_line1: Yup.string().required('Billing address is required'),
      country: Yup.string().required('Billing country is required'),
      state: Yup.string().required('Billing state is required'),
      postal_code: Yup.string().required('Billing postal_code is required')
    }),
    shipping_address: Yup.object({
      address_line1: Yup.string().required('Shipping address is required'),
      country: Yup.string().required('Shipping country is required'),
      state: Yup.string().required('Shipping state is required'),
      postal_code: Yup.string().required('Shipping postal_code is required')
    })
  });

  const formik = useFormik({
    initialValues: {
      customer: '',
      terms: '',
      invoice_number:
        businessDetailsData &&
        businessDetailsData?.invoice_format?.prefix +
          '-' +
          businessDetailsData?.invoice_format?.startingNumber +
          '-' +
          businessDetailsData?.invoice_format?.suffix,
      invoice_date: '',
      place_of_supply: '',
      due_date: '',
      sales_person: '',
      financial_year: '',
      order_number: '',
      billing_address: {
        address_line1: '',
        country: 'IN',
        state: '',
        postal_code: ''
      },
      shipping_address: {
        address_line1: '',
        country: 'IN',
        state: '',
        postal_code: ''
      },
      item_details: [{ item: '', quantity: 0, rate: 0, discount: 0, amount: 0, tax: 0, taxamount: 0, total_amount: 0 }],
      amount_invoiced: 0,
      cgst_amount: 0,
      igst_amount: 0,
      notes: '',
      pending_amount: 0,
      sgst_amount: 0,
      shipping_amount: 0,
      subtotal_amount: 0,
      terms_and_conditions: '',
      total_amount: 0
    },
    validationSchema,
    onSubmit: async (values) => {
      const postData = { ...values };
      postData.invoicing_profile = businessDetailsData.id;

      let url = '/invoicing/invoice-create';
      const { res } = await Factory('post', url, postData);
      if (res.status_cd === 0) {
        getInvoicesList();
        onClose();
      }
    }
  });

  const get_Goods_and_Services_Data = async () => {
    let url = `/invoicing/goods-services/${businessDetailsData.id}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      setItemsList(res.data.goods_and_services);
    }
  };

  const renderField = (item) => {
    const fieldName = `${item.name}`;
    if (item.name === 'place_of_supply' || item.name === 'state' || item.name === 'customer') {
      return (
        <CustomAutocomplete
          value={formik.values[fieldName] || null}
          onChange={(event, newValue) => {
            if (newValue === null) return;

            if (item.name === 'customer') {
              const selectedCustomer = customers?.find((customer) => customer.name === newValue);
              console.log(selectedCustomer);
              formik.setFieldValue('customer', newValue);
              formik.setFieldValue('place_of_supply', selectedCustomer.state);
              formik.setFieldValue('billing_address.address_line1', selectedCustomer.address_line1);
              formik.setFieldValue('billing_address.state', selectedCustomer.state);
              formik.setFieldValue('billing_address.country', selectedCustomer.country);
              formik.setFieldValue('billing_address.postal_code', selectedCustomer.postal_code);
            }
            formik.setFieldValue(fieldName, newValue);
          }}
          options={item.name === 'customer' ? customers?.map((customer) => customer.name) : indian_States_And_UTs}
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
          helperText={formik.touched[fieldName] && formik.errors[fieldName]}
          name={fieldName}
        />
      );
    } else if (item.name === 'invoice_date' || item.name === 'due_date') {
      const dateValue = item.name === 'invoice_date' ? invoiceDate : dueDate;

      return (
        <CustomDatePicker
          views={['year', 'month', 'day']}
          value={dateValue}
          onChange={(newDate) => {
            const formattedDate = dayjs(newDate).format('YYYY-MM-DD');

            if (item.name === 'invoice_date') {
              setInvoiceDate(dayjs(newDate));
              formik.setFieldValue(fieldName, formattedDate);
            } else if (item.name === 'due_date') {
              setDueDate(dayjs(newDate));
              formik.setFieldValue(fieldName, formattedDate);
            }
          }}
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              fontSize: '0.75rem',
              height: '40px'
            }
          }}
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
          helperText={formik.touched[fieldName] && formik.errors[fieldName]}
        />
      );
    } else {
      return (
        <CustomInput
          name={fieldName}
          value={formik.values[fieldName]}
          onChange={(e) => formik.setFieldValue(fieldName, e.target.value)} // replaced handleChange with setFieldValue
          onBlur={formik.handleBlur}
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
          helperText={formik.touched[fieldName] && formik.errors[fieldName]}
          disabled={item.name === 'invoice_number' || item.name === 'country'}
        />
      );
    }
  };

  const handleAddItemRow = () => {
    const newItem = {
      item: '',
      quantity: '',
      rate: '',
      discount: '',
      discount_type: '%',
      amount: '',
      taxamount: '',
      tax: '',
      total_amount: ''
    };
    formik.setFieldValue('item_details', [...formik.values.item_details, newItem]);
  };

  const handleQuantityBlur = (index, value) => {
    const newQuantity = Number(value);
    const newItemDetails = [...formik.values.item_details];
    newItemDetails[index].quantity = newQuantity;

    const rate = Number(newItemDetails[index].rate);
    const discount = Number(newItemDetails[index].discount);

    // Recalculate amount
    const amount = newQuantity * rate * (1 - discount / 100);
    newItemDetails[index].amount = amount;

    // Recalculate total_amount based on amount and tax
    const tax = Number(newItemDetails[index].tax);
    const taxAmount = (amount * tax) / 100;
    newItemDetails[index].taxamount = taxAmount;
    newItemDetails[index].total_amount = amount + taxAmount;

    formik.setFieldValue('item_details', newItemDetails);
  };

  const handleDiscountChange = (index, value, type) => {
    const newDiscount = type === '%' ? Number(value) : Number(value); // Always handle as a number, whether it is % or ₹
    const newItemDetails = [...formik.values.item_details];

    newItemDetails[index].discount = newDiscount;
    newItemDetails[index].discount_type = type;

    const quantity = Number(newItemDetails[index].quantity);
    const rate = Number(newItemDetails[index].rate);

    let amount = quantity * rate;

    // Apply discount logic based on type
    if (type === '%') {
      amount *= 1 - newDiscount / 100; // For % discount
    } else {
      amount -= newDiscount; // For ₹ discount
    }

    newItemDetails[index].amount = amount;

    // Recalculate total_amount based on amount and tax
    const tax = Number(newItemDetails[index].tax);
    const taxAmount = (amount * tax) / 100;
    newItemDetails[index].taxamount = taxAmount;
    newItemDetails[index].total_amount = amount + taxAmount;

    formik.setFieldValue('item_details', newItemDetails);
  };

  useEffect(() => {
    get_Goods_and_Services_Data();
  }, []);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="lg">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Add Invoice
          </DialogTitle>
          <IconButton variant="outlined" color="secondary" aria-label="close" onClick={onClose}>
            <IconX size={20} />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            {/* Invoice Data Section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Invoice Details
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {addInvoiceData.invoice_data.map((item) => (
                <Grid item xs={6} key={item.name}>
                  <div style={{ paddingBottom: '5px' }}>
                    <label>{item.label}</label>
                  </div>
                  {renderField(item)}
                </Grid>
              ))}
            </Grid>

            {/* Item Details Section (Table) */}
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Item Details
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Tax %</TableCell>
                      <TableCell>Tax Amount</TableCell>
                      <TableCell>Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formik.values.item_details.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <CustomAutocomplete
                            size="small"
                            options={itemsList.map((item) => item.name)}
                            value={item.item || null}
                            onChange={(event, newValue) => {
                              const newItemDetails = [...formik.values.item_details];
                              const selectedItem = itemsList.find((i) => i.name === newValue) || {};
                              console.log(selectedItem);
                              newItemDetails[index] = {
                                ...newItemDetails[index],
                                item: newValue,
                                unitPrice: selectedItem.selling_price,
                                hsn_sac: selectedItem.hsn_sac,
                                rate: selectedItem.selling_price,
                                tax: selectedItem.gst_rate
                              };
                              formik.setFieldValue('item_details', newItemDetails);
                            }}
                            style={{ minWidth: 250, maxWidth: 250 }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].quantity`}
                            value={item.quantity}
                            onBlur={() => handleQuantityBlur(index, item.quantity)}
                            onChange={(e) => handleQuantityBlur(index, e.target.value)}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].rate`}
                            value={item.rate}
                            onChange={(e) => formik.setFieldValue(`item_details[${index}].rate`, e.target.value)} // replaced handleChange with setFieldValue
                          />
                        </TableCell>
                        <TableCell>
                          <CustomAutocomplete
                            options={['%', '₹']}
                            value={item.discount_type || ''} // Ensure the value is never undefined or null
                            onChange={(event, newValue) => {
                              handleDiscountChange(index, item.discount, newValue); // Handle discount change based on newValue
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].discount`}
                            value={item.discount}
                            onChange={(e) => handleDiscountChange(index, e.target.value)}
                          />
                        </TableCell>

                        <TableCell>{item.amount}</TableCell>

                        <TableCell>{item.tax}</TableCell>

                        <TableCell>{item.taxamount} </TableCell>

                        <TableCell>{item.total_amount} </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 2 }}>
                <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleAddItemRow}>
                  Add Row
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3, gap: 5 }}>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AddItem;
