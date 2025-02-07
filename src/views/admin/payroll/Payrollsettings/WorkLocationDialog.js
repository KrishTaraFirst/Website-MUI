'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Divider, Grid2 } from '@mui/material';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useSearchParams } from 'next/navigation';

const filingAddress = [
  { name: 'location_name', label: 'Location Name' },
  { name: 'address_line1', label: 'Address Line 1' },
  { name: 'address_line2', label: 'Address Line 2' },
  { name: 'address_state', label: 'State' },
  { name: 'address_city', label: 'City' },
  { name: 'address_pincode', label: 'Pincode' }
];
export default function WorkLocationDialog({ open, handleClose, fetchWorkLocations, selectedRecord, type, setType }) {
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const [payrollid, setPayrollId] = useState(null);

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  // Formik validation schema
  const validationSchema = Yup.object({
    location_name: Yup.string().required('Work Location Name is required'),
    address_line1: Yup.string().required('Address Line 1 is required'),
    address_state: Yup.string().required('State is required'),
    address_city: Yup.string().required('City is required'),
    address_pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid Pincode format. It must be exactly 6 digits.')
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      location_name: '',
      address_line1: '',
      address_line2: '',
      address_state: '',
      address_city: '',
      address_pincode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const postData = { ...values, payroll: payrollid };
      const url = type === 'edit' ? `/payroll/work-locations/update/${selectedRecord.id}/` : `/payroll/work-locations/create/`;
      let postmethod = type === 'edit' ? 'put' : 'post';
      const { res } = await Factory(postmethod, url, postData);
      if (res?.status_cd === 0) {
        setType('');
        fetchWorkLocations();
        resetForm();
        handleClose();
        showSnackbar(type === 'edit' ? 'Record Updated Successfully' : 'Record Saved Successfully', 'success');
      } else {
        showSnackbar(res.data, 'success');
      }
    }
  });
  useEffect(() => {
    if (type === 'edit' && selectedRecord) {
      setValues(selectedRecord);
    }
  }, [type, selectedRecord]);
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;

  const renderFields = (fields) => {
    return fields.map((field) => {
      if (field.name === 'address_state') {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6 }}>
            <label>{field.label}</label>
            <CustomAutocomplete
              value={values[field.name]}
              name={field.name}
              onChange={(e, newValue) => setFieldValue(field.name, newValue)}
              options={indian_States_And_UTs}
              error={touched[field.name] && Boolean(errors[field.name])}
              helperText={touched[field.name] && errors[field.name]}
              sx={{ width: '100%' }}
            />
          </Grid2>
        );
      }

      return (
        <Grid2 key={field.name} size={{ xs: 12, sm: 6 }}>
          <label>{field.label}</label>
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

  return (
    <Dialog open={open} maxWidth={'md'} fullWidth>
      <DialogTitle textAlign="center">Add work Location</DialogTitle>
      <Divider />
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
          <Grid2 container spacing={3}>
            {renderFields(filingAddress)}
          </Grid2>
        </Box>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={() => {
            setType('');
            resetForm();
            handleClose();
          }}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
