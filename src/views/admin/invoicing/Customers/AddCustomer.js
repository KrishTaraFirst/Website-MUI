import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import Factory from '@/utils/Factory';

const AddCustomer = ({ businessDetailsData, open, onClose, getCustomersData }) => {
  const [addCustomerData] = useState([
    { name: 'name', label: 'Name of the Business' },
    { name: 'pan_number', label: 'PAN' },
    { name: 'gst_registered', label: 'GST Registered' },
    { name: 'gstin', label: 'GSTIN' },
    { name: 'gst_type', label: 'Type of GST' },
    { name: 'address_line1', label: 'Address Lane 1' },
    { name: 'address_line2', label: 'Address Lane 2' },
    { name: 'country', label: 'Country' },
    { name: 'state', label: 'State' },
    { name: 'postal_code', label: 'Pincode' },
    { name: 'email', label: 'Email' },
    { name: 'mobile_number', label: 'Mobile' },
    { name: 'opening_balance', label: 'Opening Balance' }
    // { name: 'swift_code', label: 'SWIFT Code' }
  ]);

  const formik = useFormik({
    initialValues: {
      name: '',
      pan_number: '',
      gst_registered: 'No',
      gstin: '',
      gst_type: '',
      address_line1: '',
      address_line2: '',
      country: 'IN',
      state: '',
      postal_code: '',
      email: '',
      mobile_number: '',
      opening_balance: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Customer Name is required'),
      pan_number: Yup.string().required('PAN is required'),
      gst_registered: Yup.string().required('GST Registration status is required'),
      // gstin: Yup.string().required('GSTIN is required'),
      gst_type: Yup.string().required('GST Type is required'),
      address_line1: Yup.string().required('Address Line 1 is required'),
      address_line2: Yup.string().required('Address Line 2 is required'),
      postal_code: Yup.string().required('Pincode is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      mobile_number: Yup.string().required('Mobile is required'),
      state: Yup.string().required('State is required'),
      country: Yup.string().required('Country is required'),
      opening_balance: Yup.number().required('Opening Balance is required')
    }),

    // validateOnBlur: true, // This will trigger validation when the input loses focus
    // validateOnChange: true, // This will trigger validation on field change
    onSubmit: async (values) => {
      const postData = { ...values };
      postData.invoicing_profile = businessDetailsData.id;
      let url = '/invoicing/customer_profiles/create/';
      const { res } = await Factory('post', url, postData);

      if (res.status_cd === 0) {
        getCustomersData();
        handleClose();
      }
    }
  });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const { values, setValues, errors, touched, handleSubmit, handleBlur, setFieldValue, resetForm } = formik;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Add New Customer
          </DialogTitle>

          <IconButton variant="outlined" color="secondary" aria-label="close" onClick={handleClose}>
            <IconX size={20} />
          </IconButton>
        </Box>

        <Divider />
        <DialogContent sx={{ padding: '16px' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Customer Details
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {addCustomerData.map((item) => (
                <Grid item xs={6} key={item.name}>
                  {item.name === 'gst_registered' ? (
                    <FormControl fullWidth>
                      <FormLabel>{item.label}</FormLabel>
                      <RadioGroup name={item.name} value={values[item.name]} onChange={(e) => setFieldValue(item.name, e.target.value)} row>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  ) : item.name === 'gst_type' || item.name === 'state' ? (
                    <>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>
                      <CustomAutocomplete
                        value={values[item.name]}
                        name={item.name}
                        onChange={(e, newValue) => setFieldValue(item.name, newValue)}
                        options={item.name === 'gst_type' ? ['CGST', 'IGST'] : item.name === 'state' && indian_States_And_UTs}
                        error={touched[item.name] && Boolean(errors[item.name])}
                        helperText={touched[item.name] && errors[item.name]}
                      />
                    </>
                  ) : (
                    <>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>

                      <CustomInput
                        name={item.name}
                        value={item.name === 'pan_number' ? values[item.name].toUpperCase() : values[item.name]}
                        onChange={(e) => setFieldValue(item.name, e.target.value)}
                        onBlur={handleBlur}
                        error={touched[item.name] && Boolean(errors[item.name])}
                        helperText={touched[item.name] && errors[item.name]}
                        disabled={(item.name === 'gstin' && values.gst_registered === 'No') || item.name === 'country'}
                      />
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3, gap: 5 }}>
              <Button variant="contained" type="submit">
                Add Customer
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AddCustomer;
