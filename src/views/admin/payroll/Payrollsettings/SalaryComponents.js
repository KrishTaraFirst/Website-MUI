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
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required')
});

function SalaryComponents({ open, setOpen, handleNext, handleBack }) {
  const [dummyData, setDummyData] = useState([]);
  const router = useRouter();

  const handleOpen = (item) => {
    formik.setValues({
      ...formik.values,
      id: item.id, // Setting the id of the clicked item
      name: item.name,
      type: item.type,
      calculationType: item.calculationType,
      amount: item.amount,
      percentage_of_basic: item.percentage_of_basic,
      considerForEPF: item.considerForEPF,
      considerForESI: item.considerForESI,
      isActive: item.status === 'Active', // Map status to boolean
      configurations: item.configurations // Assign configurations directly
    });
    setOpen(true); // Open the modal to edit the details
  };

  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      id: 1,
      name: '',
      type: '',
      calculationType: '',
      amount: 0,
      percentage_of_basic: false,
      considerForEPF: false,
      considerForESI: false,
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
          name: 'Basic',
          type: 'Fixed',
          calculationType: 'percentage_of_basic',
          amount: '',
          percentage_of_basic: true,
          status: 'Active',
          isActive: false,
          configurations: {
            partOfSalary: true,
            taxable: true,
            proRata: true,
            considerEPF: true,
            considerESI: true
          }
        },
        {
          id: 2,
          name: 'HRA',
          type: 'Fixed',
          calculationType: 'percentage_of_basic',
          amount: '',
          percentage_of_basic: true,
          status: 'Active',
          isActive: false,
          configurations: {
            partOfSalary: true,
            taxable: true,
            proRata: true,
            considerEPF: false,
            considerESI: true
          }
        },
        {
          id: 3,
          name: 'Special Allowance',
          type: 'Fixed',
          calculationType: '',
          amount: '',
          percentage_of_basic: false,
          status: 'Active',
          isActive: false,
          configurations: {
            partOfSalary: true,
            taxable: true,
            proRata: true,
            considerEPF: true,
            considerESI: true
          }
        },
        {
          id: 4,
          name: 'Conveyance Allowance',
          type: 'Fixed',
          calculationType: '',
          amount: '',
          percentage_of_basic: false,
          status: 'Active',
          isActive: false,
          configurations: {
            partOfSalary: true,
            taxable: true,
            proRata: false,
            considerEPF: true,
            considerESI: true
          }
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
                        {item.name}
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
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
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    disabled={
                      values.name === 'Special Allowance' ||
                      values.name === 'Conveyance Allowance' ||
                      values.name === 'HRA' ||
                      values.name === 'Basic'
                    }
                  />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    Type
                  </Typography>

                  <CustomAutocomplete
                    value={values.type}
                    name="type"
                    onChange={(e, newValue) => setFieldValue('type', newValue)}
                    options={['Fixed', 'Variable']}
                    error={touched.type && Boolean(errors.type)}
                    helperText={touched.type && errors.type}
                    sx={{ width: '100%' }}
                    disabled={values.name === 'Basic' || values.name === 'HRA' || values.name === 'Special Allowance'}
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
                          disabled={values.name === 'Basic' || values.name === 'HRA'}
                        />
                      }
                      label="Flat Amount"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.percentage_of_basic}
                          onChange={(e) => {
                            if (values.name !== 'Basic' && values.name !== 'HRA') {
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
                    name="amount"
                    value={values.amount}
                    onChange={(e) => {
                      setFieldValue('amount', e.target.value);
                    }}
                    onBlur={handleBlur}
                    error={touched.amount && Boolean(errors.amount)}
                    helperText={touched.amount && errors.amount}
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
                        name="isActive"
                        checked={values.isActive}
                        onChange={(e) => {
                          if (values.name !== 'Basic') {
                            let val = e.target.checked;
                            setFieldValue('isActive', val);
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
                          checked={values.configurations.partOfSalary}
                          onChange={(e) => {
                            if (values.name !== 'Basic' && values.name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('configurations.partOfSalary', val);
                            }
                          }}
                        />
                      }
                      label="1. This is part of salary structure"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.taxable}
                          onChange={(e) => {
                            if (values.name !== 'Basic' && values.name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('configurations.taxable', val);
                            }
                          }}
                        />
                      }
                      label="2. This is taxable"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.proRata}
                          onChange={(e) => {
                            if (values.name !== 'Basic' && values.name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('configurations.proRata', val);
                            }
                          }}
                        />
                      }
                      label="3. Calculate Pro rata basis"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.considerEPF}
                          onChange={(e) => {
                            if (values.name !== 'Basic') {
                              let val = e.target.checked;
                              setFieldValue('configurations.considerEPF', val);
                            }
                          }}
                        />
                      }
                      label="4. Consider for EPF"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.configurations.considerESI}
                          onChange={(e) => {
                            if (values.name !== 'Basic' && values.name !== 'HRA') {
                              let val = e.target.checked;
                              setFieldValue('configurations.considerESI', val);
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
              <Button type="submit" variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </Stack>
          }
        />
      </Box>
    </Box>
  );
}

/***************************  NAVIGATION - TABS  ***************************/

// TabPanel component to render the content for each tab
const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
    {value === index && <Box sx={{ pt: 2.5 }}>{children}</Box>}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

const SalaryComponnetTabs = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const theme = useTheme(); // Getting the theme
  const [open, setOpen] = useState(false);

  // Function to handle tab changes
  const handleTabChange = (_event, newTabIndex) => setActiveTab(newTabIndex);

  // Accessibility props for tabs
  const a11yProps = (index) => ({
    value: index,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  // Tab labels
  const tabLabels = ['Earnings', 'Deductions'];
  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };
  const handleBack = () => {
    setActiveTab((prev) => (prev < 3 ? prev - 1 : prev));
  };
  return (
    <Box>
      <Typography textAlign="center" variant="h5">
        Salary Components
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Statutory Components Tabs">
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Component
          </Button>
        </Stack>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <SalaryComponents handleNext={handleNext} open={open} setOpen={setOpen} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {/* <ESIComponent handleNext={handleNext} handleBack={handleBack} /> */}
      </TabPanel>
    </Box>
  );
};

SalaryComponnetTabs.propTypes = {
  type: PropTypes.any
};

export default SalaryComponnetTabs;
