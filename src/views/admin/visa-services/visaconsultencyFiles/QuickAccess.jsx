'use client';

// @mui
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Factory from '@/utils/Factory';
import { useMemo, useState, useEffect } from 'react';

// @third-party
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

// @project
import Table from './analytics-behavior-table/Table';
import ActionCell from './analytics-behavior-table/ActionCell';
import { analyticsBehaviorTableData } from './analytics-behavior-table/behavior-table-data';
import Profile from '@/components/Profile';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useRouter } from 'next/navigation';
import { titles } from './data';
import TaskList from './components/TaskList';

/***************************  COMPONENT - TABLE  ***************************/

export default function AnalyticsBehaviorTable({ tab }) {
  const { showSnackbar } = useSnackbar();
  const [mappingData, setMappingData] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [editedService, setEditedService] = useState({}); // Track form data
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientListData, setClientListData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const destinationCountries = ['France', 'United States', 'Australia', 'Canada', 'Germany'];

  const getClientsData = async () => {
    const url = '/user_management/visa-clients/dashboard-status/';
    try {
      const { res, error } = await Factory('get', url, {});
      if (res.status_cd === 0) {
        setClientListData(res.data);
        const tableData =
          tab === 'completed'
            ? res.data.completed_data
            : tab === 'in_progress'
              ? res.data.in_progress_data
              : tab === 'pending' && res.data.pending_data;

        setMappingData(tableData);
      }
    } catch (error) {
      // Catch any errors during the request
      console.error('Error:', error);
      showSnackbar(JSON.stringify(error), 'error');
    }
  };

  useEffect(() => {
    getClientsData(); // Load client list on component mount
  }, []);

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
        user: editedService.user,
        passport_number: editedService.passport_number,
        purpose: editedService.purpose,
        visa_type: editedService.visa_type,
        destination_country: editedService.destination_country
      },
      service: {
        id: editedService.service_id,
        service_type_id: editedService.service_type,
        status: editedService.status,
        comments: editedService.comments,
        quantity: editedService.quantity
      }
    };
    console.log(editedService);
    console.log(putData);
    const url = `/user_management/service-details/${editedService.service_id}/`;
    const { res, error } = await Factory('put', url, putData);
    if (res.status_cd === 0) {
      getClientsData();
      setDialogOpen(false);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleDelete = async (service) => {
    const url = `/user_management/service-details/${service.service_id}/`;
    const { res, error } = await Factory('delete', url, {});
    if (res.status === 204) {
      getClientsData(); // Load client list on component mount
      setDeleteDialogOpen(false);
    } else {
      alert('Failed to delete the service. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h5">{titles[tab]}</Typography>
      <Typography variant="caption" color={'grey.700'} sx={{ mb: 3 }}>
        Tasks {titles[tab]}
      </Typography>
      <Typography variant="h2" color={'grey.700'} sx={{ mb: 3 }}></Typography>
      <TaskList
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        taskList={mappingData}
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
}
