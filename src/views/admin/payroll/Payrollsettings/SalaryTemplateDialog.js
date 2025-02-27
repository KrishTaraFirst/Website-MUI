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
          monthly: 0,
          annually: 0
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
    if (field === 'salary_component') {
      const selectedItem = earningsData.find((earn) => earn.component_name === value);
      if (selectedItem) {
        newEarnings[index]['calculation_type'] = selectedItem.calculation_type.value;
      }
    }

    formik.setFieldValue('earnings', newEarnings);

    // Call recalculate after the update to trigger immediate recalculation
    recalculate();
  };

  const recalculate = () => {
    const updatedEarnings = [...values.earnings];
    const annualCtc = parseFloat(values.annual_ctc || 0);

    updatedEarnings.forEach((earning) => {
      const updatedEarning = { ...earning };

      if (earning.salary_component === 'Basic') {
        const percentage = parseFloat(earning.calculation_type || 0);
        const annualAmount = (annualCtc * percentage) / 100;
        updatedEarning.monthly = Math.round((annualAmount / 12) * 100) / 100;
        updatedEarning.annually = Math.round(annualAmount);
      }

      // Update earnings array so HRA calculation gets the latest Basic salary
      const basicSalary = parseFloat(updatedEarnings.find((e) => e.salary_component === 'Basic')?.annually || 0);

      if (earning.salary_component === 'HRA') {
        const percentage = parseFloat(earning.calculation_type || 0);
        const annualAmount = (basicSalary * percentage) / 100;
        updatedEarning.monthly = Math.round((annualAmount / 12) * 100) / 100;
        updatedEarning.annually = Math.round(annualAmount);
      }

      if (earning.salary_component === 'Conveyance Allowance') {
        const fixedAmount = parseFloat(earning.calculation_type) || 0;
        updatedEarning.monthly = Math.round((fixedAmount / 12) * 100) / 100;
        updatedEarning.annually = fixedAmount;
      }

      if (earning.salary_component === 'Special Allowance') {
        const totalOtherEarnings = updatedEarnings
          .filter((e) => e.salary_component !== 'Special Allowance')
          .reduce((sum, e) => sum + (parseFloat(e.annually) || 0), 0);

        const remainingAmount = Math.max(0, annualCtc - totalOtherEarnings);
        updatedEarning.monthly = Math.round((remainingAmount / 12) * 100) / 100;
        updatedEarning.annually = Math.round(remainingAmount);
      }

      // Update the original array in place
      Object.assign(earning, updatedEarning);
    });

    formik.setFieldValue('earnings', updatedEarnings);
  };

  const handleAddEarnings = () => {
    formik.setFieldValue('earnings', [...values.earnings, { salary_component: '', calculation_type: '', monthly: 0, annually: 0 }]);
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
  console.log(values.earnings);
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
                      {/* <CustomInput
                        value={earning.monthly}
                        onChange={(e) => handleEarningsChange(earning, index, 'monthly', e.target.value)}
                        fullWidth
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      /> */}
                      {earning.monthly}
                    </TableCell>
                    <TableCell>
                      {/* <CustomInput
                        value={earning.annually}
                        onChange={(e) => handleEarningsChange(earning, index, 'annually', e.target.value)}
                        fullWidth
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      /> */}
                      {earning.annually}
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

                {/* <TableRow>
                  <TableCell colSpan={5} sx={{ fontWeight: 'bold' }}>
                    Benefits
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
                <TableRow sx={{ backgroundColor: '#f6f2fc', margin: '20px' }}>
                  <TableCell
                    colSpan={2}
                    sx={{ fontWeight: 'bold', borderRadius: '16px 0 0 16px' }} // Rounded on the left
                  >
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
                <TableRow>
                  <TableCell colSpan={6} sx={{ fontWeight: 'bold' }}>
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
                <TableRow sx={{ backgroundColor: '#f6f2fc', margin: '20px' }}>
                  <TableCell
                    colSpan={2}
                    sx={{ fontWeight: 'bold', borderRadius: '16px 0 0 16px' }} // Rounded on the left
                  >
                    Net Salary (Take Home)
                  </TableCell>
                  <TableCell>
                    <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.monthly || 0), 0)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{values.earnings.reduce((sum, earning) => sum + parseFloat(earning.annually || 0), 0)}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderRadius: '0 16px 16px 0' }}></TableCell>
                </TableRow> */}
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
