'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system
import HomeCard from '@/components/cards/HomeCard';

function Organizationdetails({ tab }) {
  // Field definitions for organization details
  const fields = [
    { name: 'organization_name', label: 'Organization Name' },
    { name: 'logo', label: 'Logo' },
    { name: 'industry', label: 'Industry' },
    { name: 'contact_email', label: 'Contact Email' },
    { name: 'sender', label: 'Sender' }
  ];

  // Address fields for organization and filing (with updated names)
  const organizationAddress = [
    { name: 'organization_address_line1', label: 'Address Line 1' },
    { name: 'organization_address_line2', label: 'Address Line 2' },
    { name: 'organization_state', label: 'State' },
    { name: 'organization_city', label: 'City' },
    { name: 'organization_postal_code', label: 'Pincode' }
  ];

  const filingAddress = [
    { name: 'filing_address_line1', label: 'Address Line 1' },
    { name: 'filing_address_line2', label: 'Address Line 2' },
    { name: 'filing_state', label: 'State' },
    { name: 'filing_city', label: 'City' },
    { name: 'filing_postal_code', label: 'Pincode' }
  ];

  // Formik validation schema
  const validationSchema = Yup.object({
    organization_name: Yup.string()
      .required('Organization name is required')
      .min(3, 'Organization name must be at least 3 characters')
      .max(100, 'Organization name must be at most 100 characters'),

    logo: Yup.string().required('Logo is required').url('Invalid URL for logo'), // Assuming logo is a URL

    industry: Yup.string()
      .required('Industry is required')
      .min(3, 'Industry must be at least 3 characters')
      .max(50, 'Industry must be at most 50 characters'),

    contact_email: Yup.string().email('Invalid email address').required('Email is required'),

    sender: Yup.string()
      .required('Sender is required')
      .min(2, 'Sender name must be at least 2 characters')
      .max(50, 'Sender name must be at most 50 characters'),

    organization_address_line1: Yup.string()
      .required('Address Line 1 is required')
      .min(5, 'Address Line 1 must be at least 5 characters')
      .max(100, 'Address Line 1 must be at most 100 characters'),

    organization_state: Yup.string()
      .required('State is required')
      .min(2, 'State must be at least 2 characters')
      .max(50, 'State must be at most 50 characters'),

    organization_city: Yup.string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City must be at most 50 characters'),

    organization_postal_code: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid Pincode format. It must be exactly 6 digits.'),

    filing_address_line1: Yup.string()
      .required('Address Line 1 is required')
      .min(5, 'Address Line 1 must be at least 5 characters')
      .max(100, 'Address Line 1 must be at most 100 characters'),

    filing_state: Yup.string()
      .required('State is required')
      .min(2, 'State must be at least 2 characters')
      .max(50, 'State must be at most 50 characters'),

    filing_city: Yup.string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City must be at most 50 characters'),

    filing_postal_code: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid Pincode format. It must be exactly 6 digits.')
  });

  // Initialize Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      organization_name: '',
      logo: '',
      industry: '',
      contact_email: '',
      sender: '',
      organization_address_line1: '',
      organization_address_line2: '',
      organization_state: '',
      organization_city: '',
      organization_postal_code: '',
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
    <HomeCard title="Organization Details" tagline="Setup your organization before starting payroll">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
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
    </HomeCard>
  );
}

export default Organizationdetails;
