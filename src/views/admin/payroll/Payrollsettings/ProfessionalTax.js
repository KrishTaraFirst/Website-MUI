'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
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
  Divider
} from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons-react';

const details = [
  { name: 'work_location', label: 'Work Location' },
  { name: 'pt_number', label: 'PT Number' }
];

// Yup Validation Schema
const validationSchema = Yup.object({
  work_location: Yup.string().required('Work Location is required'),
  pt_number: Yup.string().required('PT Number is required'),
  tax_slabs: Yup.array()
    .of(
      Yup.object({
        start_range: Yup.number().required('Start range is required').min(0, 'Start range must be greater than or equal to 0'),
        end_range: Yup.number()
          .required('End range is required')
          .min(Yup.ref('start_range'), 'End range must be greater than or equal to start range'),
        monthly_tax_amount: Yup.number()
          .required('Monthly tax amount is required')
          .min(0, 'Monthly tax amount must be greater than or equal to 0')
      })
    )
    .min(1, 'At least one tax slab is required')
});

function ProfessionalTax() {
  const [open, setOpen] = useState(false);
  const [dummyData, setDummyData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      work_location: '',
      pt_number: '',
      tax_slabs: [{ start_range: '', end_range: '', monthly_tax_amount: '' }]
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      resetForm();
    }
  });

  const { values, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue, resetForm } = formik;

  // Simulate setting dummy values
  useEffect(() => {
    const fetchDummyData = () => {
      const data = [
        {
          id: 1,
          work_location: 'Location A',
          pt_number: 'PT001',
          state: 'State A',
          tax_slabs: [{ start_range: 0, end_range: 5000, monthly_tax_amount: 100 }]
        },
        {
          id: 2,
          work_location: 'Location B',
          pt_number: 'PT002',
          state: 'State B',
          tax_slabs: [{ start_range: 5001, end_range: 10000, monthly_tax_amount: 200 }]
        }
      ];
      setDummyData(data); // Set dummy data
    };

    fetchDummyData();
  }, []);

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

  const handleAddItemRow = () => {
    const newSlab = { start_range: '', end_range: '', monthly_tax_amount: '' };
    setFieldValue('tax_slabs', [...values.tax_slabs, newSlab]);
  };

  const handleDeleteItem = (index) => {
    const newSlabs = values.tax_slabs.filter((_, i) => i !== index);
    setFieldValue('tax_slabs', newSlabs);
  };

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6"></Typography>
          <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
            Add
          </Button>
        </Stack>
      </Grid2>
      {dummyData ? (
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
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyData?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ height: 300 }}>
                      No Designations available
                    </TableCell>
                  </TableRow>
                ) : (
                  dummyData?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.work_location}</TableCell>
                      <TableCell>{item.pt_number}</TableCell>
                      <TableCell>{item.state}</TableCell>
                      <TableCell>View Slabs</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      ) : (
        <Grid2 size={12}>
          <EmptyTable msg="No Professional tax yet" />
        </Grid2>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>Professional Tax</DialogTitle>
        <Divider />
        <DialogContent>
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
                    {values.tax_slabs.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={item.start_range}
                            onChange={(e) => {
                              const newSlabs = [...values.tax_slabs];
                              newSlabs[index].start_range = e.target.value;
                              setFieldValue('tax_slabs', newSlabs);
                            }}
                            error={touched.tax_slabs?.[index]?.start_range && Boolean(errors.tax_slabs?.[index]?.start_range)}
                            helperText={touched.tax_slabs?.[index]?.start_range && errors.tax_slabs?.[index]?.start_range}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={item.end_range}
                            onChange={(e) => {
                              const newSlabs = [...values.tax_slabs];
                              newSlabs[index].end_range = e.target.value;
                              setFieldValue('tax_slabs', newSlabs);
                            }}
                            error={touched.tax_slabs?.[index]?.end_range && Boolean(errors.tax_slabs?.[index]?.end_range)}
                            helperText={touched.tax_slabs?.[index]?.end_range && errors.tax_slabs?.[index]?.end_range}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={item.monthly_tax_amount}
                            onChange={(e) => {
                              const newSlabs = [...values.tax_slabs];
                              newSlabs[index].monthly_tax_amount = e.target.value;
                              setFieldValue('tax_slabs', newSlabs);
                            }}
                            error={touched.tax_slabs?.[index]?.monthly_tax_amount && Boolean(errors.tax_slabs?.[index]?.monthly_tax_amount)}
                            helperText={touched.tax_slabs?.[index]?.monthly_tax_amount && errors.tax_slabs?.[index]?.monthly_tax_amount}
                          />
                        </TableCell>
                        <TableCell>
                          <Button color="error" onClick={() => handleDeleteItem(index)} startIcon={<IconTrash size={16} />}></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleAddItemRow}>
                  Add New Row
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
              handleClose();
              resetForm();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
}

export default ProfessionalTax;
