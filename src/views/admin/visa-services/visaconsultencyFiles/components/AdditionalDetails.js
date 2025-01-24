'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Factory from '@/utils/Factory';
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
  Stack
} from '@mui/material';
import CustomInput from '@/components/CustomComponents/CustomInput';
import useCurrentUser from '@/hooks/useCurrentUser';

const FormPage = ({ visadetails, selectedClientData, selectedTitle, setShowSuccessMessage, service_id }) => {
  const { userData } = useCurrentUser();
  const permissions = userData.VisaServices;
  const searchParams = useSearchParams();
  let name = searchParams.get('name'); // Retrieve 'name' from query params
  const [serviceListDialog, setServiceListDialog] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    setSelectedServices([
      {
        id: service_id,
        servicename: selectedTitle,
        quantity: 0,
        comments: ''
      }
    ]);
  }, []);

  const handleQuantityChange = (service, change) => {
    setSelectedServices((prevServices) =>
      prevServices.map((s) => (s.servicename === service.servicename ? { ...s, quantity: Math.max(0, s.quantity + change) } : s))
    );
  };

  const handleCommentChange = (service, newComment) => {
    setSelectedServices((prevServices) =>
      prevServices.map((s) => (s.servicename === service.servicename ? { ...s, comments: newComment } : s))
    );
  };

  const submitDetails = async () => {
    const filteredServices = selectedServices.map((service) => ({
      quantity: service.quantity,
      comments: service.comments,
      service_type: service.id
    }));
    let postData = {
      user_id: selectedClientData.user,
      passport_number: visadetails.passport_number,
      purpose: visadetails.purpose,
      visa_type: visadetails.visa_type,
      destination_country: visadetails.destination_country,
      services: filteredServices
    };

    const url = '/user_management/visa-servicetasks/';
    const { res, error } = await Factory('post', url, postData);
    if (res.status_cd === 0) {
      setShowSuccessMessage(true);
    } else {
      console.log('error');
    }
  };
  return (
    <>
      {permissions.includes('VS_Task_Create') && (
        <>
          <Box sx={{ mt: 3 }}>
            <Stack direction="row" sx={{ mb: 3 }}>
              <Stack sx={{ gap: 0.5 }}>
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  Additional Details
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.700' }}>
                  Tagline for service history
                </Typography>
              </Stack>
            </Stack>
            <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
              <Table sx={{ minWidth: 650 }} size="medium" aria-label="service details table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
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
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Typography variant="subtitle2">{service.servicename}</Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Button
                          sx={{ padding: '2px 4px', minWidth: '30px', mr: 2 }}
                          variant="outlined"
                          onClick={() => handleQuantityChange(service, -1)}
                          disabled={service.quantity <= 0}
                        >
                          -
                        </Button>
                        {service.quantity || 0}
                        <Button
                          sx={{ padding: '2px 4px', minWidth: '30px', ml: 2 }}
                          variant="outlined"
                          onClick={() => handleQuantityChange(service, 1)}
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ p: 1 }}>
                        <CustomInput
                          value={service.comments || ''}
                          onChange={(e) => handleCommentChange(service, e.target.value)}
                          multiline
                          rows={2}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ marginTop: '30px', textAlign: 'right' }}>
            <Button
              variant="contained"
              onClick={submitDetails}
              sx={{
                padding: '10px 30px',
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              Submit
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default FormPage;
