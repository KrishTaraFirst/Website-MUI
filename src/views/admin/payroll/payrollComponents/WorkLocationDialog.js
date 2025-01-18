import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system

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
    worklocation_name: Yup.string().required('Work Location Name is required'),
    address_line1: Yup.string().required('Address Line 1 is required'),
    address_line2: Yup.string(),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    postal_code: Yup.string().required('Pincode is required')
  });

  // Initialize Formik with initial values and validation schema
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

  const { values, handleChange, errors, touched, handleSubmit, handleBlur, resetForm } = formik;

  // Render each field dynamically
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
        <div style={{ paddingBottom: '5px' }}>
          <label>{field.label}</label>
        </div>
        <TextField
          fullWidth
          name={field.name}
          value={values[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched[field.name] && Boolean(errors[field.name])}
          helperText={touched[field.name] && errors[field.name]}
        />
      </Grid2>
    ));
  };

  // Handle dialog open/close

  return (
    <>
      {/* Dialog for Work Location */}
      <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
        <DialogTitle>Work Location Details</DialogTitle>

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
