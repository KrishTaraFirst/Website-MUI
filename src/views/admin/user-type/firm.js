'use client';
import dayjs from 'dayjs'; // Import dayjs
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  Box,
  Typography,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Radio,
  FormControlLabel,
  RadioGroup,
  Grid2
} from '@mui/material';
import CustomDatePicker from '@/utils/CustomDateInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { statesAndUTs } from '@/utils/helperData';
import Factory from '@/utils/Factory';
import { TextField } from '@mui/material';

export default function FirmForm() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [firmKycDialogOpen, setFirmKycDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
    caKycFormik.setFieldValue('dob', dayjs(newDate).format('YYYY-MM-DD'));
  };

  const caKycFields = [
    { name: 'name', label: 'Name' },
    { name: 'dob', label: 'Date of Birth' },
    { name: 'icai_number', label: 'ICAI Number' },
    { name: 'aadhaar_number', label: 'Aadhaar Number' },
    { name: 'pan_number', label: 'PAN Number' },
    { name: 'address_line1', label: 'Registered Address Line 1' },
    { name: 'address_line2', label: 'Registered Address Line 2' },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State' },
    { name: 'zip', label: 'Pin Code' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'country', label: 'Country' }
  ];

  const firmKycFields = [
    { name: 'firmname', label: 'Firm Name' },
    { name: 'firmregistrationnumber', label: 'Firm Registration Number' },
    { name: 'firmemail', label: 'Firm Email' },
    { name: 'firmmobilenumber', label: 'Firm Mobile Number' },
    { name: 'noofpartnersinfirm', label: 'Number of Partners in Firm' },
    { name: 'address_line1', label: 'Firm Address Line 1' },
    { name: 'address_line2', label: 'Firm Address Line 2' },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State' },
    { name: 'zip', label: 'Pin Code' },
    { name: 'country', label: 'Country' }
  ];
  const caKycValidationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(100, 'Name must not exceed 100 characters'),
    dob: Yup.date().required('Date of birth is required'),
    icai_number: Yup.string()
      .required('ICAI Number is required')
      .matches(/^[A-Z]{4}[0-9]{5}[A-Z]$/, 'Invalid format. ICAI Format should be: ABCD12345E'),
    aadhaar_number: Yup.string()
      .required('Aadhaar Number is required')
      .matches(/^\d{12}$/, 'Invalid Aadhaar Number (must be 12 digits)'),
    pan_number: Yup.string()
      .required('PAN Number is required')
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN Number format'),
    address_line1: Yup.string().required('Address Line 1 is required'),
    address_line2: Yup.string().optional(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string()
      .required('Pin Code is required')
      .matches(/^\d{6}$/, 'Invalid Pin Code (must be 6 digits)'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^\d{10}$/, 'Invalid phone number (must be 10 digits)'),
    have_firm: Yup.boolean().required('Please select if you have a firm'),
    country: Yup.string().required('Country is required')
  });
  const firmKycValidationSchema = Yup.object({
    firmname: Yup.string()
      .required('Firm Name is required')
      .min(3, 'Firm Name must be at least 3 characters')
      .max(100, 'Firm Name must not exceed 100 characters'),
    firmregistrationnumber: Yup.string()
      .required('Firm Registration Number is required')
      .matches(/^[A-Z0-9]{10}$/, 'Invalid format. Format should be: ABCD123456'),

    firmemail: Yup.string().required('Firm Email is required').email('Invalid email format'),
    firmmobilenumber: Yup.string()
      .required('Firm Mobile Number is required')
      .matches(/^\d{10}$/, 'Invalid mobile number (must be 10 digits)'),
    noofpartnersinfirm: Yup.number()
      .required('Number of Partners in Firm is required')
      .positive('Number of partners must be a positive integer')
      .integer('Number of partners must be an integer')
      .typeError('Number of partners must be an integer'),
    address_line1: Yup.string().required('Firm Address Line 1 is required'),
    address_line2: Yup.string().optional(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string()
      .required('Pin Code is required')
      .matches(/^\d{6}$/, 'Invalid Pin Code (must be 6 digits)'),
    country: Yup.string().required('Country is required')
  });

  const caKycFormik = useFormik({
    initialValues: {
      name: '',
      dob: new Date(),
      icai_number: '',
      aadhaar_number: '',
      pan_number: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      have_firm: 'false',
      country: 'IN'
    },
    validationSchema: caKycValidationSchema,
    onSubmit: async (values) => {
      const postData = {
        name: values.name,
        icai_number: values.icai_number,
        aadhaar_number: values.aadhaar_number,
        pan_number: values.pan_number,
        address: {
          address_line1: values.address_line1,
          address_line2: values.address_line2 || '',
          address_line3: values.registeredaddresslane3 || '',
          pinCode: values.zip,
          state: values.state,
          city: values.city,
          country: values.country
        },
        have_firm: values.have_firm,
        date: values.dob
      };

      setDialogOpen(false);
      setFirmKycDialogOpen(true);
      console.log('1');
      // try {
      //   const url = `/user_management/users-kyc/`;

      //   const { res, error } = await Factory("post", url, postData);
      //   console.log(res); // Log the response

      //   if (res.status_cd === 0) {
      //     if (postData.have_firm === "true") {
      //       setDialogOpen(false); // Close the current dialog
      //       setFirmkycDialogOpen(true); // Open the firm KYC dialog
      //     } else {
      //       alert("something went wrong");
      //     }
      //   } else {
      //     alert("Please check your credentials.");
      //   }
      // } catch (error) {
      //   console.error("KYC submission error:", error);
      //   alert("Something went wrong. Please try again.");
      // }
    }
  });

  const firmKycFormik = useFormik({
    initialValues: {
      firmname: '',
      firmregistrationnumber: '',
      firmemail: '',
      firmmobilenumber: '',
      noofpartnersinfirm: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip: '',
      country: 'IN'
    },
    validationSchema: firmKycValidationSchema,
    onSubmit: async (values) => {
      const postData = {
        firm_name: values.firmname,
        firm_registration_number: values.firmregistrationnumber,
        firm_email: values.firmemail,
        firm_mobile_number: values.firmmobilenumber,
        address: {
          address_line1: values.address_line1,
          address_line2: values.address_line2 || '',
          address_line3: values.firmaddress3 || '',
          pinCode: values.zip,
          state: values.state,
          city: values.city,
          country: values.country
        },
        number_of_firm_partners: Number(values.noofpartnersinfirm)
      };

      setFirmKycDialogOpen(false);
      // Send postData to the server here
      console.log('2');
      // try {
      //   const url = `/user_management/firmkyc/`;

      //   const { res, error } = await Factory("post", url, postData);
      //   console.log(res); // Log the response

      //   if (res.status_cd === 0) {
      //     setFirmkycDialogOpen(false); // Open the firm KYC dialog
      //     router.push("/tara");
      //   } else {
      //     alert("Something went wrong");
      //   }
      // } catch (error) {
      //   console.error("KYC submission error:", error);
      //   alert("Something went wrong. Please try again.");
      // }
    }
  });
  const renderFields = (fields, formik, handleDateChange) => {
    return fields.map((field) => {
      if (field.name === 'state') {
        return (
          <Grid2 item key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <CustomAutocomplete
              value={formik.values[field.name]}
              onChange={(event, newValue) => formik.setFieldValue(field.name, newValue)}
              options={statesAndUTs}
              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
              helperText={formik.touched[field.name] && formik.errors[field.name]}
              name={field.name}
            />
          </Grid2>
        );
      } else if (field.name === 'dob') {
        return (
          <Grid2 item key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <CustomDatePicker
              value={formik.values.dob ? dayjs(formik.values.dob) : null}
              onChange={handleDateChange}
              views={['year', 'month', 'day']}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={formik.touched.dob && formik.errors.dob}
              sx={{ width: '100%', '& .MuiInputBase-root': { fontSize: '0.75rem', height: '40px' } }}
            />
          </Grid2>
        );
      } else {
        return (
          <Grid2 item key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <TextField
              fullWidth
              name={field.name}
              value={formik.values[field.name]}
              onChange={(e) => {
                if (field.name === 'pan_number') {
                  formik.setFieldValue(field.name, e.target.value.toUpperCase());
                } else {
                  formik.setFieldValue(field.name, e.target.value);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
              helperText={formik.touched[field.name] && formik.errors[field.name]}
              disabled={field.name === 'country'}
            />
          </Grid2>
        );
      }
    });
  };
  const { errors, touched, handleSubmit: handleCaKycSubmit, getFieldProps: getCaKycFieldProps } = caKycFormik;
  const {
    errors: firmKycErrors,
    touched: firmKycTouched,
    handleSubmit: handleFirmKycSubmit,
    getFieldProps: getFirmKycFieldProps
  } = firmKycFormik;

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <Dialog open={dialogOpen} maxWidth="sm">
        <DialogTitle>
          <Typography variant="h4">Chartered Accountant KYC</Typography>
          <Typography variant="body2">Please provide the necessary details to complete the registration.</Typography>
        </DialogTitle>
        <form onSubmit={handleCaKycSubmit}>
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Grid2 container spacing={2}>
              {renderFields(caKycFields, caKycFormik, handleDateChange)}
            </Grid2>

            <RadioGroup
              name="have_firm"
              value={caKycFormik.values.have_firm}
              onChange={(e) => caKycFormik.setFieldValue('have_firm', e.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              <Typography variant="body1" sx={{ marginRight: '8px' }}>
                Do you have a firm?
              </Typography>
              <FormControlLabel value="true" label="Yes" control={<Radio />} />
              <FormControlLabel value="false" label="No" control={<Radio />} />
            </RadioGroup>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button onClick={() => setDialogOpen(false)} variant="outlined" color="error" type="button">
              Back
            </Button>
            <Button variant="contained" type="submit" disabled={caKycFormik.isSubmitting}>
              {caKycFormik.isSubmitting ? 'Processing...' : 'Next'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={firmKycDialogOpen} onClose={() => setFirmKycDialogOpen(false)} maxWidth="sm">
        <DialogTitle>
          <Typography variant="h4">Firm KYC</Typography>
          <Typography variant="body2">Please provide the necessary details to complete the registration.</Typography>
        </DialogTitle>
        <form onSubmit={handleFirmKycSubmit}>
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Grid2 container spacing={2}>
              {renderFields(firmKycFields, firmKycFormik, handleDateChange)}
            </Grid2>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button onClick={() => setDialogOpen(true)} variant="outlined" color="error" type="button">
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={firmKycFormik.isSubmitting}
              sx={{
                padding: '8px 32px',
                textTransform: 'none'
              }}
            >
              {firmKycFormik.isSubmitting ? 'Processing...' : 'Complete Firm KYC'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
