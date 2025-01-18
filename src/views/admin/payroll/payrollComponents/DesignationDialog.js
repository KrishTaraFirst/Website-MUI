import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system

export default function DesignationDialog({ open, handleClose, handleOpenDialog }) {
  // Define fields for department
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
      console.log(values);
      handleClose(); // Close dialog after submit
    }
  });

  const { values, handleChange, errors, touched, handleSubmit, handleBlur, resetForm } = formik;

  // Render each field dynamically
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12 }}>
        <div style={{ paddingBottom: '8px' }}>
          <Typography variant="body2">{field.label}</Typography>
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Designation Details</DialogTitle>

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
