import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Box, Stack, Typography, FormControlLabel, Checkbox } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system
import CustomInput from '@/utils/CustomInput';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useSearchParams } from 'next/navigation';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import CustomAutocomplete from '@/utils/CustomAutocomplete';

export default function LeaveManagementDialog({ open, handleClose, fetchDepartments, selectedRecord, type, setType }) {
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

  const departmentFields = [
    { name: 'leave_name', label: 'Name of the Leave' },
    { name: 'code', label: 'Code' },
    { name: 'type', label: 'Select Type' },
    { name: 'no_of_leaves', label: 'How many leaves do employees get?' }
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
      leave_name: '',
      code: '',
      type: '',
      no_of_leaves: '',
      pro_rate_leave: '',
      reset_leave: ''
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
        {field.label === 'Select Type' ? (
          <CustomAutocomplete
            value={values[field.name]}
            name={field.name}
            onChange={(e, newValue) => setFieldValue(field.name, newValue)}
            options={['Paid', 'Un Paid']}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
          />
        ) : (
          <CustomInput
            fullWidth
            name={field.name}
            multiline={field.name === 'description'}
            minRows={field.name === 'description' && 4}
            value={values[field.name]}
            onChange={(e) => setFieldValue('field.name', e.target.value)}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
          />
        )}
      </Grid2>
    ));
  };
  const { values, setValues, setFieldValue, errors, touched, handleSubmit, handleBlur, resetForm } = formik;
  return (
    <Modal
      open={open}
      maxWidth={ModalSize.MD}
      header={{ title: 'Add Leave', subheader: '' }}
      modalContent={
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
          <Grid2 container spacing={3}>
            {renderFields(departmentFields)}
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <FormControlLabel
              label="Pro rate leavebalance for the new joineesbased on D.O.J"
              control={
                <Checkbox
                  checked={values.pro_rate_leave}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    formik.setFieldValue('pro_rate_leave', checked);
                  }}
                />
              }
            />
            <FormControlLabel
              label="Reset the leave balance of employees every month "
              control={<Checkbox checked={values.reset_leave} onChange={(e) => formik.setFieldValue('reset_leave', e.target.checked)} />}
            />
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
