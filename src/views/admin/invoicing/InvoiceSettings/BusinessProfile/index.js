import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { FormControl, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Grid2, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/utils/CustomInput';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import useCurrentUser from '@/hooks/useCurrentUser';

export default function TabOne({ postType, businessDetails, onNext }) {
  // const [businessDetails, setBusinessDetails] = useState(null);
  const { userData } = useCurrentUser();

  const [busineesprofileFields] = useState({
    basic_details: [
      { name: 'nameOfBusiness', label: 'Business Name' },
      { name: 'registrationNumber', label: 'Business Registration Number' },
      { name: 'entityType', label: 'Business Type' },
      { name: 'gst_registered', label: 'GST Registered' },
      { name: 'gstin', label: 'GSTIN' },
      { name: 'state', label: 'State' },
      { name: 'email', label: 'Email' },
      { name: 'pincode', label: 'Pincode' },
      { name: 'mobile', label: 'Mobile' },
      { name: 'addresslane1', label: 'Address Lane 1' },
      { name: 'addresslane2', label: 'Address lane 2' },
      { name: 'pan_number', label: 'PAN' }
    ],
    bank_details: [
      { name: 'account_number', label: 'Bank A/C No' },
      { name: 'bank_name', label: 'Bank Name' },
      { name: 'ifsc_code', label: 'IFSC Code' },
      { name: 'swift_code', label: 'Swift Code' }
    ]
  });
  const { showSnackbar } = useSnackbar();

  // Formik validation schema
  const validationSchema = Yup.object({
    // nameOfBusiness: Yup.string().required('Business Name is required'),
    // registrationNumber: Yup.string().required('Registration Number is required'),
    // entityType: Yup.string().required('Business Type is required'),
    // gst_registered: Yup.string().required('GST Registration status is required'),

    gstin: Yup.string().when('gst_registered', {
      is: 'Yes',
      then: () => Yup.string().required('GSTIN is required'),
      otherwise: () => Yup.string().oneOf(['NA'], 'GSTIN must be "NA" when GST Registered is "No"') // Ensure "NA" for "No"
    }),
    // state: Yup.string().required('State is required'),
    // email: Yup.string().email('Invalid email format').required('Email is required'),
    // pincode: Yup.string().required('Pincode is required'),
    // mobile: Yup.string().required('Mobile is required'),
    // addresslane1: Yup.string().required('Address Lane 1 is required'),
    // addresslane2: Yup.string().required('Address Lane 2 is required'),
    pan_number: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format')
      .required('PAN is required'),
    bank_name: Yup.string().required('Bank Name is required'),
    account_number: Yup.number()
      .typeError('Account Number must be a number')
      .required('Account Number is required')
      .test(
        'length',
        'Account Number must be between 9 and 18 digits',
        (value) => value && value.toString().length >= 9 && value.toString().length <= 18
      ),

    ifsc_code: Yup.string()
      .required('IFSC Code is required')
      .matches(/^[A-Za-z]{4}0\d{6}$/, 'IFSC Code must be 11 characters: first 4 letters, a 0, followed by 6 digits')
    // swift_code: Yup.string()
    //   .required('SWIFT Code is required')
    //   .matches(
    //     /^[A-Za-z]{4}[A-Za-z]{2}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/,
    //     'SWIFT Code must be 8 or 11 characters: 4 letters, 2 letters, 2 alphanumeric, and optionally 3 alphanumeric'
    //   )
  });

  const formik = useFormik({
    initialValues: {
      nameOfBusiness: '',
      registrationNumber: '',
      entityType: '',
      gst_registered: '',
      gstin: '',
      state: '',
      email: '',
      pincode: '',
      mobile: '',
      addresslane1: '',
      addresslane2: '',
      pan_number: '',
      bank_name: '',
      account_number: '',
      ifsc_code: '',
      swift_code: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const url =
        postType === 'put' ? `/invoicing/invoicing-profiles/${businessDetails.id}/update/` : '/invoicing/invoicing-profiles/create/';
      const postData = {
        // pan_number: values.pan_number,
        bank_name: values.bank_name,
        account_number: Number(values.account_number),
        ifsc_code: values.ifsc_code,
        swift_code: values.swift_code,
        gst_registered: values.gst_registered,
        gstin: values.gstin
      };
      if (postType === 'post') {
        postData.business = businessDetails.id;
      }

      const { res } = await Factory(postType, url, postData);
      if (res.status_cd === 1) {
        showSnackbar(JSON.stringify(res.data.data), 'error');
      } else {
        showSnackbar('Data Saved Successfully', 'success');
        onNext();
      }
    }
  });
  const { values, setValues, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;
  useEffect(() => {
    if (businessDetails && businessDetails.id) {
      setValues((prev) => ({
        ...prev,
        nameOfBusiness: businessDetails.nameOfBusiness || '',
        registrationNumber: businessDetails.registrationNumber || '',
        entityType: businessDetails.entityType || '',
        gst_registered: businessDetails.gst_details.length !== 0 ? 'Yes' : 'No',
        gstin: businessDetails.gstin || '',
        state: businessDetails.headOffice.state || '',
        email: businessDetails.email || '',
        pincode: businessDetails.headOffice.pincode || '',
        mobile: businessDetails.mobile_number || '',
        addresslane1: businessDetails.headOffice.address_line1 || '',
        addresslane2: businessDetails.headOffice.address_line2 || '',
        pan_number: businessDetails.pan || '',
        bank_name: businessDetails.bank_name || '',
        account_number: businessDetails.account_number || '',
        ifsc_code: businessDetails.ifsc_code || '',
        swift_code: businessDetails.swift_code || ''
      }));
    }
  }, [businessDetails]);
  console.log(values);
  return (
    <>
      <Typography variant="h5" textAlign="center" sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}>
        Business Details
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Basic Details
      </Typography>

      <Grid2 container spacing={2}>
        {busineesprofileFields.basic_details.map((item, index) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={item.name}>
            <FormControl fullWidth>
              {item.name === 'gst_registered' ? (
                <>
                  <FormLabel>{item.label}</FormLabel>
                  <RadioGroup
                    name={item.name}
                    value={values.gst_registered}
                    row
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue(item.name, value);

                      if (value === 'No') {
                        setFieldValue('gstin', 'NA'); // Set GSTIN to NA
                        formik.setFieldTouched('gstin', false); // Clear any existing validation error
                        formik.setFieldError('gstin', ''); // Clear error message
                      } else if (value === 'Yes') {
                        setFieldValue('gstin', ''); // Reset GSTIN field for "Yes"
                      }
                    }}
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </>
              ) : item.name === 'state' || item.name === 'gstin' ? (
                <>
                  <div style={{ paddingBottom: '5px' }}>
                    <label>{item.label}</label>
                  </div>
                  <CustomAutocomplete
                    value={values[item.name]}
                    onChange={(e, newValue) => setFieldValue(item.name, newValue)}
                    options={
                      item.name === 'gstin' && Array.isArray(businessDetails.gst_details)
                        ? businessDetails.gst_details.map((item) => item.gstin)
                        : indian_States_And_UTs
                    }
                    error={touched[item.name] && Boolean(errors[item.name])}
                    helperText={touched[item.name] && errors[item.name]}
                    name={item.name}
                    disabled={item.name === 'gstin' && values.gst_registered === 'No'}
                  />
                </>
              ) : (
                <>
                  <div style={{ paddingBottom: '5px' }}>
                    <label>{item.label}</label>
                  </div>
                  <CustomInput
                    name={item.name}
                    value={values[item.name]}
                    onChange={(e) => setFieldValue(item.name, e.target.value)}
                    onBlur={handleBlur}
                    error={touched[item.name] && Boolean(errors[item.name])}
                    helperText={touched[item.name] && errors[item.name]}
                    disabled
                  />
                </>
              )}
            </FormControl>
          </Grid2>
        ))}
      </Grid2>

      <Typography variant="h6" sx={{ fontWeight: 'bold', pt: 3, mb: 2 }}>
        Bank Details
      </Typography>

      <Grid2 container spacing={2}>
        {busineesprofileFields.bank_details.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={item.name}>
            <FormControl fullWidth>
              <label>{item.label}</label>
              <TextField
                name={item.name}
                value={values[item.name]}
                onChange={(e) => {
                  if (item.name === 'pan_number' || item.name === 'ifsc_code' || item.name === 'bank_name') {
                    setFieldValue(item.name, e.target.value.toUpperCase());
                  } else {
                    setFieldValue(item.name, e.target.value);
                  }
                }}
                onBlur={handleBlur}
                error={touched[item.name] && Boolean(errors[item.name])}
                helperText={touched[item.name] && errors[item.name]}
                required
              />
            </FormControl>
          </Grid2>
        ))}
      </Grid2>

      <Box textAlign="center">
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3 }}>
          Save & Continue
        </Button>
      </Box>
    </>
  );
}
