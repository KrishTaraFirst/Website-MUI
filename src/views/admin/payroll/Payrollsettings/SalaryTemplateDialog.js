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
  ListItemButton,
  ListItemIcon,
  Button,
  Grid2,
  InputAdornment,
  Divider
} from '@mui/material';
import HomeCard from '@/components/cards/HomeCard';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { IconTrash } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Factory from '@/utils/Factory';
import MainCard from '@/components/MainCard';

const validationSchema = Yup.object({
  template_name: Yup.string().required('Template Name is required'),
  description: Yup.string().required('Description is required'),
  annual_ctc: Yup.number().required('Annual CTC is required').positive('Annual CTC must be a positive number')
});

function SalaryTemplateDialog({ open, handleClose, fetchDesignations, selectedRecord, type, setType }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [earningsData, setEarningsData] = useState([]);
  const [payrollid, setPayrollId] = useState(null); // Payroll ID fetched from URL

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  // Initial fields for template
  const fields = [
    { name: 'template_name', label: 'Template Name' },
    { name: 'description', label: 'Description' }
  ];

  const employer_contributions = [
    { type: 'EPF', calculation: '12% of Restricted wage', monthly: '', annually: '' },
    { type: 'EDIL', calculation: '0.5% of Restricted wage', monthly: '', annually: '' },
    { type: 'EPF admin charges', calculation: '0.5% of Restricted wage', monthly: '', annually: '' },
    { type: 'EWSI', calculation: '3.25% of Restricted wage', monthly: '', annually: '' }
  ];

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      payroll: '',
      template_name: '',
      description: '',
      annual_ctc: '',
      earnings: [
        {
          component_name: '',
          calculation_type: '',
          monthly: '',
          annually: ''
        }
      ],
      gross_salary: {
        monthly: '',
        annually: ''
      },
      benefits: [
        {
          component_name: '',
          calculation_type: '',
          monthly: '',
          annually: ''
        }
      ],
      total_ctc: {
        monthly: '',
        annually: ''
      },
      deductions: [
        {
          component_name: '',
          calculation_type: '',
          monthly: '',
          annually: ''
        }
      ],
      net_salary: {
        monthly: '',
        annually: ''
      }
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // let url = `/payroll/salary-templates`;
      // const { res } = await Factory('delete', url, {});
      // if (res.status_cd === 1) {
      //   showSnackbar(JSON.stringify(res.data), 'error');
      // } else {
      //   showSnackbar('Record Deleted Successfully', 'success');
      //   fetch_salary_templates();
      // }
    }
  });

  const handleEarningsChange = async (item, index, field, newValue) => {
    let updatedEarnings = [...values.earnings];
    updatedEarnings[index][field] = newValue;

    if (!item || !item.id) return;

    const url = `/payroll/earnings/${item.id}`;
    const { res, error } = await Factory('get', url, {});

    if (res.status_cd !== 0) {
      console.error('Error fetching earnings data:', res);
      return;
    }

    const selectedItem = res.data;
    updatedEarnings[index] = {
      ...updatedEarnings[index],
      calculation: selectedItem.calculation_type.value,
      component_name: selectedItem.component_name,
      calculation_type: selectedItem.component_type
    };

    // Calculate earnings based on the updated values
    const annualCtc = parseFloat(values.annual_ctc);
    const basicSalary = parseFloat(updatedEarnings.find((earning) => earning.component_name === 'Basic')?.monthly || 0);

    const calculatedValues = calculateEarnings(updatedEarnings[index], annualCtc, basicSalary);
    updatedEarnings[index].monthly = calculatedValues.monthly;
    updatedEarnings[index].annually = calculatedValues.annually;

    // Update the earnings field in Formik
    setFieldValue('earnings', updatedEarnings);
  };

  const calculateEarnings = (earning, annualCtc, basicSalary) => {
    let monthlyAmount = 0;
    let annualAmount = 0;

    switch (earning.component_name) {
      case 'Basic':
        // Basic Salary is a percentage of CTC
        const basicPercentage = earning.calculation; // Assume it's the percentage of CTC for Basic
        annualAmount = (annualCtc * basicPercentage) / 100;
        monthlyAmount = annualAmount / 12;
        break;

      case 'HRA':
        // HRA is a percentage of Basic Salary
        const hraPercentage = earning.calculation; // Assume it's the percentage of Basic Salary for HRA
        annualAmount = (basicSalary * hraPercentage) / 100;
        monthlyAmount = annualAmount / 12;
        break;

      case 'Special Allowance':
        // Special Allowance could be the remaining balance (to reach CTC)
        annualAmount = annualCtc - earnings.reduce((sum, earning) => sum + parseFloat(earning.annually || 0), 0);
        monthlyAmount = annualAmount / 12;
        break;

      case 'EPF':
      case 'EDIL':
      case 'EPF admin charges':
      case 'EWSI':
        // For fixed employer contributions, we use their respective formulas
        const percentage = parseFloat(earning.calculation.split('%')[0]);
        annualAmount = (annualCtc * percentage) / 100;
        monthlyAmount = annualAmount / 12;
        break;

      default:
        // Handle other types or custom calculations if needed
        break;
    }

    return {
      monthly: Math.round(monthlyAmount * 100) / 100, // Round to 2 decimal places
      annually: Math.round(annualAmount)
    };
  };

  const handleAddEarnings = () => {
    setFieldValue('earnings', [
      ...values.earnings,
      { component_name: '', calculation: 0, monthly: 0, annually: 0 } // Default values
    ]);
  };

  const handleDeleteEarnings = (index) => {
    const newEarnings = values.earnings.filter((_, i) => i !== index);
    setFieldValue('earnings', newEarnings);
  };

  // Render form fields
  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid2 key={field.name} size={{ xs: 12, sm: 6 }}>
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

  // Fetch earnings details from API
  const getEarnings_Details = async (id) => {
    setLoading(true);
    const url = `/payroll/earnings?payroll_id=${id}`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false);
    if (res.status_cd === 0) {
      setEarningsData(res.data);
    }
  };
  const recalculate = () => {
    const annualCtc = parseFloat(values.annual_ctc);
    const basicSalary = parseFloat(values.earnings.find((earning) => earning.component_name === 'Basic')?.monthly || 0);

    const updatedEarnings = values.earnings.map((earning) => {
      const calculatedValues = calculateEarnings(earning, annualCtc, basicSalary);
      return {
        ...earning,
        monthly: calculatedValues.monthly,
        annually: calculatedValues.annually
      };
    });

    setFieldValue('earnings', updatedEarnings);
  };

  useEffect(() => {
    if (payrollid) {
      getEarnings_Details(payrollid);
    }
  }, [payrollid]);
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;
  return (
    <HomeCard title="New Salary Template" tagline="Set up your organization before starting payroll">
      <MainCard>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Template Fields */}
            <Grid2 container spacing={3}>
              {renderFields(fields)}
            </Grid2>

            {/* Annual CTC */}
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Box style={{ paddingBottom: '5px' }}>
                  <Typography variant="subtitle1">Annual CTC</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <CustomInput
                    fullWidth
                    name="annual_ctc"
                    value={values.annual_ctc}
                    onChange={(e) => {
                      const annualCtc = e.target.value;
                      setFieldValue('annual_ctc', annualCtc);

                      recalculate();
                    }}
                    onBlur={handleBlur}
                    error={touched.annual_ctc && Boolean(errors.annual_ctc)}
                    helperText={touched.annual_ctc && errors.annual_ctc}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center' }}>
                          <span>₹</span>
                          <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '24px' }} />
                        </InputAdornment>
                      )
                    }}
                  />

                  <Typography variant="body1" sx={{ whiteSpace: 'nowrap', ml: 1, textAlign: 'center' }}>
                    Per Year
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>

            {/* Earnings Table */}
            <TableContainer component={Paper}>
              <Table size="small" sx={{ fontSize: '0.875rem' }}>
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
                    <TableCell colSpan={5}>
                      <Typography variant="subtitle1"> Earnings </Typography>
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
                          {earning.component_name !== 'Special Allowance' && (
                            <CustomInput
                              value={earning.calculation}
                              fullWidth
                              sx={{ maxWidth: 80, textAlign: 'center' }}
                              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              onChange={(e) => {
                                handleEarningsChange(earning, index, 'calculation', Number(e.target.value));
                                recalculate();
                              }}
                            />
                          )}
                          <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                            {earning.component_name === 'Basic'
                              ? '% of CTC'
                              : earning.component_name === 'HRA'
                                ? '% of Basic'
                                : earning.component_name === 'Special Allowance'
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
                  <TableCell>
                    <Box>
                      <Button variant="outlined" onClick={handleAddEarnings}>
                        Add Component
                      </Button>
                    </Box>
                  </TableCell>

                  <TableRow sx={{ backgroundColor: '#f6f2fc', margin: '20px' }}>
                    <TableCell
                      colSpan={2}
                      sx={{ fontWeight: 'bold', borderRadius: '16px 0 0 16px' }} // Rounded on the left
                    >
                      Gross Salary
                    </TableCell>
                    <TableCell>
                      <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.monthly || 0), 0)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.annually || 0), 0)}</Typography>
                    </TableCell>
                    <TableCell sx={{ borderRadius: '0 16px 16px 0' }}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="outlined" onClick={() => router.back()}>
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Template
              </Button>
            </Box>
          </Box>
        </Box>
      </MainCard>
    </HomeCard>
  );
}

export default SalaryTemplateDialog;
