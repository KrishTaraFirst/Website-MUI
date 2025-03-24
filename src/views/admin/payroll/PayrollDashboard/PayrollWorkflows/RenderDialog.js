import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Box,
  Stack,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox
} from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from MUI system
import CustomInput from '@/utils/CustomInput';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useSearchParams } from 'next/navigation';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import dayjs from 'dayjs';
import CustomDatePicker from '@/utils/CustomDateInput';

export default function RenderDialog({ from, openDialog, fields, setOpenDialog, setLoading, employeeMasterData, setExitsData }) {
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

  // Formik validation schema
  const validationSchema = Yup.object({});

  // Initialize Formik with initial values and validation schema
  let initialValues = {};

  if (from === 'Exits') {
    initialValues = {
      employee: '',
      doe: '',
      exit_reason: '',
      regular_pay_schedule: true,
      specify_date: null,
      notes: ''
    };
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const url = `/payroll/employee-exit`;
      let postData = { ...values };
      postData.employee = console.log(postData);
      const { res, error } = await Factory('post', url, postData);
      setLoading(false);
      if (res.status_cd === 0) {
        setExitsData(res.data || []);
        setOpenDialog(false);
      } else {
        showSnackbar(JSON.stringify(res.data.data), 'error');
      }
    }
  });

  // Render each field dynamically
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12, sm: 6 }}>
        <div style={{ paddingBottom: '8px' }}>
          <Typography variant="body2">{field.label}</Typography>
        </div>
        {field.name === 'employee' ? (
          <CustomAutocomplete
            value={employeeMasterData?.find((emp) => emp.id === values[field.name]) || null}
            onChange={(event, newValue) => {
              setFieldValue(field.name, newValue?.id || '');
              setFieldValue('department', newValue.department_name);
              setFieldValue('designation', newValue.designation_name);
            }}
            options={employeeMasterData || []}
            getOptionLabel={(option) => `${option.first_name || ''} ${option.middle_name || ''} ${option.last_name || ''}`.trim()}
            sx={{ width: '100%' }}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            size="small"
          />
        ) : field.name === 'doe' ? (
          <CustomDatePicker
            views={['year', 'month', 'day']}
            value={values[field.name] ? dayjs(values[field.name], 'YYYY-MM-DD') : null}
            onChange={(newDate) => {
              if (newDate) {
                // Save the date in 'YYYY-MM-DD' format to Formik
                setFieldValue(field.name, newDate.format('YYYY-MM-DD'));
              } else {
                setFieldValue(field.name, ''); // Clear the date if none is selected
              }
            }}
            sx={{ width: '100%' }}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            size="small"
            inputFormat="YYYY-MM-DD" // Display in YYYY-MM-DD format
          />
        ) : (
          <CustomInput
            fullWidth
            name={field.name}
            value={values[field.name] || ''}
            multiline={field.name === 'notes'}
            minRows={field.name === 'notes' && 4}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            disabled={field.name === 'designation' || field.name === 'department'}
          />
        )}
      </Grid2>
    ));
  };
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;
  console.log(values);
  return (
    <Modal
      open={openDialog}
      maxWidth={ModalSize.MD}
      header={{ title: 'Add', subheader: '' }}
      modalContent={
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
          <Grid2 container spacing={3}>
            {/* Render dynamic fields for department */}
            {renderFields(fields)}
          </Grid2>
          {from === 'Exits' && (
            <Grid2 container spacing={3} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <FormLabel>When do you want to settle the final pay?</FormLabel>
                <FormGroup row>
                  {/* Regular Pay Schedule Checkbox */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.regular_pay_schedule}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFieldValue('regular_pay_schedule', isChecked); // Send boolean
                          if (isChecked) {
                            setFieldValue('specify_date', null); // Reset specify_date if checked
                          }
                        }}
                      />
                    }
                    label="Regular pay schedule"
                  />

                  {/* Specify Date Checkbox */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.specify_date !== null}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFieldValue('regular_pay_schedule', !isChecked); // Set regular_pay_schedule to false
                          setFieldValue('specify_date', isChecked ? '' : null); // Reset if unchecked
                        }}
                      />
                    }
                    label="Specify date"
                  />
                </FormGroup>

                {/* Date Picker (only shown when "Specify Date" is checked) */}
                {values.specify_date !== null && (
                  <CustomDatePicker
                    name="specify_date"
                    views={['year', 'month', 'day']}
                    value={values.specify_date ? dayjs(values.specify_date, 'DD-MM-YYYY') : null}
                    onChange={(newDate) => {
                      if (newDate) {
                        setFieldValue('specify_date', newDate.format('DD-MM-YYYY'));
                      } else {
                        setFieldValue('specify_date', null); // Reset if no date selected
                      }
                    }}
                    sx={{ width: '100%' }}
                    size="small"
                    inputFormat="DD-MM-YYYY"
                  />
                )}
              </FormControl>
            </Grid2>
          )}

          {values.regular_pay_schedule === 'false' && (
            <CustomDatePicker
              views={['year', 'month', 'day']}
              value={values['specify_date'] ? dayjs(values['specify_date'], 'YYYY-MM-DD') : null}
              onChange={(newDate) => {
                if (newDate) {
                  // Save the date in 'YYYY-MM-DD' format to Formik
                  setFieldValue('specify_date', newDate.format('YYYY-MM-DD'));
                } else {
                  setFieldValue('specify_date', ''); // Clear the date if none is selected
                }
              }}
              sx={{ width: '100%' }}
              onBlur={handleBlur}
              // error={touched[field.name] && Boolean(errors[field.name])}
              // helperText={touched[field.name] && errors[field.name]}
              size="small"
              inputFormat="YYYY-MM-DD" // Display in YYYY-MM-DD format
            />
          )}
        </Box>
      }
      footer={
        <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
          <Button
            onClick={() => {
              resetForm();
              setOpenDialog(false);
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
