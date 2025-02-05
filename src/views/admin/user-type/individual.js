'use client';
import dayjs from 'dayjs';
import CustomDatePicker from '@/utils/CustomDateInput';
import CustomInput from '@/utils/CustomInput';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Typography, Button, Box, DialogTitle, DialogActions, Grid2, DialogContent } from '@mui/material';
import { useState } from 'react';
import Factory from '@/utils/Factory';
import { statesAndUTs } from '@/utils/helperData';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { APP_DEFAULT_PATH } from '@/config';
import { useSnackbar } from '@/components/CustomSnackbar';

const individualFieldData = [
  { name: 'name', label: 'Full Name', type: 'text' },
  { name: 'email', label: 'Email Address', type: 'email' },
  { name: 'mobile', label: 'Mobile Number', type: 'text' },
  { name: 'dob', label: 'Date of Birth', type: 'date' },
  { name: 'address_line1', label: 'Address Line 1', type: 'text' },
  { name: 'address_line2', label: 'Address Line 2', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'zip', label: 'Pin Code (Zip)', type: 'text' },
  { name: 'aadharcardnumber', label: 'Aadhar Card Number', type: 'text' },
  { name: 'pan_number', label: 'PAN Number', type: 'text' },
  { name: 'country', label: 'Country', type: 'text', defaultValue: 'IN' } // Set default country value
];

export default function IndividualForm() {
  const router = useRouter();
  const [kycDialogOpen, setKycDialogOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { showSnackbar } = useSnackbar();

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
    setSelectedDate(dayjs(newDate));
    formik.setFieldValue('dob', formattedDate);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      dob: dayjs().format('YYYY-MM-DD'),
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip: '',
      aadharcardnumber: '',
      pan_number: '',
      country: 'IN'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      mobile: Yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
      dob: Yup.date().nullable().required('Date of Birth is required'),
      address_line1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zip: Yup.string()
        .matches(/^\d{6}$/, 'Zip code must be 6 digits')
        .required('Zip code is required'),
      aadharcardnumber: Yup.string()
        .matches(/^\d{12}$/, 'Aadhar Card must be 12 digits')
        .required('Aadhar Card number is required'),
      pan_number: Yup.string()
        .required('PAN Number is required')
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN Number format')
    }),
    onSubmit: async (values) => {
      const postData = {
        name: values.name,
        aadhaar_number: values.aadharcardnumber,
        pan_number: values.pan_number,
        address: {
          address_line1: values.address_line1,
          address_line2: values.address_line2 || '',
          address_line3: values.addressLine3 || '',
          pinCode: values.zip,
          state: values.state,
          city: values.city,
          country: values.country
        },
        have_firm: 'false',
        date: values.dob
      };
      const url = `/user_management/users-kyc/`;
      const { res, error } = await Factory('post', url, postData);
      console.log(res);
      if (res.status_cd === 0) {
        setKycDialogOpen(false);
        showSnackbar(res?.detail, 'success');
        router.push(APP_DEFAULT_PATH);
      } else {
        showSnackbar(JSON.stringify(res.data.error_message), 'error');
      }
    }
  });

  const renderFields = (fields) => {
    return fields.map((field) => {
      if (field.name === 'state') {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
            <label>{field.label}</label>
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
            <label>{field.label}</label>
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
            <label>{field.label}</label>
            <CustomInput
              name={field.name}
              value={formik.values[field.name]}
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
  const userDetails = JSON.parse(localStorage.getItem('auth-user'));
  console.log(userDetails);
  return (
    <Box>
      <Dialog maxWidth="sm" open={kycDialogOpen}>
        <DialogTitle component="div">
          <Typography variant="h4">Complete Your KYC</Typography>
          <Typography variant="body2">Please fill in your KYC details to complete the registration.</Typography>
        </DialogTitle>

        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Grid2 container spacing={2}>
              {renderFields(individualFieldData)}
            </Grid2>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setKycDialogOpen(false);
                router.push(APP_DEFAULT_PATH);
              }}
            >
              Skip
            </Button>
            <Button variant="contained" type="submit">
              Complete KYC
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
