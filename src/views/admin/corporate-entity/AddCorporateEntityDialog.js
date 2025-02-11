'use client';

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Divider, Grid2, Typography } from '@mui/material';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useSearchParams } from 'next/navigation';
import CustomDatePicker from '@/utils/CustomDateInput';
import dayjs from 'dayjs';
import useCurrentUser from '@/hooks/useCurrentUser';

const BusinessFields = [
  { name: 'first_name', label: 'First Name' },
  { name: 'last_name', label: 'Last Name' },
  { name: 'username', label: 'Username' },
  { name: 'nameOfBusiness', label: 'Entity Name' },
  { name: 'email', label: 'Entity Email' },
  { name: 'mobile_number', label: 'Mobile Number' },
  { name: 'pan', label: 'Entity PAN' },
  { name: 'dob_or_incorp_date', label: 'Date of Incorporation' },
  { name: 'entityType', label: 'Entity Type' },
  { name: 'business_nature', label: 'Entity Nature' },
  { name: 'registrationNumber', label: 'Registration Number' },
  { name: 'trade_name', label: 'Trade Name' }
];

const HeadOfficeFields = [
  { name: 'address_line1', label: 'Address Line 1' },
  { name: 'address_line2', label: 'Address Line 2' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'pincode', label: 'Pincode' }
];

// Validation schema for Formik
const validationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  nameOfBusiness: Yup.string().required('Entity name is required'),

  pan: Yup.string()
    // .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format')
    .required('PAN is required'),

  dob_or_incorp_date: Yup.date()
    .required('Date of incorporation is required')
    .max(new Date(), 'Incorporation date cannot be in the future')
    .nullable(),

  entityType: Yup.string().required('Entity type is required'),

  business_nature: Yup.string().required('Entity nature is required'),

  registrationNumber: Yup.string()
    .matches(/^[A-Za-z0-9]+$/, 'Registration number must be alphanumeric')
    .required('Registration number is required'),

  trade_name: Yup.string().required('Trade name is required'),

  mobile_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number format')
    .required('Mobile number is required'),

  email: Yup.string().email('Invalid email format').required('Entity Email is required'),

  username: Yup.string().required('Username is required'),

  address_line1: Yup.string().required('Address Line 1 is required'),

  address_line2: Yup.string(),

  city: Yup.string().required('City is required'),

  state: Yup.string().required('State is required'),

  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, 'Invalid Pincode format')
    .required('Pincode is required')
});

export default function AddBusinessDialog({ open, handleClose, getBusinessList, selectedRecord, type, setType }) {
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const [payrollId, setPayrollId] = useState(null);
  const { userData } = useCurrentUser();

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      nameOfBusiness: '',
      pan: '',
      dob_or_incorp_date: dayjs().format('YYYY-MM-DD'),
      entityType: '',
      business_nature: '',
      registrationNumber: '',
      trade_name: '',
      mobile_number: '',
      email: '',
      client: '',
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
        }
      };
      postData.client = userData.id;
      console.log(postData);

      const url = type === 'edit' ? `/user_management/businesses/${selectedRecord.id}/` : `/user_management/businesses/`;
      const method = type === 'edit' ? 'put' : 'post';
      const { res } = await Factory(method, url, postData);
      if (res?.status_cd === 0) {
        getBusinessList();
        handleClose();
        setType('');
        resetForm();
        showSnackbar(type === 'edit' ? 'Record Updated Successfully' : 'Record Saved Successfully', 'success');
      } else {
        showSnackbar(JSON.stringify(res.data), 'error');
      }
    }
  });

  useEffect(() => {
    if (type === 'edit' && selectedRecord) {
      formik.setValues({
        ...selectedRecord,
        headOffice: {
          ...selectedRecord.headOffice, // Spread the existing headOffice values first
          address_line1: selectedRecord.headOffice.address_line1,
          address_line2: selectedRecord.headOffice.address_line2,
          city: selectedRecord.headOffice.city,
          state: selectedRecord.headOffice.state,
          pincode: selectedRecord.headOffice.pincode
        }
      });
    }
  }, [type, selectedRecord]);

  // Render dynamic fields based on the field configuration
  const renderFields = (fields) => {
    return fields.map((field) => {
      if (field.name === 'state') {
        return (
          <Grid2 size={{ xs: 12, sm: 6 }} key={field.name} sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="grey.800" sx={{ mb: 0.5 }}>
              {field.label}
            </Typography>
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
      } else if (field.name === 'dob_or_incorp_date') {
        return (
          <Grid2 size={{ xs: 12, sm: 6 }} key={field.name} sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="grey.800" sx={{ mb: 0.5 }}>
              {field.label}
            </Typography>{' '}
            <CustomDatePicker
              views={['year', 'month', 'day']}
              value={values.dob_or_incorp_date ? dayjs(values.dob_or_incorp_date) : null}
              onChange={(newDate) => {
                const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
                formik.setFieldValue('dob_or_incorp_date', formattedDate);
              }}
              sx={{ width: '100%' }}
              onBlur={handleBlur} // Make sure Formik's handleBlur is passed down here
              error={touched.dob_or_incorp_date && Boolean(errors.dob_or_incorp_date)}
              helperText={touched.dob_or_incorp_date && errors.dob_or_incorp_date}
              size="small"
            />
          </Grid2>
        );
      }

      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name} sx={{ mb: 1 }}>
          <Typography variant="subtitle2" color="grey.800" sx={{ mb: 0.5 }}>
            {field.label}
          </Typography>
          <CustomInput
            name={field.name}
            value={field.name === 'pan' ? values[field.name].toUpperCase() : values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
          />
        </Grid2>
      );
    });
  };
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;
  return (
    <Dialog open={open} maxWidth={'sm'} fullWidth>
      <DialogTitle>Add Entity Details</DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid2 container spacing={1.5}>
            {renderFields(BusinessFields)}
          </Grid2>
          <Grid2 container spacing={1.5}>
            {renderFields(HeadOfficeFields)}
          </Grid2>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={() => {
            setType('');
            resetForm();
            handleClose();
          }}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
