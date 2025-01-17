'use client';
import { useSearchParams } from 'next/navigation';
import CustomAutocomplete from '@/components/CustomComponents/CustomAutocomplete';
import CustomInput from '@/components/CustomComponents/CustomInput';
import AdditionalDetails from './AdditionalDetails';
import {
  Typography,
  Stack,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Radio,
  Card,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ServicesSuccessMessage from './ServicesSuccessMessage';
import Serviceselection from './Serviceselection';
import ServiceHistory from './ServiceHistory';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import Factory from '@/utils/Factory';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskList from './TaskList';
import AddTask from './AddTask';
const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name'); // Retrieve 'name' from query params
  const title = searchParams.get('title'); // Retrieve 'name' from query params
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editedService, setEditedService] = useState({}); // Track form data
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [commentMap, setCommentMap] = useState({});
  const [ServicesCards, setServicesCards] = useState([]);
  const clientID = searchParams.get('id');

  let visaTypes = ['Student Visa', 'Visit', 'Work Visa', 'Business'];
  const destinationCountries = ['France', 'United States', 'Australia', 'Canada', 'Germany'];

  const handleEditClick = (service) => {
    setEditedService({ ...service });
    setDialogOpen(true);
  };

  const handleInputChange = (name, val) => {
    setEditedService((prev) => ({
      ...prev,
      [name]: val
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let putData = {
      visa_application: {
        user: editedService.user_id,
        passport_number: editedService.passport_number,
        purpose: editedService.purpose,
        visa_type: editedService.visa_type,
        destination_country: editedService.destination_country
      },
      service: {
        id: editedService.id,
        service_type_id: editedService.service_type,
        status: editedService.status,
        comments: editedService.comments,
        quantity: editedService.quantity
      }
    };
    const url = `/user_management/service-details/${editedService.id}/`;
    const { res, error } = await Factory('put', url, putData);
    if (res.status_cd === 0) {
      setDialogOpen(false);
      fetchClientData();
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleDelete = async (service) => {
    const url = `/user_management/service-details/${service.id}/`;
    const { res, error } = await Factory('delete', url, {});
    if (res.status === 204) {
      fetchClientData();
      setDeleteDialogOpen(false);
    } else {
      alert('Failed to delete the service. Please try again.');
    }
  };

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

    let postData = {
      user_id: selectedClient.user,
      passport_number:
        selectedClient.services.length === 0
          ? selectedClient.passport_number
          : selectedClient.services[selectedClient.services.length - 1]?.passport_number,
      purpose:
        selectedClient.services.length === 0
          ? selectedClient.purpose
          : selectedClient.services[selectedClient.services.length - 1]?.purpose,
      visa_type:
        selectedClient.services.length === 0
          ? selectedClient.visa_type
          : selectedClient.services[selectedClient.services.length - 1]?.visa_type,
      destination_country:
        selectedClient.services.length === 0
          ? selectedClient.destination_country
          : selectedClient.services[selectedClient.services.length - 1]?.destination_country,
      services: filteredServices
    };
    console.log(postData);

    const url = '/user_management/visa-servicetasks/';

    const { res, error } = await Factory('post', url, postData);
    if (res.status_cd === 0) {
      fetchClientData();
      setSelectedServices([]);
      setAddTaskDialogOpen(false);
      // setShowSuccessMessage(true);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };
  const getServicesList = async () => {
    const url = '/user_management/services/';
    try {
      const { res, error } = await Factory('get', url, {});
      if (res.status_cd === 0) {
        setServicesCards(res.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  const fetchClientData = async () => {
    const clientData = searchParams.get('id');

    if (!clientData) return;

    const decodedData = decodeURIComponent(clientData);
    const parsedID = JSON.parse(decodedData);

    const url = `/user_management/visa-applicants/${parsedID}/`;

    const { res, error } = await Factory('get', url, {});

    if (res.status_cd === 0) {
      setSelectedClient(res.data);
    } else {
      console.error('Failed to fetch client data');
    }
  };
  useEffect(() => {
    fetchClientData();
    getServicesList();
  }, [searchParams]);

  return (
    <Box>
      <Stack direction="column">
        <Stack sx={{ gap: 0 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Personal Info&nbsp;-&nbsp;{selectedClient?.first_name + ' ' + selectedClient?.last_name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            Client's personal & task info
          </Typography>
        </Stack>
      </Stack>
      {selectedClient && (
        <Grid container spacing={3} sx={{ mt: 0.1 }}>
          {/* Row 1 */}
          <Grid item xs={12} sm={6}>
            <CustomInput
              id="first_name"
              label="First Name"
              value={selectedClient?.first_name && selectedClient.first_name}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput id="last_name" label="Last Name" value={selectedClient?.last_name} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput id="email" label="Email" value={selectedClient?.email} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput id="mobile_number" label="Mobile Number" value={selectedClient?.mobile_number} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              id="purpose"
              label="Purpose"
              // options={visaPurposes}
              value={
                selectedClient.services.length === 0
                  ? selectedClient.purpose
                  : selectedClient.services[selectedClient.services.length - 1]?.purpose
              }
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              id="visa_type"
              label="Visa Type"
              options={visaTypes}
              value={
                selectedClient.services.length === 0
                  ? selectedClient.visa_type
                  : selectedClient.services[selectedClient.services.length - 1]?.visa_type
              }
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              id="destinationcountry"
              label="Destination Country"
              options={destinationCountries}
              value={
                selectedClient.services.length === 0
                  ? selectedClient.destination_country
                  : selectedClient.services[selectedClient.services.length - 1]?.destination_country
              }
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              id="passportnumber"
              label="Passport Number"
              value={
                selectedClient.services.length === 0
                  ? selectedClient.passport_number
                  : selectedClient.services[selectedClient.services.length - 1]?.passport_number
              }
              disabled={true}
            />
          </Grid>
        </Grid>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5, mb: 2 }}>
        <Stack direction="column">
          <Stack sx={{ gap: 0 }}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Task List
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.700' }}>
              List of tasks of the client
            </Typography>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          onClick={() => {
            setAddTaskDialogOpen(true);
          }}
        >
          Add Task
        </Button>
      </Box>

      <TaskList
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        taskList={selectedClient && selectedClient?.services}
        handleDelete={handleDelete}
        handleEditClick={handleEditClick}
        handleSubmit={handleSubmit}
        editedService={editedService}
        setEditedService={setEditedService}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleInputChange={handleInputChange}
        destinationCountries={destinationCountries}
      />
      <AddTask
        addTaskDialogOpen={addTaskDialogOpen}
        setAddTaskDialogOpen={setAddTaskDialogOpen}
        handleQuantityChange={handleQuantityChange}
        handleCommentChange={handleCommentChange}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        ServicesCards={ServicesCards}
        setServicesCards={setServicesCards}
        quantityMap={quantityMap}
        commentMap={commentMap}
        setQuantityMap={setQuantityMap}
        setCommentMap={setCommentMap}
        servicesSubmit={servicesSubmit}
      />
    </Box>
  );
};

export default FormPage;
