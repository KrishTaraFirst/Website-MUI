import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system

function Organizationdetails() {
  // Field definitions for organization details
  const fields = [
    { name: 'organization_name', label: 'Organization Name' },
    { name: 'logo', label: 'Logo' },
    { name: 'industry', label: 'Industry' },
    { name: 'contact_email', label: 'Contact Email' },
    { name: 'sender', label: 'Sender' }
  ];

  // Address fields for organization and filing
  const organizationAddress = [
    { name: 'address_line1', label: 'Address Line 1' },
    { name: 'address_line2', label: 'Address Line 2' },
    { name: 'state', label: 'State' },
    { name: 'city', label: 'City' },
    { name: 'postal_code', label: 'Pincode' }
  ];

  const filingAddress = [
    { name: 'address_line1', label: 'Address Line 1' },
    { name: 'address_line2', label: 'Address Line 2' },
    { name: 'state', label: 'State' },
    { name: 'city', label: 'City' },
    { name: 'postal_code', label: 'Pincode' }
  ];

  // Formik validation schema
  const validationSchema = Yup.object({
    organization_name: Yup.string().required('Organization name is required'),
    logo: Yup.string().required('Logo is required'),
    industry: Yup.string().required('Industry is required'),
    contact_email: Yup.string().email('Invalid email').required('Email is required'),
    sender: Yup.string().required('Sender is required'),
    address_line1: Yup.string().required('Address Line 1 is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    postal_code: Yup.string().required('Pincode is required')
  });

  // Initialize Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      organization_name: '',
      logo: '',
      industry: '',
      contact_email: '',
      sender: '',
      address_line1: '',
      address_line2: '',
      state: '',
      city: '',
      postal_code: '',
      filing_address_line1: '',
      filing_address_line2: '',
      filing_state: '',
      filing_city: '',
      filing_postal_code: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  const { values, handleChange, errors, touched, handleSubmit, handleBlur } = formik;

  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
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

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Organization Details
      </Typography>

      <Grid2 container spacing={3}>
        {/* Render dynamic fields for organization */}
        {renderFields(fields)}
      </Grid2>

      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Organization Address
      </Typography>
      <Grid2 container spacing={3}>
        {/* Render dynamic fields for organization address */}
        {renderFields(organizationAddress)}
      </Grid2>

      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Filing Address
      </Typography>
      <Grid2 container spacing={3}>
        {/* Render dynamic fields for filing address */}
        {renderFields(filingAddress)}
      </Grid2>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Organizationdetails;
