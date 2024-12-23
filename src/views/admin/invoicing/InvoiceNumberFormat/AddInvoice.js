import React, { useState } from 'react';
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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
const AddItem = ({ open, onClose }) => {
  const [addInvoiceData] = useState({
    invoice_data: [
      { name: 'customer_name', label: 'Customer Name' },
      { name: 'placeofsupply', label: 'Place of Supply' },
      { name: 'invoice_number', label: 'Invoice Number' },
      { name: 'invoice_date', label: 'Invoice Date' },
      { name: 'order_number', label: 'Order Number' },
      { name: 'terms', label: 'Terms' },
      { name: 'due_date', label: 'Due Date' },
      { name: 'sales_person', label: 'Sales Person' }
    ],
    billing: [
      { name: 'address', label: 'Address' },
      { name: 'country', label: 'Country' },
      { name: 'state', label: 'State' },
      { name: 'pincode', label: 'Pincode' }
    ],
    shipping: [
      { name: 'address', label: 'Address' },
      { name: 'country', label: 'Country' },
      { name: 'state', label: 'State' },
      { name: 'pincode', label: 'Pincode' }
    ]
  });

  const formik = useFormik({
    initialValues: {
      customer_name: '',
      terms: '',
      invoice_number: '',
      invoice_date: '',
      placeofsupply: '',
      billto: {
        address: '',
        country: '',
        state: '',
        pincode: ''
      },
      shipto: {
        address: '',
        country: '',
        state: '',
        pincode: ''
      },
      item_details: [
        {
          sno: 1,
          item: '',
          quantity: '',
          rate: '',
          discount: '',
          amount: '',
          taxamount: '',
          tax: '',
          total_amount: ''
        }
      ]
    },
    validationSchema: Yup.object({
      customer_name: Yup.string().required('Customer name is required'),
      terms: Yup.string().required('Terms are required'),
      invoice_number: Yup.string().required('Invoice number is required'),
      invoice_date: Yup.date().required('Invoice date is required'),
      placeofsupply: Yup.string().required('Place of supply is required'),
      'billto.address': Yup.string().required('Billing address is required'),
      'billto.country': Yup.string().required('Billing country is required'),
      'billto.state': Yup.string().required('Billing state is required'),
      'billto.pincode': Yup.string().required('Billing pincode is required'),
      'shipto.address': Yup.string().required('Shipping address is required'),
      'shipto.country': Yup.string().required('Shipping country is required'),
      'shipto.state': Yup.string().required('Shipping state is required'),
      'shipto.pincode': Yup.string().required('Shipping pincode is required')
    }),
    onSubmit: (values) => {
      console.log(values);
      onClose();
    }
  });

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } = formik;

  const renderField = (item, section) => {
    const fieldName = section ? `${section}.${item.name}` : item.name;
    if (item.name === 'placeofsupply') {
      return (
        <CustomAutocomplete
          value={values[fieldName]}
          onChange={handleChange}
          options={['Telangana', 'Maharastra']} // Example options
          error={touched[fieldName] && Boolean(errors[fieldName])}
          helperText={touched[fieldName] && errors[fieldName]}
          name={fieldName}
        />
      );
    } else {
      return (
        <CustomInput
          name={fieldName}
          value={values[fieldName]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched[fieldName] && Boolean(errors[fieldName])}
          helperText={touched[fieldName] && errors[fieldName]}
        />
      );
    }
  };

  const handleAddItemRow = () => {
    const newItem = {
      sno: values.item_details.length + 1,
      item: '',
      quantity: '',
      rate: '',
      discount: '',
      amount: '',
      taxamount: '',
      tax: '',
      total_amount: ''
    };
    formik.setFieldValue('item_details', [...values.item_details, newItem]);
  };

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
          <form onSubmit={handleSubmit}>
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

            {/* Billing Section */}
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Billing Information
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {addInvoiceData.billing.map((item) => (
                <Grid item xs={6} key={item.name}>
                  <div style={{ paddingBottom: '5px' }}>
                    <label>{item.label}</label>
                  </div>
                  {renderField(item, 'billto')}
                </Grid>
              ))}
            </Grid>

            {/* Shipping Section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Shipping Information
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {addInvoiceData.shipping.map((item) => (
                <Grid item xs={6} key={item.name}>
                  <div style={{ paddingBottom: '5px' }}>
                    <label>{item.label}</label>
                  </div>
                  {renderField(item, 'shipto')}
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
                      <TableCell>Tax Amount</TableCell>
                      <TableCell>Tax %</TableCell>
                      <TableCell>Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values?.item_details?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].item`}
                            value={item.item}
                            onChange={handleChange}
                            error={touched.item_details?.[index]?.item && Boolean(errors.item_details?.[index]?.item)}
                            helperText={touched.item_details?.[index]?.item && errors.item_details?.[index]?.item}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].quantity`}
                            value={item.quantity}
                            onChange={handleChange}
                            error={touched.item_details?.[index]?.quantity && Boolean(errors.item_details?.[index]?.quantity)}
                            helperText={touched.item_details?.[index]?.quantity && errors.item_details?.[index]?.quantity}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].rate`}
                            value={item.rate}
                            onChange={handleChange}
                            error={touched.item_details?.[index]?.rate && Boolean(errors.item_details?.[index]?.rate)}
                            helperText={touched.item_details?.[index]?.rate && errors.item_details?.[index]?.rate}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].discount`}
                            value={item.discount}
                            onChange={handleChange}
                            error={touched.item_details?.[index]?.discount && Boolean(errors.item_details?.[index]?.discount)}
                            helperText={touched.item_details?.[index]?.discount && errors.item_details?.[index]?.discount}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].amount`}
                            value={item.amount}
                            onChange={handleChange}
                            error={touched.item_details?.[index]?.amount && Boolean(errors.item_details?.[index]?.amount)}
                            helperText={touched.item_details?.[index]?.amount && errors.item_details?.[index]?.amount}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].taxamount`}
                            value={item.taxamount}
                            onChange={handleChange}
                            error={touched.item_details?.[index]?.taxamount && Boolean(errors.item_details?.[index]?.taxamount)}
                            helperText={touched.item_details?.[index]?.taxamount && errors.item_details?.[index]?.taxamount}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].tax`}
                            value={item.tax}
                            onChange={handleChange}
                            error={touched.item_details?.[index]?.tax && Boolean(errors.item_details?.[index]?.tax)}
                            helperText={touched.item_details?.[index]?.tax && errors.item_details?.[index]?.tax}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].total_amount`}
                            value={item.total_amount}
                            onChange={handleChange}
                            error={touched.item_details?.[index]?.total_amount && Boolean(errors.item_details?.[index]?.total_amount)}
                            helperText={touched.item_details?.[index]?.total_amount && errors.item_details?.[index]?.total_amount}
                          />
                        </TableCell>
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

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Customer Notes
                  </Typography>
                  <CustomInput multiline />
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Terms & Conditions
                  </Typography>
                  <CustomInput multiline />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body1">Sub Total: 65</Typography>
                <Typography variant="body1">Shipping Charges: 65</Typography>
                <Typography variant="body1">CGST: 65</Typography>
                <Typography variant="body1">SGST: 65</Typography>
                <Typography variant="body1">IGST: 65</Typography>
                <Typography variant="h6" fontWeight="bold">
                  Total: 65
                </Typography>
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
