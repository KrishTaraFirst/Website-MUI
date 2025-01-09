'use client';
import { useSearchParams } from 'next/navigation';
import CustomAutocomplete from '@/components/CustomComponents/CustomAutocomplete';
import CustomInput from '@/components/CustomComponents/CustomInput';
import AdditionalDetails from './componnets/AdditionalDetails';
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Radio,
  Card,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Stack,
  DialogContent
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ServicesSuccessMessage from './componnets/ServicesSuccessMessage';
import Serviceselection from './componnets/Serviceselection';
import ServiceHistory from './componnets/ServiceHistory';
import CloseIcon from '@mui/icons-material/Close';
import Factory from '@/utils/Factory';
import { titles } from './data';
import MainCard from '@/components/MainCard';
// import { useAuth } from '@/app/context/AuthContext';

import { useRouter } from 'next/navigation';

/***************************  COMPONENT - TABLE  ***************************/

export default function ServiceRequest({ tab }) {
  const searchParams = useSearchParams();
  const title = searchParams.get('title'); // Retrieve 'name' from query params
  const service_id = searchParams.get('id'); // Retrieve 'name' from query params
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [clientList, setClientList] = useState([]);

  let visaTypes = ['Student Visa', 'Visit', 'Work Visa', 'Business'];
  const visaPurposes = ['Tourism', 'Business', 'Study', 'Work', 'Medical Treatment'];

  const destinationCountries = ['FRANCE', 'USA', 'Australia', 'Canada', 'Germany', 'INDIA'];

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      mobile_number: '',
      purpose: 'Visa',
      visa_type: '',
      destination_country: '',
      passport_number: ''
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      mobile_number: Yup.string().required('Mobile number is required'),
      purpose: Yup.string().required('Purpose is required'),
      visa_type: Yup.string().required('Visa type is required'),
      destination_country: Yup.string().required('Destination country is required'),
      passport_number: Yup.string()
        .nullable() // Allows empty values without error
        .matches(/^[A-Z0-9]{8,9}$/, 'Invalid passport number format')
    }),
    onSubmit: async (values) => {
      const postData = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile_number: values.mobile_number,
        purpose: values.purpose,
        visa_type: values.visa_type,
        destination_country: values.destination_country,
        passport_number: values.passport_number
      };
      const url = `/user_management/visa-users/`;
      const { res, error } = await Factory('post', url, postData);

      if (res.status_cd === 0) {
        getClientList();
        resetForm();
        // let selectedClientData = clientList.find(
        //   (client) =>
        //     client.first_name + " " + client.last_name ===
        //     values.first_name + " " + values.last_name
        // );
        // setSelectedClient(selectedClientData);
        setDialogOpen(false);
      } else {
        alert(res.data.data['email'] || res.data.data['mobile_number']);
        // alert("Something went wrong");
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, values, setValues, resetForm } = formik;

  const getClientList = async () => {
    const url = '/user_management/visa-clients/';

    const { res, error } = await Factory('get', url, {});

    if (res.status_cd === 0) {
      setClientList(res.data);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    getClientList();
  }, [refresh]);

  useEffect(() => {
    if (selectedClient && Object.keys(selectedClient).length !== 0) {
      let selectedClientData = clientList.find(
        (client) => client.first_name + ' ' + client.last_name === selectedClient.first_name + ' ' + selectedClient.last_name
      );
      setSelectedClient(selectedClientData);
      setValues({
        first_name: selectedClient.first_name,
        last_name: selectedClient.last_name,
        email: selectedClient.email,
        mobile_number: selectedClient.mobile_number,

        purpose:
          selectedClient.services.length === 0
            ? selectedClient.purpose
            : selectedClient.services[selectedClient.services.length - 1]?.purpose,

        visa_type:
          selectedClient.services.length === 0
            ? selectedClient.visa_type
            : selectedClient.services[selectedClient.services.length - 1]?.visa_type,
        destination_country:
          selectedClient.services.length === 0
            ? selectedClient.destination_country
            : selectedClient.services[selectedClient.services.length - 1]?.destination_country,

        passport_number:
          selectedClient.services.length === 0
            ? selectedClient.passport_number
            : selectedClient.services[selectedClient.services.length - 1]?.passport_number
      });
    }
  }, [clientList, selectedClient]);

  return (
    <MainCard>
      <Stack direction="row" sx={{ mb: 4, justifyContent: 'space-between' }}>
        <Stack direction="column">
          <Stack sx={{ gap: 0 }}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              {titles[tab]}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.700' }}>
              Some text tagline regarding Services.
            </Typography>
          </Stack>
        </Stack>
        {'ServiceProvider_Admin' === 'ServiceProvider_Admin' && (
          // {user.user_role === 'ServiceProvider_Admin' && (
          <Stack>
            <Button
              variant="contained"
              onClick={() => {
                setValues({
                  first_name: '',
                  last_name: '',
                  email: '',
                  mobile_number: '',
                  purpose: 'Visa',
                  visa_type: '',
                  destination_country: '',
                  passport_number: ''
                });
                setDialogOpen(true);
              }}
            >
              Add New Client
            </Button>
          </Stack>
        )}
      </Stack>

      {showSuccessMessage ? (
        <ServicesSuccessMessage visadetails={values} selectedClientData={selectedClient} />
      ) : (
        <>
          <Grid container spacing={2}>
            {/* <label>Existing Clients</label> */}
            <Grid item xs={12} md={6}>
              <CustomAutocomplete
                id="Client"
                label="Select Client"
                options={clientList.map((client) => client.first_name + ' ' + client.last_name)}
                onChange={(event, newValue) => {
                  // Find the client object corresponding to the selected name
                  let selectedClientData = clientList.find((client) => client.first_name + ' ' + client.last_name === newValue);
                  setSelectedClient(selectedClientData); // Set the actual client object
                }}
              />
            </Grid>
          </Grid>
          {selectedClient && Object.keys(selectedClient).length !== 0 && (
            <>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  padding: '8px 0',
                  mt: 3
                }}
              >
                <Grid container spacing={3}>
                  {/* Row 1 */}
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="first_name"
                      label="First Name"
                      {...getFieldProps('first_name')}
                      touched={touched.first_name}
                      errors={errors.first_name}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="last_name"
                      label="Last Name"
                      {...getFieldProps('last_name')}
                      touched={touched.last_name}
                      errors={errors.last_name}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="email"
                      label="Email"
                      {...getFieldProps('email')}
                      touched={touched.email}
                      errors={errors.email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="mobile_number"
                      label="Mobile Number"
                      {...getFieldProps('mobile_number')}
                      touched={touched.mobile_number}
                      errors={errors.mobile_number}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomAutocomplete
                      id="purpose"
                      label="Purpose"
                      value="Visa"
                      options={visaPurposes}
                      disabled={true}
                      {...getFieldProps('purpose')}
                      error={touched.purpose && Boolean(errors.purpose)} // Check if the field was touched and has an error
                      helperText={touched.purpose && errors.purpose} // Display the error message
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomAutocomplete
                      id="visa_type"
                      label="Visa Type"
                      options={visaTypes}
                      {...getFieldProps('visa_type')}
                      error={touched.visa_type && Boolean(errors.visa_type)} // Check if the field was touched and has an error
                      helperText={touched.visa_type && errors.visa_type} // Display the error message
                      onChange={(event, newValue) => {
                        formik.setFieldValue('visa_type', newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomAutocomplete
                      id="destination_country"
                      label="Destination Country"
                      options={destinationCountries}
                      {...getFieldProps('destination_country')}
                      error={touched.destination_country && Boolean(errors.destination_country)} // Check if the field was touched and has an error
                      helperText={touched.destination_country && errors.destination_country} // Display the error message
                      onChange={(event, newValue) => {
                        formik.setFieldValue('destination_country', newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="passport_number"
                      label="Passport Number"
                      {...getFieldProps('passport_number')}
                      touched={touched.passport_number}
                      errors={errors.passport_number}
                    />
                  </Grid>
                </Grid>
              </Box>
              {titles[tab] === 'Create New Request' ? (
                <Serviceselection
                  visadetails={values}
                  selectedClientData={selectedClient}
                  setShowSuccessMessage={setShowSuccessMessage}
                  setRefresh={setRefresh}
                />
              ) : (
                <AdditionalDetails
                  visadetails={values}
                  selectedClientData={selectedClient}
                  selectedTitle={titles[tab]}
                  service_id={service_id}
                  setShowSuccessMessage={setShowSuccessMessage}
                />
              )}

              <ServiceHistory setSelectedClient={setSelectedClient} selectedClientData={selectedClient} setRefresh={setRefresh} />
            </>
          )}
        </>
      )}
      <Dialog open={dialogOpen} maxWidth="sm">
        <DialogTitle>Add Client</DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="first_name"
                  label="First Name"
                  {...getFieldProps('first_name')}
                  touched={touched.first_name}
                  errors={errors.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="last_name"
                  label="Last Name"
                  {...getFieldProps('last_name')}
                  touched={touched.last_name}
                  errors={errors.last_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput id="email" label="Email" {...getFieldProps('email')} touched={touched.email} errors={errors.email} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="mobile_number"
                  label="Mobile Number"
                  {...getFieldProps('mobile_number')}
                  touched={touched.mobile_number}
                  errors={errors.mobile_number}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  id="purpose"
                  label="Purpose"
                  value="Visa"
                  options={visaPurposes}
                  disabled={true}
                  {...getFieldProps('purpose')}
                  error={touched.purpose && Boolean(errors.purpose)} // Check if the field was touched and has an error
                  helperText={touched.purpose && errors.purpose} // Display the error message
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  id="visa_type"
                  label="Visa Type"
                  options={visaTypes}
                  {...getFieldProps('visa_type')}
                  error={touched.visa_type && Boolean(errors.visa_type)} // Check if the field was touched and has an error
                  helperText={touched.visa_type && errors.visa_type} // Display the error message
                  onChange={(event, newValue) => {
                    formik.setFieldValue('visa_type', newValue);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  id="destination_country"
                  label="Destination Country"
                  options={destinationCountries}
                  {...getFieldProps('destination_country')}
                  error={touched.destination_country && Boolean(errors.destination_country)} // Check if the field was touched and has an error
                  helperText={touched.destination_country && errors.destination_country} // Display the error message
                  onChange={(event, newValue) => {
                    formik.setFieldValue('destination_country', newValue);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="passport_number"
                  label="Passport Number"
                  {...getFieldProps('passport_number')}
                  touched={touched.passport_number}
                  errors={errors.passport_number}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="error"
              type="button"
              disabled={formik.isSubmitting}
              onClick={() => {
                setValues({
                  first_name: selectedClient.first_name,
                  last_name: selectedClient.last_name,
                  email: selectedClient.email,
                  mobile_number: selectedClient.mobile_number,
                  purpose: selectedClient.purpose,
                  visa_type: selectedClient.visa_type,
                  destination_country: selectedClient.destination_country,
                  passport_number: selectedClient.passport_number
                });
                setDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
              sx={{
                padding: '8px 32px',
                textTransform: 'none'
              }}
            >
              {formik.isSubmitting ? 'Processing...' : 'Submit'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </MainCard>
  );
}
