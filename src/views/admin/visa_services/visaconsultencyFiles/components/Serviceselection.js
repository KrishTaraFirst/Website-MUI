'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Factory from '@/utils/Factory'; // Import custom Factory function for API calls
import CustomInput from '@/components/CustomComponents/CustomInput'; // Import custom input component
import CloseIcon from '@mui/icons-material/Close';

// MUI components
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Radio,
  Card,
  RadioGroup,
  FormControlLabel,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Autocomplete,
  Checkbox,
  TextField,
  Stack,
  DialogContent
} from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';
const FormPage = ({ selectedClientData, setShowSuccessMessage, setRefresh, visadetails }) => {
  const searchParams = useSearchParams();
  const [servicelistDialogue, setServicelistDialogue] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [commentMap, setCommentMap] = useState({});
  const [ServicesCards, setServicesCards] = useState([]);

  const handleServiceSelection = (serviceName, service) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(serviceName)) {
        return prevSelectedServices.filter((service) => service !== serviceName);
      } else {
        return [...prevSelectedServices, serviceName];
      }
    });
  };

  // Handle quantity change (increment or decrement)
  const handleQuantityChange = (service, operation) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [service]: (prevQuantityMap[service] || 0) + operation
    }));
  };

  // Handle comment change
  const handleCommentChange = (service, comment) => {
    setCommentMap((prevCommentMap) => ({
      ...prevCommentMap,
      [service]: comment
    }));
  };

  // Submit selected services
  const servicesSubmit = async () => {
    let services = [
      {
        id: 1,
        service_name: 'ITR'
      },
      {
        id: 2,
        service_name: 'Networth'
      },
      {
        id: 3,
        service_name: 'Business Proof'
      },
      {
        id: 4,
        service_name: 'Loans'
      },
      {
        id: 5,
        service_name: 'Visa Fund'
      },
      {
        id: 6,
        service_name: 'Forex Payments'
      },
      {
        id: 7,
        service_name: 'Insurance'
      },
      {
        id: 8,
        service_name: 'Travel Booking'
      },
      {
        id: 9,
        service_name: 'Visa Slot'
      },
      {
        id: 10,
        service_name: 'Passport Application'
      }
    ];
    const serviceData = selectedServices.map((service) => {
      const serviceObj = services.find((obj) => obj.service_name === service);

      return {
        id: serviceObj ? serviceObj.id : null,
        service: service,
        quantity: quantityMap[service] || 0,
        comments: commentMap[service] || ''
      };
    });

    const filteredServices = serviceData.map((service) => ({
      quantity: service.quantity,
      comments: service.comments,
      service_type: service.id
    }));
    // console.log(filteredServices);
    // console.log(serviceData);
    // console.log(visadetails);

    let postData = {
      user_id: selectedClientData.user,
      passport_number: visadetails.passport_number,
      purpose: visadetails.purpose,
      visa_type: visadetails.visa_type,
      destination_country: visadetails.destination_country,
      services: filteredServices
    };

    const url = '/user_management/visa-servicetasks/';

    try {
      const { res, error } = await Factory('post', url, postData);
      if (res.status_cd === 0) {
        setServicelistDialogue(false);
        setShowSuccessMessage(true);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  // Fetch services list from API
  const getServicesList = async () => {
    const url = '/user_management/services/';
    try {
      const { res, error } = await Factory('get', url, {});
      if (res.status_cd === 0) {
        setServicesCards(res.data);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    getServicesList();
  }, []);

  return (
    <>
      <Box style={{ marginTop: 25 }}>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Stack sx={{ gap: 0 }}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Select services
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.700' }}>
              Select required multiple services
            </Typography>
          </Stack>
        </Stack>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {ServicesCards.map((service, idx) => (
            <Grid item xs={12} sm={4} md={2} key={idx}>
              <Card
                sx={{
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: selectedServices.includes(service.service_name) ? 'primary.dark' : 'primary',
                  color: selectedServices.includes(service.service_name) ? '#fff' : 'primary.dark',
                  transition: 'all 0.5s ease-in-out',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                  width: '100%',
                  margin: '1px'
                }}
                onClick={() => {
                  handleServiceSelection(service.service_name, service);
                }}
              >
                <Typography variant="body1">{service.service_name}</Typography>
                {/* <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label={service.service_name}
                    onClick={() => {
                      handleServiceSelection(service.service_name, service);
                    }}
                    checked={selectedServices.includes(service.service_name)}
                  />
                </Box> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ marginTop: '30px', textAlign: 'right' }}>
        <Button
          variant="contained"
          type="button"
          onClick={() => setServicelistDialogue(true)}
          sx={{
            padding: '10px 30px',
            textTransform: 'none',
            fontSize: '16px'
          }}
        >
          Next
        </Button>
      </Box>

      <Dialog open={servicelistDialogue} maxWidth="md">
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            Service List
            <Autocomplete
              multiple
              renderTags={() => null}
              size="small"
              sx={{ minWidth: 250, maxWidth: 250 }}
              id="service-checkbox"
              options={ServicesCards}
              value={ServicesCards.filter((service) => selectedServices.includes(service.service_name))}
              onChange={(event, newValue, value2, value3) => {
                setSelectedServices(newValue.map((item) => item.service_name));
              }}
              getOptionLabel={(option) => option.service_name}
              renderInput={(params) => <TextField {...params} label="Update Services" />}
              isOptionEqualToValue={(option, value) => option.service_name === value.service_name}
              renderOption={(props, option, { selected }) => (
                <li key={option} {...props}>
                  <Checkbox checked={selected} />
                  {option.service_name}
                </li>
              )}
              disableCloseOnSelect
            />
          </Box>
        </DialogTitle>

        <form autoComplete="off">
          <DialogContent dividers>
            <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
              <Table sx={{ minWidth: 650 }} size="medium" aria-label="service table">
                <TableHead>
                  <TableRow
                    sx={{
                      '& th': {
                        textAlign: 'center'
                      }
                    }}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">Services</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">Quantity</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">Comments / Instructions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedServices.map((service, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        '&:hover': { backgroundColor: '#f5f5f5' },
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <TableCell align="center">
                        <Typography variant="subtitle2">{service}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          sx={{ padding: '2px 4px', minWidth: '30px', mr: 2 }}
                          variant="outlined"
                          onClick={() => handleQuantityChange(service, -1)}
                          // disabled={selectedClientData.services.some(
                          //   (item) => item.service_name === service
                          // )}
                        >
                          -
                        </Button>
                        {quantityMap[service] || 0}
                        <Button
                          sx={{ padding: '2px 4px', minWidth: '30px', ml: 2 }}
                          variant="outlined"
                          onClick={() => handleQuantityChange(service, 1)}
                          // disabled={selectedClientData.services.some(
                          //   (item) => item.service_name === service
                          // )}
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ p: 1 }}>
                        <CustomInput
                          value={commentMap[service] || ''}
                          onChange={(e) => handleCommentChange(service, e.target.value)}
                          multiline
                          rows={2}
                          // disabled={selectedClientData.services.some(
                          //   (item) => item.service_name === service
                          // )}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              type="button"
              color="error"
              onClick={() => {
                setServicelistDialogue(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="button" sx={{ padding: '8px 32px', textTransform: 'none' }} onClick={servicesSubmit}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FormPage;
