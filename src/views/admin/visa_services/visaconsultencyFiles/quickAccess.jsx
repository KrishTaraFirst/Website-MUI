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

/***************************  COMPONENT - TABLE  ***************************/

export default function AnalyticsBehaviorTable({ tab }) {
  const [data, setData] = useState([...analyticsBehaviorTableData]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [clientListData, setClientListData] = useState({});

  const getClientsData = async () => {
    const url = '/user_management/visa-clients/dashboard-status/';
    try {
      const { res, error } = await Factory('get', url, {});
      console.log(res.data);
      if (res.status_cd === 0) {
        setClientListData(res.data);
        const tableData =
          tab === 'completed'
            ? res.data.completed_data
            : tab === 'in_progress'
              ? res.data.in_progress_data
              : tab === 'pending' && res.data.pending_data;

        setData(tableData);
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

  const columns = useMemo(
    () => [
      {
        id: 'taskId',
        accessorKey: 'service_id',
        header: 'Task ID',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {row.original.service_id}
          </Typography>
          // <Profile
          //   {...{
          //     ...row.original.user,
          //     avatar: { src: row.original.user.src || '/assets/images/users/avatar-2.png' },
          //     title: row.original.service_id,
          //     sx: { gap: 1.5 }
          //   }}
          // />
        )
      },
      {
        id: 'service',
        accessorKey: 'service_name',
        header: 'Service Name',
        cell: (info) => (
          <Typography variant="body2" color="text.secondary">
            {info.row.original.service_name}
          </Typography>
        )
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <Typography variant="body2" color="text.secondary">
              {info.row.original.date}
            </Typography>
          </Box>
        )
      },
      {
        id: 'destination_country',
        accessorKey: 'destination_country',
        header: 'Destination Country',
        cell: (info) => (
          <Typography variant="body2" color="text.secondary">
            {info.row.original.destination_country}
          </Typography>
        )
      },
      {
        id: 'quantity',
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: (info) => (
          <Typography variant="body2" color="text.secondary">
            {info.row.original.quantity}
          </Typography>
        )
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          switch (info.row.original.status) {
            case 'pending':
              return <Chip label="Pending" color="warning" />;
            case 'completed':
              return <Chip label="Completed" color="success" />;
            case 'in progress':
              return <Chip label="In Progress" color="warning" />;
            default:
              return <Chip label="Success" color="success" />;
          }
        }
      },
      {
        id: 'comments',
        accessorKey: 'comments',
        header: 'Comments'
        // cell: (info) => (
        //   <Typography variant="body2" color="text.secondary">
        //     {info.row.original.amount} USD
        //   </Typography>
        // )
      },
      {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => <ActionCell row={row.original} onDelete={(id) => onDeleteRow(id)} />
      }
    ], // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  // Delete single row by id from dialog
  const onDeleteRow = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    console.log('User deleted', data);
  };

  // Global filter search
  const onGlobalSearch = (globalFilter) => {
    setGlobalFilter(globalFilter);
  };

  return (
    <Box>
      <Typography variant="h5">{titles[tab]}</Typography>
      <Typography variant="caption" color={'grey.700'} sx={{ mb: 3 }}>
        Tasks {titles[tab]}
      </Typography>
      <Typography variant="h2" color={'grey.700'} sx={{ mb: 3 }}></Typography>
      <Table sx={{ mt: 3 }} table={table} clientListData={clientListData} tab={tab} onGlobalSearch={onGlobalSearch} />
    </Box>
  );
}
