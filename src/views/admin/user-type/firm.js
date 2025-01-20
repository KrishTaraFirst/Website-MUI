'use client';
import dayjs from 'dayjs'; // Import dayjs

import CustomInput from '@/utils/CustomInput';
import { useRouter } from 'next/navigation';
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
  Grid
} from '@mui/material';
import { useState } from 'react';
import { statesAndUTs } from '@/utils/helperData';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import Factory from '@/utils/Factory';
import CustomDatePicker from '@/utils/CustomDateInput';
export default function FirmForm() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [firmkycDialogOpen, setFirmkycDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with dayjs()

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD'); // Format to Year-Month-Date
    setSelectedDate(dayjs(newDate)); // Update the state with the selected date
    formik.setFieldValue('dob', formattedDate); // Set Formik value in Year-Month-Date format
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      dob: new Date(),
      icai_number: '',
      aadhaar_number: '',
      pan_number: '',
      registeredaddresslane1: '',
      registeredaddresslane2: '',
      registeredaddresslane3: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      have_firm: 'false',
      country: 'IN'
    },
    validationSchema: Yup.object({
      // name: Yup.string().required("Name is required"),
      // dob: Yup.string().required("DOB is required"),
      // icai_number: Yup.string().required("ICAI number is required"),
      // pan_number: Yup.string().required("PAN Card number is required"),
      // aadhaar_number: Yup.string().required("Aadhar Card number is required"),
      // registeredaddresslane1: Yup.string().required(
      //   "Address Line 1 is required"
      // ),
      // city: Yup.string().required("City is required"),
      // state: Yup.string().required("State is required"),
      // zip: Yup.string().required("Zip code is required"),
      // phoneNumber: Yup.string().required("Phone number is required"),
      // have_firm: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      // Construct postData
      const postData = {
        name: values.name,
        icai_number: values.icai_number,
        aadhaar_number: values.aadhaar_number,
        pan_number: values.pan_number,
        address: {
          address_line1: values.registeredaddresslane1,
          address_line2: values.registeredaddresslane2 || '', // Default to empty string if undefined
          address_line3: values.registeredaddresslane3 || '', // Default to empty string if undefined
          pinCode: values.zip,
          state: values.state,
          city: values.city,
          country: values.country
        },
        have_firm: values.have_firm,
        date: values.dob
      };
      setDialogOpen(false); // Close the current dialog
      console.log('1');
      setFirmkycDialogOpen(true);
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

  const firmkycFormik = useFormik({
    initialValues: {
      firmname: '',
      firmregistrationnumber: '',
      firmemail: '',
      firmmobilenumber: '',
      noofpartnersinfirm: '',
      firmaddress1: '',
      firmaddress2: '',
      firmaddress3: '',
      city: '',
      state: '',
      zip: '',
      country: 'IN'
    },
    validationSchema: Yup.object({
      // firmname: Yup.string().required("Firm Name is required"),
      // firmregistrationnumber: Yup.string().required(
      //   "Firm Registration Number is required"
      // ),
      // firmemail: Yup.string()
      //   .email("Invalid email address")
      //   .required("Firm Email is required"),
      // firmmobilenumber: Yup.string().required("Firm Mobile Number is required"),
      // noofpartnersinfirm: Yup.string().required("No of Partners is required"),
      // city: Yup.string().required("City is required"),
      // state: Yup.string().required("State is required"),
      // zip: Yup.string().required("Zip code is required"),
      // firmaddress1: Yup.string().required("Firm Address  is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const postData = {
        firm_name: values.firmname,
        firm_registration_number: values.firmregistrationnumber,
        firm_email: values.firmemail,
        firm_mobile_number: values.firmmobilenumber,
        address: {
          address_line1: values.firmaddress1,
          address_line2: values.firmaddress2 || '', // Default to empty string if undefined
          address_line3: values.firmaddress3 || '', // Default to empty string if undefined
          pinCode: values.zip,
          state: values.state,
          city: values.city,
          country: values.country
        },
        number_of_firm_partners: Number(values.noofpartnersinfirm)
      };
      console.log('2');
      setDialogOpen(false);
      setFirmkycDialogOpen(true);
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

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const { errors: kycErrors, touched: kycTouched, handleSubmit: kycHandleSubmit, getFieldProps: getKycFieldProps } = firmkycFormik;

  console.log(kycErrors);

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
        <form onSubmit={kycHandleSubmit}>
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <CustomDatePicker
                  label="Date of Birth"
                  views={['year', 'month', 'day']}
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-root': {
                      fontSize: '0.75rem',
                      height: '40px'
                    }
                  }}
                  error={touched.dob && !!errors.dob}
                  helperText={touched.dob && errors.dob}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="name"
                  label="Name as per PAN Card"
                  {...getFieldProps('name')}
                  touched={touched.name}
                  errors={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="pan_number"
                  label="PAN Card Number"
                  {...getFieldProps('pan_number')}
                  touched={touched.pan_number}
                  errors={errors.pan_number}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="icai_number"
                  label="ICAI Number"
                  {...getFieldProps('icai_number')}
                  touched={touched.icai_number}
                  errors={errors.icai_number}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="aadhaar_number"
                  label="Aadhar Card Number"
                  {...getFieldProps('aadhaar_number')}
                  touched={touched.aadhaar_number}
                  errors={errors.aadhaar_number}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="country"
                  label="Country"
                  value={'IN'}
                  {...getFieldProps('country')}
                  // touched={touched.icai_number}
                  // errors={errors.icai_number}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="registeredaddresslane1"
                  label="Address Line 1"
                  {...getFieldProps('registeredaddresslane1')}
                  touched={touched.registeredaddresslane1}
                  errors={errors.registeredaddresslane1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="registeredaddresslane2"
                  label="Address Line 2 (optional)"
                  {...getFieldProps('registeredaddresslane2')}
                  // touched={touched.registeredaddresslane2}
                  // errors={errors.registeredaddresslane2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="registeredaddresslane3"
                  label="Address Line 2 (optional)"
                  {...getFieldProps('registeredaddresslane3')}
                  // touched={touched.registeredaddresslane3}
                  // errors={errors.registeredaddresslane3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  id="state"
                  label="State"
                  options={statesAndUTs} // Array of state/UT options
                  value={formik.values.state}
                  onChange={(e, newValue) => formik.setFieldValue('state', newValue)}
                  touched={touched.state}
                  errors={errors.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput id="city" label="City" {...getFieldProps('city')} touched={touched.city} errors={errors.city} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput id="zip" label="Zip Code" {...getFieldProps('zip')} touched={touched.zip} errors={errors.zip} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="phoneNumber"
                  label="Phone Number"
                  {...getFieldProps('phoneNumber')}
                  touched={touched.phoneNumber}
                  errors={errors.phoneNumber}
                />
              </Grid>
            </Grid>

            <RadioGroup
              name="have_firm"
              value={formik.values.have_firm}
              onChange={(e) => formik.setFieldValue('have_firm', e.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'row', // Align items horizontally
                gap: '16px', // Add space between the radio buttons
                alignItems: 'center' // Vertically align the radio buttons with the label
              }}
            >
              <Typography variant="body1" sx={{ marginRight: '8px' }}>
                Do you have a firm?
              </Typography>
              <FormControlLabel value="true" label="Yes" control={<Radio />} />
              <FormControlLabel value="false" label="No" control={<Radio />} />
            </RadioGroup>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'space-between'
            }}
          >
            <Button
              onClick={() => {
                setFirmkycDialogOpen(false);
                setDialogOpen(true);
              }}
              variant="outlined"
              color="error"
              type="button"
            >
              Back
            </Button>
            <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Processing...' : 'Next'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={firmkycDialogOpen} onClose={() => setFirmkycDialogOpen(false)} maxWidth="sm">
        <DialogTitle>
          <Typography variant="h4">Firm KYC</Typography>
          <Typography variant="body2">Please provide the necessary details to complete the registration.</Typography>
        </DialogTitle>
        <form onSubmit={kycHandleSubmit}>
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="firmname"
                  label="Firm Name"
                  {...getKycFieldProps('firmname')}
                  touched={kycTouched.firmname}
                  errors={kycErrors.firmname}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="firmregistrationnumber"
                  label="Firm Registration Number"
                  {...getKycFieldProps('firmregistrationnumber')}
                  touched={kycTouched.firmregistrationnumber}
                  errors={kycErrors.firmregistrationnumber}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="firmemail"
                  label="Firm Email"
                  {...getKycFieldProps('firmemail')}
                  touched={kycTouched.firmemail}
                  errors={kycErrors.firmemail}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="firmmobilenumber"
                  label="Firm Mobile Number"
                  {...getKycFieldProps('firmmobilenumber')}
                  touched={kycTouched.firmmobilenumber}
                  errors={kycErrors.firmmobilenumber}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="noofpartnersinfirm"
                  label="Number of Partners in Firm"
                  {...getKycFieldProps('noofpartnersinfirm')}
                  touched={kycTouched.noofpartnersinfirm}
                  errors={kycErrors.noofpartnersinfirm}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="firmaddress1"
                  label="Firm Address Line 1"
                  {...getKycFieldProps('firmaddress1')}
                  touched={kycTouched.firmaddress1}
                  errors={kycErrors.firmaddress1}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="firmaddress2"
                  label="Firm Address Line 2 (optional)"
                  {...getKycFieldProps('firmaddress2')}
                  touched={kycTouched.firmaddress2}
                  errors={kycErrors.firmaddress2}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput id="city" label="City" {...getKycFieldProps('city')} touched={kycTouched.city} errors={kycErrors.city} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomAutocomplete
                  id="state"
                  label="State"
                  options={statesAndUTs}
                  touched={kycTouched.state}
                  errors={kycErrors.state}
                  value={firmkycFormik.values.state}
                  onChange={(event, newValue) => {
                    firmkycFormik.setFieldValue('state', newValue); // Correct way to set Formik field value
                  }}
                  // Optional: Add additional props for error handling and display
                  error={kycTouched.state && Boolean(kycErrors.state)}
                  helperText={kycTouched.state && kycErrors.state}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput id="zip" label="Firm Zip Code" {...getKycFieldProps('zip')} touched={kycTouched.zip} errors={kycErrors.zip} />
              </Grid>
            </Grid>

            <Grid container spacing={2}></Grid>

            <Grid container spacing={2}></Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'space-between'
            }}
          >
            <Button
              onClick={() => {
                setDialogOpen(true);
                setFirmkycDialogOpen(false);
              }}
              variant="outlined"
              color="error"
              type="button"
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={(e) => {
                kycHandleSubmit();
              }}
              disabled={firmkycFormik.isSubmitting}
              sx={{
                padding: '8px 32px',
                textTransform: 'none'
              }}
            >
              {firmkycFormik.isSubmitting ? 'Processing...' : 'Complete Firm KYC'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
