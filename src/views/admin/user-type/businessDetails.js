'use client';
import dayjs from 'dayjs'; // Import dayjs
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useTheme } from '@mui/material/styles';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Typography,
  Button,
  DialogActions,
  Grid2,
  TextField,
  Divider,
  Tab,
  Tabs,
  Card,
  Container,
  Stack
} from '@mui/material';
import { useState } from 'react';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import CustomDatePicker from '@/utils/CustomDateInput';
import CustomInput from '@/utils/CustomInput';
import { useSnackbar } from '@/components/CustomSnackbar';
import useCurrentUser from '@/hooks/useCurrentUser';
import Factory from '@/utils/Factory';
import { APP_DEFAULT_PATH } from '@/config';
import { entity_choices } from '@/utils/Entity-types';
import { business_nature_choices } from '@/utils/Nature-of-bsiness';
import { IconBolt } from '@tabler/icons-react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2.5 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(value) {
  return {
    value: value,
    id: `simple-tab-${value}`,
    'aria-controls': `simple-tabpanel-${value}`
  };
}

// Field configurations
const BusinessFields = [
  { name: 'nameOfBusiness', label: 'Business Name' },
  { name: 'pan', label: 'Business PAN' },
  { name: 'dob_or_incorp_date', label: 'Date of Incorporation' },
  { name: 'entityType', label: 'Entity Type' },
  { name: 'business_nature', label: 'Business Nature' },
  { name: 'registrationNumber', label: 'Registration Number' },
  { name: 'trade_name', label: 'Trade Name' },
  { name: 'mobile_number', label: 'Mobile Number' },
  { name: 'email', label: 'Email' }
];

const HeadOfficeFields = [
  { name: 'address_line1', label: 'Address Line 1' },
  { name: 'address_line2', label: 'Address Line 2' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'pincode', label: 'Pincode' }
];

// Validation schema for formik
const validationSchema = Yup.object({
  nameOfBusiness: Yup.string().required('Business name is required'),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format')
    .required('PAN is required'),
  dob_or_incorp_date: Yup.date()
    .required('Date of incorporation is required')
    .max(new Date(), 'Incorporation date cannot be in the future')
    .nullable(),
  entityType: Yup.string().required('Entity type is required'),
  business_nature: Yup.string().required('Business nature is required'),
  registrationNumber: Yup.string().required('Registration number is required'),
  trade_name: Yup.string().required('Trade name is required'),
  mobile_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number format')
    .required('Mobile number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  address_line1: Yup.string().required('Address Line 1 is required'),
  address_line2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, 'Invalid Pincode format')
    .required('Pincode is required')
});

const tabLabels = ['Business Profile', 'Key Managerial Personnel', 'Compliance Profile', 'Licenses', 'Digital Signatures'];

export default function BusinessKYC() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(true);
  const { showSnackbar } = useSnackbar();
  const { userData } = useCurrentUser();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const formik = useFormik({
    initialValues: {
      nameOfBusiness: '',
      pan: '',
      dob_or_incorp_date: dayjs().format('YYYY-MM-DD'),
      entityType: '',
      business_nature: '',
      registrationNumber: '',
      trade_name: '',
      mobile_number: '',
      email: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      pincode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const postData = {
        ...values,
        headOffice: {
          address_line1: values.address_line1,
          address_line2: values.address_line2,
          city: values.city,
          state: values.state,
          pincode: values.pincode
        },
        client: userData.id
      };
      const url = `/user_management/businesses/`;
      const method = 'post';

      const { res } = await Factory(method, url, postData);
      if (res?.status_cd === 0) {
        showSnackbar('Business KYC done Successfully', 'success');
        setDialogOpen(false);
        const userDetails = JSON.parse(localStorage.getItem('auth-user'));
        userDetails.business_exists = true;
        localStorage.setItem('auth-user', JSON.stringify(userDetails));
        router.push(APP_DEFAULT_PATH);
      } else {
        showSnackbar(JSON.stringify(res.data.data.error_message), 'error');
      }
    }
  });

  const renderField = (field) => {
    if (field.name === 'state') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomAutocomplete
            value={values[field.name]}
            name={field.name}
            onChange={(e, newValue) => setFieldValue(field.name, newValue)}
            options={indian_States_And_UTs}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
          />
        </Grid2>
      );
    }

    // Handling for 'dob_or_incorp_date' field (CustomDatePicker)
    if (field.name === 'dob_or_incorp_date') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomDatePicker
            views={['year', 'month', 'day']}
            value={values.dob_or_incorp_date ? dayjs(values.dob_or_incorp_date) : null}
            onChange={(newDate) => setFieldValue('dob_or_incorp_date', dayjs(newDate).format('YYYY-MM-DD'))}
            error={touched.dob_or_incorp_date && Boolean(errors.dob_or_incorp_date)}
            helperText={touched.dob_or_incorp_date && errors.dob_or_incorp_date}
            size="small"
            sx={{ width: '100%' }}
            onBlur={handleBlur}
          />
        </Grid2>
      );
    }

    // Handling for 'entityType' field (CustomAutocomplete)
    if (field.name === 'entityType') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomAutocomplete
            value={entity_choices.find((option) => option.key === values[field.name]) || null}
            name={field.name}
            onChange={(e, newValue) => setFieldValue(field.name, newValue ? newValue.key : '')}
            options={entity_choices}
            getOptionLabel={(option) => option.title}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
          />
        </Grid2>
      );
    }

    // Handling for 'businessNature' field (CustomAutocomplete)
    if (field.name === 'business_nature') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomAutocomplete
            value={business_nature_choices.find((option) => option.key === values[field.name]) || null}
            name={field.name}
            onChange={(e, newValue) => setFieldValue(field.name, newValue ? newValue.key : '')}
            options={business_nature_choices}
            getOptionLabel={(option) => option.title}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            sx={{ width: '100%' }}
          />
        </Grid2>
      );
    }

    // Default handling for other fields (CustomInput)
    return (
      <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
        <div style={{ marginBottom: '2px' }}>{field.label}</div>

        <CustomInput
          name={field.name}
          value={values[field.name]}
          onChange={(e) => {
            if (field.name === 'pan') {
              setFieldValue(field.name, e.target.value.toUpperCase());
            } else {
              setFieldValue(field.name, e.target.value);
            }
          }}
          onBlur={handleBlur}
          error={touched[field.name] && Boolean(errors[field.name])}
          helperText={touched[field.name] && errors[field.name]}
          sx={{ width: '100%' }}
        />
      </Grid2>
    );
  };
  const { values, setValues, errors, touched, handleSubmit, handleBlur, setFieldValue, resetForm } = formik;
  return (
    <Card sx={{ borderRadius: 2.5 }}>
      <Tabs
        variant="fullWidth"
        scrollButtons={true}
        value={value}
        sx={{ borderBottom: '1px solid #e9e9e9' }}
        onChange={handleChange}
        aria-label="Business profile tabs"
      >
        {tabLabels.map((label, index) => (
          <Tab
            label={
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <Avatar variant="rounded" sx={{ mr: 1, bgcolor: 'grey.300', width: 32, height: 30 }}>
                  <IconBolt color={theme.palette.text.primary} />
                </Avatar>
                <Typography variant="subtitle1">{label}</Typography>
              </Stack>
            }
            // label={label}
            {...a11yProps(index)}
            sx={{
              fontSize: '1rem',
              textTransform: 'none',
              p: 1,
              py: 2
            }}
          />
        ))}

        {/* <Tab label="Key Managerial Personnel" {...a11yProps('label2')} />
        <Tab label="Compliance Profile" {...a11yProps('label3')} />
        <Tab label="Licenses" {...a11yProps('label4')} />
        <Tab label="Digital Signatures" {...a11yProps('label5')} /> */}
      </Tabs>

      <TabPanel value={value} index={0}>
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
          <Container>
            <Grid2 container spacing={3} sx={{ mb: 2 }}>
              {BusinessFields.map(renderField)}
            </Grid2>
            <Grid2 container spacing={3}>
              {HeadOfficeFields.map(renderField)}
            </Grid2>
          </Container>

          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setDialogOpen(false);
                router.push(APP_DEFAULT_PATH);
              }}
            >
              Skip
            </Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </DialogActions>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container sx={{ m: 2 }}>
          <Typography variant="h5" color="grey.800">
            Key Managerial Personnel Coming Soon...
          </Typography>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container sx={{ m: 2 }}>
          <ComplianceProfile />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Container sx={{ m: 2 }}>
          <Typography variant="h5" color="grey.800">
            Licenses Coming Soon...
          </Typography>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Container sx={{ m: 2 }}>
          <Typography variant="h5" color="grey.800">
            Digital Signatures Coming Soon...
          </Typography>
        </Container>
      </TabPanel>
    </Card>
  );
}

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid #e9e9e9`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(110, 110, 110, 0.03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)'
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1)
  },
  ...theme.applyStyles('dark', {
    backgroundColor: '#e9e9e9'
  })
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #e9e9e9'
}));

const ComplianceProfile = () => {
  const [expanded, setExpanded] = useState(false);

  const complianceItems = ['GST', 'LUT', 'E-Way Bill', 'IEC GATE', 'Income Tax', 'Professional Tax', 'ESIC', 'EPF', 'TDS'];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const formik = useFormik({
    initialValues: {
      gstNumber: '',
      gstUsername: '',
      password: '',
      address: '',
      zipcode: '',
      gstCertificate: null
    },
    validationSchema: Yup.object({
      gstNumber: Yup.string().required('GST Number is required'),
      gstUsername: Yup.string().required('GST Username is required'),
      password: Yup.string().required('Password is required'),
      address: Yup.string().required('Address is required'),
      zipcode: Yup.string().required('Zipcode is required'),
      gstCertificate: Yup.mixed().required('GST Certificate is required')
    }),
    onSubmit: (values) => {
      console.log('GST Form Data:', values);
    }
  });

  return (
    <div>
      {complianceItems.map((item, index) => (
        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
            <Typography component="span">{item}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item === 'GST' ? (
              <form onSubmit={formik.handleSubmit} style={{ width: '100%' }} autoComplete="off">
                <Grid2 container spacing={2}>
                  {/* First Row */}
                  <Grid2 size={{ xs: 6, md: 4 }}>
                    <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                      GST Number
                    </Typography>
                    <TextField
                      sx={{ mt: 0.5 }}
                      fullWidth
                      id="gstNumber"
                      name="gstNumber"
                      value={formik.values.gstNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.gstNumber && Boolean(formik.errors.gstNumber)}
                      helperText={formik.touched.gstNumber && formik.errors.gstNumber}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 4 }}>
                    <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                      GST Username
                    </Typography>
                    <TextField
                      sx={{ mt: 0.5 }}
                      fullWidth
                      id="gstUsername"
                      name="gstUsername"
                      value={formik.values.gstUsername}
                      onChange={formik.handleChange}
                      error={formik.touched.gstUsername && Boolean(formik.errors.gstUsername)}
                      helperText={formik.touched.gstUsername && formik.errors.gstUsername}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 4 }}>
                    <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                      GST Password
                    </Typography>
                    <TextField
                      sx={{ mt: 0.5 }}
                      fullWidth
                      id="password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Grid2>

                  {/* Second Row */}
                  <Grid2 size={{ xs: 6, md: 4 }}>
                    <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                      Address
                    </Typography>
                    <TextField
                      sx={{ mt: 0.5 }}
                      fullWidth
                      id="address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 4 }}>
                    <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                      Zip Code
                    </Typography>
                    <TextField
                      sx={{ mt: 0.5 }}
                      fullWidth
                      id="zipcode"
                      name="zipcode"
                      value={formik.values.zipcode}
                      onChange={formik.handleChange}
                      error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                      helperText={formik.touched.zipcode && formik.errors.zipcode}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 4 }}>
                    <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                      GST Certificate
                    </Typography>
                    <Button
                      sx={{ mt: 0.5 }}
                      variant="outlined"
                      component="label"
                      size="small"
                      fullWidth
                      endIcon={formik.values.gstCertificate ? <DeleteIcon /> : null}
                      onClick={() => {
                        if (formik.values.gstCertificate) {
                          formik.setFieldValue('gstCertificate', null); // Clear file if delete is clicked
                        }
                      }}
                    >
                      {formik.values.gstCertificate ? `Uploaded: ${formik.values.gstCertificate.name}` : 'Upload'}
                      {!formik.values.gstCertificate && (
                        <input
                          type="file"
                          hidden
                          onChange={(event) => {
                            formik.setFieldValue('gstCertificate', event.currentTarget.files[0]);
                          }}
                        />
                      )}
                    </Button>

                    {formik.touched.gstCertificate && formik.errors.gstCertificate && (
                      <Typography color="error" variant="body2">
                        {formik.errors.gstCertificate}
                      </Typography>
                    )}
                  </Grid2>
                </Grid2>

                <Button color="primary" variant="contained" type="submit" sx={{ mt: 3 }}>
                  Submit GST
                </Button>
              </form>
            ) : (
              <Typography>
                Content for {item}. Replace this with actual details related to {item}.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
