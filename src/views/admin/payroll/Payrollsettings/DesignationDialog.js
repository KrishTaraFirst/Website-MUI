import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid, Typography, Divider } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system
import CustomInput from '@/utils/CustomInput';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useSearchParams } from 'next/navigation';

export default function DesignationDialog({ open, handleClose, fetchDesignations, selectedRecord, type, setType }) {
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const [payrollid, setPayrollId] = useState(null); // Payroll ID fetched from URL

  // Update payroll ID from search params
  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const departmentFields = [
    { name: 'designation_name', label: 'Designation Name' },
    { name: 'description', label: 'Description' }
  ];

  // Formik validation schema
  const validationSchema = Yup.object({
    designation_name: Yup.string().required('Designation name is required'),
    description: Yup.string().required('Description is required')
  });

  // Initialize Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      designation_name: '',
      description: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const postData = { ...values, payroll: payrollid };
      const url = type === 'edit' ? `/payroll/designations/${selectedRecord.id}/` : `/payroll/designations/`;
      let postmethod = type === 'edit' ? 'put' : 'post';
      const { res } = await Factory(postmethod, url, postData);

      if (res?.status_cd === 0) {
        fetchDesignations();
        handleClose();
        setType('');
        resetForm();
        showSnackbar(type === 'edit' ? 'Record Updated Successfully' : 'Record Saved Successfully', 'success');
      } else {
        showSnackbar(JSON.stringify(res.data), 'error');
      }
    }
  });
  useEffect(() => {
    if (type === 'edit' && selectedRecord) {
      setValues(selectedRecord);
    }
  }, [type, selectedRecord]);

  // Render each field dynamically
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12 }}>
        <div style={{ paddingBottom: '8px' }}>
          <Typography variant="body2">{field.label}</Typography>
        </div>
        <CustomInput
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
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm } = formik;

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle textAlign="center">Add Designation Details</DialogTitle>
      <Divider />
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
          <Grid2 container spacing={3}>
            {/* Render dynamic fields for department */}
            {renderFields(departmentFields)}
          </Grid2>
        </Box>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={() => {
            resetForm();
            setType('');

            handleClose(); // Reset form and close dialog
          }}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
