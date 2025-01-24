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
  Grid2
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

const esiDetails = [
  { name: 'epf_number', label: 'EPF Number' },
  { name: 'employees_contribution_rate', label: 'Employees Contribution' },
  { name: 'employers_contribution_rate', label: 'Employers Contribution' }
];

function ESIComponent() {
  const [open, setOpen] = useState(false);
  const [dummyData, setDummyData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      epf_number: '',
      employees_contribution_rate: '',
      employers_contribution_rate: '',
      contribution_rates: []
    },
    validationSchema: Yup.object({
      // Add validation rules if needed
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { values, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;

  // Handle checkbox changes
  const handleCheckboxChange = (event, fieldName) => {
    const updatedRates = event.target.checked
      ? [...values.contribution_rates, fieldName]
      : values.contribution_rates.filter((rate) => rate !== fieldName);

    setFieldValue('contribution_rates', updatedRates);
  };

  // Simulate setting dummy values
  useEffect(() => {
    const fetchDummyData = () => {
      const data = {
        epf_number: 'A1234',
        employees_contribution_rate: '10%',
        employers_contribution_rate: '12%',
        contribution_rates: ['Employers Contribution']
      };
      setDummyData(data); // Set dummy data
      formik.setValues(data); // Update formik values
    };

    fetchDummyData();
  }, []);

  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 item key={field.name} xs={12} sm={6} md={4}>
        <div style={{ paddingBottom: '5px' }}>
          <label>{field.label}</label>
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
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6">Employees State Insurance</Typography>
          <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
            Enable ESI
          </Button>
        </Stack>
      </Grid2>
      <Grid2 size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <Grid2 container spacing={2} sx={{ maxWidth: '600px' }}>
            {dummyData ? (
              <Grid2 container spacing={2}>
                <Grid2 size={12}>
                  <Typography variant="body1" sx={{ textAlign: 'left' }}>
                    ESI Number:
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'right' }}>
                    {dummyData.epf_number}
                  </Typography>
                </Grid2>

                <Grid2 size={12}>
                  <Typography variant="body1" sx={{ textAlign: 'left' }}>
                    EPF Contribution Rate:
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'right' }}>
                    {dummyData.employees_contribution_rate}
                  </Typography>
                </Grid2>

                <Grid2 item size={12}>
                  <Typography variant="body1" sx={{ textAlign: 'left' }}>
                    Employers Contribution Rate:
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'right' }}>
                    {dummyData.employers_contribution_rate}
                  </Typography>
                </Grid2>

                <Grid2 item size={12}>
                  <Typography variant="h6" sx={{ textAlign: 'left' }}>
                    CTC Conclusions:
                  </Typography>
                  {dummyData.contribution_rates.map((rate, index) => (
                    <Grid2 item xs={12} key={index} sx={{ paddingTop: 0 }}>
                      <FormControlLabel control={<Checkbox checked={true} />} label={rate} />
                    </Grid2>
                  ))}
                </Grid2>
              </Grid2>
            ) : (
              <Typography>Loading data...</Typography>
            )}

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogTitle sx={{ textAlign: 'center' }}>Add ESI Details</DialogTitle>
              <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    ESI Details
                  </Typography>
                  <Grid2 container spacing={3}>
                    {renderFields(esiDetails)}
                    <Grid2 item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.contribution_rates.includes('Employers Contribution')}
                            onChange={(e) => handleCheckboxChange(e, 'Employers Contribution')}
                          />
                        }
                        label="Include employers contribution in the CTC"
                      />
                    </Grid2>
                  </Grid2>
                </Box>
              </DialogContent>

              <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleClose} variant="outlined" color="error">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </Grid2>
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default ESIComponent;
