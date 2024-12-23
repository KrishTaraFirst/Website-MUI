import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { FormControl, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Grid, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/utils/CustomInput';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
export default function TabOne({ onNext }) {
  const [busineesprofileFields, setBusineesprofileFields] = useState({
    basic_details: [
      { name: 'business_name', label: 'Business Name' },
      { name: 'registration_number', label: 'Business Registration Number' },
      { name: 'business_type', label: 'Business Type' },
      { name: 'gst_registered', label: 'GST Registered' },
      { name: 'gstin', label: 'GSTIN' },
      { name: 'state', label: 'State' },
      { name: 'email', label: 'Email' },
      { name: 'pincode', label: 'Pincode' },
      { name: 'mobile', label: 'Mobile' },
      { name: 'address', label: 'Address' }
    ],
    bank_details: [
      { name: 'pan', label: 'PAN' },
      { name: 'account_number', label: 'Bank A/C No' },
      { name: 'bank_name', label: 'Bank Name' },
      { name: 'ifsc_code', label: 'IFSC Code' },
      { name: 'swift_code', label: 'Swift Code' }
    ]
  });

  // Formik validation schema
  const validationSchema = Yup.object({
    business_name: Yup.string().required('Business Name is required'),
    registration_number: Yup.string().required('Registration Number is required'),
    business_type: Yup.string().required('Business Type is required'),
    gst_registered: Yup.string().required('GST Registration status is required'),
    gstin: Yup.string().when('gst_registered', {
      is: 'Yes',
      then: Yup.string().required('GSTIN is required')
    }),
    state: Yup.string().required('State is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    pincode: Yup.string().required('Pincode is required'),
    mobile: Yup.string().required('Mobile is required'),
    address: Yup.string().required('Address is required'),
    pan: Yup.string().required('PAN is required'),
    bank_name: Yup.string().required('Bank Name is required'),
    account_number: Yup.string().required('Bank A/C No is required'),
    ifsc_code: Yup.string().required('IFSC Code is required'),
    swift_code: Yup.string().required('Swift Code is required')
  });

  const formik = useFormik({
    initialValues: {
      business_name: '',
      registration_number: '',
      business_type: '',
      gst_registered: 'No',
      gstin: '',
      state: '',
      email: '',
      pincode: '',
      mobile: '',
      address: '',
      pan: '',
      bank_name: '',
      account_number: '',
      ifsc_code: '',
      swift_code: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      console.log(values);
      onNext();
    }
  });

  const { values, setValues, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;

  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center" sx={{ fontWeight: 'bold' }}>
        Business Details
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Basic Details
      </Typography>

      <Grid container spacing={2}>
        {busineesprofileFields.basic_details.map((item, index) => (
          <Grid item xs={6} key={item.name}>
            <FormControl fullWidth>
              {item.name === 'gst_registered' ? (
                <>
                  <FormLabel>{item.label}</FormLabel>
                  <RadioGroup name={item.name} value={values.gst_registered} onChange={formik.handleChange} row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </>
              ) : (
                <>
                  <div style={{ paddingBottom: '5px' }}>
                    <label>{item.label}</label>
                  </div>
                  <CustomInput
                    name={item.name}
                    value={values[item.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={touched[item.name] && Boolean(errors[item.name])}
                    helperText={touched[item.name] && errors[item.name]}
                    required
                    disabled={item.name === 'gstin' && values.gst_registered === 'No'}
                  />
                </>
              )}
            </FormControl>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ fontWeight: 'bold', pt: 3 }}>
        Bank Details
      </Typography>

      <Grid container spacing={2}>
        {busineesprofileFields.bank_details.map((item) => (
          <Grid item xs={6} key={item.name}>
            <FormControl fullWidth>
              <label>{item.label}</label>
              <TextField
                name={item.name}
                value={values[item.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={touched[item.name] && Boolean(errors[item.name])}
                helperText={touched[item.name] && errors[item.name]}
                required
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center">
        <Button variant="contained" onClick={handleSubmit}>
          Save & Continue
        </Button>
      </Box>
    </Stack>
  );
}
