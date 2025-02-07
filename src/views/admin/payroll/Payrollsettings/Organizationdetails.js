'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import HomeCard from '@/components/cards/HomeCard';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import CustomInput from '@/utils/CustomInput';
import CustomUpload from '@/utils/CustomUpload';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import { industries } from '@/utils/industries';

import { useSnackbar } from '@/components/CustomSnackbar';
import Factory from '@/utils/Factory';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';

function Organizationdetails({ tab }) {
  const { userData } = useCurrentUser();
  const router = useRouter();
  const [payrollid, setPayrollId] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  const { showSnackbar } = useSnackbar();
  const [postType, setPostType] = useState('');
  const [logoDetails, setLogoDetails] = useState([]);

  // Define fields for dynamic rendering
  const fields = [
    { name: 'org_name', label: 'Organization Name' },
    { name: 'logo', label: 'Logo' },
    { name: 'industry', label: 'Industry' },
    { name: 'contact_email', label: 'Contact Email' },
    { name: 'sender_email', label: 'Sender' }
  ];

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

  const validationSchema = Yup.object({
    org_name: Yup.string().required('Organization name is required'),
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
      postData.append('business_id', userData.id);
      Object.keys(values).forEach((key) => {
        if (key === 'logo' && values[key]) {
          postData.append(key, values[key]);
        } else if (values[key]) {
          postData.append(key, values[key]);
        }
      });

      let url = postType === 'post' ? `/payroll/orgs/` : `/payroll/orgs/${payrollid}/`;
      const { res, error } = await Factory(postType, url, postData);

      if (res.status_cd === 0) {
        showSnackbar(postType === 'post' ? 'Data Saved Successfully' : 'Data Updated Successfully', 'success');
        router.back();
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
              title="Upload Logo"
              setData={setLogoDetails} // This function will update the parent state with the selected file
              logoDetails={values.logo} // Pass the file object for display if needed (optional)
              existingImageUrl={values.logo} // The URL of the existing image (e.g., from S3 or API response)
            />
          </Grid2>
        );
      }

      if (field.name === 'org_address_state' || field.name === 'filling_address_state' || field.name === 'industry') {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <CustomAutocomplete
              value={values[field.name]}
              name={field.name}
              onChange={(e, newValue) => setFieldValue(field.name, newValue)}
              options={field.name === 'industry' ? industries : indian_States_And_UTs}
              error={touched[field.name] && Boolean(errors[field.name])}
              helperText={touched[field.name] && errors[field.name]}
              sx={{ width: '100%' }}
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
            sx={{ width: '100%' }}
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
        ...res.data
      }));
      setPostType('put');
    } else {
      setPostType('post');
    }
  };
  const handleDeleteLogo = () => {
    setLogoDetails(null); // Clear the logo details
    setExistingImageUrl(null); // Clear the existing image URL
  };
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;

  useEffect(() => {
    if (payrollid !== null) get_org_details();
  }, [payrollid]);

  useEffect(() => {
    setFieldValue('logo', logoDetails);
  }, [logoDetails]);
  return (
    <HomeCard title="Organization Details" tagline="Setup your organization before starting payroll">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
        <Grid2 container spacing={3}>
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
