'use client';
import { useEffect, useMemo, useState } from 'react';

// @mui
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

// @third-party
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

// @project
import Table from './analytics-behavior-table/Table';
import ActionCell from './analytics-behavior-table/ActionCell';
import Profile from '@/components/Profile';
import ManageAccess from '../manage-access';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import EditUser from '../edit-user';

/***************************  COMPONENT - TABLE  ***************************/

export default function AnalyticsBehaviorTable({ type, tableData }) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState('');
  const { showSnackbar } = useSnackbar();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [accessDialog, setAccessDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState(false);

  const getUsers = async () => {
    let url = `/user_management/users/by-type/?user_type=${type}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      setData(res.data.users);
    } else {
      showSnackbar(JSON.stringify(res.data), 'error');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = useMemo(
    () => [
      {
        id: 'user',
        accessorKey: 'user',
        header: 'Name',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {`${row.original.first_name} ${row.original.last_name}`}
          </Typography>
        )
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: 'Email'
      },
      {
        id: 'mobile_number',
        accessorKey: 'mobile_number',
        header: 'Mobile Number'
      },
      {
        id: 'user_type',
        accessorKey: 'user_type',
        header: 'User Type',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {`${row.original.user_type === null ? 'Individual' : row.original.user_type}`}
          </Typography>
        )
      },
      {
        id: 'date_joined',
        accessorKey: 'date_joined',
        header: 'Date'
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'User Status',
        cell: ({ row }) => {
          const handleToggle = (event) => {
            const updatedData = data.map((user) => (user.id === row.original.id ? { ...user, is_active: event.target.checked } : user));
            setData(updatedData);
          };

          return (
            <Switch
              checked={Boolean(row.original.is_active)} // Ensures it always has a boolean value
              onChange={handleToggle}
              size="medium"
            />
          );
        }
      },
      {
        header: 'Actions',
        id: 'action',
        cell: ({ row }) => (
          <ActionCell
            row={row.original}
            onDelete={(id) => onDeleteRow(id)}
            setAccessDialog={setAccessDialog}
            onEdit={setEditUserDialog}
            setUser={setUser}
          />
        )
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
  // console.log(table.getRowModel().rows);

  const statusChange = () => {};
  return (
    <>
      <ManageAccess open={accessDialog} setOpen={setAccessDialog} />
      <EditUser open={editUserDialog} setOpen={setEditUserDialog} user_id={user} getUsers={getUsers} />
      <Table table={table} onGlobalSearch={onGlobalSearch} />
    </>
  );
}
