// 'use client';
// import PropTypes from 'prop-types';

// import { useEffect } from 'react';

// // @next
// import { useRouter, usePathname } from 'next/navigation';

// //  @mui
// import Stack from '@mui/material/Stack';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';

// // @project
// import { handlerActiveItem, useGetMenuMaster } from '@/states/menu';

// /***************************  DASHBOARD - ANALYTICS  ***************************/

// export default function DashboardAnalytics({ tab = 'pending' }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { menuMaster } = useGetMenuMaster();

//   const handleChange = (event, newValue) => {
//     router.replace(`/dashboard/analytics/${newValue}`);
//   };

//   useEffect(() => {
//     if (menuMaster.openedItem !== 'dashboard') handlerActiveItem('dashboard');
//     // eslint-disable-next-line
//   }, [pathname]);

//   return (
//     <Stack sx={{ gap: 4 }}>
//       <Box>
//         <h1>{tab}</h1>
//       </Box>
//     </Stack>
//   );
// }

// DashboardAnalytics.propTypes = { tab: PropTypes.string };

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
        id: 'user',
        accessorKey: 'user',
        header: 'User',
        cell: ({ row }) => (
          <Profile
            {...{
              ...row.original.user,
              avatar: { src: row.original.user.src },
              title: row.original.user.name,
              sx: { gap: 1.5 }
            }}
          />
        )
      },
      {
        id: 'amount',
        accessorKey: 'amount',
        header: 'Amount',
        cell: (info) => (
          <Typography variant="body2" color="text.secondary">
            {info.row.original.amount} USD
          </Typography>
        )
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          switch (getValue()) {
            case 'success':
              return <Chip label="Success" color="success" />;
            case 'cancel':
              return <Chip label="Cancel" color="error" />;
            default:
              return <Chip label="Success" color="success" />;
          }
        }
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <Typography variant="body2" color="text.secondary">
              {info.row.original.dateTime.date}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {info.row.original.dateTime.time}
            </Typography>
          </Box>
        )
      },
      {
        id: 'action',
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

  return <Table table={table} clientListData={clientListData} tab={tab} onGlobalSearch={onGlobalSearch} />;
}
