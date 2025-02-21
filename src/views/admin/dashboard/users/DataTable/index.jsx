'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

// @mui
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch, Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// @third-party
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

// @project
import Table from './analytics-behavior-table/Table';
import ActionCell from './analytics-behavior-table/ActionCell';
import Profile from '@/components/Profile';
import SvgIcon from '@/components/SvgIcon';
import ManageAccess from '../manage-access';
import Factory from '@/utils/Factory';
import { APP_DEFAULT_PATH, AUTH_USER_KEY } from '@/config';
import { useSnackbar } from '@/components/CustomSnackbar';
import EditUser from '../edit-user';
import useCurrentUser from '@/hooks/useCurrentUser';
import { IconDotsVertical } from '@tabler/icons-react';
import { roles } from '@/enum';

/***************************  COMPONENT - TABLE  ***************************/

export default function AnalyticsBehaviorTable({ type, tableData, refresh }) {
  const { userData } = useCurrentUser();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState('');
  const { showSnackbar } = useSnackbar();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [accessDialog, setAccessDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState(false);

  const getUsers = async () => {
    let url = '';
    if (userData.user_type === 'super-admin') url = `/user_management/users/by-type/?user_type=${type}`;
    else url = `/user_management/affiliated-details?user_id=${userData.id}&type=${type}`;

    const { res } = await Factory('get', url, {});
    console.log(res.data);
    if (res.status_cd === 0) {
      setData(res.data.users);
    } else {
      setData([]);
      // showSnackbar(JSON.stringify(res.data), 'error');
    }
  };

  const handleCellClick = (row, columnId) => {
    console.log(`Clicked on column: ${columnId} with data:`, row.original);
    // Perform any action you need (e.g., open a modal, update state, etc.)
  };

  useEffect(() => {
    getUsers();
  }, [refresh]);

  const handleToggle = async (event, row) => {
    const { id } = row.original;
    const isActive = event.target.checked;
    let url = `/user_management/update-users-info`;
    const { res } = await Factory('patch', url, { id, is_active: isActive });
    if (res.status_cd === 0) {
      getUsers();
      // const updatedData = data.map((user) => (user.id === id ? { ...user, is_active: isActive } : user));
      // setData(updatedData);
      showSnackbar('Status Changed', 'success');
    } else {
      showSnackbar('Failed to update status', 'error');
    }
  };

  const toggleDashboard = (row) => {
    let rowData = row.original;
    let userDAta = {
      ...userData,
      role: roles[rowData.user_type],
      businesssDetails: row.original
    };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDAta));
    router.push(APP_DEFAULT_PATH);
    setTimeout(() => {
      window.location.reload();
    }, 1000);

    // router.push(APP_DEFAULT_PATH);
    // window.location.reload();
  };

  const columns = useMemo(
    () => [
      {
        id: 'user',
        accessorKey: 'user',
        header: 'Name',
        cell: ({ row }) => (
          <Typography onClick={() => handleCellClick(row, 'user')} variant="body2" color="text.secondary">
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
          return (
            <Switch
              checked={Boolean(row.original.is_active)} // Ensure boolean value
              onChange={(e) => handleToggle(e, row)} // Use onChange instead of onClick
              size="small"
            />
          );
        }
      },

      {
        header: 'Business',
        id: 'moreInfo',
        cell: ({ row }) => (
          <Link
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            onClick={(e) => {
              e.preventDefault();
              toggleDashboard(row);
            }}
            rel="noopener noreferrer"
            aria-label="Usefull Links"
          >
            <Stack direction={'row'}>
              <Typography variant="subtitle2" color="primary">
                More Info&nbsp;
              </Typography>
              <SvgIcon name="tabler-info-circle" size={16} color="primary" stroke={1} />
            </Stack>
          </Link>
        )
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

  return (
    <>
      <ManageAccess open={accessDialog} setOpen={setAccessDialog} />
      <EditUser type="edit" open={editUserDialog} setOpen={setEditUserDialog} user_id={user} getUsers={getUsers} />
      <Table table={table} onGlobalSearch={onGlobalSearch} />
    </>
  );
}
