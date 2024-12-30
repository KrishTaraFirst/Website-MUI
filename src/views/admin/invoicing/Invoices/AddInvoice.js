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
import dayjs from 'dayjs'; // Import dayjs
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
    // item_details: Yup.array().of(
    //   Yup.object({
    //     item: Yup.string().required('Item is required'),
    //     quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
    //     rate: Yup.number().required('Rate is required').positive('Rate must be positive'),
    //     discount: Yup.number().required('Discount is required').min(0, 'Discount cannot be negative'),
    //     amount: Yup.number().required('Amount is required').min(0, 'Amount cannot be negative'),
    //     taxamount: Yup.number().required('Tax amount is required').min(0, 'Tax amount cannot be negative'),
    //     tax: Yup.number().required('Tax percentage is required').min(0, 'Tax cannot be negative'),
    //     total_amount: Yup.number().required('Total amount is required').min(0, 'Total amount cannot be negative')
    //   })
    // )
  });

  const formik = useFormik({
    initialValues: {
      customer: '', // Ensure initial value is empty string, not undefined
      terms: '', // Likewise for all fields
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
        country: 'IN', // Default country value can be set if required
        state: '',
        postal_code: ''
      },
      shipping_address: {
        address_line1: '',
        country: 'IN',
        state: '',
        postal_code: ''
      },
      item_details: [{ item: '', quantity: 0, rate: 0, discount: 0, amount: 0, taxamount: 0, tax: 0, total_amount: 0 }],
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

  // Function to render fields for Invoice, Billing, or Shipping sections
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
              setFieldValue('customer', newValue);
              setFieldValue('place_of_supply', selectedCustomer.state);
              setFieldValue('billing_address.address_line1', selectedCustomer.address_line1);
              setFieldValue('billing_address.state', selectedCustomer.state);
              setFieldValue('billing_address.country', selectedCustomer.country);
              setFieldValue('billing_address.postal_code', selectedCustomer.postal_code);
            }
            formik.setFieldValue(fieldName, newValue);
          }}
          options={item.name === 'customer' ? customers?.map((customer) => customer.name) : indian_States_And_UTs} // Ensure options are unique
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
          helperText={formik.touched[fieldName] && formik.errors[fieldName]}
          name={fieldName}
        />
      );
    } else if (item.name === 'invoice_date' || item.name === 'due_date') {
      const dateValue = item.name === 'invoice_date' ? invoiceDate : dueDate; // Use local state if needed

      return (
        <CustomDatePicker
          views={['year', 'month', 'day']}
          value={dateValue}
          onChange={(newDate) => {
            const formattedDate = dayjs(newDate).format('YYYY-MM-DD');

            if (item.name === 'invoice_date') {
              setInvoiceDate(dayjs(newDate)); // Update local state for invoice_date
              formik.setFieldValue(fieldName, formattedDate); // Set Formik field value
            } else if (item.name === 'due_date') {
              setDueDate(dayjs(newDate)); // Update local state for due_date
              formik.setFieldValue(fieldName, formattedDate); // Set Formik field value
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
          onChange={(e) => formik.setFieldValue(fieldName, e.target.value)}
          onBlur={formik.handleBlur}
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
          helperText={formik.touched[fieldName] && formik.errors[fieldName]}
          disabled={item.name === 'invoice_number' || item.name === 'country'}
        />
      );
    }
  };

  // Function to render fields for Billing or Shipping Address sections
  const renderField2 = (item, section) => {
    const fieldName = `${section}.${item.name}`; // Concatenate the section name with the field name

    if (item.name === 'place_of_supply' || item.name === 'state') {
      return (
        <CustomAutocomplete
          value={formik.values[section][item.name]}
          onChange={(_, newValue) => {
            setFieldValue(fieldName, newValue);
          }}
          options={indian_States_And_UTs} // Example options
          onBlur={formik.handleBlur}
          error={formik.touched[section]?.[item.name] && Boolean(formik.errors[section]?.[item.name])}
          helperText={formik.touched[section]?.[item.name] && formik.errors[section]?.[item.name]}
          name={fieldName}
        />
      );
    } else {
      return (
        <CustomInput
          name={fieldName}
          value={formik.values[section][item.name]}
          onChange={(e) => setFieldValue(fieldName, e.target.value)}
          onBlur={formik.handleBlur}
          error={formik.touched[section]?.[item.name] && Boolean(formik.errors[section]?.[item.name])}
          helperText={formik.touched[section]?.[item.name] && formik.errors[section]?.[item.name]}
          disabled={item.name === 'invoice_number' || item.name === 'country'}
        />
      );
    }
  };

  const handleAddItemRow = () => {
    const newItem = {
      sno: formik.values.item_details.length + 1,
      item: '',
      quantity: '',
      rate: '',
      discount: '',
      amount: '',
      taxamount: '',
      tax: '',
      total_amount: ''
    };
    formik.setFieldValue('item_details', [...formik.values.item_details, newItem]);
  };
  const { values, setValues, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, resetForm } = formik;

  useEffect(() => {
    get_Goods_and_Services_Data();
  }, []);
  useEffect(() => {
    if (type === 'edit') {
      setValues({
        customer: selctedInvoiceData.customer,
        terms: selctedInvoiceData.terms,
        invoice_number:
          businessDetailsData?.invoice_format?.prefix +
          '-' +
          businessDetailsData?.invoice_format?.startingNumber +
          '-' +
          businessDetailsData?.invoice_format?.suffix,
        invoice_date: selctedInvoiceData.invoice_date,
        place_of_supply: selctedInvoiceData.place_of_supply,
        due_date: '', // Adjust based on your data source
        sales_person: '', // Adjust based on your data source
        financial_year: selctedInvoiceData.financial_year,
        order_number: selctedInvoiceData.order_number, // Adjust based on your data source
        billing_address: { ...selctedInvoiceData.billing_address },
        shipping_address: { ...selctedInvoiceData.shipping_address },
        item_details: selctedInvoiceData.item_details.map((item) => ({
          item: item.name || '',
          quantity: Number(item.quantity),
          rate: item.unitPrice || 0,
          discount: Number(item.discount),
          amount: Number(item.amount),
          taxamount: 0, // Calculate based on your logic
          tax: 0, // Calculate based on your logic
          total_amount: Number(item.amount) // Update based on your calculation
        })),
        amount_invoiced: selctedInvoiceData.amount_invoiced,
        cgst_amount: selctedInvoiceData.cgst_amount,
        igst_amount: selctedInvoiceData.igst_amount,
        notes: selctedInvoiceData.notes,
        pending_amount: selctedInvoiceData.pending_amount,
        sgst_amount: selctedInvoiceData.sgst_amount,
        shipping_amount: selctedInvoiceData.shipping_amount,
        subtotal_amount: selctedInvoiceData.subtotal_amount,
        terms_and_conditions: selctedInvoiceData.terms_and_conditions,
        total_amount: selctedInvoiceData.total_amount
      });
    }
  }, [type]);
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

            <Grid container spacing={4}>
              {/* Billing Section */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Billing Information
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {addInvoiceData.billing.map((item) => (
                    <Grid item xs={12} key={item.name}>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>
                      {renderField2(item, 'billing_address')}
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Shipping Section */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Shipping Information
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {addInvoiceData.shipping.map((item) => (
                    <Grid item xs={12} key={item.name}>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>
                      {renderField2(item, 'shipping_address')}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
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
                              // console.log(selectedItem);
                              // const gstRate = selectedItem.gst_rate || '0%';
                              // const { cgst, sgst, igst } = calculateTax(
                              //   gstRate,
                              //   formik.values.place_of_supply,
                              //   formik.values.billing_address.state
                              // );
                              // const gstRate = selectedItem.gst_rate ? parseFloat(selectedItem.gst_rate) : 0;
                              // if (values.place_of_supply === values.billing_address.state) {
                              //   newItemDetails[index].cgst = `${gstRate / 2} `;
                              //   newItemDetails[index].sgst = `${gstRate / 2} `;
                              // } else {
                              //   newItemDetails[index].igst = `${gstRate} `;
                              // }
                              newItemDetails[index] = {
                                ...newItemDetails[index],
                                item: newValue,
                                unitPrice: selectedItem.selling_price,
                                hsn_sac: selectedItem.hsn_sac,
                                rate: selectedItem.gst_rate
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
                            onChange={formik.handleChange}
                            // error={formik.touched.item_details?.[index]?.quantity && Boolean(formik.errors.item_details?.[index]?.quantity)}
                            // helperText={formik.touched.item_details?.[index]?.quantity && formik.errors.item_details?.[index]?.quantity}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].rate`}
                            value={item.rate}
                            onChange={formik.handleChange}
                            // error={formik.touched.item_details?.[index]?.rate && Boolean(formik.errors.item_details?.[index]?.rate)}
                            // helperText={formik.touched.item_details?.[index]?.rate && formik.errors.item_details?.[index]?.rate}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].discount`}
                            value={item.discount}
                            onChange={formik.handleChange}
                            // error={formik.touched.item_details?.[index]?.discount && Boolean(formik.errors.item_details?.[index]?.discount)}
                            // helperText={formik.touched.item_details?.[index]?.discount && formik.errors.item_details?.[index]?.discount}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].unitPrice`}
                            value={item.unitPrice}
                            onChange={formik.handleChange}
                            // error={
                            //   formik.touched.item_details?.[index]?.unitPrice && Boolean(formik.errors.item_details?.[index]?.unitPrice)
                            // }
                            // helperText={formik.touched.item_details?.[index]?.unitPrice && formik.errors.item_details?.[index]?.unitPrice}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].taxamount`}
                            value={item.taxamount}
                            onChange={formik.handleChange}
                            // error={
                            //   formik.touched.item_details?.[index]?.taxamount && Boolean(formik.errors.item_details?.[index]?.taxamount)
                            // }
                            // helperText={formik.touched.item_details?.[index]?.taxamount && formik.errors.item_details?.[index]?.taxamount}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].tax`}
                            value={item.tax}
                            onChange={formik.handleChange}
                            // error={formik.touched.item_details?.[index]?.tax && Boolean(formik.errors.item_details?.[index]?.tax)}
                            // helperText={formik.touched.item_details?.[index]?.tax && formik.errors.item_details?.[index]?.tax}
                          />
                        </TableCell>

                        <TableCell>
                          <CustomInput
                            name={`item_details[${index}].total_amount`}
                            value={item.total_amount}
                            onChange={formik.handleChange}
                            // error={
                            //   formik.touched.item_details?.[index]?.total_amount &&
                            //   Boolean(formik.errors.item_details?.[index]?.total_amount)
                            // }
                            // helperText={
                            //   formik.touched.item_details?.[index]?.total_amount && formik.errors.item_details?.[index]?.total_amount
                            // }
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

            {/* Customer Notes & Terms Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3 }}>
                {/* Customer Notes Field */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Customer Notes
                  </Typography>
                  <CustomInput
                    multiline
                    name="notes" // Assuming 'notes' is the key in your initialValues
                    value={formik.values.notes}
                    onChange={(e) => formik.setFieldValue('notes', e.target.value)}
                  />
                </Box>

                {/* Terms & Conditions Field */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Terms & Conditions
                  </Typography>
                  <CustomInput
                    multiline
                    name="terms_and_conditions" // Assuming 'terms_and_conditions' is the key in your initialValues
                    value={formik.values.terms_and_conditions}
                    onChange={(e) => formik.setFieldValue('terms_and_conditions', e.target.value)}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* Display Calculated Values with names on the left and values on the right */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Sub Total:</Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {formik.values.subtotal_amount}
                  </Typography>{' '}
                  {/* Added left margin */}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Shipping Charges:</Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {formik.values.shipping_amount}
                  </Typography>{' '}
                  {/* Added left margin */}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">CGST:</Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {formik.values.cgst_amount}
                  </Typography>{' '}
                  {/* Added left margin */}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">SGST:</Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {formik.values.sgst_amount}
                  </Typography>{' '}
                  {/* Added left margin */}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">IGST:</Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {formik.values.igst_amount}
                  </Typography>{' '}
                  {/* Added left margin */}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total:
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
                    {formik.values.total_amount}
                  </Typography>{' '}
                  {/* Added left margin */}
                </Box>
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
