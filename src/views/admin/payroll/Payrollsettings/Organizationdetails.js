'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system
import HomeCard from '@/components/cards/HomeCard';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import CustomInput from '@/utils/CustomInput';
import CustomUpload from '@/utils/CustomUpload';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import { useSnackbar } from '@/components/CustomSnackbar';
import Factory from '@/utils/Factory';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { IconTemperature } from '@tabler/icons-react';

function Organizationdetails({ tab }) {
  const router = useRouter();
  const [payrollid, setPayrollId] = useState(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    const id = searchParams.get('payrollid'); // Get payrollid from query string
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  const { showSnackbar } = useSnackbar();
  const [postType, setPostType] = useState('');
  const [logoDetails, setLogoDetails] = useState([]);
  const fields = [
    { name: 'org_name', label: 'Organization Name' },
    { name: 'logo', label: 'Logo' },
    { name: 'industry', label: 'Industry' },
    { name: 'contact_email', label: 'Contact Email' },
    { name: 'sender_email', label: 'Sender' }
  ];

  // Address fields for organization and filing (with updated names)
  const organizationAddress = [
    { name: 'org_address_line1', label: 'Address Line 1' },
    { name: 'org_address_line2', label: 'Address Line 2' },
    { name: 'org_address_state', label: 'State' },
    { name: 'org_address_city', label: 'City' },
    { name: 'org_address_pincode', label: 'Pincode' }
  ];

  const filingAddress = [
    { name: 'filling_address_line1', label: 'Address Line 1' },
    { name: 'filling_address_line2', label: 'Address Line 2' },
    { name: 'filling_address_state', label: 'State' },
    { name: 'filling_address_city', label: 'City' },
    { name: 'filling_address_pincode', label: 'Pincode' }
  ];

  // Formik validation schema
  const validationSchema = Yup.object({
    org_name: Yup.string()
      .required('Organization name is required')
      .min(3, 'Organization name must be at least 3 characters')
      .max(100, 'Organization name must be at most 100 characters'),

    // logo: Yup.string().required('Logo is required').url('Invalid URL for logo'), // Assuming logo is a URL

    industry: Yup.string().required('Industry is required'),

    contact_email: Yup.string().email('Invalid email address').required('Email is required'),

    sender_email: Yup.string().email('Invalid email address').required('Email is required'),

    org_address_line1: Yup.string().required('Address Line 1 is required'),
    org_address_line2: Yup.string().required('Address Line 2 is required'),

    org_address_state: Yup.string().required('State is required'),

    org_address_city: Yup.string().required('City is required'),

    org_address_pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid Pincode format. It must be exactly 6 digits.'),

    filling_address_line1: Yup.string().required('Address Line 1 is required'),
    filling_address_line2: Yup.string().required('Address Line 2 is required'),
    filling_address_state: Yup.string().required('State is required'),

    filling_address_city: Yup.string().required('City is required'),

    filling_address_pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid Pincode format. It must be exactly 6 digits.')
  });

  // Initialize Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      org_name: '',
      logo: null,
      industry: '',
      contact_email: '',
      sender_email: '',
      org_address_line1: '',
      org_address_line2: '',
      org_address_state: '',
      org_address_city: '',
      org_address_pincode: '',
      filling_address_line1: '',
      filling_address_line2: '',
      filling_address_state: '',
      filling_address_city: '',
      filling_address_pincode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      let postData = new FormData();
      // postData.append('business_id', 1);

      Object.keys(values).forEach((key) => {
        if (key === 'logo' && values[key]) {
          postData.append(key, values[key]);
        } else if (values[key]) {
          postData.append(key, values[key]);
        }
      });

      let url = postType === 'post' ? `/payroll/orgs/` : `/payroll/orgs/${payrollid}/`;
      const { res, error } = await Factory(postType, url, postData);
      console.log(res);
      if (res.status_cd === 0) {
        showSnackbar(postType === 'post' ? 'Data Saved Successfully' : 'Data Updated Successfully', 'success');
      } else {
        showSnackbar(JSON.stringify(res.data.data), 'error');
      }
    }
  });

  const renderFields = (fields) => {
    return fields.map((field) => {
      if (field.name === 'logo') {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <CustomUpload
              fieldName={field.name}
              title="Upload Logo"
              setData={setLogoDetails} // This updates the parent component state
              logoDetails={values.logo} // Pass the logo URL to the component
            />
          </Grid2>
        );
      }

      if (field.name === 'org_address_state' || field.name === 'filling_address_state') {
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
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }} // Ensure it's full width
          />
        </Grid2>
      );
    });
  };
  const get_org_details = async () => {
    const url = `/payroll/orgs/${payrollid}/`;
    const { res, error } = await Factory('get', url, {});

    if (res.status_cd === 0) {
      setValues((prev) => ({
        ...prev,
        org_name: res.data.org_name || '',
        logo: res.data.logo || null,
        industry: res.data.industry || '',
        contact_email: res.data.contact_email || '',
        sender_email: res.data.sender_email || '',
        org_address_line1: res.data.org_address_line1 || '',
        org_address_line2: res.data.org_address_line2 || '',
        org_address_state: res.data.org_address_state || '',
        org_address_city: res.data.org_address_city || '',
        org_address_pincode: res.data.org_address_pincode || '',
        filling_address_line1: res.data.filling_address_line1 || '',
        filling_address_line2: res.data.filling_address_line2 || '',
        filling_address_state: res.data.filling_address_state || '',
        filling_address_city: res.data.filling_address_city || '',
        filling_address_pincode: res.data.filling_address_pincode || ''
      }));
      setPostType('put');
    } else {
      // showSnackbar(JSON.stringify(res.data.data), 'error');
      setPostType('post');
    }
  };

  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;

  useEffect(() => {
    get_org_details();
  }, []);
  useEffect(() => {
    setFieldValue('logo', logoDetails);
  }, [logoDetails]);
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
