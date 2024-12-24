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
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import Factory from '@/utils/Factory';
const AddCustomer = ({ open, onClose }) => {
  const [addCustomerData] = useState([
    { name: 'nameofthe_business', label: 'Name of the Business' },
    { name: 'pan', label: 'PAN' },
    { name: 'gst_registered', label: 'GST Registered' },
    { name: 'gstin', label: 'GSTIN' },
    { name: 'typeof_gst', label: 'Type of GST' },
    { name: 'addresslane1', label: 'Address Lane 1' },
    { name: 'addresslane2', label: 'Address Lane 2' },
    { name: 'state', label: 'State' },
    { name: 'pincode', label: 'Pincode' },
    { name: 'email', label: 'Email' },
    { name: 'mobile', label: 'Mobile' },
    { name: 'opening_balance', label: 'Opening Balance' },
    { name: 'swift_code', label: 'SWIFT Code' }
  ]);

  const formik = useFormik({
    initialValues: {
      nameofthe_business: '',
      pan: '',
      gst_registered: 'No',
      gstin: '',
      typeof_gst: '',
      addresslane1: '',
      addresslane2: '',
      pincode: '',
      email: '',
      mobile: '',
      opening_balance: '',
      swift_code: ''
    },
    validationSchema: Yup.object({
      nameofthe_business: Yup.string().required('Customer Name is required'),
      pan: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format')
        .required('PAN is required'),
      gst_registered: Yup.string().required('GST Registration status is required'),
      gstin: Yup.string().when('gst_registered', {
        is: 'Yes',
        then: Yup.string().required('GSTIN is required')
      }),
      typeof_gst: Yup.string().required('GST Type is required'),
      addresslane1: Yup.string().required('Address Lane 1 is required'),
      addresslane2: Yup.string().required('Address Lane 2 is required'),
      pincode: Yup.string().required('Pincode is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      mobile: Yup.string().required('Mobile is required'),
      state: Yup.string().required('State is required'),
      country: Yup.string().required('Country is required'),
      opening_balance: Yup.number().required('Opening Balance is required'),
      swift_code: Yup.string().required('SWIFT Code is required')
    }),
    onSubmit: (values) => {
      console.log(values);
      onClose();
    }
  });
  const { values, touched, errors, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Add New Customer
          </DialogTitle>

          <IconButton variant="outlined" color="secondary" aria-label="close" onClick={onClose}>
            <IconX size={20} />
          </IconButton>
        </Box>

        <Divider />
        <DialogContent sx={{ padding: '16px' }}>
          {' '}
          {/* Added padding to DialogContent */}
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
                      <RadioGroup name={item.name} value={values.gst_registered} onChange={handleChange} row>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  ) : item.name === 'typeof_gst' || item.name === 'state' ? (
                    <>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>
                      <CustomAutocomplete
                        value={values[item.name]}
                        onChange={handleChange}
                        options={item.name === 'typeof_gst' ? ['CGST', 'IGST'] : item.name === 'state' && indian_States_And_UTs}
                        error={touched[item.name] && Boolean(errors[item.name])}
                        helperText={touched[item.name] && errors[item.name]}
                        name={item.name}
                        // required={values.gst_registered === 'Yes'} // Only required if GST is registered
                        // disabled={values.gst_registered === 'No'} // Disable if GST is not registered
                      />
                    </>
                  ) : (
                    <>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>
                      <CustomInput
                        name={item.name}
                        value={item.name === 'pan' ? values[item.name].toUpperCase() : values[item.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[item.name] && Boolean(errors[item.name])}
                        helperText={touched[item.name] && errors[item.name]}
                        disabled={item.name === 'gstin' && values.gst_registered === 'No'}
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
