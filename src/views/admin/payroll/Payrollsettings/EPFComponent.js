'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Box, TextField, Checkbox, FormControlLabel, Card, CardContent, Typography, Stack, FormGroup, Grid2 } from '@mui/material';
import { IconPlus, IconEdit } from '@tabler/icons-react';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import MainCard from '@/components/MainCard';
import { useRouter } from 'next/navigation';

const pfFields = [
  { name: 'epf_number', label: 'EPF Number' },
  { name: 'employee_contribution_rate', label: 'Employee Contribution Rate' }
];

const contributionOptions = [
  { name: 'actual_pf_wage', label: '12% of Actual PF Wage' },
  { name: 'restricted_pf_wage', label: '12% of Restricted Wage of 15,000' }
  // { name: 'include_ctc', label: "Include Employer's Contribution in CTC" },
  // { name: 'include_edil', label: "Include Employer's EDIL Contribution in CTC" },
  // { name: 'include_admin', label: 'Include Admin Charges in CTC' },
  // { name: 'allow_override', label: 'Allow Employee Level Override' },
  // { name: 'pro_rate_wage', label: 'Pro-rate Restricted PF Wage' }
];

const employeeContributionRates = ['12% of Actual PF Wage', '12% of Restricted Wage of 15,000'];

function EpfComponent({ handleNext }) {
  const [open, setOpen] = useState(false);
  const [epfData, setEpfData] = useState(null);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object({
    epf_number: Yup.string()
      .required('EPF Number is required')
      .matches(/^[A-Za-z]{5}\d{17}$/, 'Invalid EPF Number format, EX: ABCDE12345678901234567'),
    employee_contribution_rate: Yup.string().required('EPF Contribution Rate is required')
  });

  const formik = useFormik({
    initialValues: {
      epf_number: '',
      employee_contribution_rate: '',
      contribution_rates: [], // Empty array by default
      include_employer_ctc: false,
      include_edil_ctc: false,
      include_admin_ctc: false,
      allow_override: false,
      pro_rate_wage: false
    },
    validationSchema,
    onSubmit: (values) => console.log(values)
  });

  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;

  useEffect(() => {
    const data = {
      epf_number: 'MHBAN00000640000000125',
      employee_contribution_rate: '12% of Actual PF Wage',
      contribution_rates: ['12% of Restricted Wage of 15,000'],
      include_employer_ctc: true,
      include_edil_ctc: true,
      include_admin_ctc: true,
      allow_override: true,
      pro_rate_wage: false
    };
    setEpfData(data);
    setValues(data);
  }, []);

  const handleCheckboxChange = (event, fieldName) => {
    const updatedRates = event.target.checked
      ? [...values.contribution_rates, fieldName] // Add the fieldName if checked
      : values.contribution_rates.filter((rate) => rate !== fieldName); // Remove the fieldName if unchecked

    setFieldValue('contribution_rates', updatedRates); // Update Formik state
  };

  console.log(values);
  return (
    <MainCard sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
            <Grid2 container spacing={2} sx={{ maxWidth: '600px' }}>
              <Grid2 container spacing={2}>
                {epfData && (
                  <>
                    {' '}
                    <Grid2 size={6}>
                      <Typography variant="subtitle1" sx={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
                        Employees Provident Fund
                      </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                      <Box sx={{ textAlign: 'left' }}>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={epfData ? <IconEdit size={16} /> : <IconPlus size={16} />}
                          onClick={handleOpen}
                          style={{ textAlign: 'left' }}
                        >
                          Edit EPF
                        </Button>
                      </Box>
                    </Grid2>
                  </>
                )}
                {epfData ? (
                  <>
                    {/* EPF Data display */}
                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        EPF Number:
                      </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        {epfData.epf_number}
                      </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        Employee Contribution Rate:
                      </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        {epfData.employee_contribution_rate}
                      </Typography>
                    </Grid2>

                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        Employer Contribution Rate:
                      </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        {epfData.contribution_rates}
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
                          control={<Checkbox checked={epfData.include_employer_ctc} />}
                          label="Include Employer's Contribution in the CTC"
                          sx={{ whiteSpace: 'nowrap' }}
                        />
                        <FormControlLabel
                          control={<Checkbox checked={epfData.include_edil_ctc} />}
                          label="Include Employer's EDIL Contribution in the CTC"
                          sx={{ whiteSpace: 'nowrap' }}
                        />
                        <FormControlLabel
                          control={<Checkbox checked={epfData.include_admin_ctc} />}
                          label="Include Admin Charges in the CTC"
                        />
                      </FormGroup>
                    </Grid2>

                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        Allow employee level over ride:
                      </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        {epfData?.allow_override === true ? 'Yes' : 'No'}
                      </Typography>
                    </Grid2>

                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        Pro rate restricted PF wage:
                      </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                      <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        {epfData?.pro_rate_wage === true ? 'Yes' : 'No'}
                      </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            router.back();
                          }}
                        >
                          Back to Dashboard
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
                      <EmptyTable msg="No EPF YET!" sx={{ height: 300, fontWeight: 'bold' }} />
                    </Box>
                    {/* Add EPF Button */}
                    <Grid2 container justifyContent="center" mt={2}>
                      <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
                        Enable EPF
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
          header={{ title: 'Employees Provident Fund', subheader: '' }}
          modalContent={
            <Box component="form" onSubmit={handleSubmit} p={2}>
              <Grid2 container spacing={2}>
                {pfFields.map((field) => (
                  <Grid2 size={{ xs: 12 }} key={field.name}>
                    {field.name === 'employee_contribution_rate' ? (
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{field.label}</label>
                        <CustomAutocomplete
                          value={values[field.name]}
                          name={field.name}
                          onChange={(e, newValue) => setValues({ ...values, [field.name]: newValue })}
                          options={employeeContributionRates}
                          error={touched[field.name] && Boolean(errors[field.name])}
                          helperText={touched[field.name] && errors[field.name]}
                          sx={{ width: '100%' }}
                        />
                      </div>
                    ) : (
                      <div style={{ paddingBottom: '8px' }}>
                        <Typography variant="body2">{field.label}</Typography>
                        <TextField
                          fullWidth
                          name={field.name}
                          value={values[field.name]}
                          onChange={handleChange}
                          error={touched[field.name] && Boolean(errors[field.name])}
                          helperText={touched[field.name] && errors[field.name]}
                        />
                      </div>
                    )}
                  </Grid2>
                ))}
              </Grid2>

              <Typography variant="subtitle1" mt={3} mb={1}>
                Employer Contribution Rates
              </Typography>
              <Grid2 container spacing={2}>
                {contributionOptions.map((field) => (
                  <Grid2 xs={12} sm={6} key={field.name}>
                    {' '}
                    {/* Ensure proper Grid sizing */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.contribution_rates.includes(field.name)}
                          onChange={(e) => handleCheckboxChange(e, field.name)}
                        />
                      }
                      label={field.label}
                    />
                  </Grid2>
                ))}
              </Grid2>
              <br />
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <div>
                  <FormControlLabel
                    label="Include Employer's Contribution in the CTC"
                    control={
                      <Checkbox
                        checked={formik.values.include_employer_ctc}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          formik.setFieldValue('include_employer_ctc', checked);
                          // When the employer CTC is checked, enable EDIL and Admin CTC
                          if (!checked) {
                            formik.setFieldValue('include_edil_ctc', false); // Reset EDIL CTC
                            formik.setFieldValue('include_admin_ctc', false); // Reset Admin CTC
                          }
                        }}
                      />
                    }
                  />

                  <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    <FormControlLabel
                      label="Include Employer's EDIL Contribution in the CTC"
                      control={
                        <Checkbox
                          checked={formik.values.include_edil_ctc}
                          onChange={(e) => formik.setFieldValue('include_edil_ctc', e.target.checked)}
                          disabled={!formik.values.include_employer_ctc} // Disabled if Employer CTC is not checked
                        />
                      }
                    />
                    <FormControlLabel
                      label="Include Admin Charges in the CTC"
                      control={
                        <Checkbox
                          checked={formik.values.include_admin_ctc}
                          onChange={(e) => formik.setFieldValue('include_admin_ctc', e.target.checked)}
                          disabled={!formik.values.include_employer_ctc} // Disabled if Employer CTC is not checked
                        />
                      }
                    />
                  </Box>
                </div>
              </Grid2>

              <br />

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.allow_override}
                      onChange={(e) => formik.setFieldValue('allow_override', e.target.checked)}
                    />
                  }
                  label="Allow Employee Level Override"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.pro_rate_wage}
                      onChange={(e) => formik.setFieldValue('pro_rate_wage', e.target.checked)}
                    />
                  }
                  label="Pro-rate Restricted PF Wage"
                />{' '}
              </FormGroup>
            </Box>
          }
          footer={
            <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  resetForm();
                  handleClose(); // Reset form and close dialog
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
    </MainCard>
  );
}

export default EpfComponent;
