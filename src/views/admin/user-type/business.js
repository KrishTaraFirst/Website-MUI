'use client';
import dayjs from 'dayjs'; // Import dayjs
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Box, Typography, Button, DialogTitle, DialogActions, Grid2, DialogContent, Divider } from '@mui/material';
import { useState } from 'react';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import CustomDatePicker from '@/utils/CustomDateInput';
import CustomInput from '@/utils/CustomInput';
import { useSnackbar } from '@/components/CustomSnackbar';
import useCurrentUser from '@/hooks/useCurrentUser';
import Factory from '@/utils/Factory';
import { APP_DEFAULT_PATH } from '@/config';
import { entity_choices } from '@/utils/Entity-types';
import { business_nature_choices } from '@/utils/Nature-of-bsiness';

// Field configurations
const BusinessFields = [
  { name: 'nameOfBusiness', label: 'Business Name' },
  { name: 'pan', label: 'Business PAN' },
  { name: 'dob_or_incorp_date', label: 'Date of Incorporation' },
  { name: 'entityType', label: 'Entity Type' },
  { name: 'business_nature', label: 'Business Nature' },
  { name: 'registrationNumber', label: 'Registration Number' },
  { name: 'trade_name', label: 'Trade Name' },
  { name: 'mobile_number', label: 'Mobile Number' },
  { name: 'email', label: 'Email' }
];

const HeadOfficeFields = [
  { name: 'address_line1', label: 'Address Line 1' },
  { name: 'address_line2', label: 'Address Line 2' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'pincode', label: 'Pincode' }
];

// Validation schema for formik
const validationSchema = Yup.object({
  nameOfBusiness: Yup.string().required('Business name is required'),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format')
    .required('PAN is required'),
  dob_or_incorp_date: Yup.date()
    .required('Date of incorporation is required')
    .max(new Date(), 'Incorporation date cannot be in the future')
    .nullable(),
  entityType: Yup.string().required('Entity type is required'),
  business_nature: Yup.string().required('Business nature is required'),
  registrationNumber: Yup.string().required('Registration number is required'),
  trade_name: Yup.string().required('Trade name is required'),
  mobile_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number format')
    .required('Mobile number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  address_line1: Yup.string().required('Address Line 1 is required'),
  address_line2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, 'Invalid Pincode format')
    .required('Pincode is required')
});

export default function BusinessKYC() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(true);
  const { showSnackbar } = useSnackbar();
  const { userData } = useCurrentUser();

  const formik = useFormik({
    initialValues: {
      nameOfBusiness: '',
      pan: '',
      dob_or_incorp_date: dayjs().format('YYYY-MM-DD'),
      entityType: '',
      business_nature: '',
      registrationNumber: '',
      trade_name: '',
      mobile_number: '',
      email: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      pincode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const postData = {
        ...values,
        headOffice: {
          address_line1: values.address_line1,
          address_line2: values.address_line2,
          city: values.city,
          state: values.state,
          pincode: values.pincode
        },
        client: userData.id
      };
      const url = `/user_management/businesses/`;
      const method = 'post';

      const { res } = await Factory(method, url, postData);
      if (res?.status_cd === 0) {
        showSnackbar('Business KYC done Successfully', 'success');
        setDialogOpen(false);
        const userDetails = JSON.parse(localStorage.getItem('auth-user'));
        userDetails.business_exists = true;
        localStorage.setItem('auth-user', JSON.stringify(userDetails));
        router.push(APP_DEFAULT_PATH);
      } else {
        showSnackbar(JSON.stringify(res.data.data.error_message), 'error');
      }
    }
  });

  const renderField = (field) => {
    if (field.name === 'state') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomAutocomplete
            value={values[field.name]}
            name={field.name}
            onChange={(e, newValue) => setFieldValue(field.name, newValue)}
            options={indian_States_And_UTs}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
          />
        </Grid2>
      );
    }

    // Handling for 'dob_or_incorp_date' field (CustomDatePicker)
    if (field.name === 'dob_or_incorp_date') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomDatePicker
            views={['year', 'month', 'day']}
            value={values.dob_or_incorp_date ? dayjs(values.dob_or_incorp_date) : null}
            onChange={(newDate) => setFieldValue('dob_or_incorp_date', dayjs(newDate).format('YYYY-MM-DD'))}
            error={touched.dob_or_incorp_date && Boolean(errors.dob_or_incorp_date)}
            helperText={touched.dob_or_incorp_date && errors.dob_or_incorp_date}
            size="small"
            sx={{ width: '100%' }}
            onBlur={handleBlur}
          />
        </Grid2>
      );
    }

    // Handling for 'entityType' field (CustomAutocomplete)
    if (field.name === 'entityType') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomAutocomplete
            value={entity_choices.find((option) => option.key === values[field.name]) || null}
            name={field.name}
            onChange={(e, newValue) => setFieldValue(field.name, newValue ? newValue.key : '')}
            options={entity_choices}
            getOptionLabel={(option) => option.title}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
          />
        </Grid2>
      );
    }

    // Handling for 'businessNature' field (CustomAutocomplete)
    if (field.name === 'business_nature') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomAutocomplete
            value={business_nature_choices.find((option) => option.key === values[field.name]) || null}
            name={field.name}
            onChange={(e, newValue) => setFieldValue(field.name, newValue ? newValue.key : '')}
            options={business_nature_choices}
            getOptionLabel={(option) => option.title}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
          />
        </Grid2>
      );
    }

    // Default handling for other fields (CustomInput)
    return (
      <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
        <div style={{ marginBottom: '2px' }}>{field.label}</div>

        <CustomInput
          name={field.name}
          value={values[field.name]}
          onChange={(e) => {
            if (field.name === 'pan') {
              setFieldValue(field.name, e.target.value.toUpperCase());
            } else {
              setFieldValue(field.name, e.target.value);
            }
          }}
          onBlur={handleBlur}
          error={touched[field.name] && Boolean(errors[field.name])}
          helperText={touched[field.name] && errors[field.name]}
          sx={{ width: '100%' }}
        />
      </Grid2>
    );
  };
  const { values, setValues, errors, touched, handleSubmit, handleBlur, setFieldValue, resetForm } = formik;
  console.log(APP_DEFAULT_PATH);
  return (
    <Dialog open={dialogOpen}>
      {/* Business KYC Dialog */}
      <DialogTitle component="div">
        <Typography variant="h4" textAlign={'center'}>
          Business Registration
        </Typography>
        <Typography variant="body2" textAlign={'center'}>
          Please provide the necessary details to complete the registration.
        </Typography>
      </DialogTitle>
      <Divider />
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Business Details
          </Typography>
          <Grid2 container spacing={3}>
            {BusinessFields.map(renderField)}
          </Grid2>

          <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
            Head Office Details
          </Typography>
          <Grid2 container spacing={3}>
            {HeadOfficeFields.map(renderField)}
          </Grid2>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setDialogOpen(false);
              router.push(APP_DEFAULT_PATH);
            }}
          >
            Skip
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
