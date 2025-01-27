'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
  Divider
} from '@mui/material';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import HomeCard from '@/components/cards/HomeCard';
import CustomInput from '@/utils/CustomInput';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  calculationType: Yup.string().required('Select a calculation type'),
  amount: Yup.number().when('calculationType', {
    is: 'flatAmount',
    then: Yup.number().required('Enter an amount').positive('Amount must be positive')
  })
});

function SalaryComponents() {
  const [open, setOpen] = useState(false);
  const [dummyData, setDummyData] = useState([]);

  const handleOpen = (data) => {
    // Pre-fill form with clicked row data
    formik.setValues({
      ...formik.values,
      name: data.componentName,
      type: data.type,
      calculationType: data.calculation,
      amount: data.calculation === 'Flat Amount' ? data.amount : '',
      isActive: data.status === 'Active',
      configurations: {
        partOfSalary: data.considerForEPF,
        taxable: data.considerForESI,
        proRata: false, // You can add more logic if required
        considerEPF: data.considerForEPF,
        considerESI: data.considerForESI
      }
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      calculationType: '',
      amount: '',
      isActive: false,
      configurations: {
        partOfSalary: false,
        taxable: false,
        proRata: false,
        considerEPF: false,
        considerESI: false
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
          componentName: 'HRA',
          type: 'Allowance',
          calculation: 'Percentage of Basic',
          considerForEPF: true,
          considerForESI: false,
          status: 'Active',
          amount: 2000
        },
        {
          id: 2,
          componentName: 'Basic Salary',
          type: 'Fixed',
          calculation: 'Flat Amount',
          considerForEPF: true,
          considerForESI: true,
          status: 'Active',
          amount: 3000
        }
      ];
      setDummyData(data);
    };

    fetchDummyData();
  }, []);

  return (
    <HomeCard title="Salary Components" tagline="Setup your organization before starting payroll">
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Salary Components</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add New Component
          </Button>
        </Stack>
        {dummyData ? (
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
                        <EmptyTable msg="No work locations available" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    dummyData.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell
                          style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff' }}
                          onClick={() => handleOpen(item)} // Handle row click and open dialog
                        >
                          {item.componentName}
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.calculation}</TableCell>
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
        ) : (
          <Grid2 size={12}>
            <EmptyTable msg="No Professional tax yet" />
          </Grid2>
        )}

        {/* Dialog to Edit/Save Component */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle textAlign="center">New Component</DialogTitle>
          <Divider />
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <div>Name</div>
                  <TextField
                    fullWidth
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <div>Type</div>
                  <TextField
                    fullWidth
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.type && Boolean(errors.type)}
                    helperText={touched.type && errors.type}
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
                        />
                      }
                      label="Flat Amount"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.calculationType === 'percentage'}
                          onChange={() => setFieldValue('calculationType', 'percentage')}
                        />
                      }
                      label="Percentage of Basic"
                    />
                  </FormGroup>
                </Grid2>

                {/* Amount Field */}
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <div>{values.calculationType === 'flatAmount' ? 'Enter Amount ' : 'Enter Percentage'}</div>
                  <TextField
                    fullWidth
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.amount && Boolean(errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                </Grid2>

                {/* Active Checkbox */}
                <Grid2 size={{ xs: 12 }}>
                  <FormControlLabel
                    control={<Checkbox name="isActive" checked={values.isActive} onChange={handleChange} />}
                    label="Mark this as Active"
                  />
                </Grid2>

                {/* Configurations */}
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant="subtitle1">Configuration</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox name="configurations.partOfSalary" checked={values.configurations.partOfSalary} onChange={handleChange} />
                      }
                      label="1. This is part of salary structure"
                    />
                    <FormControlLabel
                      control={<Checkbox name="configurations.taxable" checked={values.configurations.taxable} onChange={handleChange} />}
                      label="2. This is taxable"
                    />
                    <FormControlLabel
                      control={<Checkbox name="configurations.proRata" checked={values.configurations.proRata} onChange={handleChange} />}
                      label="3. Calculate Pro rata basis"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox name="configurations.considerEPF" checked={values.configurations.considerEPF} onChange={handleChange} />
                      }
                      label="4. Consider for EPF"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox name="configurations.considerESI" checked={values.configurations.considerESI} onChange={handleChange} />
                      }
                      label="5. Consider for ESI"
                    />
                  </FormGroup>
                </Grid2>
              </Grid2>
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
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </HomeCard>
  );
}

export default SalaryComponents;
