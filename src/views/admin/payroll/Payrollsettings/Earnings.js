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
  Divider,
  Pagination
} from '@mui/material';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import { useRouter } from 'next/navigation';
import Factory from '@/utils/Factory';
import { useSearchParams } from 'next/navigation';
import Loader from '@/components/PageLoader';
import { useSnackbar } from '@/components/CustomSnackbar';
import ActionCell from '@/utils/ActionCell';

const validationSchema = Yup.object({
  component_name: Yup.string().required('Name is required'),
  component_type: Yup.string().required('Type is required')
});

function EarningsComponent({ handleNext, handleBack }) {
  const [open, setOpen] = useState(false);
  const [earningsData, setEarningsData] = useState([]);
  const router = useRouter();
  const [postType, setPostType] = useState('');
  const [loading, setLoading] = useState(false);
  const [payrollid, setPayrollId] = useState(null);
  const searchParams = useSearchParams();
  const { showSnackbar } = useSnackbar();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const paginatedData = earningsData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);
  const handleOpen = (item) => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleEdit = (item) => {
    setPostType('put');
    setSelectedRecord(item);
    setValues(item);
    handleOpen();
  };
  const handleDelete = async (item) => {
    let url = `/payroll/earnings/${item.id}`;
    const { res } = await Factory('delete', url, {});
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      showSnackbar('Record Deleted Successfully', 'success');
      getEarnings_Details(payrollid);
    }
  };
  const formik = useFormik({
    initialValues: {
      component_name: '',
      component_type: '',
      is_active: false,
      calculation_type: {
        type: '',
        value: 0
      },
      is_part_of_employee_salary_structure: false,
      is_taxable: false,
      is_pro_rate_basis: false,
      is_flexible_benefit_plan: false,
      includes_epf_contribution: false,
      includes_esi_contribution: false,
      is_included_in_payslip: false,
      tax_deduction_preference: null,
      is_scheduled_earning: false
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const postData = { ...values };
      postData.payroll = Number(payrollid);
      const url = postType === 'post' ? `/payroll/earnings` : `/payroll/earnings/${selectedRecord.id}`;
      const { res, error } = await Factory(postType, url, postData);
      setLoading(false);
      if (res.status_cd === 0) {
        showSnackbar(postType === 'post' ? 'Data Saved Successfully' : 'Data Updated Successfully', 'success');
        handleClose();
        getEarnings_Details(payrollid);
        // router.back();
      } else {
        showSnackbar(JSON.stringify(res.data.data), 'error');
      }
    }
  });
  const getEarnings_Details = async (id) => {
    setLoading(true);
    const url = `/payroll/earnings?payroll_id=${id}`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false);
    if (res.status_cd === 0) {
      setEarningsData(res.data);
    } else {
    }
  };
  useEffect(() => {
    if (payrollid) {
      getEarnings_Details(payrollid);
    }
  }, [payrollid]);
  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, resetForm, setFieldValue } = formik;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Grid2 size={12}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  onClick={() => {
                    setPostType('post');
                    setOpen(true);
                  }}
                >
                  Add Component
                </Button>
              </Stack>
            </Box>
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
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ height: 300 }}>
                        <EmptyTable msg="No Data available" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell
                          style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff' }}
                          onClick={() => {
                            setPostType('put');
                            handleEdit(item);
                          }}
                        >
                          {item.component_name}
                        </TableCell>
                        <TableCell>{item.component_type}</TableCell>
                        <TableCell>{item.calculation_type.value + ' ' + item.calculation_type.type}</TableCell>
                        <TableCell>{item.includes_epf_contribution ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{item.includes_esi_contribution ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{item.is_active === true ? 'Active' : 'In active'}</TableCell>
                        <TableCell>
                          <ActionCell
                            row={item} // Pass the customer row data
                            onEdit={() => handleEdit(item)} // Edit handler
                            onDelete={() => handleDelete(item)} // Delete handler
                            open={open}
                            onClose={handleClose}
                            deleteDialogData={{
                              title: 'Delete Record',
                              heading: 'Are you sure you want to delete this Record?',
                              description: `This action will remove ${item.name} from the list.`,
                              successMessage: 'Record has been deleted.'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {earningsData.length > 0 && (
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', px: { xs: 0.5, sm: 2.5 }, py: 1.5 }}>
                <Pagination count={Math.ceil(earningsData.length / rowsPerPage)} page={currentPage} onChange={handlePageChange} />
              </Stack>
            )}
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
                      value={values.component_name}
                      onChange={(e) => setFieldValue('component_name', e.target.value)}
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
                        values.component_name === 'Basic' ||
                        values.component_name === 'HRA' ||
                        values.component_name === 'Special Allowance'
                      }
                    />
                  </Grid2>

                  {/* Calculation Type */}
                  <Grid2 container spacing={2} sx={{ mt: 2 }}>
                    <Grid2>
                      <Grid2 size={{ xs: 12 }}>
                        <Typography variant="subtitle1">Calculation Type:</Typography>
                        <FormGroup row sx={{ mt: 1 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.calculation_type.type === 'Flat Amount'}
                                onChange={() => setFieldValue('calculation_type.type', 'Flat Amount')}
                                disabled={values.component_name === 'Basic' || values.component_name === 'HRA'}
                              />
                            }
                            label="Flat Amount"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  values.calculation_type.type === 'Percentage of CTC' ||
                                  values.calculation_type.type === 'Percentage of Basic'
                                }
                                onChange={(e) => {
                                  if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                                    let val = e.target.checked;
                                    setFieldValue('calculation_type.type', 'Percentage of Basic');
                                  }
                                }}
                              />
                            }
                            label={values.component_name === 'Basic' ? 'Percentage of CTC' : 'Percentage of Basic'}
                          />
                        </FormGroup>
                      </Grid2>

                      {/* Amount Field */}
                      <Grid2 size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                        <Typography sx={{ mb: 0.5 }}>
                          {values.calculation_type.type === 'Flat Amount' ? 'Enter Amount ' : 'Enter Percentage'}
                        </Typography>
                        <TextField
                          fullWidth
                          value={values.calculation_type.value}
                          onChange={(e) => {
                            // Allow only numbers and one decimal point
                            const numericValue = e.target.value
                              .replace(/[^0-9.]/g, '') // Remove non-numeric and non-decimal characters
                              .replace(/(\..*)\./g, '$1'); // Ensure only one decimal point is allowed
                            setFieldValue('calculation_type.value', numericValue);
                          }}
                          onBlur={handleBlur}
                          // error={touched.calculation_type.value && Boolean(errors.calculation_type.value)}
                          // helperText={touched.calculation_type.value && errors.calculation_type.value}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center' }}>
                                <span>{values.calculation_type.type === 'Flat Amount' ? '₹' : '%'}</span>
                                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '24px' }} />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid2>

                      {/* Active Checkbox */}
                      <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.is_active}
                              onChange={(e) => {
                                // if (values.component_name === 'Basic' || values.component_name === 'HRA') {
                                let val = e.target.checked;
                                setFieldValue('is_active', val);
                                // }
                              }}
                            />
                          }
                          label="Mark this as Active"
                        />
                      </Grid2>
                    </Grid2>
                    <Grid2>
                      <Grid2 size={{ xs: 12 }}>
                        <Typography variant="subtitle1">Configuration</Typography>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.is_part_of_employee_salary_structure}
                                onChange={(e) => {
                                  if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                                    let val = e.target.checked;
                                    setFieldValue('is_part_of_employee_salary_structure', val);
                                  }
                                }}
                              />
                            }
                            label="1. This is part of salary structure"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.is_taxable}
                                onChange={(e) => {
                                  if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                                    let val = e.target.checked;
                                    setFieldValue('is_taxable', val);
                                  }
                                }}
                              />
                            }
                            label="2. This is is_taxable"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.is_pro_rate_basis}
                                onChange={(e) => {
                                  if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                                    let val = e.target.checked;
                                    setFieldValue('is_pro_rate_basis', val);
                                  }
                                }}
                              />
                            }
                            label="3. Calculate Pro rata basis"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.includes_epf_contribution}
                                onChange={(e) => {
                                  if (values.component_name !== 'Basic' && values.component_name !== 'Conveyance Allowance') {
                                    let val = e.target.checked;
                                    setFieldValue('includes_epf_contribution', val);
                                  }
                                }}
                              />
                            }
                            label="4. Consider for EPF"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.includes_esi_contribution}
                                onChange={(e) => {
                                  if (values.component_name !== 'Basic' && values.component_name !== 'HRA') {
                                    let val = e.target.checked;
                                    setFieldValue('includes_esi_contribution', val);
                                  }
                                }}
                              />
                            }
                            label="5. Consider for ESI"
                          />
                        </FormGroup>
                      </Grid2>
                    </Grid2>
                  </Grid2>

                  {/* Configurations */}
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
                    setPostType('');
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
      )}
    </>
  );
}
export default EarningsComponent;
