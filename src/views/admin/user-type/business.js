'use client';
import dayjs from 'dayjs'; // Import dayjs
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  Box,
  Typography,
  Button,
  DialogTitle,
  DialogActions,
  Radio,
  FormControlLabel,
  RadioGroup,
  Grid2,
  DialogContent,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { statesAndUTs } from '@/utils/helperData';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import CustomDatePicker from '@/utils/CustomDateInput';
import { useSnackbar } from '@/components/CustomSnackbar';
import { APP_DEFAULT_PATH } from '@/config';
import Factory from '@/utils/Factory';

const businessKycFields = [
  { name: 'name', label: 'Business Name' },
  { name: 'pan_number', label: 'PAN Number' },
  { name: 'aadhaar_number', label: 'Aadhaar Number' },
  { name: 'dob', label: 'Date of Birth' },
  { name: 'address_line1', label: 'Address Line 1' },
  { name: 'address_line2', label: 'Address Line 2' },
  { name: 'state', label: 'State' },
  { name: 'city', label: 'City' },
  { name: 'phoneNumber', label: 'Phone Number' },
  { name: 'country', label: 'Country' },
  { name: 'zip', label: 'Pin Code' }
];

const firmKycFields = [
  { name: 'firmname', label: 'Firm Name' },
  { name: 'firmregistrationnumber', label: 'Firm Registration Number' },
  { name: 'firmemail', label: 'Firm Email' },
  { name: 'firmmobilenumber', label: 'Firm Mobile Number' },
  { name: 'noofpartnersinfirm', label: 'Number of Partners in Firm' },
  { name: 'address_line1', label: 'Address Line 1' },
  { name: 'address_line2', label: 'Address Line 2' },
  { name: 'state', label: 'State' },
  { name: 'city', label: 'City' },
  { name: 'zip', label: 'Pin Code' }
];

export default function BusinessKYC() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [firmkycDialogOpen, setFirmkycDialogOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
    businessKycFormik.setFieldValue('dob', formattedDate);
  };

  // Business KYC Formik
  const businessKycFormik = useFormik({
    initialValues: {
      dob: dayjs().format('YYYY-MM-DD'),
      name: '',
      aadhaar_number: '',
      pan_number: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      havefirm: 'true',
      country: 'IN'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Business Name is required'),
      dob: Yup.date().required('Date of Birth is required').max(new Date(), 'DOB cannot be in the future'),
      pan_number: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format')
        .required('PAN is required'),
      aadhaar_number: Yup.string()
        .matches(/^\d{12}$/, 'Aadhaar number must be 12 digits')
        .required('Aadhaar number is required'),
      address_line1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zip: Yup.string()
        .matches(/^\d{6}$/, 'Zip code must be a 6-digit number')
        .required('Zip code is required'),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be a 10-digit number')
        .required('Phone number is required'),
      havefirm: Yup.boolean().required('Please specify whether you have a firm').nullable()
    }),
    onSubmit: async (values) => {
      const postData = {
        dob: values.dob,
        name: values.name,
        icai_number: values.icai_number,
        aadhaar_number: values.aadhaar_number,
        pan_number: values.pan_number,
        address: {
          address_line1: values.address_line1 || '',
          address_line2: values.address_line2 || '',
          pinCode: values.zip,
          state: values.state,
          city: values.city,
          country: values.country
        },
        have_firm: values.havefirm,
        date: values.dob
      };
      // console.log('Business KYC Data:', postData);
      const url = `/user_management/users-kyc/`;
      const { res, error } = await Factory('post', url, postData);
      console.log(res); // Log the response

      if (res.status_cd === 0) {
        if (postData.have_firm === 'true') {
          setDialogOpen(false);
          setFirmkycDialogOpen(true); // Open the firm KYC dialog
          showSnackbar(JSON.stringify(res.data.detail), 'success');
        }
        showSnackbar(JSON.stringify(res.data.detail), 'success');
        setDialogOpen(false);
      } else {
        showSnackbar(JSON.stringify(res.data.error_message), 'error');
      }
    }
  });

  // Firm KYC Formik
  const firmKycFormik = useFormik({
    initialValues: {
      firmname: '',
      firmregistrationnumber: '',
      firmemail: '',
      firmmobilenumber: '',
      noofpartnersinfirm: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip: '',
      country: 'IN'
    },
    validationSchema: Yup.object({
      firmname: Yup.string().required('Firm Name is required'),
      firmregistrationnumber: Yup.string()
        .required('Firm Registration Number is required')
        .matches(/^[A-Z0-9]{10}$/, 'Invalid format. Format should be: ABCD123456'),

      firmemail: Yup.string().email('Invalid email address').required('Firm Email is required'),
      firmmobilenumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Firm Mobile Number must be a 10-digit number')
        .required('Firm Mobile Number is required'),
      noofpartnersinfirm: Yup.number().required('Number of Partners is required').positive().integer(),
      address_line1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zip: Yup.string()
        .matches(/^\d{6}$/, 'Invalid Zip code')
        .required('Zip code is required')
    }),
    onSubmit: async (values) => {
      const postData = {
        firm_name: values.firmname,
        firm_registration_number: values.firmregistrationnumber,
        firm_email: values.firmemail,
        firm_mobile_number: values.firmmobilenumber,
        address: {
          address_line1: values.address_line1,
          address_line2: values.address_line2 || '',
          pinCode: values.zip,
          state: values.state,
          city: values.city,
          country: values.country
        },
        number_of_firm_partners: Number(values.noofpartnersinfirm)
      };
      console.log('Firm KYC Data:', postData);

      const url = `/user_management/firmkyc/`;
      const { res, error } = await Factory('post', url, postData);
      console.log(res); // Log the response

      if (res.status_cd === 0) {
        setFirmkycDialogOpen(false); // Close the firm KYC dialog
        showSnackbar(JSON.stringify(res.data.detail), 'success');
        router.push(APP_DEFAULT_PATH);
      } else {
        showSnackbar(JSON.stringify(res.data.data), 'error');
      }
    }
  });

  const renderFields = (fields, formik) => {
    return fields.map((field) => {
      if (field.name === 'state') {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <CustomAutocomplete
              value={formik.values[field.name]}
              onChange={(event, newValue) => formik.setFieldValue(field.name, newValue)}
              options={statesAndUTs}
              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
              helperText={formik.touched[field.name] && formik.errors[field.name]}
              name={field.name}
            />
          </Grid2>
        );
      } else if (field.name === 'dob') {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <CustomDatePicker
              value={formik.values.dob ? dayjs(formik.values.dob) : null}
              onChange={handleDateChange}
              views={['year', 'month', 'day']}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={formik.touched.dob && formik.errors.dob}
              sx={{ width: '100%', '& .MuiInputBase-root': { fontSize: '0.75rem', height: '40px' } }}
            />
          </Grid2>
        );
      } else {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <TextField
              fullWidth
              name={field.name}
              value={formik.values[field.name]} // This ensures the value is tied to Formik state
              onChange={(e) => {
                if (field.name === 'pan_number') {
                  formik.setFieldValue(field.name, e.target.value.toUpperCase());
                } else {
                  formik.setFieldValue(field.name, e.target.value);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
              helperText={formik.touched[field.name] && formik.errors[field.name]}
              disabled={field.name === 'country'}
            />
          </Grid2>
        );
      }
    });
  };

  // Destructuring for business KYC and firm KYC separately
  const { errors, touched, handleSubmit, getFieldProps } = businessKycFormik;
  const { errors: kycErrors, touched: kycTouched, handleSubmit: kycHandleSubmit, getFieldProps: getKycFieldProps } = firmKycFormik;

  return (
    <Box>
      {/* Business KYC Dialog */}
      <Dialog open={dialogOpen} maxWidth="sm">
        <DialogTitle component="div">
          <Typography variant="h4">Business KYC</Typography>
          <Typography variant="body2">Please provide the necessary details to complete the registration.</Typography>
        </DialogTitle>

        <form onSubmit={businessKycFormik.handleSubmit} autoComplete="off">
          <DialogContent>
            <Grid2 container spacing={2}>
              {renderFields(businessKycFields, businessKycFormik)}
            </Grid2>
            <RadioGroup
              row
              name="havefirm"
              value={businessKycFormik.values.havefirm}
              onChange={(e) => businessKycFormik.setFieldValue('havefirm', e.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'row', // Align items horizontally
                gap: '16px', // Add space between the radio buttons
                alignItems: 'center' // Vertically align the radio buttons with the label
              }}
            >
              <Typography variant="body1" sx={{ marginRight: '8px' }}>
                Do you have a firm?
              </Typography>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </DialogContent>
          <DialogActions style={{ display: 'flecx', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="error" onClick={() => setDialogOpen(false)}>
              Skip
            </Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Firm KYC Dialog */}
      <Dialog open={firmkycDialogOpen} maxWidth="sm">
        <DialogTitle component="div">
          <Typography variant="h4">Firm KYC</Typography>
          <Typography variant="body2">Please provide the necessary details to complete the registration.</Typography>
        </DialogTitle>
        <form onSubmit={firmKycFormik.handleSubmit} autoComplete="off">
          <DialogContent>
            <Grid2 container spacing={2}>
              {renderFields(firmKycFields, firmKycFormik)}
            </Grid2>
          </DialogContent>
          <DialogActions style={{ display: 'flecx', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="error" onClick={() => setFirmkycDialogOpen(false)}>
              Skip
            </Button>
            <Button variant="contained" type="submit" disabled={firmKycFormik.isSubmitting}>
              Complete Firm KYC
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
