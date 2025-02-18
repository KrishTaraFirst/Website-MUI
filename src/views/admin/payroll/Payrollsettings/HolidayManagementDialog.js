import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Box, Stack, Typography, Divider } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system
import CustomInput from '@/utils/CustomInput';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useSearchParams } from 'next/navigation';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';

export default function HolidayManagementDialog({ open, handleClose, fetchDepartments, selectedRecord, type, setType }) {
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
    { name: 'holiday_name', label: 'Holiday Name' },
    { name: 'date', label: 'Start Date' },
    { name: 'applicable_for', label: 'This holiday applicable for?' },
    { name: 'description', label: 'Description' }
  ];

  // Formik validation schema
  const validationSchema = Yup.object({
    holiday_name: Yup.string().required('Holiday Name is required'),
    date: Yup.string().required('Start Date is required'),
    applicable_for: Yup.string().required('This field is required'),
    description: Yup.string().required('Description is required')
  });

  // Initialize Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      holiday_name: '',
      date: '',
      description: '',
      applicable_for: ''
    },
    validationSchema,
    onSubmit: async (values) => {}
  });
  useEffect(() => {
    if (type === 'edit' && selectedRecord) {
      setValues(selectedRecord);
    }
  }, [type, selectedRecord]);

  // Render each field dynamically
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12, sm: 6 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {field.label}
        </Typography>
        <CustomInput
          fullWidth
          name={field.name}
          multiline={field.name === 'description'}
          minRows={field.name === 'description' && 4}
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
    <Modal
      open={open}
      maxWidth={ModalSize.MD}
      header={{ title: 'Add Holiday', subheader: '' }}
      modalContent={
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
          <Grid2 container spacing={3}>
            {renderFields(departmentFields)}
          </Grid2>
        </Box>
      }
      footer={
        <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
          <Button
            onClick={() => {
              setType('');
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
        </Stack>
      }
    />
  );
}
