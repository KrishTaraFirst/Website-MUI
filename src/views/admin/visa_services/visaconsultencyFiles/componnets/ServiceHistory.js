'use client';
import {
  Box,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  Grid,
  DialogContent,
  Stack,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CustomInput from '@/components/CustomComponents/CustomInput';
import CustomAutocomplete from '@/components/CustomComponents/CustomAutocomplete';
import Factory from '@/utils/Factory';
import TaskList from './TaskList';
const FormPage = ({ selectedClientData, setSelectedClient, setRefresh }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedService, setEditedService] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleInputChange = (name, val) => {
    // console.log("Field Name:", name, "Value:", val);
    setEditedService((prev) => ({
      ...prev,
      [name]: val
    }));
  };
  const handleEditClick = (service) => {
    // console.log(service);
    setEditedService({ ...service });
    setDialogOpen(true);
  };
  let visaTypes = ['Student Visa', 'Visit', 'Work Visa', 'Business'];

  const destinationCountries = ['FRANCE', 'USA', 'Australia', 'Canada', 'Germany', 'INDIA'];
  const updateServiceHistory = async () => {
    const url = `/user_management/visa-applicants/${selectedClientData.id}/`;
    try {
      const { res, error } = await Factory('get', url, {});
      if (res.status_cd === 0) {
        // setClientData(res.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editedService);
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
    console.log(putData);
    const url = `/user_management/service-details/${editedService.id}/`;
    const { res, error } = await Factory('put', url, putData);
    if (res.status_cd === 0) {
      // updateServiceHistory();
      setRefresh((prev) => !prev);
      setDialogOpen(false);
    } else {
      console.log('error');
    }
  };
  const handleDelete = async (service) => {
    const url = `/user_management/service-details/${service.id}/`;
    const { res, error } = await Factory('delete', url, {});
    if (res.status === 204) {
      setRefresh((prev) => !prev);
      setDeleteDialogOpen(false);
      // updateServiceHistory();
    } else {
      alert('Failed to delete the service. Please try again.');
    }
  };

  return (
    <Box style={{ marginTop: 25 }}>
      <Stack direction="row" sx={{ mb: 2 }}>
        <Stack sx={{ gap: 0 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Service History
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            Tagline for service history
          </Typography>
        </Stack>
      </Stack>

      <TaskList
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        taskList={selectedClientData?.services}
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
    </Box>
  );
};

export default FormPage;
