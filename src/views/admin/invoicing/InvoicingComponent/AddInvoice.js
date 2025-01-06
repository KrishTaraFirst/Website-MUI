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
import { IconTrash } from '@tabler/icons-react';

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
  InputLabel,
  Autocomplete,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import CustomDatePicker from '@/utils/CustomDateInput';
import Factory from '@/utils/Factory';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import BulkItems from './BulkItems';
import { useSnackbar } from '@/components/CustomSnackbar';

const AddItem = ({ getInvoicesList, invoicesList, type, selectedInvoice, businessDetailsData, customers, open, onClose }) => {
  const [addInvoiceData] = useState({
    invoice_data: [
      { name: 'customer', label: 'Customer Name' },
      { name: 'place_of_supply', label: 'Place of Supply' },
      { name: 'invoice_number', label: 'Invoice Number' },
      { name: 'invoice_date', label: 'Invoice Date' },
      { name: 'terms', label: 'Terms' },
      // { name: 'financial_year', label: 'Financial Year' },
      { name: 'due_date', label: 'Due Date' },
      { name: 'order_number', label: 'Order Number' },
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
  const { showSnackbar } = useSnackbar();

  const [itemsList, setItemsList] = useState([]);
  const [bulkItemsDialogue, setBulkItemsDialogue] = useState(false); // State for Apply Tax checkbox
  const [invoice_number_format, set_Invoice_number_format] = useState('');
  let termsDropdown = ['NET 15', 'NET 30', 'NET 45', 'NET 60', 'Due end of the MONTH', 'Due end of next MONTH', 'Due on Receipt', 'Custom'];

  const gstRates = [0, 5, 12, 18, 28]; // Example GST rates

  const handleShippingAmountChange = (e) => {
    const shippingCharges = parseFloat(e.target.value) || 0; // Ensure value is a number (default to 0 if invalid)
    formik.setFieldValue('shipping_amount', shippingCharges);

    // If Apply Tax checkbox is checked, calculate tax on shipping charges
    const taxOnShipping = (shippingCharges * formik.values.selected_gst_rate) / 100;
    let totalAmount = shippingCharges;

    if (formik.values.applied_tax && formik.values.selected_gst_rate > 0) {
      totalAmount += taxOnShipping;
      formik.setFieldValue('shipping_tax', taxOnShipping); // Store the calculated shipping tax
    }
    formik.setFieldValue('shipping_amount_with_tax', shippingCharges + taxOnShipping);
  };
  const handleApplyTaxChange = (e) => {
    setFieldValue('applied_tax', e.target.checked);
    if (!e.target.checked) {
      formik.setFieldValue('shipping_tax', 0); // If tax is not applied, reset shipping tax
      setFieldValue('selected_gst_rate', 0);
    }
  };

  const handleGSTRateChange = (e) => {
    const gstRate = e.target.value; // Get the newly selected GST rate
    setFieldValue('selected_gst_rate', gstRate);
    // Update the selected GST rate in state
    let shippingCharges = formik.values.shipping_amount;

    if (formik.values.applied_tax) {
      // If tax is applied, calculate tax on shipping charges
      const taxOnShipping = (shippingCharges * gstRate) / 100;
      formik.setFieldValue('shipping_tax', taxOnShipping);
      // Calculate total_amount shipping with tax
      const totalShippingWithTax = shippingCharges + taxOnShipping;
      formik.setFieldValue('shipping_amount_with_tax', totalShippingWithTax);
    } else {
      // If tax is not applied, set shipping amount without tax
      formik.setFieldValue('shipping_amount_with_tax', shippingCharges);
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

  const fillFieldValues = () => {
    return {
      customer: '',
      place_of_supply: '',
      invoice_number: invoice_number_format,
      invoice_date: dayjs().format('YYYY-MM-DD'),
      terms: 'Due on Receipt',
      due_date: dayjs().format('YYYY-MM-DD'),
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
      item_details: [
        // {
        //   item: '',
        //   quantity: 1,
        //   rate: 0,
        //   discount_type: '%',
        //   discount: 0,
        //   amount: 0,
        //   tax: 0,
        //   taxamount: 0,
        //   total_amount: 0,
        //   cgst_amount: 0,
        //   sgst_amount: 0,
        //   igst_amount: 0
        // }
      ],
      amount_invoiced: 0,

      total_sgst_amount: 0,
      total_igst_amount: 0,
      notes: 'anand',
      pending_amount: 0,
      shipping_amount: 0,
      subtotal_amount: 0,
      terms_and_conditions: '',
      total_amount: 0,
      shipping_amount_with_tax: 0,
      applied_tax: false,
      same_address: false,
      selected_gst_rate: 0,
      not_applicablefor_shipping: false,
      shipping_tax: 0
    };
  };
  console.log(type);
  const formik = useFormik({
    initialValues: type === 'edit' ? { notes: 'krishna' } : fillFieldValues(),
    validationSchema,
    onSubmit: async (values) => {
      const postData = { ...values };
      postData.invoicing_profile = businessDetailsData.id;
      postData.financial_year = '2024-25';
      let url = '/invoicing/invoice-create';
      const { res } = await Factory('post', url, postData);
      if (res.status_cd === 0) {
        getInvoicesList();
        onClose();
        resetForm();
        showSnackbar('Data Added Successfully', 'success');
      }
    }
  });
  const sameAddressFunction = (e) => {
    setFieldValue('same_address', e.target.checked);
    if (e.target.checked === true) {
      setFieldValue('not_applicablefor_shipping', false);

      formik.setFieldValue('shipping_address.address_line1', values.billing_address.address_line1);
      formik.setFieldValue('shipping_address.state', values.billing_address.state);
      formik.setFieldValue('shipping_address.country', values.billing_address.country);
      formik.setFieldValue('shipping_address.postal_code', values.billing_address.postal_code);
    } else {
      formik.setFieldValue('shipping_address.address_line1', '');
      formik.setFieldValue('shipping_address.state', '');
      formik.setFieldValue('shipping_address.postal_code', '');
    }
  };
  const notApplicablefor_shippingFunction = (e) => {
    setFieldValue('not_applicablefor_shipping', e.target.checked);

    if (e.target.checked === true) {
      setFieldValue('same_address', false);
      formik.setFieldValue('shipping_address.address_line1', 'NA');
      formik.setFieldValue('shipping_address.state', 'NA');
      formik.setFieldValue('shipping_address.country', 'NA');
      formik.setFieldValue('shipping_address.postal_code', 'NA');
    }
  };
  const get_Goods_and_Services_Data = async () => {
    let url = `/invoicing/goods-services/${businessDetailsData.id}`;
    const { res } = await Factory('get', url, {});

    if (res.status_cd === 0) {
      setItemsList(res.data.goods_and_services);
    }
  };
  const getinvoice_format = async () => {
    let url = `/invoicing/latest/${businessDetailsData.id}/`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      set_Invoice_number_format(res.data.latest_invoice_number);
      formik.setFieldValue('invoice_number', res.data.latest_invoice_number);
    }
  };

  const renderField = (item) => {
    const fieldName = `${item.name}`;
    if (item.name === 'place_of_supply' || item.name === 'state' || item.name === 'customer' || item.name === 'terms') {
      return (
        <CustomAutocomplete
          value={formik.values[fieldName] || null}
          onChange={(event, newValue) => {
            if (newValue === null) return;

            if (item.name === 'customer') {
              setValues({
                ...values,
                invoice_date: dayjs().format('YYYY-MM-DD'),
                terms: 'Due on Receipt',
                due_date: dayjs().format('YYYY-MM-DD'),
                sales_person: '',
                order_number: '',
                item_details: [
                  // {
                  //   item: '',
                  //   quantity: 1,
                  //   rate: 0,
                  //   discount_type: '%',
                  //   discount: 0,
                  //   amount: 0,
                  //   tax: 0,
                  //   taxamount: 0,
                  //   total_amount: 0,
                  //   cgst_amount: 0,
                  //   sgst_amount: 0,
                  //   igst_amount: 0
                  // }
                ],
                amount_invoiced: 0,
                total_cgst_amount: 0,
                total_sgst_amount: 0,
                total_igst_amount: 0,
                notes: '',
                pending_amount: 0,
                shipping_amount: 0,
                subtotal_amount: 0,
                terms_and_conditions: '',
                total_amount: 0,
                shipping_amount_with_tax: 0
              });
              const selectedCustomer = customers?.find((customer) => customer.name === newValue);
              formik.setFieldValue('customer', newValue);
              formik.setFieldValue('place_of_supply', selectedCustomer.state);

              if (formik.values.same_address) {
                formik.setFieldValue('shipping_address.address_line1', selectedCustomer.address_line1);
                formik.setFieldValue('shipping_address.state', selectedCustomer.state);
                formik.setFieldValue('shipping_address.country', selectedCustomer.country);
                formik.setFieldValue('shipping_address.postal_code', selectedCustomer.postal_code);

                formik.setFieldValue('billing_address.address_line1', selectedCustomer.address_line1);
                formik.setFieldValue('billing_address.state', selectedCustomer.state);
                formik.setFieldValue('billing_address.country', selectedCustomer.country);
                formik.setFieldValue('billing_address.postal_code', selectedCustomer.postal_code);
              } else {
                formik.setFieldValue('billing_address.address_line1', selectedCustomer.address_line1);
                formik.setFieldValue('billing_address.state', selectedCustomer.state);
                formik.setFieldValue('billing_address.country', selectedCustomer.country);
                formik.setFieldValue('billing_address.postal_code', selectedCustomer.postal_code);
              }
            }
            if (item.name === 'place_of_supply') {
              formik.setFieldValue('place_of_supply', newValue); // Update item details
            }
            if (item.name === 'terms') {
              // Calculate due_date based on selected terms
              let newDueDate = null;

              switch (newValue) {
                case 'NET 15':
                  newDueDate = dayjs(formik.values.invoice_date).add(15, 'days');
                  break;
                case 'NET 30':
                  newDueDate = dayjs(formik.values.invoice_date).add(30, 'days');
                  break;
                case 'NET 45':
                  newDueDate = dayjs(formik.values.invoice_date).add(45, 'days');
                  break;
                case 'NET 60':
                  newDueDate = dayjs(formik.values.invoice_date).add(60, 'days');
                  break;
                case 'Due end of the MONTH':
                  newDueDate = dayjs(formik.values.invoice_date).endOf('month');
                  break;
                case 'Due end of next MONTH':
                  newDueDate = dayjs(formik.values.invoice_date).add(1, 'month').endOf('month');
                  break;
                case 'Due on Receipt': // Added case for "Due on Receipt"
                  newDueDate = dayjs(formik.values.invoice_date); // Set due date as the invoice date
                  break;
                default:
                  break;
              }

              formik.setFieldValue('due_date', newDueDate ? newDueDate.format('YYYY-MM-DD') : '');
            }
            formik.setFieldValue(fieldName, newValue);
          }}
          options={
            item.name === 'customer'
              ? customers?.map((customer) => customer.name)
              : item.name === 'terms'
                ? termsDropdown
                : indian_States_And_UTs
          }
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
          helperText={formik.touched[fieldName] && formik.errors[fieldName]}
          name={fieldName}
        />
      );
    } else if (item.name === 'invoice_date' || item.name === 'due_date') {
      const dateValue = item.name === 'invoice_date' ? formik.values.invoice_date : formik.values.due_date;

      return (
        <CustomDatePicker
          views={['year', 'month', 'day']}
          value={dateValue ? dayjs(dateValue) : null} // If empty, it should be null
          onChange={(newDate) => {
            const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
            if (item.name === 'invoice_date') {
              formik.setFieldValue(fieldName, formattedDate); // Set invoice date in Formik
            } else if (item.name === 'due_date') {
              formik.setFieldValue('due_date', formattedDate); // Set due date in formik
              // If the user manually selects a due date, set terms to "custom"
              if (formik.values.terms !== 'Custom') {
                formik.setFieldValue('terms', 'Custom'); // Set terms to 'custom' if a manual due date is selected
              }
            }
          }}
          minDate={dayjs()}
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              fontSize: '0.75rem',
              height: '40px'
            }
          }}
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])} // Show error if field touched and has error
          helperText={formik.touched[fieldName] && formik.errors[fieldName]} // Display error message if field touched
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
    const newItemDetails = [
      ...formik.values.item_details,
      {
        item: '',
        quantity: 1,
        rate: 0,
        discount_type: '%',
        discount: 0,
        amount: 0,
        tax: 0,
        taxamount: 0,
        total_amount: 0,
        cgst_amount: 0,
        sgst_amount: 0,
        igst_amount: 0
      }
    ];

    // Update Formik state with new item details
    formik.setFieldValue('item_details', newItemDetails);
  };

  const recalculateTotals = () => {
    let subtotalAmount = 0;
    let totalCGSTAmount = 0;
    let totalSGSTAmount = 0;
    let totalIGSTAmount = 0;
    let totalAmount = 0;

    formik.values.item_details.forEach((item) => {
      // Ensure all values are numbers before performing calculations
      const rate = Number(item.rate) || 0; // Default to 0 if invalid
      const quantity = Number(item.quantity) || 0; // Default to 0 if invalid
      const discount = Number(item.discount) || 0; // Default to 0 if invalid
      const tax = Number(item.tax) || 0; // Default to 0 if invalid
      const discountType = item.discount_type || ''; // Empty string if invalid

      // Calculate taxable amount: rate * quantity
      const taxableAmount = rate * quantity;

      // Calculate discount based on discount type
      let discountAmount = 0;
      if (discountType === '%') {
        discountAmount = (taxableAmount * discount) / 100;
      } else if (discountType === '₹') {
        discountAmount = discount;
      }

      // Calculate amount after discount
      const amountAfterDiscount = taxableAmount - discountAmount;

      // Calculate tax amount based on the GST rate (assuming GST rate is available on the item)
      const taxAmount = (amountAfterDiscount * tax) / 100;

      // Update item details with recalculated values
      item.amount = amountAfterDiscount;
      item.taxamount = taxAmount;
      item.total_amount = amountAfterDiscount + taxAmount;

      // Update CGST, SGST, IGST amounts based on place of supply logic
      if (values.place_of_supply === businessDetailsData.state) {
        // If place of supply is same, CGST and SGST
        item.cgst_amount = taxAmount / 2;
        item.sgst_amount = taxAmount / 2;
        item.igst_amount = 0;
        totalCGSTAmount += item.cgst_amount;
        totalSGSTAmount += item.sgst_amount;
      } else {
        // If place of supply is different, IGST
        item.cgst_amount = 0;
        item.sgst_amount = 0;
        item.igst_amount = taxAmount;
        totalIGSTAmount += item.igst_amount;
      }

      // Add to the overall totals
      subtotalAmount += amountAfterDiscount;
      totalAmount += item.total_amount;
    });
    // Update the Formik state with the calculated totals
    formik.setFieldValue('amount_invoiced', totalAmount);
    formik.setFieldValue('total_cgst_amount', totalCGSTAmount);
    formik.setFieldValue('total_sgst_amount', totalSGSTAmount);
    formik.setFieldValue('total_igst_amount', totalIGSTAmount);
    formik.setFieldValue('subtotal_amount', subtotalAmount);
    formik.setFieldValue('total_amount', totalAmount + (formik.values.shipping_amount_with_tax || 0)); // Include shipping if applicable
  };

  const handleDiscountTypeChange = (index, newDiscountType) => {
    const newItemDetails = [...formik.values.item_details];
    newItemDetails[index].discount_type = newDiscountType;

    formik.setFieldValue('item_details', newItemDetails);
    recalculateTotals();
  };

  const handleQuantityChange = (index, value) => {
    const newQuantity = Number(value) || 0;
    const newItemDetails = [...formik.values.item_details];
    newItemDetails[index].quantity = newQuantity;

    formik.setFieldValue('item_details', newItemDetails);
    recalculateTotals();
  };
  const handleRateChange = (index, value) => {
    const newRate = Number(value) || 0;
    const newItemDetails = [...formik.values.item_details];
    newItemDetails[index].rate = newRate;

    // formik.setFieldValue('item_details', newItemDetails);
    recalculateTotals();
  };
  const handleDiscountChange = (index, value) => {
    const newDiscount = Number(value) || 0;
    const newItemDetails = [...formik.values.item_details];
    newItemDetails[index].discount = newDiscount;

    formik.setFieldValue('item_details', newItemDetails);
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

    // Update Formik fields with new values
    formik.setFieldValue('item_details', newItemDetails); // Set the updated item details
  };
  useEffect(() => {
    recalculateTotals();
  }, [
    formik.values.item_details,
    formik.values.shipping_amount,
    formik.values.shipping_amount_with_tax,
    formik.values.applied_tax,
    formik.values.selected_gst_rate,
    formik.values.place_of_supply
  ]);
  useEffect(() => {
    if (open) {
      get_Goods_and_Services_Data();
      getinvoice_format();
    }
  }, [open, businessDetailsData]);
  useEffect(() => {
    if (businessDetailsData) {
      // const { prefix, startingNumber, suffix } = businessDetailsData.invoice_format || {};
      // const generatedInvoiceNumber = `${prefix}-${startingNumber}-${suffix}`;
      // const currentInvoiceDate = dayjs().format('YYYY-MM-DD');
      // formik.setFieldValue('invoice_number', generatedInvoiceNumber);
      // formik.setFieldValue('invoice_date', currentInvoiceDate); // Set the current date or other logic if needed
    }
  }, [open]);

  const bulkItemSave = (data) => {
    formik.setFieldValue('item_details', [...formik.values.item_details, ...data]);
    recalculateTotals();
  };
  const handleDeleteItem = (index) => {
    let newItemDetails = [...formik.values.item_details];

    newItemDetails.splice(index, 1);

    formik.setFieldValue('item_details', newItemDetails);
  };

  useEffect(() => {
    console.log(type);
    if (type === 'edit' && selectedInvoice) {
      formik.setValues({
        ...selectedInvoice,
        invoice_date: selectedInvoice.invoice_date,
        due_date: selectedInvoice.due_date,
        billing_address: {
          ...selectedInvoice.billing_address
        },
        shipping_address: {
          ...selectedInvoice.shipping_address
        },
        item_details: [...selectedInvoice.item_details],
        same_address: false,
        not_applicablefor_shipping: false
      });
    }
  }, [type, selectedInvoice]);

  const { values, setValues, errors, touched, handleSubmit, handleBlur, setFieldValue, resetForm } = formik;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="lg">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Add Invoice
          </DialogTitle>
          <IconButton
            variant="outlined"
            color="secondary"
            aria-label="close"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
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
                <Grid item xs={12} sm={6} key={item.name}>
                  <div style={{ paddingBottom: '5px' }}>
                    <label>{item.label}</label>
                  </div>
                  {renderField(item)}
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={4} sx={{ mt: 3 }}>
              {/* Billing Section */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Billing Information
                  </Typography>
                </Box>
                <Grid container spacing={2} sx={{ mt: 2 }}>
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
                <Box sx={{ mb: 2, mt: 2, display: 'flex', gap: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Shipping Information
                  </Typography>
                  <Box sx={{ mt: -1 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formik.values.same_address} onChange={sameAddressFunction} name="same_address" />}
                      label="Same as Billing Address"
                    />
                  </Box>
                  <Box sx={{ mt: -1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.not_applicablefor_shipping}
                          onChange={notApplicablefor_shippingFunction}
                          name="not_applicablefor_shipping"
                        />
                      }
                      label="Not applicable for Shipping"
                    />
                  </Box>
                </Box>
                <Grid container spacing={2} sx={{ mt: -1 }}>
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
            <Grid item xs={12} md={6}>
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
                        <TableCell>Discount type</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>Tax %</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>Tax Amount</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>Total Amount</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>Action</TableCell>
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
                              onChange={(e) => handleQuantityChange(index, e.target.value)}
                            />
                          </TableCell>

                          <TableCell>
                            <CustomInput
                              name={`item_details[${index}].rate`}
                              value={item.rate}
                              onChange={(e) => handleRateChange(index, e.target.value)}
                            />
                          </TableCell>

                          <TableCell>
                            <CustomAutocomplete
                              options={['%', '₹']}
                              value={item.discount_type || ''}
                              onChange={(event, newDiscountType) => handleDiscountTypeChange(index, newDiscountType)}
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

                          <TableCell>{item.amount.toFixed(2)}</TableCell>

                          <TableCell>{item.tax}</TableCell>

                          <TableCell>{item.taxamount.toFixed(2)}</TableCell>

                          <TableCell>{item.total_amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <ListItemButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteItem(index)}>
                              {' '}
                              {/* Example red color */}
                              <ListItemIcon>
                                <IconTrash size={16} style={{ color: '#d32f2f' }} /> {/* Apply color with inline style */}
                              </ListItemIcon>
                            </ListItemButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleAddItemRow}>
                    Add New Row
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<IconPlus size={16} />}
                    onClick={() => {
                      setBulkItemsDialogue(true);
                    }}
                  >
                    Add Items in Bulk
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Customer Notes
                  </Typography>
                  <CustomInput
                    multiline
                    rows={4}
                    maxRows={6}
                    name="notes" // Assuming 'notes' is the key in your initialValues
                    value={formik.values.notes}
                    onChange={(e) => formik.setFieldValue('notes', e.target.value)}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Terms & Conditions
                  </Typography>
                  <CustomInput
                    multiline
                    rows={4}
                    maxRows={6}
                    name="terms_and_conditions" // Assuming 'terms_and_conditions' is the key in your initialValues
                    value={formik.values.terms_and_conditions}
                    onChange={(e) => formik.setFieldValue('terms_and_conditions', e.target.value)}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Sub Total:</Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {formik.values.subtotal_amount.toFixed(2)}
                  </Typography>{' '}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                      {formik.values.shipping_amount.toFixed(2)}
                    </Typography>
                  </Box>

                  <FormControlLabel
                    control={<Checkbox checked={formik.values.applied_tax} onChange={handleApplyTaxChange} name="apply_tax_on_shipping" />}
                    label="Apply Tax on Shipping Charge"
                  />

                  {formik.values.applied_tax && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <InputLabel>GST Rate</InputLabel>
                      <Select value={formik.values.selected_gst_rate} onChange={handleGSTRateChange} sx={{ minWidth: 120 }}>
                        {gstRates.map((rate) => (
                          <MenuItem key={rate} value={rate}>
                            {rate}%
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  )}

                  {formik.values.applied_tax && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Shipping Amount (With Tax): {formik.values.shipping_amount_with_tax.toFixed(2)}
                    </Typography>
                  )}
                </Box>

                {formik.values.total_cgst_amount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">CGST:</Typography>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {formik.values.total_cgst_amount.toFixed(2)}
                    </Typography>{' '}
                  </Box>
                )}

                {formik.values.total_sgst_amount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">SGST:</Typography>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {formik.values.total_sgst_amount.toFixed(2)}
                    </Typography>{' '}
                  </Box>
                )}

                {formik.values.total_igst_amount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">IGST:</Typography>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {formik.values.total_igst_amount.toFixed(2)}
                    </Typography>{' '}
                  </Box>
                )}
                {formik.values.applied_tax && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1"> Tax on Shipping:</Typography>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {formik.values.shipping_tax.toFixed(2)}
                    </Typography>{' '}
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total:
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
                    {formik.values.total_amount.toFixed(2)}
                  </Typography>{' '}
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

      <BulkItems
        bulkItemsDialogue={bulkItemsDialogue}
        setBulkItemsDialogue={setBulkItemsDialogue}
        itemsList={itemsList}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xl"
        bulkItemSave={bulkItemSave}
      />
    </Dialog>
  );
};

export default AddItem;
