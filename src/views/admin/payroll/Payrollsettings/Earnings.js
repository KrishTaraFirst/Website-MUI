'use client';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Tab, Tabs } from '@mui/material';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Grid2,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  TableRow,
  InputAdornment,
  Divider
} from '@mui/material';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
  component_name: Yup.string().required('Name is required'),
  component_type: Yup.string().required('Type is required')
});

function EarningsComponent({ open, setOpen, handleNext, handleBack }) {
  const [dummyData, setDummyData] = useState([]);
  const router = useRouter();

  const handleOpen = (item) => {
    formik.setValues({
      ...formik.values,
      id: item.id, // Setting the id of the clicked item
      component_name: item.component_name,
      component_type: item.component_type,
      calculationType: item.calculationType,
      amount_value: item.amount_value,
      percentage_of_basic: item.percentage_of_basic,
      considerForEPF: item.considerForEPF,
      considerForESI: item.considerForESI,
      is_active: item.status === 'Active', // Map status to boolean
      configurations: item.configurations // Assign configurations directly
    });
    setOpen(true); // Open the modal to edit the details
  };

  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      id: 1,
      component_name: '',
      component_type: '',
      calculationType: '',
      amount_value: 0,
      percentage_of_basic: false,
      considerForEPF: false,
      considerForESI: false,
      is_active: false,
      configurations: {
        is_part_of_employee_salary_structure: false,
        is_taxable: false,
        is_pro_rate_basis: false,
        includes_epf_contribution: false,
        includes_esi_contribution: false
      }
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      resetForm();
      handleClose();
    }
  });

  const { values, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue, resetForm } = formik;

  useEffect(() => {
    const fetchDummyData = () => {
      const data = [
        {
          id: 1,
          component_name: 'Basic',
          component_type: 'Fixed',
          amount_value: '',
          is_flat_amount: false,
          percentage_of_basic: true,
          status: 'Active',
          is_active: false,
          is_part_of_employee_salary_structure: true,
          is_taxable: true,
          is_pro_rate_basis: true,
          includes_epf_contribution: true,
          includes_esi_contribution: true,
          is_included_in_payslip: true,
          tax_deduction_preference: null,
          is_scheduled_earning: true
        },
        {
          id: 2,
          component_name: 'HRA',
          component_type: 'Fixed',
          amount_value: '',
          is_flat_amount: false,
          percentage_of_basic: true,
          status: 'Active',
          is_active: false,
          is_part_of_employee_salary_structure: true,
          is_taxable: true,
          is_pro_rate_basis: true,
          includes_epf_contribution: false,
          includes_esi_contribution: true,
          is_included_in_payslip: true,
          tax_deduction_preference: null,
          is_scheduled_earning: true
        },
        {
          id: 3,
          component_name: 'Special Allowance',
          component_type: 'Fixed',
          amount_value: '',
          is_flat_amount: false,
          percentage_of_basic: false,
          status: 'Active',
          is_active: false,
          is_part_of_employee_salary_structure: true,
          is_taxable: true,
          is_pro_rate_basis: true,
          includes_epf_contribution: true,
          includes_esi_contribution: true,
          is_included_in_payslip: true,
          tax_deduction_preference: null,
          is_scheduled_earning: true
        },
        {
          id: 4,
          component_name: 'Conveyance Allowance',
          component_type: 'Fixed',
          amount_value: '',
          is_flat_amount: false,
          percentage_of_basic: false,
          status: 'Active',
          is_active: false,
          is_part_of_employee_salary_structure: true,
          is_taxable: true,
          is_pro_rate_basis: false,
          includes_epf_contribution: true,
          includes_esi_contribution: true,
          is_included_in_payslip: true,
          tax_deduction_preference: null,
          is_scheduled_earning: true
        }
      ];
      setDummyData(data);
    };

    fetchDummyData();
  }, []);

  return (
    <Box>
      <Box>
        <Grid2 size={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Component Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Calculation</TableCell>
                  <TableCell>Consider for EPF</TableCell>
                  <TableCell>Consider for ESI</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ height: 300 }}>
                      <EmptyTable msg="No Data available" />
                    </TableCell>
                  </TableRow>
                ) : (
                  dummyData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell
                        style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff' }}
                        onClick={() => handleOpen(item)} // Handle row click and open dialog
                      >
                        {item.component_name}
                      </TableCell>
                      <TableCell>{item.component_type}</TableCell>
                      <TableCell>{item.calculationType}</TableCell>
                      <TableCell>{item.considerForEPF ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{item.considerForESI ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
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

        <Modal
          open={open}
          maxWidth={ModalSize.MD}
          header={{ title: 'New Component', subheader: '' }}
          modalContent={
            <Box component="form" onSubmit={handleSubmit}>
              <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    Name
                  </Typography>
                  <TextField
                    fullWidth
                    component_name="component_name"
                    value={values.component_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.component_name && Boolean(errors.component_name)}
                    helperText={touched.component_name && errors.component_name}
                    disabled={
                      values.component_name === 'Special Allowance' ||
                      values.component_name === 'Conveyance Allowance' ||
                      values.component_name === 'HRA' ||
                      values.component_name === 'Basic'
                    }
                  />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    Type
                  </Typography>

                  <CustomAutocomplete
                    value={values.component_type}
                    component_name="component_type"
                    onChange={(e, newValue) => setFieldValue('component_type', newValue)}
                    options={['Fixed', 'Variable']}
                    error={touched.component_type && Boolean(errors.component_type)}
                    helperText={touched.component_type && errors.component_type}
                    sx={{ width: '100%' }}
                    disabled={
                      values.component_name === 'Basic' || values.component_name === 'HRA' || values.component_name === 'Special Allowance'
                    }
                  />
                </Grid2>

                {/* Calculation Type */}
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant="subtitle1">Calculation Type:</Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.calculationType === 'flatAmount'}
                          onChange={() => setFieldValue('calculationType', 'flatAmount')}
                          disabled={values.component_name === 'Basic' || values.component_name === 'HRA'}
                        />
                      }
                      label="Flat Amount"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.percentage_of_basic}
                          onChange={(e) => {
                            if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('calculationType', 'percentage_of_basic');
                              setFieldValue('percentage_of_basic', val);
                            }
                          }}
                        />
                      }
                      label="Percentage of Basic"
                    />
                  </FormGroup>
                </Grid2>

                {/* Amount Field */}
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography sx={{ mb: 0.5 }}>{values.calculationType === 'flatAmount' ? 'Enter Amount ' : 'Enter Percentage'}</Typography>
                  <TextField
                    fullWidth
                    component_name="amount_value"
                    value={values.amount_value}
                    onChange={(e) => {
                      setFieldValue('amount_value', e.target.value);
                    }}
                    onBlur={handleBlur}
                    error={touched.amount_value && Boolean(errors.amount_value)}
                    helperText={touched.amount_value && errors.amount_value}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center' }}>
                          <span>{values.calculationType === 'flatAmount' ? '₹' : '%'}</span>
                          <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '24px' }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid2>

                {/* Active Checkbox */}
                <Grid2 size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        component_name="is_active"
                        checked={values.is_active}
                        onChange={(e) => {
                          if (values.component_name !== 'Basic') {
                            let val = e.target.checked;
                            setFieldValue('is_active', val);
                          }
                        }}
                      />
                    }
                    label="Mark this as Active"
                  />
                </Grid2>

                {/* Configurations */}
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant="subtitle1">Configuration</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.is_part_of_employee_salary_structure}
                          onChange={(e) => {
                            if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('configurations.is_part_of_employee_salary_structure', val);
                            }
                          }}
                        />
                      }
                      label="1. This is part of salary structure"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.is_taxable}
                          onChange={(e) => {
                            if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('configurations.is_taxable', val);
                            }
                          }}
                        />
                      }
                      label="2. This is is_taxable"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.is_pro_rate_basis}
                          onChange={(e) => {
                            if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('configurations.is_pro_rate_basis', val);
                            }
                          }}
                        />
                      }
                      label="3. Calculate Pro rata basis"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.includes_epf_contribution}
                          onChange={(e) => {
                            if (values.component_name !== 'Basic') {
                              let val = e.target.checked;
                              setFieldValue('configurations.includes_epf_contribution', val);
                            }
                          }}
                        />
                      }
                      label="4. Consider for EPF"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.includes_esi_contribution}
                          onChange={(e) => {
                            if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('configurations.includes_esi_contribution', val);
                            }
                          }}
                        />
                      }
                      label="5. Consider for ESI"
                    />
                  </FormGroup>
                </Grid2>
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
                  handleClose(); // Reset form and close dialog
                }}
              >
                Cancel
              </Button>
              <Button component_type="submit" variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </Stack>
          }
        />
      </Box>
    </Box>
  );
}
export default EarningsComponent;
