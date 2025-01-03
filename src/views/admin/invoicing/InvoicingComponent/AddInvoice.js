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
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { IconPlus } from '@tabler/icons-react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import CustomDatePicker from '@/utils/CustomDateInput';
import Factory from '@/utils/Factory';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import BulkItems from './BulkItems';
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
  const [applyTax, setApplyTax] = useState(false); // State for Apply Tax checkbox
  const [selectedGSTRate, setSelectedGSTRate] = useState(0); // State for selected GST rate on shipping charges
  const [bulkItemsDialogue, setBulkItemsDialogue] = useState(false); // State for Apply Tax checkbox

  // Dummy GST rates for dropdown (18%, 5%, etc.)
  const gstRates = [0, 5, 12, 18, 28]; // Example GST rates

  const handleShippingAmountChange = (e) => {
    const shippingCharges = parseFloat(e.target.value) || 0; // Ensure value is a number (default to 0 if invalid)
    formik.setFieldValue('shipping_amount', shippingCharges);

    // Recalculate the total amount (item totals + taxes + shipping)
    const subtotal = formik.values.subtotal_amount || 0;
    const cgstTotal = formik.values.cgst_amount || 0;
    const sgstTotal = formik.values.sgst_amount || 0;
    const igstTotal = formik.values.igst_amount || 0;
    let totalAmount = subtotal + cgstTotal + sgstTotal + igstTotal + shippingCharges;

    // If Apply Tax checkbox is checked, calculate tax on shipping charges
    if (applyTax && selectedGSTRate > 0) {
      const taxOnShipping = (shippingCharges * selectedGSTRate) / 100;
      totalAmount += taxOnShipping;
      formik.setFieldValue('shipping_tax', taxOnShipping); // Store the calculated shipping tax
    }
    formik.setFieldValue('shipping_amount_with_tax', totalAmount);

    formik.setFieldValue('total', totalAmount); // Update the total amount
  };
  const handleApplyTaxChange = (e) => {
    setApplyTax(e.target.checked); // Update the state for Apply Tax checkbox
    if (!e.target.checked) {
      formik.setFieldValue('shipping_tax', 0); // If tax is not applied, reset shipping tax
      setSelectedGSTRate(0);
      formik.setFieldValue(
        'total',
        formik.values.subtotal_amount +
          formik.values.cgst_amount +
          formik.values.sgst_amount +
          formik.values.igst_amount +
          formik.values.shipping_amount
      ); // Recalculate total without tax
    }
  };

  const handleGSTRateChange = (e) => {
    const gstRate = e.target.value; // Get the newly selected GST rate
    setSelectedGSTRate(gstRate); // Update the selected GST rate in state

    let shippingCharges = formik.values.shipping_amount;
    const subtotal = formik.values.subtotal_amount || 0;
    const cgstTotal = formik.values.cgst_amount || 0;
    const sgstTotal = formik.values.sgst_amount || 0;
    const igstTotal = formik.values.igst_amount || 0;

    if (applyTax) {
      // If tax is applied, calculate tax on shipping charges
      const taxOnShipping = (shippingCharges * gstRate) / 100;
      formik.setFieldValue('shipping_tax', taxOnShipping);

      // Calculate total shipping with tax
      const totalShippingWithTax = shippingCharges + taxOnShipping;

      formik.setFieldValue('shipping_amount_with_tax', totalShippingWithTax);

      // Recalculate the total amount after adding the shipping tax
      const totalAmount = subtotal + cgstTotal + sgstTotal + igstTotal + totalShippingWithTax;
      formik.setFieldValue('total', totalAmount);
    } else {
      // If tax is not applied, set shipping amount without tax
      formik.setFieldValue('shipping_amount_with_tax', shippingCharges);

      // Recalculate the total amount without shipping tax
      const totalAmount = subtotal + cgstTotal + sgstTotal + igstTotal + shippingCharges;
      formik.setFieldValue('total', totalAmount);
    }
  };

  const validationSchema = Yup.object({
    customer: Yup.string().required('Customer name is required'),
    terms: Yup.string().required('Terms are required'),
    // financial_year: Yup.string().required('Financial year is required'),
    invoice_number: Yup.string().required('Invoice number is required'),
    invoice_date: Yup.date().required('Invoice date is required'),
    place_of_supply: Yup.string().required('Place of supply is required'),
    due_date: Yup.date().required('Due date is required'),
    order_number: Yup.string().required('Order number is required'),
    sales_person: Yup.string().required('Sales Person is required')

    // billing_address: Yup.object({
    //   address_line1: Yup.string().required('Billing address is required'),
    //   country: Yup.string().required('Billing country is required'),
    //   state: Yup.string().required('Billing state is required'),
    //   postal_code: Yup.string().required('Billing postal_code is required')
    // }),
    // shipping_address: Yup.object({
    //   address_line1: Yup.string().required('Shipping address is required'),
    //   country: Yup.string().required('Shipping country is required'),
    //   state: Yup.string().required('Shipping state is required'),
    //   postal_code: Yup.string().required('Shipping postal_code is required')
    // })
  });
  const formik = useFormik({
    initialValues: {
      customer: '',
      terms: '',
      invoice_number: '',
      invoice_date: '',
      place_of_supply: '',
      due_date: '',
      sales_person: '',
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
      item_details: [{ item: '', quantity: 1, rate: 0, discount: 0, amount: 0, tax: 0, taxamount: 0, total_amount: 0 }],
      amount_invoiced: 0,
      cgst_amount: 0,
      sgst_amount: 0,
      igst_amount: 0,
      notes: '',
      pending_amount: 0,
      shipping_amount: 0,
      subtotal_amount: 0,
      terms_and_conditions: '',
      total: 0
    },
    validationSchema,
    onSubmit: async (values) => {
      const postData = { ...values };
      postData.invoicing_profile = businessDetailsData.id;
      postData.financial_year = '';
      console.log(postData);
      // let url = '/invoicing/invoice-create';
      // const { res } = await Factory('post', url, postData);
      // if (res.status_cd === 0) {
      //   getInvoicesList();
      //   onClose();
      // }
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
              formik.setFieldValue('customer', newValue);
              formik.setFieldValue('place_of_supply', selectedCustomer.state);
              formik.setFieldValue('billing_address.address_line1', selectedCustomer.address_line1);
              formik.setFieldValue('billing_address.state', selectedCustomer.state);
              formik.setFieldValue('billing_address.country', selectedCustomer.country);
              formik.setFieldValue('billing_address.postal_code', selectedCustomer.postal_code);
            }
            if (item.name === 'place_of_supply') {
              // Recalculate taxes and totals when place_of_supply changes
              const newPlaceOfSupply = newValue;
              const newItemDetails = [...formik.values.item_details];

              // Recalculate subtotal, CGST, SGST, and IGST totals
              let totalCGST = 0;
              let totalSGST = 0;
              let totalIGST = 0;

              const subtotal = newItemDetails.reduce((acc, item) => {
                const { quantity, rate, discount, tax } = item;

                // Recalculate amount for each item
                let itemAmount = quantity * rate * (1 - discount / 100);
                item.amount = itemAmount;

                // Recalculate tax amount for each item
                const taxAmount = (itemAmount * tax) / 100;
                item.taxamount = taxAmount;

                // Recalculate total amount for each item (amount + tax)
                const totalAmount = itemAmount + taxAmount;
                item.total_amount = totalAmount;

                // Accumulate CGST, SGST, and IGST based on place of supply
                if (newPlaceOfSupply === businessDetailsData.state) {
                  // Intra-state supply
                  totalCGST += taxAmount / 2;
                  totalSGST += taxAmount / 2;
                } else {
                  // Inter-state supply
                  totalIGST += taxAmount;
                }

                // Accumulate subtotal
                acc += itemAmount;
                return acc;
              }, 0);

              // Recalculate total amount for all items
              const totalAmountAllItems = newItemDetails.reduce((acc, item) => acc + item.total_amount, 0);

              // Update Formik fields
              formik.setFieldValue('item_details', newItemDetails); // Update item details
              formik.setFieldValue('subtotal_amount', subtotal); // Update subtotal
              formik.setFieldValue('total_amount', totalAmountAllItems); // Update total amount
              formik.setFieldValue('cgst_amount', totalCGST); // Update CGST total
              formik.setFieldValue('sgst_amount', totalSGST); // Update SGST total
              formik.setFieldValue('igst_amount', totalIGST); // Update IGST total
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
    const newItem = { item: '', quantity: 1, rate: 0, discount: 0, amount: 0, tax: 0, taxamount: 0, total_amount: 0 };
    formik.setFieldValue('item_details', [...formik.values.item_details, newItem]);
  };

  // Handle Quantity Blur: Recalculate amount, tax and total when quantity changes
  const handleQuantityBlur = (index, value) => {
    const newQuantity = Number(value) || 0; // Default to 0 if the input is invalid
    const newItemDetails = [...formik.values.item_details];

    // Update quantity in item details
    newItemDetails[index].quantity = newQuantity;

    const rate = Number(newItemDetails[index].rate) || 0;
    const discount = Number(newItemDetails[index].discount) || 0;

    // Recalculate amount for the item
    let amount = newQuantity * rate * (1 - discount / 100);
    newItemDetails[index].amount = amount;

    // Recalculate tax amount based on the amount and tax rate
    const taxRate = Number(newItemDetails[index].tax) || 0;
    const taxAmount = (amount * taxRate) / 100;
    newItemDetails[index].taxamount = taxAmount;

    // Recalculate total amount for the item (amount + tax)
    const totalAmount = amount + taxAmount;
    newItemDetails[index].total_amount = totalAmount;

    // Recalculate subtotal for the entire invoice (sum of all item amounts before tax)
    const subtotal = newItemDetails.reduce((acc, item) => acc + item.amount, 0);

    // Recalculate total amount for the entire invoice (sum of all item totals after tax)
    const totalAmountAllItems = newItemDetails.reduce((acc, item) => acc + item.total_amount, 0);

    // Recalculate CGST, SGST, IGST totals
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;

    newItemDetails.forEach((item) => {
      const itemTaxAmount = (item.amount * item.tax) / 100;

      if (formik.values.place_of_supply === businessDetailsData.state) {
        // Intra-state supply: Split GST into CGST and SGST
        totalCGST += itemTaxAmount / 2;
        totalSGST += itemTaxAmount / 2;
      } else {
        // Inter-state supply: Apply IGST
        totalIGST += itemTaxAmount;
      }
    });

    // Update Formik fields with new values
    formik.setFieldValue('item_details', newItemDetails); // Update item details
    formik.setFieldValue('subtotal_amount', subtotal); // Update subtotal
    formik.setFieldValue('total', totalAmountAllItems); // Update total amount after tax
    formik.setFieldValue('cgst_amount', totalCGST); // Update CGST total
    formik.setFieldValue('sgst_amount', totalSGST); // Update SGST total
    formik.setFieldValue('igst_amount', totalIGST); // Update IGST total
  };

  // Handle Discount Change: Recalculate amount, tax and total when discount changes
  const handleDiscountChange = (index, value) => {
    const newDiscount = Number(value) || 0; // If the input is invalid, default to 0
    const newItemDetails = [...formik.values.item_details];

    // Update discount in item details
    newItemDetails[index].discount = newDiscount;

    const quantity = Number(newItemDetails[index].quantity) || 0;
    const rate = Number(newItemDetails[index].rate) || 0;
    const taxRate = Number(newItemDetails[index].tax) || 0;

    // Recalculate amount for the item
    let amount = quantity * rate;
    amount *= 1 - newDiscount / 100; // Apply percentage discount
    newItemDetails[index].amount = amount;

    // Recalculate tax amount for the item
    const taxAmount = (amount * taxRate) / 100;
    newItemDetails[index].taxamount = taxAmount;

    // Recalculate total amount for the item (amount + tax)
    const totalAmount = amount + taxAmount;
    newItemDetails[index].total_amount = totalAmount;

    // Recalculate subtotal for the entire invoice (sum of all item amounts before tax)
    const subtotal = newItemDetails.reduce((acc, item) => acc + item.amount, 0);

    // Recalculate total amount for the entire invoice (sum of all item totals after tax)
    const totalAmountAllItems = newItemDetails.reduce((acc, item) => acc + item.total_amount, 0);

    // Recalculate CGST, SGST, IGST totals
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;

    newItemDetails.forEach((item) => {
      const itemTaxAmount = (item.amount * item.tax) / 100;

      if (formik.values.place_of_supply === businessDetailsData.state) {
        // Intra-state supply: Split GST into CGST and SGST
        totalCGST += itemTaxAmount / 2;
        totalSGST += itemTaxAmount / 2;
      } else {
        // Inter-state supply: Apply IGST
        totalIGST += itemTaxAmount;
      }
    });

    // Update Formik fields with new values
    formik.setFieldValue('item_details', newItemDetails); // Update item details
    formik.setFieldValue('subtotal_amount', subtotal); // Update subtotal
    formik.setFieldValue('total', totalAmountAllItems); // Update total amount after tax
    formik.setFieldValue('cgst_amount', totalCGST); // Update CGST total
    formik.setFieldValue('sgst_amount', totalSGST); // Update SGST total
    formik.setFieldValue('igst_amount', totalIGST); // Update IGST total
  };

  const handleItemChange = (index, newValue) => {
    const newItemDetails = [...formik.values.item_details];

    // Fetch the selected item from the items list
    const selectedItem = itemsList.find((i) => i.name === newValue) || {};
    const gstRate = selectedItem.gst_rate ? parseFloat(selectedItem.gst_rate) : 0;
    const rate = selectedItem.selling_price || 0; // Get rate from selected item
    const discount = newItemDetails[index].discount || 0; // Get discount (default to 0)
    const quantity = newItemDetails[index].quantity || 0; // Get quantity (default to 0)

    // Calculate taxable amount (rate * quantity)
    const taxableAmount = rate * quantity;

    // Calculate amount after discount
    let amount = taxableAmount * (1 - discount / 100);

    // Calculate tax amount based on the taxable amount and GST rate
    const taxAmount = (amount * gstRate) / 100;

    // Total amount (amount after discount + tax amount)
    const totalAmount = amount + taxAmount;

    // Update the current item's details
    newItemDetails[index] = {
      ...newItemDetails[index],
      item: newValue,
      unitPrice: rate,
      hsn_sac: selectedItem.hsn_sac, // Set HSN code
      rate: rate,
      tax: gstRate,
      amount: amount,
      taxamount: taxAmount,
      total_amount: totalAmount
    };

    // Initialize CGST, SGST, IGST amounts
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;

    // Iterate over all items to calculate total taxes
    newItemDetails.forEach((item) => {
      const itemTaxAmount = (item.amount * item.tax) / 100;

      if (formik.values.place_of_supply === businessDetailsData.state) {
        // Intra-state supply: Split GST into CGST and SGST
        totalCGST += itemTaxAmount / 2;
        totalSGST += itemTaxAmount / 2;
      } else {
        // Inter-state supply: Apply IGST
        totalIGST += itemTaxAmount;
      }
    });
    const totalAmountAllItems = newItemDetails.reduce((acc, item) => acc + item.total_amount, 0);

    // Recalculate the subtotal (sum of all item amounts before tax)
    const subtotal = newItemDetails.reduce((acc, item) => acc + item.amount, 0);

    // Update Formik fields with new values
    formik.setFieldValue('item_details', newItemDetails); // Update item details
    formik.setFieldValue('subtotal_amount', subtotal); // Update subtotal
    formik.setFieldValue('total', totalAmountAllItems); // Update subtotal
    formik.setFieldValue('cgst_amount', totalCGST); // Update total CGST
    formik.setFieldValue('sgst_amount', totalSGST); // Update total SGST
    formik.setFieldValue('igst_amount', totalIGST); // Update total IGST
  };

  useEffect(() => {
    if (open) {
      get_Goods_and_Services_Data();
    }
  }, [open, businessDetailsData]);
  useEffect(() => {
    if (businessDetailsData) {
      console.log(businessDetailsData);
      const { prefix, startingNumber, suffix } = businessDetailsData.invoice_format || {};
      const generatedInvoiceNumber = `${prefix}-${startingNumber}-${suffix}`;
      const currentInvoiceDate = dayjs().format('YYYY-MM-DD');

      formik.setFieldValue('invoice_number', generatedInvoiceNumber);
      formik.setFieldValue('invoice_date', currentInvoiceDate); // Set the current date or other logic if needed
    }
  }, [open]);
  const { values, setValues, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;
  // console.log(values);

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
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>Tax %</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>Tax Amount</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>Total Amount</TableCell>
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
                            onChange={(event, newValue) => handleItemChange(index, newValue)}
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

                        <TableCell>{item.rate}</TableCell>

                        {/* <TableCell>
                          <CustomAutocomplete
                            options={['%', '₹']}
                            value={item.discount_type || ''} // Ensure the value is never undefined or null
                            onChange={(event, newValue) => {
                              handleDiscountChange(index, item.discount, newValue); // Handle discount change based on newValue
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </TableCell> */}

                        <TableCell sx={{ dispaly: 'flex' }}>
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

              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleAddItemRow}>
                  Add New Row
                </Button>
                {/* <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={() => setBulkItemsDialogue(true)}>
                  Add Items in Bulk
                </Button> */}
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Shipping Charges */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
                      Shipping Charges:
                    </Typography>
                    <CustomInput
                      multiline
                      name="shipping_amount"
                      value={formik.values.shipping_amount}
                      onChange={handleShippingAmountChange}
                      sx={{ mt: -1, ml: 2 }}
                    />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {formik.values.shipping_amount}
                    </Typography>
                  </Box>

                  {/* Apply Tax on Shipping Charges */}
                  <FormControlLabel
                    control={<Checkbox checked={applyTax} onChange={handleApplyTaxChange} name="apply_tax_on_shipping" />}
                    label="Apply Tax on Shipping Charge"
                  />

                  {/* Show GST Dropdown if Apply Tax is selected */}
                  {applyTax && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <InputLabel>GST Rate</InputLabel>
                      <Select value={selectedGSTRate} onChange={handleGSTRateChange} sx={{ minWidth: 120 }}>
                        {gstRates.map((rate) => (
                          <MenuItem key={rate} value={rate}>
                            {rate}%
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  )}

                  {/* Shipping Amount with Tax */}
                  {applyTax && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Shipping Amount (With Tax): {formik.values.shipping_amount_with_tax}
                    </Typography>
                  )}
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
                    {formik.values.total}
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
      <BulkItems bulkItemsDialogue={bulkItemsDialogue} setBulkItemsDialogue={setBulkItemsDialogue} itemsList={itemsList} />
    </Dialog>
  );
};

export default AddItem;
