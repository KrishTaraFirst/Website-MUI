'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItemButton,
  ListItemIcon,
  Button,
  Grid2
} from '@mui/material';
import HomeCard from '@/components/cards/HomeCard';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { IconTrash } from '@tabler/icons-react';

const validationSchema = Yup.object({
  template_name: Yup.string().required('Template Name is required'),
  description: Yup.string().required('Description is required'),
  annual_ctc: Yup.number().required('Annual CTC is required').positive('Annual CTC must be a positive number')
});

const earningsOptions = ['Basic', 'Special Allowances', 'House Rent Allowances', 'Conveyance Allowance'];

function SalaryTemplate() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const fields = [
    {
      name: 'template_name',
      label: 'Template Name'
    },
    { name: 'description', label: 'Description' }
  ];
  const employer_contributions = [
    { type: 'EPF', calculation_type: '12% of Restricted wage', monthly: '', annually: '' },
    { type: 'EDIL', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' },
    { type: 'EPF admin charges', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' },
    { type: 'EWSI', calculation_type: '3.25% of Restricted awge', monthly: '', annually: '' }
  ];
  const formik = useFormik({
    initialValues: {
      template_name: '',
      description: '',
      annual_ctc: '',
      earnings: [{ type: '', calculation_type: '', monthly: '', annually: '' }],
      employer_contributions: [
        { type: 'EPF', calculation_type: '12% of Restricted wage', monthly: '', annually: '' },
        { type: 'EDIL', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' },
        { type: 'EPF admin charges', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' },
        { type: 'ESI', calculation_type: '3.25% of Restricted awge', monthly: '', annually: '' }
      ],
      deductions: [
        { type: 'EPF Employee Contribution', calculation_type: '12% of Restricted wage', monthly: '', annually: '' },
        { type: 'ESI Employee Contribution', calculation_type: '3.25% of Restricted awge', monthly: '', annually: '' },
        { type: 'Professional Tax', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' }
      ]
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      handleClose();
    }
  });

  const { values, handleChange, errors, touched, handleBlur, handleSubmit } = formik;

  const handleEarningsChange = (index, field, value) => {
    const newEarnings = [...values.earnings];
    newEarnings[index][field] = value;
    formik.setFieldValue('earnings', newEarnings);
    recalculate();
  };

  const handleAddEarnings = () => {
    console.log('Adding new earning'); // Debugging
    formik.setFieldValue('earnings', [...values.earnings, { type: '', calculation_type: '', monthly: '', annually: '' }]);
  };

  const handleDeleteEarnings = (index) => {
    const newEarnings = values.earnings.filter((_, i) => i !== index);
    formik.setFieldValue('earnings', newEarnings);
  };
  const recalculate = () => {
    const newEarnings = values.earnings.map((earning) => {
      const updatedEarning = { ...earning };
      const annualCtc = parseFloat(values.annual_ctc || 0);

      if (earning.type === 'Basic') {
        const percentage = parseFloat(earning.calculation_type || 0);
        updatedEarning.monthly = Math.round((annualCtc * percentage) / 100 / 12);
      } else if (earning.type === 'House Rent Allowances') {
        const basic = parseFloat(values.earnings.find((e) => e.type === 'Basic')?.annually || 0);
        const percentage = parseFloat(earning.calculation_type || 0);
        updatedEarning.monthly = Math.round((basic * percentage) / 100 / 12);
      } else if (earning.type === 'Special Allowances') {
        const otherComponentsTotal = values.earnings
          .filter((e) => e.type !== 'Special Allowances')
          .reduce((sum, e) => sum + parseFloat(e.annually || 0), 0);
        updatedEarning.annually = Math.round(annualCtc - otherComponentsTotal);
        updatedEarning.monthly = Math.round(updatedEarning.annually / 12);
      }

      // Ensure annual = monthly * 12
      updatedEarning.annually = Math.round(updatedEarning.monthly * 12);

      return updatedEarning;
    });

    formik.setFieldValue('earnings', newEarnings);
  };
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ sx: 12, sm: 6, md: 4 }}>
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
    <HomeCard title="New Salary Template" tagline="Set up your organization before starting payroll">
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Template Fields */}
          <Grid2 container spacing={3}>
            {renderFields(fields)}
          </Grid2>

          {/* Annual CTC */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 1 }}>
              <Typography variant="h6">Annual CTC</Typography>
            </Box>
            <Box sx={{ flex: 1, mr: 2 }}>
              <CustomInput
                fullWidth
                name="annual_ctc"
                value={values.annual_ctc}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.annual_ctc && Boolean(errors.annual_ctc)}
                helperText={touched.annual_ctc && errors.annual_ctc}
              />
            </Box>
            <Box>
              <Typography variant="body2">Per Year</Typography>
            </Box>
          </Box>

          {/* Earnings Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Salary Components</TableCell>
                  <TableCell>Calculation Type</TableCell>
                  <TableCell>Monthly</TableCell>
                  <TableCell>Annually</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} sx={{ fontWeight: 'bold' }}>
                    Earnings
                  </TableCell>
                </TableRow>
                {values.earnings.map((earning, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CustomAutocomplete
                        options={earningsOptions}
                        value={earning.type}
                        onChange={(event, newValue) => handleEarningsChange(index, 'type', newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CustomInput
                          value={earning.calculation_type}
                          onChange={(e) => {
                            handleEarningsChange(index, 'calculation_type', e.target.value);
                            recalculate(); // Call recalculate on change
                          }}
                          fullWidth
                          sx={{ maxWidth: 80, textAlign: 'center' }}
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                        <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                          {earning.type === 'Basic'
                            ? '% of CTC'
                            : earning.type === 'House Rent Allowances'
                              ? '% of Basic'
                              : earning.type === 'Special Allowances'
                                ? 'Remaining Balance'
                                : ''}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{earning.monthly}</TableCell>
                    <TableCell>{earning.annually}</TableCell>
                    <TableCell>
                      <ListItemButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteEarnings(index)}>
                        <ListItemIcon>
                          <IconTrash size={16} style={{ color: '#d32f2f' }} />
                        </ListItemIcon>
                      </ListItemButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                  Gross Salary
                </TableCell>
                <TableCell>
                  <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.monthly || 0), 0)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.annually || 0), 0)}</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleAddEarnings}>
              Add Component
            </Button>
          </Box>
          <Box sx={{ fontWeight: 'bold' }}>Employer Contributions</Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Salary Components</TableCell>
                  <TableCell>Calculation Type</TableCell>
                  <TableCell>Monthly</TableCell>
                  <TableCell>Annually</TableCell>
                  <TableCell>Action</TableCell> {/* For Delete button */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} sx={{ fontWeight: 'bold' }}>
                    Employer Contributions
                  </TableCell>
                </TableRow>
                {values.employer_contributions.map((earning, index) => (
                  <TableRow key={index}>
                    <TableCell>{earning.type}</TableCell>
                    <TableCell>{earning.calculation_type}</TableCell>
                    <TableCell>
                      <CustomInput
                        value={earning.monthly}
                        onChange={(e) => {
                          handleEarningsChange(index, 'calculation_type', e.target.value);
                          recalculate(); // Call recalculate on change
                        }}
                        fullWidth
                        sx={{ maxWidth: 80, textAlign: 'center' }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <CustomInput
                        value={earning.annually}
                        onChange={(e) => {
                          handleEarningsChange(index, 'calculation_type', e.target.value);
                          recalculate(); // Call recalculate on change
                        }}
                        fullWidth
                        sx={{ maxWidth: 80, textAlign: 'center' }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </TableCell>
                    <TableCell>
                      <ListItemButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteEarnings(index)}>
                        <ListItemIcon>
                          <IconTrash size={16} style={{ color: '#d32f2f' }} />
                        </ListItemIcon>
                      </ListItemButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                  Gross Salary
                </TableCell>
                <TableCell>
                  <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.monthly || 0), 0)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.annually || 0), 0)}</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </Table>
          </TableContainer>

          <Box sx={{ fontWeight: 'bold' }}>Deductions</Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Salary Components</TableCell>
                  <TableCell>Calculation Type</TableCell>
                  <TableCell>Monthly</TableCell>
                  <TableCell>Annually</TableCell>
                  <TableCell>Action</TableCell> {/* For Delete button */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} sx={{ fontWeight: 'bold' }}>
                    Employer Contributions
                  </TableCell>
                </TableRow>
                {values.deductions.map((earning, index) => (
                  <TableRow key={index}>
                    <TableCell>{earning.type}</TableCell>
                    <TableCell>{earning.calculation_type}</TableCell>
                    <TableCell>
                      <CustomInput
                        value={earning.monthly}
                        onChange={(e) => {
                          handleEarningsChange(index, 'calculation_type', e.target.value);
                          recalculate(); // Call recalculate on change
                        }}
                        fullWidth
                        sx={{ maxWidth: 80, textAlign: 'center' }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <CustomInput
                        value={earning.annually}
                        onChange={(e) => {
                          handleEarningsChange(index, 'calculation_type', e.target.value);
                          recalculate(); // Call recalculate on change
                        }}
                        fullWidth
                        sx={{ maxWidth: 80, textAlign: 'center' }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </TableCell>
                    <TableCell>
                      <ListItemButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteEarnings(index)}>
                        <ListItemIcon>
                          <IconTrash size={16} style={{ color: '#d32f2f' }} />
                        </ListItemIcon>
                      </ListItemButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                  Gross Salary
                </TableCell>
                <TableCell>
                  <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.monthly || 0), 0)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.annually || 0), 0)}</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Save Template
            </Button>
          </Box>
        </Box>
      </Box>
    </HomeCard>
  );
}

export default SalaryTemplate;
