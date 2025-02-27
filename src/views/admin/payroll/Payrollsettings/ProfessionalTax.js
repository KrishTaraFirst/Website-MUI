'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import {
  Button,
  Box,
  TextField,
  Typography,
  Grid2,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination
} from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import { useRouter } from 'next/navigation';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import { useSearchParams } from 'next/navigation';
import Loader from '@/components/PageLoader';
import { useSnackbar } from '@/components/CustomSnackbar';
import Factory from '@/utils/Factory';
import ActionCell from '@/utils/ActionCell';
import ViewSlabsModel from './ViewSlabs';
const details = [
  { name: 'work_location_name', label: 'Work Location' },
  { name: 'state', label: 'State' },
  { name: 'pt_number', label: 'PT Number' }
];

// Yup Validation Schema
const validationSchema = Yup.object({
  work_location_name: Yup.string().required('Work Location is required'),
  state: Yup.string().required('State is required'),
  pt_number: Yup.string().required('PT Number is required'),
  slab: Yup.array()
    .of(
      Yup.object({
        min_salary: Yup.number().required('Start range is required').min(0, 'Start range must be greater than or equal to 0'),
        max_salary: Yup.number()
          .required('End range is required')
          .min(Yup.ref('min_salary'), 'End range must be greater than or equal to start range'),
        pt_amount: Yup.number().required('Monthly tax amount is required').min(0, 'Monthly tax amount must be greater than or equal to 0')
      })
    )
    .min(1, 'At least one tax slab is required')
});

function ProfessionalTax({ handleBack, handleNext }) {
  const [open, setOpen] = useState(false);
  const [viewSlabsDialog, setViewSlabsDialog] = useState(false);
  const [ptData, setPtData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showSnackbar } = useSnackbar();
  const [payrollid, setPayrollId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState('');
  const [workLocations, setWorkLocations] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const paginatedData = ptData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const MAX_SALARY = 999999999;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);
  const formik = useFormik({
    initialValues: {
      work_location_name: '',
      state: '',
      pt_number: '',
      slab: [{ min_salary: '', max_salary: '', pt_amount: '' }]
    },

    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const selectedLocation = workLocations.find((item) => item.location_name === values.work_location_name);

      if (selectedLocation) {
        values.work_location = selectedLocation.id;
      }
      const postData = { ...values };
      postData.payroll = Number(payrollid);
      const url = postType === 'post' ? `/payroll/pt` : `/payroll/pt/${values.id}`;
      const { res, error } = await Factory(postType, url, postData);
      setLoading(false);
      if (res.status_cd === 0) {
        showSnackbar(postType === 'post' ? 'Data Saved Successfully' : 'Data Updated Successfully', 'success');
        handleClose();
        get_pt_Details(payrollid);
      } else {
        showSnackbar(JSON.stringify(res.data.data), 'error');
      }
    }
  });

  const get_pt_Details = async (id) => {
    setLoading(true);
    const url = `/payroll/pt?payroll_id=${id}`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false);

    if (res.status_cd === 0) {
      setPtData(res.data);
    } else {
    }
  };
  const fetchWorkLocations = async (id) => {
    if (!payrollid) return;

    const url = `/payroll/work-locations/?payroll_id=${id}`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0 && Array.isArray(res?.data)) {
      setWorkLocations(res?.data); // Successfully set work locations
    } else {
      setWorkLocations([]);
      showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
    }
  };
  // Effect to trigger API call when either businessId or payrollid is set
  useEffect(() => {
    if (payrollid) {
      get_pt_Details(payrollid);
      fetchWorkLocations(payrollid);
    }
  }, [payrollid]);

  const { values, setValues, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue, resetForm } = formik;

  const renderFields = (fields) => {
    return fields.map((field) => {
      if (field.name === 'state' || field.name === 'work_location_name') {
        return (
          <Grid2 key={field.name} size={{ xs: 12, sm: 6, md: 4 }} sx={{ mt: 1 }}>
            <div style={{ paddingBottom: '5px' }}>
              <label>{field.label}</label>
            </div>
            <CustomAutocomplete
              value={values[field.name]}
              name={field.name}
              onChange={(e, newValue) => {
                setFieldValue(field.name, newValue);
                if (field.name === 'work_location_name' && newValue) {
                  const selectedLocation = workLocations.find((item) => item.location_name === newValue);
                  if (selectedLocation) {
                    setFieldValue('state', selectedLocation.address_state);
                  }
                }
              }}
              options={field.name === 'work_location_name' ? workLocations.map((item) => item.location_name) : indian_States_And_UTs}
              error={touched[field.name] && Boolean(errors[field.name])}
              helperText={touched[field.name] && errors[field.name]}
              sx={{ width: '100%' }}
            />
          </Grid2>
        );
      }

      return (
        <Grid2 key={field.name} size={{ xs: 12, sm: 4 }} sx={{ mt: 1 }}>
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
      );
    });
  };

  const handleAddItemRow = () => {
    const newSlab = { min_salary: '', max_salary: '', pt_amount: '' };
    setFieldValue('slab', [...values.slab, newSlab]);
  };

  const handleDeleteItem = (index) => {
    const newSlabs = values.slab.filter((_, i) => i !== index);
    setFieldValue('slab', newSlabs);
  };
  const handleEdit = (item) => {
    setPostType('put');
    setSelectedRecord(item);
    handleOpen();
  };
  const handleDelete = async (item) => {
    let url = `/payroll/pt/${item.id}`;
    const { res } = await Factory('delete', url, {});
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      showSnackbar('Record Deleted Successfully', 'success');
      get_pt_Details(payrollid);
    }
  };
  useEffect(() => {
    if (postType === 'put' && selectedRecord) {
      setValues(selectedRecord);
    }
  }, [postType, selectedRecord]);

  const calculatePtAmount = (minSalary, maxSalary) => {
    minSalary = parseFloat(minSalary); // Convert to number
    maxSalary = parseFloat(maxSalary); // Convert to number

    if (minSalary >= 0 && maxSalary <= 14999) {
      return 0;
    } else if (minSalary >= 0 && maxSalary <= 19999) {
      return 150;
    } else if (minSalary >= 20000) {
      return 200;
    }
    return 0; // default
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <Grid2 size={12}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="h6"></Typography>
              <Button
                variant="contained"
                startIcon={<IconPlus size={16} />}
                onClick={() => {
                  setPostType('post');
                  handleOpen();
                }}
              >
                Add
              </Button>
            </Stack>
          </Grid2>
          <Grid2 size={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S No</TableCell>
                    <TableCell>Work Location</TableCell>
                    <TableCell>PT Number</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>PT Slabs</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ height: 300 }}>
                        <EmptyTable msg="No Professional tax yet" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData?.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{item.work_location_name}</TableCell>
                        <TableCell>{item.pt_number}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell
                          style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff' }}
                          onClick={() => {
                            setSelectedRecord(item);
                            setViewSlabsDialog(true);
                          }}
                        >
                          View Slabs
                        </TableCell>
                        <TableCell>
                          {/* ActionCell to handle actions */}
                          <ActionCell
                            row={location} // Pass the customer row data
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
            {ptData.length > 0 && (
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', px: { xs: 0.5, sm: 2.5 }, py: 1.5 }}>
                <Pagination count={Math.ceil(ptData.length / rowsPerPage)} page={currentPage} onChange={handlePageChange} />
              </Stack>
            )}
          </Grid2>

          <Modal
            open={open}
            maxWidth={ModalSize.LG}
            header={{ title: 'Professional Tax', subheader: '' }}
            modalContent={
              <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
                <Grid2 container spacing={3}>
                  {renderFields(details)}
                </Grid2>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Tax Slabs
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>Start Range</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>End Range</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>Monthly Tax Amount</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.slab.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <TextField
                                fullWidth
                                value={item.min_salary}
                                onChange={(e) => {
                                  const newSlabs = [...formik.values.slab];
                                  let minSalary = e.target.value;

                                  // Ensure min_salary is a number and within the range
                                  if (parseFloat(minSalary) > MAX_SALARY) {
                                    minSalary = MAX_SALARY;
                                  }

                                  newSlabs[index].min_salary = minSalary;
                                  // Ensure min_salary is a number
                                  const minSalaryNumber = parseFloat(minSalary);
                                  const maxSalaryNumber = parseFloat(newSlabs[index].max_salary);

                                  // Update pt_amount based on the new min_salary and max_salary
                                  const ptAmount = calculatePtAmount(minSalaryNumber, maxSalaryNumber);
                                  newSlabs[index].pt_amount = ptAmount;

                                  formik.setFieldValue('slab', newSlabs);
                                }}
                                error={formik.touched.slab?.[index]?.min_salary && Boolean(formik.errors.slab?.[index]?.min_salary)}
                                helperText={formik.touched.slab?.[index]?.min_salary && formik.errors.slab?.[index]?.min_salary}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                value={item.max_salary}
                                onChange={(e) => {
                                  const newSlabs = [...formik.values.slab];
                                  let maxSalary = e.target.value;

                                  // Ensure max_salary is a number and within the range
                                  if (parseFloat(maxSalary) > MAX_SALARY) {
                                    maxSalary = MAX_SALARY;
                                  }

                                  newSlabs[index].max_salary = maxSalary;
                                  // Ensure max_salary is a number
                                  const minSalaryNumber = parseFloat(newSlabs[index].min_salary);
                                  const maxSalaryNumber = parseFloat(maxSalary);

                                  // Update pt_amount based on the new min_salary and max_salary
                                  const ptAmount = calculatePtAmount(minSalaryNumber, maxSalaryNumber);
                                  newSlabs[index].pt_amount = ptAmount;

                                  formik.setFieldValue('slab', newSlabs);
                                }}
                                error={formik.touched.slab?.[index]?.max_salary && Boolean(formik.errors.slab?.[index]?.max_salary)}
                                helperText={formik.touched.slab?.[index]?.max_salary && formik.errors.slab?.[index]?.max_salary}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                value={item.pt_amount}
                                onChange={(e) => {
                                  const newSlabs = [...values.slab];
                                  newSlabs[index].pt_amount = e.target.value;
                                  setFieldValue('slab', newSlabs);
                                }}
                                // disabled
                              />
                            </TableCell>
                            <TableCell>
                              <Button color="error" onClick={() => handleDeleteItem(index)} startIcon={<IconTrash size={16} />} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleAddItemRow}>
                      Add Slab
                    </Button>
                  </Box>
                </Box>
              </Box>
            }
            footer={
              <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    resetForm();
                    handleClose();
                    setPostType('');
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
          {viewSlabsDialog === true && (
            <ViewSlabsModel
              viewSlabsDialog={viewSlabsDialog}
              setViewSlabsDialog={setViewSlabsDialog}
              selectedRecord={selectedRecord}
              setSelectedRecord={setSelectedRecord}
            />
          )}
          <Grid2 size={12} textAlign="center" sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  router.back();
                }}
              >
                Back to Dashboard
              </Button>
              <Button size="small" variant="contained" onClick={handleBack} sx={{ mr: 2 }}>
                Back
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      )}
    </>
  );
}

export default ProfessionalTax;
