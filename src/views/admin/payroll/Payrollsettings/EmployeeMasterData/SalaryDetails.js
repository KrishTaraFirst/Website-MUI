'use client';
import React, { useState, useEffect } from 'react';
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
  Button,
  Grid2
} from '@mui/material';
import HomeCard from '@/components/cards/HomeCard';
import CustomInput from '@/utils/CustomInput';
import { IconTrash } from '@tabler/icons-react';
import Factory from '@/utils/Factory';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { useSearchParams } from 'next/navigation';

const validationSchema = Yup.object({
  template_name: Yup.string().required('Template Name is required'),
  description: Yup.string().required('Description is required'),
  annual_ctc: Yup.number().required('Annual CTC is required').positive('Annual CTC must be a positive number')
});

function SalaryDetails() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [payrollid, setPayrollId] = useState(null);
  const [salary_teamplates_data, setSalary_teamplates_data] = useState([]); // State to store salary_teamplates_data data
  const searchParams = useSearchParams();

  const fields = [
    { name: 'salary_template', label: 'Salary Template' },
    { name: 'annual_ctc', label: 'Annual CTC' }
  ];
  useEffect(() => {
    const id = searchParams.get('payrollid');

    if (id) setPayrollId(id);
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      template_name: '',
      description: '',
      annual_ctc: '',
      earnings: [],
      employer_contributions: [
        { type: 'EPF', calculation_type: '12% of Restricted wage', monthly: '', annually: '' },
        { type: 'EDIL', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' },
        { type: 'EPF admin charges', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' },
        { type: 'ESI', calculation_type: '3.25% of Restricted wage', monthly: '', annually: '' }
      ],
      deductions: [
        { type: 'EPF Employee Contribution', calculation_type: '12% of Restricted wage', monthly: '', annually: '' },
        { type: 'ESI Employee Contribution', calculation_type: '3.25% of Restricted wage', monthly: '', annually: '' },
        { type: 'Professional Tax', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' }
      ]
    },
    validationSchema,
    onSubmit: (values) => {
      resetForm();
      handleClose();
    }
  });

  const handleEarningsChange = (index, field, value) => {
    const newEarnings = [...values.earnings];
    newEarnings[index][field] = value;
    setFieldValue('earnings', newEarnings);
    recalculate();
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

      updatedEarning.annually = Math.round(updatedEarning.monthly * 12);

      return updatedEarning;
    });

    setFieldValue('earnings', newEarnings);
  };

  const renderFields = (fields) => {
    return fields.map((field) => {
      return (
        <Grid2 key={field.name} size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle2" sx={{ color: 'grey.800', mb: 0.5 }}>
            {field.label}
          </Typography>
          {field.name === 'salary_template' ? (
            <CustomAutocomplete
              value={values.template_name}
              onChange={(e, newValue) => {
                const selectedOption = salary_teamplates_data.find((item) => item.template_name === newValue);

                setFieldValue('template_name', newValue);
                setFieldValue('annual_ctc', selectedOption?.annual_ctc || '');

                setValues((prev) => ({
                  ...prev,
                  earnings: selectedOption?.earnings || []
                }));
              }}
              options={salary_teamplates_data.map((item) => item.template_name)}
            />
          ) : (
            <CustomInput
              value={values.annual_ctc}
              fullWidth
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              onChange={(e) => {
                // Handle input change
              }}
            />
          )}
        </Grid2>
      );
    });
  };

  const calculateGrossSalary = (type) => {
    return values.earnings.reduce((sum, earning) => {
      if (earning.type === type) {
        return sum + parseFloat(earning.monthly || 0);
      }
      return sum;
    }, 0);
  };
  const fetch_salary_templates = async () => {
    if (!payrollid) return; // If there's no payroll id, exit early

    const url = `/payroll/salary-templates?payroll_id=${payrollid}`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0 && Array.isArray(res?.data)) {
      setSalary_teamplates_data(res?.data); // Successfully set work locations
    } else {
      setSalary_teamplates_data([]);
    }
  };
  useEffect(() => {
    if (payrollid !== null) fetch_salary_templates();
  }, [payrollid]);
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Grid2 container spacing={3}>
          {renderFields(fields)}
        </Grid2>

        <TableContainer component={Paper}>
          <Table size="small" sx={{ fontSize: '0.875rem' }}>
            <TableHead>
              <TableRow>
                <TableCell>Salary Components</TableCell>
                <TableCell>Calculation Type</TableCell>
                <TableCell>Monthly</TableCell>
                <TableCell>Annually</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                  Earnings
                </TableCell>
              </TableRow>
              {values.earnings.map((earning, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <CustomAutocomplete
                      options={earningsData.map((item) => item.component_name)}
                      value={earning.component_name || ''}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(e, newValue) =>
                        handleEarningsChange(
                          earningsData.find((item) => item.component_name === newValue),
                          index,
                          'component_name',
                          newValue
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {(earning.component_name === 'HRA' || earning.component_name === 'Basic') && (
                        <CustomInput
                          value={earning.calculation}
                          fullWidth
                          sx={{ maxWidth: 80, textAlign: 'center' }}
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          onChange={(e) => {
                            // Get the new value and update the field value via Formik
                            const newValue = Number(e.target.value);
                            handleEarningsChange(earning, index, 'calculation', newValue);
                            setFieldValue(`earnings[${index}].calculation`, newValue); // Update the Formik value directly
                          }}
                          onBlur={() => {
                            recalculate(); // Recalculate when focus is lost
                          }} // Trigger calculation when focus is lost
                          // onKeyDown={(e) => {
                          //   if (e.key === 'Enter') {
                          //     recalculate(); // Trigger calculation when Enter key is pressed
                          //   }
                          // }}
                        />
                      )}
                      <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                        {earning.component_name === 'Basic'
                          ? '% of CTC'
                          : earning.component_name === 'HRA'
                            ? earning.calculation_type
                            : earning.component_name === 'Fixed Allowance'
                              ? 'Remaining Balance'
                              : earning.component_name === 'Conveyance Allowance'
                                ? earning.calculation
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
              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                  Gross Salary
                </TableCell>
                <TableCell>
                  <Typography>{calculateGrossSalary('Basic')}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{calculateGrossSalary('Basic') * 12}</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
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
                      onChange={(e) => handleEarningsChange(index, 'monthly', e.target.value)}
                      fullWidth
                      sx={{ maxWidth: 80, textAlign: 'center' }}
                    />
                  </TableCell>
                  <TableCell>
                    <CustomInput
                      value={earning.annually}
                      onChange={(e) => handleEarningsChange(index, 'annually', e.target.value)}
                      fullWidth
                      sx={{ maxWidth: 80, textAlign: 'center' }}
                    />
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                  Total CTC
                </TableCell>
                <TableCell>
                  <Typography>0</Typography>
                </TableCell>
                <TableCell>
                  <Typography>0</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                  Deductions
                </TableCell>
              </TableRow>
              {values.deductions.map((earning, index) => (
                <TableRow key={index}>
                  <TableCell>{earning.type}</TableCell>
                  <TableCell>{earning.calculation_type}</TableCell>
                  <TableCell>
                    <CustomInput
                      value={earning.monthly}
                      onChange={(e) => handleEarningsChange(index, 'monthly', e.target.value)}
                      fullWidth
                      sx={{ maxWidth: 80, textAlign: 'center' }}
                    />
                  </TableCell>
                  <TableCell>
                    <CustomInput
                      value={earning.annually}
                      onChange={(e) => handleEarningsChange(index, 'annually', e.target.value)}
                      fullWidth
                      sx={{ maxWidth: 80, textAlign: 'center' }}
                    />
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                  NET Salary(Take Home)
                </TableCell>
                <TableCell>
                  <Typography>0</Typography>
                </TableCell>
                <TableCell>
                  <Typography>0</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Save Template
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SalaryDetails;
