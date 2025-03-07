'use client';
import dayjs from 'dayjs'; // Import dayjs
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { useTheme } from '@mui/material/styles';
import { Add, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeCard from '@/components/cards/HomeCard';
import Factory from '@/utils/Factory';
import { useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Typography,
  Button,
  DialogActions,
  Grid2,
  TextField,
  Autocomplete,
  Tab,
  Tabs,
  Card,
  Container,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  FormHelperText
} from '@mui/material';
import { useEffect, useState } from 'react';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import CustomDatePicker from '@/utils/CustomDateInput';
import CustomInput from '@/utils/CustomInput';
import { useSnackbar } from '@/components/CustomSnackbar';
import useCurrentUser from '@/hooks/useCurrentUser';
import { APP_DEFAULT_PATH } from '@/config';
import { entity_choices } from '@/utils/Entity-types';
import { industries } from '@/utils/industries';
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
const complianceItems = ['GST', 'LUT', 'E-Way Bill', 'IEC GATE', 'Income Tax', 'Professional Tax', 'ESIC', 'EPF', 'TDS'];
const licenses = ['Trade License', 'Labour License', 'MSME', 'ICE', 'Trademark'];
export default function BusinessKYC() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [businessData, setBusinessData] = useState({});
  const { showSnackbar } = useSnackbar();
  const { userData } = useCurrentUser();
  const searchParams = useSearchParams();
  const BID = searchParams.get('BID');

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
        business_nature: values.business_nature,
        dob_or_incorp_date: values.dob_or_incorp_date,
        email: values.email,
        entityType: values.entityType,
        id: 2,
        mobile_number: values.mobile_number,
        nameOfBusiness: values.nameOfBusiness,
        pan: values.pan,
        registrationNumber: values.registrationNumber,
        trade_name: values.trade_name,
        headOffice: {
          address_line1: values.address_line1,
          address_line2: values.address_line2,
          city: values.city,
          state: values.state,
          pincode: values.pincode
        },
        client: BID === null ? userData.id : values.client
      };
      const url = BID === null ? `/user_management/businesses/` : `/user_management/businesses/${BID}/`;
      const method = BID === null ? 'post' : 'put';

      const { res } = await Factory(method, url, postData);
      console.log('res');

      if (res?.status_cd === 0) {
        showSnackbar('Business KYC Updated', 'success');
        setDialogOpen(false);
        const userDetails = JSON.parse(localStorage.getItem('auth-user'));
        userDetails.business_exists = true;
        localStorage.setItem('auth-user', JSON.stringify(userDetails));
        setValue(value + 1);
      } else {
        showSnackbar(JSON.stringify(res.data.data), 'error');
      }
    }
  });

  const renderField = (field) => {
    if (field.name === 'state') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomAutocomplete
            value={values[field.name] || ''}
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
    if (field.name === 'entityType' || field.name === 'business_nature') {
      return (
        <Grid2 size={{ xs: 12, sm: 6 }} key={field.name}>
          <div style={{ marginBottom: '2px' }}>{field.label}</div>
          <CustomAutocomplete
            value={values[field.name] || ''}
            name={field.name}
            onChange={(e, newValue) => setFieldValue(field.name, newValue)}
            options={field.name === 'business_nature' ? industries : entity_choices}
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
          value={values[field.name] || ''}
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

  useEffect(() => {
    const getBusinessDetails = async () => {
      const url = `/user_management/businesses/${BID}/`;
      const { res } = await Factory('get', url, '');
      if (res?.status_cd === 0) {
        // setBusinessData;
        setBusinessData(res.data);
        setValues({
          ...values,
          ...res.data,
          ...res.data.headOffice
        });
      } else {
      }
    };
    getBusinessDetails();
  }, [BID]);

  return (
    <HomeCard title="Business Details" tagline="Setup your organization details" CustomElement={false}>
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
              key={'Tab' + index}
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
          <Container sx={{ mb: 2 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid2 container spacing={3} sx={{ mb: 2 }}>
                {BusinessFields.map(renderField)}
              </Grid2>
              <Grid2 container spacing={3}>
                {HeadOfficeFields.map(renderField)}
              </Grid2>
              <Stack direction="row" sx={{ gap: 1.5, float: 'right', mt: 3 }}>
                <Button type="submit" variant="outlined" color="primary">
                  Save & Proceed
                </Button>
              </Stack>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Container sx={{ mb: 2 }}>
            <KeyManagerialPersonnel />
          </Container>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Container sx={{ mb: 2 }}>
            <ComplianceProfile businessData={businessData} BID={BID} setValue={setValue} complianceItems={complianceItems} />
          </Container>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Container sx={{ mb: 2 }}>
            <ComplianceProfile businessData={businessData} BID={BID} setValue={setValue} complianceItems={licenses} />
          </Container>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Container sx={{ mb: 2 }}>
            <DigitalSignatures />
          </Container>
        </TabPanel>
        <Box>
          <Stack direction={'row'} sx={{ justifyContent: 'space-between', mx: 3, my: 3 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                router.push(APP_DEFAULT_PATH);
              }}
            >
              Skip to Dashboard
            </Button>
            {value !== 4 && (
              <Button
                sx={{ mr: value === 0 ? 2 : 0 }}
                variant="contained"
                onClick={() => {
                  setValue((prev) => prev + 1);
                }}
                color="primary"
              >
                Next
              </Button>
            )}
          </Stack>
        </Box>
      </Card>
    </HomeCard>
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

const ComplianceProfile = ({ complianceItems, setValue, BID, businessData }) => {
  const [expanded, setExpanded] = useState(false);
  const [compliances, setCompliances] = useState({});
  const { showSnackbar } = useSnackbar();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (BID === null) setValue(0);
    const getComplianceDetails = async () => {
      const url = `/user_management/gst-details/${BID}/`;
      const { res } = await Factory('get', url, '');
      if (res?.status_cd === 0) {
        setCompliances(res.data);
      } else {
      }
    };
    getComplianceDetails();
  }, [BID]);

  const convertToFormData = (obj) => {
    const formData = new FormData();
    formData.append('business', BID);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } else if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    }
    return formData;
  };

  const __postData = async (__branches) => {
    if (__branches.length === 0) return;
    const formData = convertToFormData(__branches[0]);
    const url = `/user_management/gst-details/`;
    const { res, error } = await Factory('post', url, formData);
    if (res.status_cd === 0) {
      if (__branches.length === 1) showSnackbar('Saved Successfully', 'success');
    } else {
    }
    __postData(__branches.slice(1));
  };

  const formik = useFormik({
    initialValues: {
      gstBranches:
        businessData.gst_details.length === 0
          ? [
              {
                gstin: '',
                gst_username: '',
                gst_password: '',
                address: '',
                pinCode: '',
                gst_document: null,
                authorized_signatory_pan: '',
                branch_name: '',
                state: ''
              }
            ]
          : [...businessData.gst_details]
    },
    validationSchema: Yup.object({
      gstBranches: Yup.array().of(
        Yup.object({
          gstin: Yup.string()
            .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST Number format (e.g., 22ABCDE1234F1Z5)')
            .required('GST Number is required'),
          gst_username: Yup.string().required('GST Username is required'),
          gst_password: Yup.string().required('Password is required'),
          address: Yup.string().required('Address is required'),
          pinCode: Yup.string()
            .matches(/^\d{6}$/, 'Zipcode must be exactly 6 digits')
            .required('Zipcode is required'),
          gst_document: Yup.mixed().required('GST Certificate is required'),
          authorized_signatory_pan: Yup.string()
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g., ABCDE1234F)')
            .required('Signatory PAN is required'),
          branch_name: Yup.string().required('Branch Name is required'),
          state: Yup.string().required('State is required')
        })
      )
    }),
    onSubmit: (values) => {
      let branches = values.gstBranches;
      __postData(branches);
    }
  });

  return (
    <FormikProvider value={formik}>
      <div>
        {complianceItems.map((item, index) => (
          <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
              <Typography component="span">{item}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item === 'GST' ? (
                <form onSubmit={formik.handleSubmit} style={{ width: '100%' }} autoComplete="off">
                  <FieldArray name="gstBranches">
                    {({ push, remove }) => (
                      <>
                        {formik.values.gstBranches.map((branch, idx) => (
                          <div key={idx}>
                            <Stack direction={'row'} sx={{ alignItems: 'center', gap: 2 }}>
                              <Typography variant="h6" sx={{ mb: idx === 0 ? 1 : 0 }} color="grey.800">
                                {idx === 0 ? 'Main Branch' : `Branch ${idx + 1}`}
                              </Typography>
                              {idx !== 0 && (
                                <Tooltip title="Remove Row!" placement="right">
                                  <IconButton color="error" onClick={() => remove(idx)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Stack>
                            <Grid2 container spacing={2}>
                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  GST Number
                                </Typography>
                                <TextField
                                  fullWidth
                                  name={`gstBranches[${idx}].gstin`}
                                  value={branch.gstin}
                                  onChange={formik.handleChange}
                                  error={formik.touched.gstBranches?.[idx]?.gstin && Boolean(formik.errors.gstBranches?.[idx]?.gstin)}
                                  helperText={formik.touched.gstBranches?.[idx]?.gstin && formik.errors.gstBranches?.[idx]?.gstin}
                                />
                              </Grid2>

                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  GST Username
                                </Typography>
                                <TextField
                                  fullWidth
                                  name={`gstBranches[${idx}].gst_username`}
                                  autoComplete="new-username"
                                  value={branch.gst_username}
                                  onChange={formik.handleChange}
                                  error={
                                    formik.touched.gstBranches?.[idx]?.gst_username &&
                                    Boolean(formik.errors.gstBranches?.[idx]?.gst_username)
                                  }
                                  helperText={
                                    formik.touched.gstBranches?.[idx]?.gst_username && formik.errors.gstBranches?.[idx]?.gst_username
                                  }
                                />
                              </Grid2>

                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  GST Password
                                </Typography>
                                <TextField
                                  fullWidth
                                  type="text"
                                  autoComplete="new-password"
                                  name={`gstBranches[${idx}].gst_password`}
                                  value={branch.gst_password}
                                  onChange={formik.handleChange}
                                  error={
                                    formik.touched.gstBranches?.[idx]?.gst_password &&
                                    Boolean(formik.errors.gstBranches?.[idx]?.gst_password)
                                  }
                                  helperText={
                                    formik.touched.gstBranches?.[idx]?.gst_password && formik.errors.gstBranches?.[idx]?.gst_password
                                  }
                                />
                              </Grid2>

                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  Address
                                </Typography>
                                <TextField
                                  fullWidth
                                  name={`gstBranches[${idx}].address`}
                                  value={branch.address}
                                  onChange={formik.handleChange}
                                  error={formik.touched.gstBranches?.[idx]?.address && Boolean(formik.errors.gstBranches?.[idx]?.address)}
                                  helperText={formik.touched.gstBranches?.[idx]?.address && formik.errors.gstBranches?.[idx]?.address}
                                />
                              </Grid2>

                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  Zip Code
                                </Typography>
                                <TextField
                                  fullWidth
                                  name={`gstBranches[${idx}].pinCode`}
                                  value={branch.pinCode}
                                  onChange={formik.handleChange}
                                  error={formik.touched.gstBranches?.[idx]?.pinCode && Boolean(formik.errors.gstBranches?.[idx]?.pinCode)}
                                  helperText={formik.touched.gstBranches?.[idx]?.pinCode && formik.errors.gstBranches?.[idx]?.pinCode}
                                />
                              </Grid2>

                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  GST Certificate
                                </Typography>
                                <Button
                                  variant="outlined"
                                  component="label"
                                  fullWidth
                                  endIcon={branch.gst_document ? <DeleteIcon /> : null}
                                  onClick={() => {
                                    if (branch.gst_document) {
                                      formik.setFieldValue(`gstBranches[${idx}].gst_document`, null);
                                    }
                                  }}
                                >
                                  {branch.gst_document ? `Uploaded: ${branch.gst_document.name}` : 'Upload'}
                                  {!branch.gst_document && (
                                    <input
                                      type="file"
                                      hidden
                                      onChange={(event) =>
                                        formik.setFieldValue(`gstBranches[${idx}].gst_document`, event.currentTarget.files[0])
                                      }
                                    />
                                  )}
                                </Button>
                                {formik.touched.gstBranches?.[idx]?.gst_document && formik.errors.gstBranches?.[idx]?.gst_document && (
                                  <Typography color="error" variant="body2">
                                    {formik.errors.gstBranches[idx].gst_document}
                                  </Typography>
                                )}
                              </Grid2>

                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  Authorised Signatory PAN
                                </Typography>
                                <TextField
                                  fullWidth
                                  name={`gstBranches[${idx}].authorized_signatory_pan`}
                                  value={branch.authorized_signatory_pan}
                                  onChange={formik.handleChange}
                                  error={
                                    formik.touched.gstBranches?.[idx]?.authorized_signatory_pan &&
                                    Boolean(formik.errors.gstBranches?.[idx]?.authorized_signatory_pan)
                                  }
                                  helperText={
                                    formik.touched.gstBranches?.[idx]?.authorized_signatory_pan &&
                                    formik.errors.gstBranches?.[idx]?.authorized_signatory_pan
                                  }
                                />
                              </Grid2>

                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  Branch Name
                                </Typography>
                                <TextField
                                  fullWidth
                                  name={`gstBranches[${idx}].branch_name`}
                                  value={branch.branch_name}
                                  onChange={formik.handleChange}
                                  error={
                                    formik.touched.gstBranches?.[idx]?.branch_name && Boolean(formik.errors.gstBranches?.[idx]?.branch_name)
                                  }
                                  helperText={
                                    formik.touched.gstBranches?.[idx]?.branch_name && formik.errors.gstBranches?.[idx]?.branch_name
                                  }
                                />
                              </Grid2>

                              <Grid2 size={{ xs: 6, md: 4 }}>
                                <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                                  State
                                </Typography>
                                <Autocomplete
                                  options={indian_States_And_UTs}
                                  value={branch.state}
                                  onChange={(event, newValue) => formik.setFieldValue(`gstBranches[${idx}].state`, newValue)}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={formik.touched.gstBranches?.[idx]?.state && Boolean(formik.errors.gstBranches?.[idx]?.state)}
                                      helperText={formik.touched.gstBranches?.[idx]?.state && formik.errors.gstBranches?.[idx]?.state}
                                    />
                                  )}
                                />
                              </Grid2>
                            </Grid2>
                            <Divider sx={{ my: 3 }} />
                          </div>
                        ))}
                        <Stack direction={'row'} sx={{ mb: 3, gap: 1, float: 'right' }}>
                          <Button
                            color="primary"
                            variant="outlined"
                            type="button"
                            onClick={() => {
                              if (formik.values.gstBranches.length < 5) {
                                push({
                                  gstin: '',
                                  gst_username: '',
                                  gst_password: '',
                                  address: '',
                                  pinCode: '',
                                  gst_document: null,
                                  authorized_signatory_pan: '',
                                  branch_name: '',
                                  state: ''
                                });
                              }
                            }}
                            disabled={formik.values.gstBranches.length >= 5}
                          >
                            Add GST
                          </Button>
                          <Button color="primary" variant="contained" type="submit">
                            Save
                          </Button>
                        </Stack>
                      </>
                    )}
                  </FieldArray>
                </form>
              ) : (
                <Typography>Content for {item} Will be coming soon...</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </FormikProvider>
  );
};

const KeyManagerialPersonnel = () => {
  const validationSchema = Yup.object({
    personnel: Yup.array().of(
      Yup.object({
        pan: Yup.string()
          .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g., ABCDE1234F)')
          .required('PAN is required'),
        name: Yup.string().required('Name is required'),
        mobile: Yup.string()
          .matches(/^\d{10}$/, 'Mobile must be 10 digits')
          .required('Mobile is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        din: Yup.string().required('DIN is required'),
        designation: Yup.string().required('Designation is required'),
        aadhar: Yup.string()
          .matches(/^\d{12}$/, 'Aadhar must be 12 digits')
          .required('Aadhar is required')
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      personnel: [{ pan: '', name: '', mobile: '', email: '', din: '', designation: '', aadhar: '' }]
    },
    validationSchema,
    onSubmit: (values) => console.log(values)
  });

  return (
    <FormikProvider value={formik} sx={{ m: 12 }}>
      <form onSubmit={formik.handleSubmit}>
        <FieldArray name="personnel">
          {({ push, remove }) => (
            <>
              {formik.values.personnel.map((person, index) => (
                <Box sx={{ borderRadius: 2 }} key={'ChildBox' + index}>
                  <Typography variant="h6" color="grey.800" sx={{ mb: 0.5 }}>
                    Director/ Authorized Signatory Details
                  </Typography>
                  <Grid2 container spacing={2} key={index}>
                    {['pan', 'name', 'mobile', 'email', 'din', 'designation', 'aadhar'].map((field) => (
                      <Grid2 size={{ xs: 12, sm: 4 }} key={field}>
                        <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Typography>
                        <TextField
                          fullWidth
                          name={`personnel[${index}].${field}`}
                          value={person[field]}
                          onChange={formik.handleChange}
                          error={formik.touched.personnel?.[index]?.[field] && Boolean(formik.errors.personnel?.[index]?.[field])}
                          helperText={formik.touched.personnel?.[index]?.[field] && formik.errors.personnel?.[index]?.[field]}
                        />
                      </Grid2>
                    ))}
                    {index !== 0 ? (
                      <Grid2 size={{ xs: 12, sm: 4 }} key={'DeleteRow'}>
                        <Stack direction="column">
                          <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                            &nbsp;
                          </Typography>{' '}
                          <Button
                            endIcon={<DeleteIcon />}
                            onClick={() => remove(index)}
                            sx={{ width: '40%' }}
                            variant="outlined"
                            color="error"
                            size="small"
                          >
                            Delete Row
                          </Button>
                        </Stack>
                      </Grid2>
                    ) : (
                      <Grid2 size={{ xs: 12, sm: 4 }} key={'EmptyGrid'}></Grid2>
                    )}
                    {index === formik.values.personnel.length - 1 && (
                      <Grid2 size={{ xs: 12, sm: 4 }} key={'SubmitGrid'}>
                        <Stack direction="column" sx={{ float: 'right' }}>
                          <Typography variant="caption" sx={{ ml: 0.2 }} color="grey.700">
                            &nbsp;
                          </Typography>
                          <Stack direction="row" sx={{ float: 'right', mb: 2, gap: 1.5 }}>
                            <Button
                              variant="outlined"
                              startIcon={<Add />}
                              onClick={() => push({ pan: '', name: '', mobile: '', email: '', din: '', designation: '', aadhar: '' })}
                            >
                              Add Personnel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                              Submit
                            </Button>
                          </Stack>
                        </Stack>
                      </Grid2>
                    )}
                  </Grid2>

                  <Divider sx={{ my: 3.5 }} />
                </Box>
              ))}
            </>
          )}
        </FieldArray>
      </form>
    </FormikProvider>
  );
};

const DigitalSignatures = () => {
  const validationSchema = Yup.object({
    dsc: Yup.array().of(
      Yup.object({
        name: Yup.string().required('Name is required'),
        mobile: Yup.string()
          .matches(/^\d{10}$/, 'Mobile must be 10 digits')
          .required('Mobile is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        issueDate: Yup.date().required('Issue Date is required'),
        expiryDate: Yup.date().required('Expiry Date is required'),
        location: Yup.string().required('Location is required'),
        password: Yup.string().required('Password is required'),
        status: Yup.string().required('Status is required')
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      dsc: [{ name: '', mobile: '', email: '', issueDate: '', expiryDate: '', location: '', password: '', status: '' }]
    },
    validationSchema,
    onSubmit: (values) => console.log(values)
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'Mobile', 'Email', 'Issue Date', 'Expiry Date', 'Location', 'Password', 'Status', 'Action'].map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <FieldArray name="dsc">
                {({ push, remove }) => (
                  <>
                    {formik.values.dsc.map((person, index) => (
                      <TableRow key={index}>
                        {['name', 'mobile', 'email', 'issueDate', 'expiryDate', 'location', 'password', 'status'].map((field) => (
                          <TableCell key={field} sx={{ verticalAlign: 'top', px: 0.4 }}>
                            <FormControl
                              fullWidth
                              error={formik.touched.dsc?.[index]?.[field] && Boolean(formik.errors.dsc?.[index]?.[field])}
                            >
                              <TextField
                                fullWidth
                                type={field === 'issueDate' || field === 'expiryDate' ? 'date' : 'text'}
                                name={`dsc[${index}].${field}`}
                                value={person[field]}
                                onChange={formik.handleChange}
                                InputLabelProps={field === 'issueDate' || field === 'expiryDate' ? { shrink: true } : {}}
                              />
                              <FormHelperText>{formik.touched.dsc?.[index]?.[field] && formik.errors.dsc?.[index]?.[field]}</FormHelperText>
                            </FormControl>
                          </TableCell>
                        ))}
                        <TableCell sx={{ px: 0.4 }}>
                          <IconButton color="error" onClick={() => remove(index)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell sx={{ p: 2 }} colSpan={8} align="right">
                        <Button
                          variant="outlined"
                          startIcon={<Add />}
                          onClick={() =>
                            push({ name: '', mobile: '', email: '', issueDate: '', expiryDate: '', location: '', password: '', status: '' })
                          }
                        >
                          Add DSC
                        </Button>
                      </TableCell>
                      <TableCell sx={{ p: 2 }} colSpan={1} align="right">
                        <Button type="submit" variant="contained" color="primary">
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </FieldArray>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </FormikProvider>
  );
};
