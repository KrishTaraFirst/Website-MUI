'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid2, Typography, Divider } from '@mui/material';

function PersonalDetails() {
  const employeeFields = [
    { name: 'personal_email', label: 'Personal Email' },
    { name: 'date_of_birth', label: 'Date of Birth' },
    { name: 'fathers_name', label: "Father's Name" },
    { name: 'pan', label: 'PAN' },
    { name: 'aadhar', label: 'Aadhar' },
    { name: 'state', label: 'State' },
    { name: 'city', label: 'City' },
    { name: 'pincode', label: 'Pincode' }
  ];

  // Form validation schema
  const validationSchema = Yup.object({
    personal_email: Yup.string().email('Invalid email address').required('Personal email is required'),
    fathers_name: Yup.string().required("Father's name is required"),
    pan: Yup.string().length(10, 'PAN should be exactly 10 characters').required('PAN is required'),
    aadhar: Yup.string().length(12, 'Aadhar should be exactly 12 digits').required('Aadhar is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().length(6, 'Pincode should be exactly 6 digits').required('Pincode is required'),
    date_of_birth: Yup.string().required('Date of birth is required')
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      personal_email: '',
      fathers_name: '',
      pan: '',
      aadhar: '',
      state: '',
      city: '',
      pincode: '',
      date_of_birth: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values); // Handle form submission
    }
  });

  const { values, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;

  // Render fields for employee data
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 item size={{ xs: 12, sm: 6 }} key={field.name}>
        <div style={{ paddingBottom: '8px' }}>
          <Typography variant="body2">{field.label}</Typography>
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

  return (
    <Box sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={3}>
          {/* Render employee fields */}
          {renderFields(employeeFields)}
        </Grid2>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default PersonalDetails;
