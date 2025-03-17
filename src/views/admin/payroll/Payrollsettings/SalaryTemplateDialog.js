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
import { useSnackbar } from '@/components/CustomSnackbar';

const validationSchema = Yup.object({
  template_name: Yup.string().required('Template Name is required'),
  description: Yup.string().required('Description is required'),
  annual_ctc: Yup.number().required('Annual CTC is required').positive('Annual CTC must be a positive number')
});
const initialEarnings = [
  { component_name: 'Basic', calculation_type: 'Fixed', monthly: 0, annually: 0, calculation: 50 },
  { component_name: 'Fixed Allowance', calculation_type: 'Fixed', monthly: 0, annually: 0, calculation: 0 }
];
function SalaryTemplateDialog({}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [earningsData, setEarningsData] = useState([]);
  const [payrollid, setPayrollId] = useState(null);
  const [template_id, setTemplate_id] = useState(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);
  useEffect(() => {
    const id = searchParams.get('template_id');
    if (id) {
      setTemplate_id(id);
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
      template_name: '',
      description: '',
      annual_ctc: '',
      earnings: [...initialEarnings],
      gross_salary: { monthly: '', annually: '' },
      benefits: [
        { component_name: 'EPF', calculation: '12% of Restricted wage', monthly: '', annually: '', calculation_type: 0 },
        { component_name: 'EDIL', calculation: '0.5% of Restricted wage', monthly: '', annually: '', calculation_type: 0 },
        { component_name: 'EPF admin charges', calculation: '0.5% of Restricted wage', monthly: '', annually: '', calculation_type: 0 },
        { component_name: 'ESI', calculation: '3.25% of Restricted wage', monthly: '', annually: '', calculation_type: 0 }
      ],
      total_ctc: { monthly: '', annually: '' },
      deductions: [{ component_name: '', calculation_type: '', monthly: '', annually: '' }],
      net_salary: { monthly: '', annually: '' }
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.errorMessage) {
        showSnackbar(values.errorMessage, 'error');
        return; // Prevent form submission
      }
      let postData = { ...values };
      postData.payroll = payrollid;
      let url = `/payroll/salary-templates`;
      const { res } = await Factory('post', url, postData);
      if (res.status_cd === 1) {
        showSnackbar(JSON.stringify(res.data), 'error');
      } else {
        router.back();
      }
    }
  });

  const handleEarningsChange = async (item, index, field, newValue) => {
    let updatedEarnings = [...values.earnings];
    updatedEarnings[index][field] = newValue;

    if (!item || !item.id) return;

    const url = `/payroll/earnings/${item.id}`;
    const { res, error } = await Factory('get', url, {});

    if (res.status_cd !== 0) {
      return;
    }
    const selectedItem = res.data;
    updatedEarnings[index] = {
      ...updatedEarnings[index],
      calculation: selectedItem.calculation_type.value,
      component_name: selectedItem.component_name,
      calculation_type: selectedItem.calculation_type.type
    };

    // Get the updated CTC value
    const annualCtc = parseFloat(values.annual_ctc);

    // We calculate the basic salary based on the earnings array, where Basic Salary is always a part of it
    const basicSalary = parseFloat(updatedEarnings.find((earning) => earning.component_name === 'Basic')?.annually || 0);

    // Recalculate earnings
    const calculatedValues = calculateEarnings(updatedEarnings[index], annualCtc, basicSalary);

    updatedEarnings[index].monthly = calculatedValues.monthly;
    updatedEarnings[index].annually = calculatedValues.annually;

    // Recalculate Fixed Allowance
    recalculateFixedAllowance(updatedEarnings, annualCtc);

    // Update Formik state
    setFieldValue('earnings', updatedEarnings);
  };

  const recalculateFixedAllowance = (updatedEarnings, annualCtc) => {
    // Calculate earnings total (excluding Fixed Allowance)
    const earningsTotal = updatedEarnings.reduce((sum, earning) => {
      return earning.component_name !== 'Fixed Allowance' ? sum + parseFloat(earning.annually || 0) : sum;
    }, 0);

    // Calculate Fixed Allowance as the residual of CTC
    const fixedAllowance = updatedEarnings.find((earning) => earning.component_name === 'Fixed Allowance');

    if (fixedAllowance) {
      const remainingCtc = annualCtc - earningsTotal;

      // Check if the remaining CTC is less than or equal to zero (i.e., Fixed Allowance becomes negative)
      if (remainingCtc <= 0) {
        setFieldValue('errorMessage', " TotalAmount must be greater than zero. Adjust the CTC or any of the component's amount.");
        fixedAllowance.annually = 0;
        fixedAllowance.monthly = 0;
      } else {
        // If the remaining CTC is positive, calculate the Fixed Allowance normally
        fixedAllowance.annually = Math.round(remainingCtc * 100) / 100; // Round to 2 decimal places
        fixedAllowance.monthly = Math.round((remainingCtc / 12) * 100) / 100; // Round to 2 decimal places
        setFieldValue('errorMessage', ''); // Clear the error message if calculations are valid
      }
    }

    // Now that we've updated the fixed allowance, we'll update the earnings array in Formik.
    setFieldValue('earnings', updatedEarnings);
  };

  const calculateEarnings = (earning, annualCtc, basicSalary) => {
    let monthlyAmount = 0;
    let annualAmount = 0;

    // Check if annual CTC is a valid number and not empty
    if (isNaN(annualCtc) || annualCtc === '') {
      // If CTC is invalid, return 0 for both monthly and annually
      return {
        monthly: 0,
        annually: 0
      };
    }
    switch (earning.component_name) {
      case 'Basic':
        const basicPercentage = earning.calculation; // Assume it's the percentage of CTC for Basic
        annualAmount = (annualCtc * basicPercentage) / 100;
        monthlyAmount = annualAmount / 12;
        break;

      case 'HRA':
        if (earning.calculation_type === 'Percentage of Basic') {
          const hraPercentage = earning.calculation; // Assume it's the percentage of Basic Salary for HRA
          annualAmount = (basicSalary * hraPercentage) / 100;
          monthlyAmount = annualAmount / 12;
        } else if (earning.calculation_type === 'Flat Amount') {
          annualAmount = earning.calculation * 12;
          monthlyAmount = earning.calculation;
        }
        break;

      case 'Fixed Allowance':
        // Ensure Fixed Allowance is recalculated as a residual component
        const earningsTotal = values.earnings.reduce((sum, earning) => sum + parseFloat(earning.annually || 0), 0);
        annualAmount = annualCtc - earningsTotal; // Subtract total of all earnings from CTC
        monthlyAmount = annualAmount / 12;
        break;
      case 'Conveyance Allowance':
        const conveyance_AllowancePercentage = ''; // Assume it's the percentage of Basic Salary for HRA
        annualAmount = earning.calculation * 12;
        monthlyAmount = earning.calculation;
        break;
      case 'EPF':
      case 'EDIL':
      case 'EPF admin charges':
      case 'EWSI':
        const percentage = parseFloat(earning.calculation.split('%')[0]);
        annualAmount = (annualCtc * percentage) / 100;
        monthlyAmount = annualAmount / 12;
        break;

      default:
        break;
    }

    return {
      monthly: Math.round(monthlyAmount * 100) / 100, // Round to 2 decimal places
      annually: Math.round(annualAmount)
    };
  };

  // This method is used to handle the recalculation for all the earnings when CTC is updated.
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

    // Recalculate Fixed Allowance
    recalculateFixedAllowance(updatedEarnings, annualCtc);

    setFieldValue('earnings', updatedEarnings);
  };

  // Update the `CustomInput` for `annual_ctc` to trigger the recalculation correctly

  const handleAddEarnings = () => {
    setFieldValue('earnings', [
      ...values.earnings,
      { component_name: '', calculation: 0, monthly: 0, annually: 0 } // Default values
    ]);
  };

  const handleDeleteEarnings = (index) => {
    const newEarnings = values.earnings.filter((_, i) => i !== index);
    recalculate();
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
  const fetch_individual_salary_templates = async (id) => {
    if (!id) return;

    const url = `/payroll/salary-templates/${id}`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0) {
      setValues(res?.data);
    } else {
    }
  };
  useEffect(() => {
    if (payrollid) {
      getEarnings_Details(payrollid);
    }
  }, [payrollid]);
  useEffect(() => {
    if (template_id) {
      fetch_individual_salary_templates(template_id);
    }
  }, [template_id]);
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
                      // recalculate(); // Trigger recalculation when CTC changes
                    }}
                    onBlur={() => recalculate()} // Recalculate when focus is lost
                    // onKeyDown={(e) => {
                    //   if (e.key === 'Enter') {
                    //     recalculate(); // Trigger recalculation when Enter key is pressed
                    //   }
                    // }}
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
                    <TableCell>
                      <Button variant="outlined" onClick={handleAddEarnings}>
                        Add Component
                      </Button>
                    </TableCell>
                    <TableCell colSpan={4}>
                      {values.errorMessage && (
                        <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
                          {values.errorMessage}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{ fontWeight: 'bold' }} // Rounded on the left
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

                  <TableRow>
                    <TableCell colSpan={5} sx={{ fontWeight: 'bold' }}>
                      <Typography variant="subtitle1"> Benefits </Typography>
                    </TableCell>
                  </TableRow>

                  {values.benefits.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.component_name}</TableCell>
                      <TableCell>{item.calculation}</TableCell>
                      <TableCell>
                        <CustomInput
                          value={item.monthly}
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
                          value={item.annually}
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
                        <ListItemButton sx={{ color: '#d32f2f' }}>
                          <ListItemIcon>
                            <IconTrash size={16} style={{ color: '#d32f2f' }} />
                          </ListItemIcon>
                        </ListItemButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ backgroundColor: '#f6f2fc', margin: '20px' }}>
                    <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                      Total CTC
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
