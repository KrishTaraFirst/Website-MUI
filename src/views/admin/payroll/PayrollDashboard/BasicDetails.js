'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControlLabel, Checkbox, Stack, Button, Box, Grid2, Typography, Divider } from '@mui/material';
import CustomInput from '@/utils/CustomInput';
import { useRouter } from 'next/navigation';

function BasicDetails() {
  const router = useRouter();

  const employeeFields = [
    { name: 'first_name', label: 'Employee Name' },
    { name: 'associate_id', label: 'Employee Id' },
    { name: 'doj', label: 'Date of Joining' },
    { name: 'work_email', label: 'Work Email' },
    { name: 'mobile_number', label: 'Mobile Number' },
    { name: 'gender', label: 'Gender' },
    { name: 'work_location', label: 'Work Location' },
    { name: 'designation', label: 'Designation' },
    { name: 'department', label: 'Department' }
  ];

  const statutoryFields = [
    { name: 'esi', label: 'Employees Provident Fund' },
    { name: 'employees_state_insurence', label: 'Employees State Insurance' },
    { name: 'professional_tax', label: 'Professional Tax' }
  ];

  // Form validation schema
  const validationSchema = Yup.object({
    first_name: Yup.string().required('Employee name is required'),
    associate_id: Yup.string().required('Employee ID is required'),
    doj: Yup.date().required('Date of joining is required'),
    work_email: Yup.string().email('Invalid email format').required('Work email is required'),
    mobile_number: Yup.string().required('Mobile number is required'),
    gender: Yup.string().required('Gender is required'),
    work_location: Yup.string().required('Work location is required'),
    designation: Yup.string().required('Designation is required'),
    department: Yup.string().required('Department is required')
  });
  //   {
  //     "payroll": 1,
  //     "middle_name": "A",
  //     "last_name": "Doe",
  //     "doj": "2023-01-15",
  //     "work_location": 2,

  //     "employee_status": true
  // }
  // Formik setup
  const formik = useFormik({
    initialValues: {
      first_name: '',
      associate_id: '',
      doj: '',
      work_email: '',
      mobile_number: '',
      gender: '',
      work_location: '',
      designation: '',
      department: '',
      //   "statutory_components": {
      //     "pf": "enabled",
      //     "esi": "enabled",
      //     "gratuity": "included"
      // },
      pf: false,
      esi: false,
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

  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12, sm: 6 }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {field.label}
        </Typography>
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
        <FormControlLabel control={<Checkbox checked={values.pf} onChange={handleChange} name="pf" />} label="Enable Portal Access" />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Render statutory fields */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Statuitory Components
      </Typography>
      {statutoryFields.map((field) => (
        <Stack key={field.name} direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={values[field.name]} onChange={handleChange} name={field.name} />}
            label={field.label}
          />
        </Stack>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            router.back();
          }}
        >
          Back to Dashboard
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default BasicDetails;
