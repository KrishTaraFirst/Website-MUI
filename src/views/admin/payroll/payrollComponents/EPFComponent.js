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
  Card,
  CardContent
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { IconPlus } from '@tabler/icons-react';

// Constants for form fields
const pfDetails = [
  { name: 'epf_number', label: 'EPF Number' },
  { name: 'epf_contribution_rate', label: 'EPF Contribution Rate' }
];

const contributionRate = [
  { name: '12%_of_Actual_PF_Wage', label: '12% of Actual PF Wage' },
  { name: '12%_of_Restricted_wage_15000', label: '12% of Restricted wage of 15000' },
  { name: 'include_employers_contribution_in_ctc', label: "Include Employer's Contribution in CTC" },
  { name: 'include_employers_EDIL_contribution_in_ctc', label: "Include Employer's EDIL Contribution in CTC" },
  { name: 'include_admin_charges_in_ctc', label: 'Include Admin Charges in CTC' },
  { name: 'allow_employee_level_override', label: 'Allow Employee Level Override' },
  { name: 'pro_rate_restricted_pf_wage', label: 'Pro-rate Restricted PF Wage' }
];

function EpfComponent() {
  const [open, setOpen] = useState(false);
  const [dummyData, setDummyData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object({
    epf_number: Yup.string().required('EPF Number is required'),
    epf_contribution_rate: Yup.string().required('EPF Contribution Rate is required')
  });

  const formik = useFormik({
    initialValues: {
      epf_number: '',
      epf_contribution_rate: '',
      contribution_rates: []
    },
    validationSchema,
    onSubmit: async (values) => {
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
        epf_contribution_rate: '12% of Actual PF Wage',
        contribution_rates: [
          '12% of Actual PF Wage',
          '12% of Restricted wage of 15000',
          "Include Employer's Contribution in CTC",
          "Include Employer's EDIL Contribution in CTC",
          'Include Admin Charges in CTC',
          'Allow Employee Level Override',
          'Pro-rate Restricted PF Wage'
        ]
      };
      setDummyData(data); // Set dummy data
      formik.setValues(data); // Update formik values
    };

    fetchDummyData();
  }, []);

  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 item key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
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

  const renderContributionRateCheckboxes = (fields) => {
    return fields.map((field) => (
      <Grid2 item key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
        <FormControlLabel
          control={
            <Checkbox checked={values.contribution_rates.includes(field.name)} onChange={(e) => handleCheckboxChange(e, field.name)} />
          }
          label={field.label}
        />
      </Grid2>
    ));
  };

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6">Employees Provident fund</Typography>
          <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
            Add EPF
          </Button>
        </Stack>
      </Grid2>
      <Grid2 size={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <Grid2 container spacing={2} sx={{ maxWidth: '600px' }}>
            {dummyData && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom mb={2}>
                    Employees’ Provident Fund
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">EPF Number :</Typography>
                    <Typography variant="body1">{dummyData.epf_number}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">Employee Contribution Rate :</Typography>
                    <Typography variant="body1">{dummyData.epf_contribution_rate}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="body1">Employer Contribution Rate :</Typography>
                    <Typography variant="body1">Restricted Contribution [12% or 15,000]</Typography>
                  </Box>
                  <Typography variant="h6" mb={1}>
                    CTC Inclusions :
                  </Typography>
                  {dummyData.contribution_rates.map((rate, index) => (
                    <Box display="flex" alignItems="center" key={index} ml={2}>
                      <Checkbox checked={true} />
                      <Typography variant="body2">{rate}</Typography>
                    </Box>
                  ))}
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="body1">Allow employee level override :</Typography>
                    <Typography variant="body1">Yes</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body1">Pro rate restricted PF wage :</Typography>
                    <Typography variant="body1">Yes</Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid2>
        </Box>
      </Grid2>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>Add EPF Details</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              EPF Details
            </Typography>
            <Grid2 container spacing={3}>
              {renderFields(pfDetails)}
            </Grid2>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Employer Contribution Rates
            </Typography>
            <Grid2 container spacing={3}>
              {renderContributionRateCheckboxes(contributionRate)}
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
  );
}

export default EpfComponent;
