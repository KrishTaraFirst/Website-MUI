'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Divider, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';

export default function WorkLocationDialog({ open, handleClose, handleOpenDialog }) {
  const filingAddress = [
    { name: 'worklocation_name', label: 'Work Location Name' },
    { name: 'address_line1', label: 'Address Line 1' },
    { name: 'address_line2', label: 'Address Line 2' },
    { name: 'state', label: 'State' },
    { name: 'city', label: 'City' },
    { name: 'postal_code', label: 'Pincode' }
  ];

  // Formik validation schema

  const validationSchema = Yup.object({
    worklocation_name: Yup.string()
      .required('Work Location Name is required')
      .min(3, 'Work Location Name must be at least 3 characters')
      .max(100, 'Work Location Name must be at most 100 characters'),

    address_line1: Yup.string().required('Address Line 1 is required').min(5, 'Address Line 1 must be at least 5 characters'),

    address_line2: Yup.string().required('Address Line 2 is required').min(5, 'Address Line 2 must be at least 5 characters'),

    state: Yup.string()
      .required('State is required')
      .min(2, 'State must be at least 2 characters')
      .max(50, 'State must be at most 50 characters'),

    city: Yup.string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City must be at most 50 characters'),

    postal_code: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid Pincode format. It must be exactly 6 digits.')
  });

  const formik = useFormik({
    initialValues: {
      worklocation_name: '',
      address_line1: '',
      address_line2: '',
      state: '',
      city: '',
      postal_code: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  const { values, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;

  const renderFields = (fields) => {
    return fields.map((field) => {
      if (field.name === 'state') {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <CustomAutocomplete
              value={values[field.name]}
              name={field.name}
              onChange={(e, newValue) => setFieldValue(field.name, newValue)}
              options={indian_States_And_UTs}
              error={touched[field.name] && Boolean(errors[field.name])}
              helperText={touched[field.name] && errors[field.name]}
              sx={{ width: '100%' }} // Ensure it's full width
            />
          </Grid2>
        );
      }

      return (
        <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
          <div style={{ paddingBottom: '5px' }}>
            <label>{field.label}</label>
          </div>
          <CustomInput
            name={field.name}
            value={values[field.name]}
            onChange={(e) => setFieldValue(field.name, e.target.value)}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }} // Ensure it's full width
          />
        </Grid2>
      );
    });
  };
  // Handle dialog open/close

  return (
    <>
      {/* Dialog for Work Location */}
      <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
        <DialogTitle textAlign="center">Add Location Details</DialogTitle>
        <Divider />
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <Grid2 container spacing={3}>
              {/* Render dynamic fields for filing address */}
              {renderFields(filingAddress)}
            </Grid2>
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
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
    </>
  );
}
