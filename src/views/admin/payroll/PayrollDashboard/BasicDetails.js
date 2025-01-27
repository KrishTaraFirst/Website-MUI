'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControlLabel, Checkbox, TextField, Button, Box, Grid2, Typography, Divider } from '@mui/material';
import CustomInput from '@/utils/CustomInput';

function BasicDetails() {
  const employeeFields = [
    { name: 'employee_name', label: 'Employee Name' },
    { name: 'employee_id', label: 'Employee Id' },
    { name: 'date_of_joining', label: 'Date of Joining' },
    { name: 'work_email', label: 'Work Email' },
    { name: 'mobile_number', label: 'Mobile Number' },
    { name: 'gender', label: 'Gender' },
    { name: 'work_location', label: 'Work Location' },
    { name: 'designation', label: 'Designation' },
    { name: 'department', label: 'Department' }
  ];

  const statutoryFields = [
    { name: 'employees_provident_fund', label: 'Employees Provident Fund' },
    { name: 'employees_state_insurence', label: 'Employees State Insurance' },
    { name: 'professional_tax', label: 'Professional Tax' }
  ];

  // Form validation schema
  const validationSchema = Yup.object({
    employee_name: Yup.string().required('Employee name is required'),
    employee_id: Yup.string().required('Employee ID is required'),
    date_of_joining: Yup.date().required('Date of joining is required'),
    work_email: Yup.string().email('Invalid email format').required('Work email is required'),
    mobile_number: Yup.string().required('Mobile number is required'),
    gender: Yup.string().required('Gender is required'),
    work_location: Yup.string().required('Work location is required'),
    designation: Yup.string().required('Designation is required'),
    department: Yup.string().required('Department is required')
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      employee_name: '',
      employee_id: '',
      date_of_joining: '',
      work_email: '',
      mobile_number: '',
      gender: '',
      work_location: '',
      designation: '',
      department: '',
      enable_portal_access: false,
      employees_provident_fund: false,
      employees_state_insurence: false,
      professional_tax: false
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values); // Handle form submission
      // handleClose(); // Optional: Close dialog or reset form if needed
    }
  });

  const { values, handleChange, errors, touched, handleSubmit, handleBlur } = formik;

  // Render fields for employee data
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12, sm: 6 }}>
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

  return (
    <Box sx={{ mt: 2 }}>
      <Grid2 container spacing={3}>
        {/* Render employee fields */}
        {renderFields(employeeFields)}
      </Grid2>

      <Box sx={{ marginTop: 2 }}>
        {/* Enable portal access checkbox */}
        <FormControlLabel
          control={<Checkbox checked={values.enable_portal_access} onChange={handleChange} name="enable_portal_access" />}
          label="Enable Portal Access"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Render statutory fields */}
      {statutoryFields.map((field) => (
        <FormControlLabel
          key={field.name}
          control={<Checkbox checked={values[field.name]} onChange={handleChange} name={field.name} />}
          label={field.label}
        />
      ))}

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default BasicDetails;
