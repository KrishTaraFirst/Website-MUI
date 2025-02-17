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
    { type: 'EPF', calculation_type: '12% of Restricted wage', monthly: '', annually: '' },
    { type: 'EDIL', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' },
    { type: 'EPF admin charges', calculation_type: '0.5% of Restricted wage', monthly: '', annually: '' },
    { type: 'EWSI', calculation_type: '3.25% of Restricted wage', monthly: '', annually: '' }
  ];

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      template_name: '',
      description: '',
      annual_ctc: '',
      earnings: [
        {
          salary_component: '',
          calculation_type: '',
          monthly: '',
          annually: ''
        }
      ],
      gross_salary: {
        monthly: 0,
        annually: 0
      }
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      handleClose();
    }
  });

  const handleEarningsChange = (item, index, field, value) => {
    const newEarnings = [...values.earnings];
    newEarnings[index][field] = value;

    // Update the calculation type based on the selected component's calculation type
    const selectedItem = earningsData.find((earn) => earn.component_name === value);
    if (selectedItem) {
      newEarnings[index]['calculation_type'] = selectedItem.calculation_type.value;
    }

    // console.log(newEarnings); // You can check the updated earnings in the console

    formik.setFieldValue('earnings', newEarnings);
    recalculate();
  };
  const recalculate = () => {
    const newEarnings = values.earnings.map((earning) => {
      const updatedEarning = { ...earning };
      const annualCtc = parseFloat(values.annual_ctc || 0);

      if (earning.salary_component === 'Basic') {
        const percentage = parseFloat(earning.calculation_type || 0);
        updatedEarning.monthly = Math.round(((annualCtc * percentage) / 100 / 12) * 100) / 100;
      } else if (earning.salary_component === 'HRA') {
        const basic = parseFloat(values.earnings.find((e) => e.salary_component === 'Basic')?.annually || 0);
        const percentage = parseFloat(earning.calculation_type || 0);
        updatedEarning.monthly = Math.round(((basic * percentage) / 100 / 12) * 100) / 100;
      } else if (earning.salary_component === 'Conveyance Allowance') {
        const fixedAmount = earning.calculation_type; // Set the fixed annual amount for Conveyance Allowance
        updatedEarning.annually = fixedAmount; // Set fixed amount annually
        updatedEarning.monthly = Math.round((fixedAmount / 12) * 100) / 100; // Divide by 12 for monthly value
      } else if (earning.salary_component === 'Special Allowance') {
        const otherComponentsTotal = values.earnings
          .filter((e) => e.salary_component !== 'Special Allowance')
          .reduce((sum, e) => sum + parseFloat(e.annually || 0), 0);

        const specialAllowancesAnnual = annualCtc - otherComponentsTotal;

        updatedEarning.monthly = Math.round((specialAllowancesAnnual / 12) * 100) / 100;
      }

      updatedEarning.annually = Math.round(updatedEarning.monthly * 12);

      return updatedEarning;
    });

    console.log(newEarnings);

    formik.setFieldValue('earnings', newEarnings);
  };

  const handleAddEarnings = () => {
    formik.setFieldValue('earnings', [...values.earnings, { salary_component: '', calculation_type: '', monthly: '', annually: '' }]);
  };

  const handleDeleteEarnings = (index) => {
    const newEarnings = values.earnings.filter((_, i) => i !== index);
    formik.setFieldValue('earnings', newEarnings);
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

  useEffect(() => {
    if (payrollid) {
      getEarnings_Details(payrollid);
    }
  }, [payrollid]);

  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;

  return (
    <HomeCard title="New Salary Template" tagline="Set up your organization before starting payroll">
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
                  <TableCell colSpan={5} sx={{ fontWeight: 'bold' }}>
                    Earnings
                  </TableCell>
                </TableRow>
                {values.earnings.map((earning, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CustomAutocomplete
                        options={earningsData.map((item) => item.component_name)}
                        value={earning.salary_component || ''}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(e, newValue) =>
                          handleEarningsChange(
                            earningsData.find((item) => item.component_name === newValue),
                            index,
                            'salary_component',
                            newValue
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {earning.salary_component !== 'Special Allowance' && (
                          <CustomInput
                            value={earning.calculation_type}
                            fullWidth
                            sx={{ maxWidth: 80, textAlign: 'center' }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(e) => handleEarningsChange(earning, index, 'calculation_type', Number(e.target.value))}
                          />
                        )}
                        <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                          {earning.salary_component === 'Basic'
                            ? '% of CTC'
                            : earning.salary_component === 'HRA'
                              ? '% of Basic'
                              : earning.salary_component === 'Special Allowance'
                                ? 'Remaining Balance'
                                : ''}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <CustomInput
                        value={earning.monthly}
                        onChange={(e) => handleEarningsChange(earning, index, 'monthly', e.target.value)}
                        fullWidth
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomInput
                        value={earning.annually}
                        onChange={(e) => handleEarningsChange(earning, index, 'annually', e.target.value)}
                        fullWidth
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
    </HomeCard>
  );
}

export default SalaryTemplateDialog;
