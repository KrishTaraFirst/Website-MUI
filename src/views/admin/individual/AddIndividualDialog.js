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
  { name: 'username', label: 'Username' },
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'mobile_number', label: 'Mobile Number' }
];

// Validation schema for Formik
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),

  mobile_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number format')
    .required('Mobile number is required'),

  email: Yup.string().email('Invalid email format').required('Email is required'),

  username: Yup.string().required('Username is required')
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
      name: '',
      mobile_number: '',
      email: '',
      username: ''
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
      <DialogTitle>Add Individual</DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid2 container spacing={1.5}>
            {renderFields(BusinessFields)}
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
