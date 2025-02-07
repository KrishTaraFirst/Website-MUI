'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// @mui
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Stack,
  Grid2,
  FormGroup
} from '@mui/material';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import { IconPlus, IconEdit } from '@tabler/icons-react';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
const esiDetails = [
  { name: 'esi_number', label: 'ESI Number' },
  { name: 'employees_contribution_rate', label: 'Employees Contribution' },
  { name: 'employers_contribution_rate', label: 'Employers Contribution' }
];

function ESIComponent({ handleNext, handleBack }) {
  const [open, setOpen] = useState(false);
  const [esiData, setEsiData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      esi_number: '',
      employees_contribution_rate: '0.75 %',
      employers_contribution_rate: '3.25 %',
      include_employer_ctc: false
    },
    validationSchema: Yup.object({
      esi_number: Yup.string()
        .matches(/^\d{17}$/, 'ESI number must be exactly 17 digits')
        .required('ESI number is required')
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  // Simulate setting dummy values
  useEffect(() => {
    const fetchDummyData = () => {
      const data = {
        esi_number: 'A1234',
        employees_contribution_rate: '0.75 %',
        employers_contribution_rate: '3.25 %',
        include_employer_ctc: false
      };
      setEsiData(data); // Set dummy data
      formik.setValues(data); // Update formik values
    };

    fetchDummyData();
  }, []);

  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12 }}>
        <div style={{ paddingBottom: '5px' }}>
          <label>{field.label}</label>
        </div>
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            disabled={field.name !== 'esi_number'}
          />
          {field.name !== 'esi_number' && (
            <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', ml: 1 }} alignContent="center">
              of Gross Pay
            </Typography>
          )}
        </Box>
      </Grid2>
    ));
  };
  const { values, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue, resetForm } = formik;

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <Grid2 container spacing={2} sx={{ maxWidth: '600px' }}>
            <Grid2 container spacing={2}>
              {esiData && (
                <>
                  {' '}
                  <Grid2 size={6}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
                      Employees State Insurence
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={esiData ? <IconEdit size={16} /> : <IconPlus size={16} />}
                      onClick={handleOpen}
                    >
                      Edit ESI
                    </Button>
                  </Grid2>
                </>
              )}
              {esiData ? (
                <>
                  {/* EPF Data display */}
                  <Grid2 size={6}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                      ESI Number:
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                      {esiData.esi_number}
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                      Employee Contribution Rate:
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                      {esiData.employees_contribution_rate} of Gross Pay
                    </Typography>
                  </Grid2>

                  <Grid2 size={6}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                      Employer Contribution Rate:
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                      {esiData.employers_contribution_rate} of Gross Pay
                    </Typography>
                  </Grid2>

                  <Grid2 size={6}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                      CTC Inclusions:
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={esiData.include_employer_ctc} />}
                        label="Include Employer's Contribution in the CTC"
                        sx={{ whiteSpace: 'nowrap' }}
                      />
                    </FormGroup>
                  </Grid2>
                  <Grid2 size={12} textAlign="center" sx={{ mt: 2 }}>
                    <Box>
                      <Button size="small" variant="contained" onClick={handleBack} sx={{ mr: 2 }}>
                        Back
                      </Button>
                      <Button size="small" variant="contained" onClick={handleNext}>
                        Next
                      </Button>
                    </Box>
                  </Grid2>
                </>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {/* Empty Table */}
                  <Box>
                    <EmptyTable msg="No ESI YET!" sx={{ height: 300, fontWeight: 'bold' }} />
                  </Box>
                  {/* Add EPF Button */}
                  <Grid2 container justifyContent="center" mt={2}>
                    <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
                      Enable ESI
                    </Button>
                  </Grid2>
                </Box>
              )}
            </Grid2>
          </Grid2>
        </Box>
      </Grid2>

      <Modal
        open={open}
        maxWidth={ModalSize.MD}
        header={{ title: 'Employees State Insurence', subheader: '' }}
        modalContent={
          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <Grid2 container spacing={3}>
              {renderFields(esiDetails)}
            </Grid2>
            <br />
            <Grid2 size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.include_employer_ctc}
                    onChange={(e) => formik.setFieldValue('include_employer_ctc', e.target.checked)}
                  />
                }
                label="Include employers contribution in the CTC"
              />
            </Grid2>
          </Box>
        }
        footer={
          <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                resetForm();
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Stack>
        }
      />
    </Grid2>
  );
}

export default ESIComponent;
