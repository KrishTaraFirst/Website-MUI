'use client';
import dayjs from 'dayjs';
import CustomDatePicker from '@/utils/CustomDateInput';
import CustomInput from '@/utils/CustomInput';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Typography, Button, Box, DialogTitle, DialogActions, Grid, DialogContent } from '@mui/material';
import { useState } from 'react';
import Factory from '@/utils/Factory';
import { statesAndUTs } from '@/utils/helperData';
import CustomAutocomplete from '@/utils/CustomAutocomplete';

export default function IndividualForm() {
  const router = useRouter();
  const [kycDialogOpen, setKycDialogOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
    setSelectedDate(dayjs(newDate));
    kycFormik.setFieldValue('dob', formattedDate);
  };

  const kycFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      dob: null,
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      state: '',
      zip: '',
      aadharcardnumber: '',
      pan_number: '',
      country: 'IN'
    },
    validationSchema: Yup.object({
      // name: Yup.string().required("Name is required"),
      // email: Yup.string()
      //   .email("Invalid email format")
      //   .required("Email is required"),
      // mobile: Yup.string()
      //   .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      //   .required("Mobile number is required"),
      // dob: Yup.date().nullable().required("Date of Birth is required"), // Make sure nullable is set for date
      // addressLine1: Yup.string().required("Address Line 1 is required"),
      // city: Yup.string().required("City is required"),
      // state: Yup.string().required("State is required"),
      // zip: Yup.string()
      //   .matches(/^\d{6}$/, "Zip code must be 6 digits")
      //   .required("Zip code is required"),
      // aadharcardnumber: Yup.string()
      //   .matches(/^\d{12}$/, "Aadhar Card must be 12 digits")
      //   .required("Aadhar Card number is required"),
      // pan_number: Yup.string().required("PAN Card number is required"),
    }),
    onSubmit: async (values) => {
      const postData = {
        name: values.name,
        aadhaar_number: values.aadharcardnumber,
        pan_number: values.pan_number,
        address: {
          address_line1: values.addressLine1,
          address_line2: values.addressLine2 || '',
          address_line3: values.addressLine3 || '',
          pinCode: values.zip,
          state: values.state,
          city: values.city,
          country: values.country
        },
        have_firm: 'false',
        date: values.dob
      };
      setKycDialogOpen(false);
      // try {
      //   const url = `/user_management/users-kyc/`;
      //   const { res, error } = await Factory("post", url, postData);
      //   console.log(res);

      //   if (res.status_cd === 0) {
      //     setKycDialogOpen(false);
      //     router.push("/tara");
      //   } else {
      //     alert("Please check your credentials.");
      //   }
      // } catch (error) {
      //   console.error("KYC submission error:", error);
      //   alert("Something went wrong. Please try again.");
      // }
    }
  });

  return (
    <Box>
      <Dialog maxWidth="sm" open={kycDialogOpen}>
        <DialogTitle>
          <Typography variant="h4">Complete Your KYC</Typography>
          <Typography variant="body2">Please fill in your KYC details to complete the registration.</Typography>
        </DialogTitle>

        <form component="form" noValidate autoComplete="off" onSubmit={kycFormik.handleSubmit}>
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Name"
                  {...kycFormik.getFieldProps('name')}
                  error={kycFormik.touched.name && Boolean(kycFormik.errors.name)}
                  helperText={kycFormik.touched.name && kycFormik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Email"
                  {...kycFormik.getFieldProps('email')}
                  error={kycFormik.touched.email && Boolean(kycFormik.errors.email)}
                  helperText={kycFormik.touched.email && kycFormik.errors.email}
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Mobile"
                  sx={{ width: '100%' }}
                  {...kycFormik.getFieldProps('mobile')}
                  error={kycFormik.touched.mobile && Boolean(kycFormik.errors.mobile)}
                  helperText={kycFormik.touched.mobile && kycFormik.errors.mobile}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDatePicker
                  label="Date of Birth"
                  views={['year', 'month', 'day']}
                  value={kycFormik.values.dob ? dayjs(kycFormik.values.dob) : null}
                  onChange={handleDateChange}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-root': {
                      fontSize: '0.75rem',
                      height: '40px'
                    }
                  }}
                  error={kycFormik.touched.dob && Boolean(kycFormik.errors.dob)}
                  helperText={kycFormik.touched.dob && kycFormik.errors.dob}
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="PAN Card"
                  value={kycFormik.values.pan_number}
                  onChange={(e) => {
                    const uppercaseValue = e.target.value.toUpperCase();
                    kycFormik.setFieldValue('pan_number', uppercaseValue);
                  }}
                  error={kycFormik.touched.pan_number && Boolean(kycFormik.errors.pan_number)}
                  helperText={kycFormik.touched.pan_number && kycFormik.errors.pan_number}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Aadhar Card"
                  {...kycFormik.getFieldProps('aadharcardnumber')}
                  error={kycFormik.touched.aadharcardnumber && Boolean(kycFormik.errors.aadharcardnumber)}
                  helperText={kycFormik.touched.aadharcardnumber && kycFormik.errors.aadharcardnumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Country"
                  value={kycFormik.values.country}
                  disabled={true}
                  {...kycFormik.getFieldProps('country')}
                  error={kycFormik.touched.country && Boolean(kycFormik.errors.country)}
                  helperText={kycFormik.touched.country && kycFormik.errors.country}
                />
              </Grid>
              {/* Row 4 */}
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Address Line 1"
                  {...kycFormik.getFieldProps('addressLine1')}
                  error={kycFormik.touched.addressLine1 && Boolean(kycFormik.errors.addressLine1)}
                  helperText={kycFormik.touched.addressLine1 && kycFormik.errors.addressLine1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Address Line 2"
                  {...kycFormik.getFieldProps('addressLine2')}
                  error={kycFormik.touched.addressLine2 && Boolean(kycFormik.errors.addressLine2)}
                  helperText={kycFormik.touched.addressLine2 && kycFormik.errors.addressLine2}
                />
              </Grid>

              {/* Row 5 */}
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Address Line 3"
                  {...kycFormik.getFieldProps('addressLine3')}
                  error={kycFormik.touched.addressLine3 && Boolean(kycFormik.errors.addressLine3)}
                  helperText={kycFormik.touched.addressLine3 && kycFormik.errors.addressLine3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="City"
                  {...kycFormik.getFieldProps('city')}
                  error={kycFormik.touched.city && Boolean(kycFormik.errors.city)}
                  helperText={kycFormik.touched.city && kycFormik.errors.city}
                />
              </Grid>

              {/* Row 6 */}
              <Grid item xs={12} sm={6}>
                <CustomAutocomplete
                  id="state"
                  label="State"
                  options={statesAndUTs} // Array of state/UT options
                  value={kycFormik.values.state} // The current value of the selected state
                  onChange={(event, newValue) => {
                    kycFormik.setFieldValue('state', newValue); // Set the selected state value in Formik
                  }}
                  error={kycFormik.touched.state && Boolean(kycFormik.errors.state)} // Error handling
                  helperText={kycFormik.touched.state && kycFormik.errors.state} // Error message display
                  fullWidth // Optional: makes the autocomplete input full width
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  size="small"
                  label="Zip Code"
                  {...kycFormik.getFieldProps('zip')}
                  error={kycFormik.touched.zip && Boolean(kycFormik.errors.zip)}
                  helperText={kycFormik.touched.zip && kycFormik.errors.zip}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'space-between'
            }}
          >
            <Button variant="outlined" color="error">
              Skip
            </Button>
            <Button variant="contained" type="submit" onClick={kycFormik.handleSubmit} disabled={kycFormik.isSubmitting}>
              {kycFormik.isSubmitting ? 'Processing...' : 'Complete KYC'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
