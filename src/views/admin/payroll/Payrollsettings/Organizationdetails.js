'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CardContent, Button, Box, Typography, Tooltip, Card } from '@mui/material';
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
import Loader from '@/components/PageLoader';
import MainCard from '@/components/MainCard';
import { entity_choices } from '@/utils/Entity-types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IconChevronDown, IconHelp } from '@tabler/icons-react';

function Organizationdetails({ tab }) {
  const { userData } = useCurrentUser();
  let businessId = userData.user_type === 'Business' ? userData.business_affiliated[0].id : userData.businesssDetails.business[0].id;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [payrollid, setPayrollId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [postType, setPostType] = useState('');
  const [logoDetails, setLogoDetails] = useState([]);
  const [filingAddress, setFilingAddress] = useState({});

  const initialData = {
    business_name: '',
    logo: null,
    industry: '',
    pan: '',
    entityType: '',
    registration_number: '',

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
  };
  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);
  const fields = [
    { name: 'business_name', label: 'Business Name' },
    { name: 'logo', label: 'Logo' },
    { name: 'industry', label: 'Industry' },
    { name: 'pan', label: 'Business PAN' },
    { name: 'entityType', label: 'Entity Type' },
    { name: 'registration_number', label: 'CIN/ LLPIN / Reg. No' },
    { name: 'dob', label: 'DOB / DOI' },
    { name: 'primary_email', label: 'Primary Email' },
    { name: 'sender_email', label: 'Sender Email' }
  ];

  const organizationAddress = [
    { name: 'org_address_line1', label: 'Address Line 1' },
    { name: 'org_address_line2', label: 'Address Line 2' },
    { name: 'country', label: 'Country' },
    { name: 'org_address_state', label: 'State' },
    { name: 'org_address_city', label: 'City' },
    { name: 'org_address_pincode', label: 'Pincode' }
  ];

  // const filingAddress = [
  //   { name: 'filling_address_line1', label: 'Address Line 1' },
  //   { name: 'filling_address_line2', label: 'Address Line 2' },
  //   { name: 'filling_address_state', label: 'State' },
  //   { name: 'filling_address_city', label: 'City' },
  //   { name: 'filling_address_pincode', label: 'Pincode' }
  // ];

  const validationSchema = Yup.object({
    business_name: Yup.string().required('Organization name is required'),
    industry: Yup.string().required('Industry is required'),
    pan: Yup.string()
      .required('PAN Number is required')
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN Number format'),
    entityType: Yup.string().required('Entity Type is required'),
    registration_number: Yup.string().required('This field is required'),
    dob: Yup.string().required('This field is required'),

    contact_email: Yup.string().email('Invalid email address').required('Email is required'),
    sender_email: Yup.string().email('Invalid email address').required('Email is required'),
    org_address_line1: Yup.string().required('Address Line 1 is required'),
    org_address_state: Yup.string().required('State is required'),
    org_address_city: Yup.string().required('City is required'),
    org_address_pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid Pincode format. It must be exactly 6 digits.'),
    filling_address_line1: Yup.string().required('Address Line 1 is required'),
    filling_address_state: Yup.string().required('State is required'),
    filling_address_city: Yup.string().required('City is required'),
    filling_address_pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid Pincode format. It must be exactly 6 digits.')
  });

  const formik = useFormik({
    initialValues: { initialData },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const postData = new FormData();
      postData.append('business', businessId);
      Object.keys(values).forEach((key) => {
        if (key === 'logo' && values[key]) {
          postData.append(key, values[key]);
        } else if (values[key]) {
          postData.append(key, values[key]);
        }
      });
      console.log(postType);
      const url = postType === 'post' ? `/payroll/orgs/` : `/payroll/orgs/${payrollid}/`;
      const { res, error } = await Factory(postType, url, postData);
      setLoading(false);
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
            <CustomUpload title="Upload Logo" setData={setLogoDetails} logoDetails={values.logo} existingImageUrl={values.logo} />
          </Grid2>
        );
      }

      if (
        field.name === 'org_address_state' ||
        field.name === 'filling_address_state' ||
        field.name === 'industry' ||
        field.name === 'entityType'
      ) {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography sx={{ mb: 1 }}>
              {field.label} {<span style={{ color: 'red' }}>*</span>}
            </Typography>
            <CustomAutocomplete
              value={values[field.name]}
              name={field.name}
              onChange={(e, newValue) => setFieldValue(field.name, newValue)}
              options={field.name === 'industry' ? industries : field.name === 'entityType' ? entity_choices : indian_States_And_UTs}
              error={touched[field.name] && Boolean(errors[field.name])}
              helperText={touched[field.name] && errors[field.name]}
              sx={{ width: '100%' }}
              // disabled={field.name === 'org_address_state'}
            />
          </Grid2>
        );
      }

      return (
        <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography sx={{ mb: 1 }}>
            {field.label}{' '}
            {field.name !== 'org_address_line2' && field.name !== 'filling_address_line2' && <span style={{ color: 'red' }}>*</span>}{' '}
            {field.name === 'sender_email' && (
              <Tooltip title="Pay slips, offer letters, and emails will be sent through this email." placement="right" arrow>
                <InfoOutlinedIcon sx={{ fontSize: 18, ml: 0.5, color: 'gray', cursor: 'pointer' }} />
              </Tooltip>
            )}
          </Typography>
          <CustomInput
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
            // disabled={
            //   field.name === 'business_name' ||
            //   field.name === 'org_address_line1' ||
            //   field.name === 'org_address_line2' ||
            //   field.name === 'org_address_city' ||
            //   field.name === 'org_address_pincode'
            // }
          />
        </Grid2>
      );
    });
  };
  const getOrgDetails = async (id) => {
    setLoading(true);
    const url = `/payroll/orgs/${id}/`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false); // Stop loading after the request completes
    console.log(res);
    if (res.status_cd === 0) {
      setValues((prev) => ({
        ...prev,
        ...res.data,
        org_address_line1: res.data?.organisation_address?.address_line1,
        org_address_line2: res.data?.organisation_address?.address_line2,
        org_address_state: res.data?.organisation_address?.state,
        org_address_city: res.data?.organisation_address?.city,
        org_address_pincode: res.data?.organisation_address?.pincode
      }));
      setPostType('put');
    } else {
      showSnackbar(JSON.stringify(res.data.data), 'error');
    }
  };
  const individual_Business_get = async () => {
    setLoading(true);
    let businessId = userData.user_type === 'Business' ? userData.business_affiliated[0].id : userData.businesssDetails.business[0].id;

    const url = `/user_management/businesses/${businessId}/`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false); // Stop loading after the request completes
    console.log(res);
    if (res.status_cd === 0) {
      setValues((prev) => ({
        ...prev,
        business_name: res.data.nameOfBusiness,
        pan: res.data.pan,
        entityType: res.data.entityType,
        registrationNumber: res.data.registrationNumber,
        dob_or_incorp_date: res.data.dob_or_incorp_date,
        email: res.data.email
      }));
      setPostType('put');
    } else {
      showSnackbar(JSON.stringify(res.data.data), 'error');
    }
  };
  useEffect(() => {
    if (payrollid) {
      getOrgDetails(payrollid);
    } else if (userData) {
      individual_Business_get();
      setPostType('post');
    }
  }, [payrollid, userData]);
  useEffect(() => {
    setFieldValue('logo', logoDetails);
  }, [logoDetails]);
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <HomeCard title="Business profile" tagline="Setup your organization before starting payroll">
          <MainCard>
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: 1 }}>
              <Grid2 container spacing={2}>
                {renderFields(fields)}
              </Grid2>

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 3, mb: 2 }}>
                Organization Address
                <span>
                  {' '}
                  <Tooltip title="This will be your primary work location." placement="right" arrow>
                    <InfoOutlinedIcon sx={{ fontSize: 18, ml: 0.5, color: 'gray', cursor: 'pointer' }} />
                  </Tooltip>
                </span>
              </Typography>

              <Grid2 container spacing={2}>
                {renderFields(organizationAddress)}
              </Grid2>

              <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ flexShrink: 0 }}>
                  Filing Address
                </Typography>
                <Card sx={{ flex: 1 }}>
                  <CardContent>
                    <Typography variant="body2">
                      <strong>Address Line 1:</strong> {filingAddress.filling_address_line1}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Address Line 2:</strong> {filingAddress.filling_address_line2}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Country:</strong> {filingAddress.country}
                    </Typography>
                    <Typography variant="body2">
                      <strong>State:</strong> {filingAddress.filling_address_state}
                    </Typography>
                    <Typography variant="body2">
                      <strong>City:</strong> {filingAddress.filling_address_city}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Pincode:</strong> {filingAddress.filling_address_pincode}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              {/* <Grid2 container spacing={2}>
                {renderFields(filingAddress)}
              </Grid2> */}

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Back to Dashboard
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Box>
          </MainCard>
        </HomeCard>
      )}
    </>
  );
}

export default Organizationdetails;
