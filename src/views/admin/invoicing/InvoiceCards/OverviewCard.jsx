'use client';
import React from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FilterDialog from './FilterDialog';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from '@mui/material';
import ActionCell from '@/utils/ActionCell';
// import { ActionCell } from '@/sections/components/table';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';

//react
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// @project
import MainCard from '@/components/MainCard';
import { getRadiusStyles } from '@/utils/getRadiusStyles';

// @assets
import { IconArrowUp, IconFilter, IconReload } from '@tabler/icons-react';
import { Autocomplete, Box, Button, FormHelperText, InputLabel, TextField, Avatar } from '@mui/material';
import DynamicIcon from '@/components/DynamicIcon';

/***************************  CARDS - BORDER WITH RADIUS  ***************************/

export function applyBorderWithRadius(radius, theme) {
  return {
    overflow: 'hidden',
    '--Grid-borderWidth': '1px',
    borderTop: 'var(--Grid-borderWidth) solid',
    borderLeft: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider',
    '& > div': {
      overflow: 'hidden',
      borderRight: 'var(--Grid-borderWidth) solid',
      borderBottom: 'var(--Grid-borderWidth) solid',
      borderColor: 'divider',
      [theme.breakpoints.down('md')]: {
        '&:nth-of-type(1)': getRadiusStyles(radius, 'topLeft'),
        '&:nth-of-type(2)': getRadiusStyles(radius, 'topRight'),
        '&:nth-of-type(3)': getRadiusStyles(radius, 'bottomLeft'),
        '&:nth-of-type(4)': getRadiusStyles(radius, 'bottomRight')
      },
      [theme.breakpoints.up('md')]: {
        '&:first-of-type': getRadiusStyles(radius, 'topLeft', 'bottomLeft'),
        '&:last-of-type': getRadiusStyles(radius, 'topRight', 'bottomRight')
      }
    }
  };
}

/***************************   OVERVIEW CARD -DATA  ***************************/

/***************************   OVERVIEW - CARDS  ***************************/

const yearlyStats = [
  {
    id: 'total_revenue',
    title: 'Total Revenue',
    href: '',
    value: '0',
    compare: 'Compare to last week'
  },
  {
    id: 'today_revenue',
    title: "Today's Revenue",
    href: 'pending',
    value: '0',
    compare: 'Compare to last week'
  },
  {
    id: 'revenue_this_month',
    title: 'Revenue this month',
    href: 'in_progress',
    value: '0',
    compare: 'Compare to last week'
  },
  {
    id: 'revenue_last_month',
    title: 'Revenue last month',
    href: 'in_progress',
    value: '0',
    compare: 'Compare to last week'
  },
  {
    id: 'average_revenue_per_day',
    title: 'Average revenue per day',
    href: 'completed',
    value: '0',
    compare: 'Compare to last week'
  }
];

const overallStats = [
  {
    id: 'over_dues',
    title: 'Over due',
    href: '',
    value: '0',
    compare: 'Compare to last week',
    buttonLable: 'Create New'
  },
  {
    id: 'due_today',
    title: 'Due today',
    href: 'pending',
    value: '0',
    compare: 'Compare to last week'
  },
  {
    id: 'due_within_30_days',
    title: 'Due with in 30 days',
    href: 'in_progress',
    value: '20',
    compare: 'Compare to last week'
  },
  {
    id: 'total_recievables',
    title: 'Total Receivable',
    href: 'completed',
    value: '0',
    compare: 'Compare to last week'
  }
];

const titles = {
  total_revenue: 'Total Revenue',
  today_revenue: "Today's Revenue",
  revenue_this_month: 'Revenue this month',
  revenue_last_month: 'Revenue last month',
  average_revenue_per_day: 'Average revenue per day',
  over_dues: 'Over due',
  due_today: 'Due today',
  due_within_30_days: 'Due with in 30 days',
  total_recievables: 'Total Receivable'
};

export default function OverviewCard() {
  const theme = useTheme();
  const router = useRouter();
  const chipDefaultProps = { color: 'success', variant: 'text', size: 'small' };
  const [title, setTitle] = useState('Over All Financial Year Invoices');
  const [invoices, setInvoices] = useState([]);
  const [financialYear, setFinancialYear] = useState('2024-25');
  const [filterDialog, setFilterDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const [businessData, setBusinessData] = useState({});
  const { showSnackbar } = useSnackbar();

  const getStatsData = async (type) => {
    setTitle(titles[type]);
    let url = `/invoicing/detail-invoice?invoicing_profile_id=1&&filter_type=${type}&&financial_year=${financialYear}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 1) {
      if (res.status === 404) {
        showSnackbar('Data Not found', 'error');
      }
    } else {
      console.log(res.data);
      setInvoices(res.data);
    }
  };

  const fetchBusinessDetails = async () => {
    const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
    if (res) {
      setBusinessData(res.data);
      // getDashboardData(res.data.id);
      getInvoices(1);
      getDashboardData(1);
    }
  };

  const getDashboardData = async (id) => {
    let url = `/invoicing/invoice-stats?invoicing_profile_id=${id}&financial_year=${financialYear}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 1) {
      if (res.status === 404) {
        showSnackbar('Data Not found', 'error');
      }
    } else {
      setDashboardData(res.data);
    }
  };

  const getInvoices = async (id) => {
    let url = `/invoicing/invoice-retrieve?invoicing_profile_id=${id}&financial_year=${financialYear}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 1) {
      if (res.status === 404) {
        showSnackbar('Data Not found', 'error');
      }
    } else {
      console.log(res.data);
      setInvoices(res.data.invoices);
    }
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setType('edit');
    handleOpen();
  };

  // Handle delete action
  const handleDelete = async (invoice) => {
    let url = `/invoicing/invoices/delete/${invoice.id}`;
    const { res } = await Factory('delete', url, {});
    if (res.status_cd === 1) {
      showSnackbar(res.data.message, 'error');
    } else {
      showSnackbar('Invoice Deleted Successfully', 'success');
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  useEffect(() => {
    // setBusinessData(res.data);
    if (businessData.id) {
      getInvoices(1);
      getDashboardData(1);
    }
  }, [financialYear]);

  const handleChange = (val) => {
    router.replace(`/dashboard/user/${val}`);
  };

  // const downloadInvoice = async (id) => {
  //   let url = `/invoicing/create-pdf/${id}/`;
  //   const { res } = await Factory('get', url, {});
  //   if (res.status_cd === 1) {
  //     if (res.status === 404) {
  //       showSnackbar('Data Not found', 'error');
  //     }
  //   } else {
  //     console.log(res.data);
  //     const binaryData = new Uint8Array([res.data]);
  //     const blob = new Blob([binaryData], { type: 'application/pdf' });
  //     const url = URL.createObjectURL(blob);
  //     window.open(url, '_blank');
  //     setTimeout(() => {
  //       URL.revokeObjectURL(url);
  //     }, 10000); // Clean up after 10 seconds
  //   }
  // };

  const downloadInvoice = async (id) => {
    let url = `/invoicing/create-pdf/${id}`;
    const { res } = await Factory('get', url, {});

    if (res.status === 404) {
      showSnackbar('Data Not Found', 'error');
      return;
    }

    if (res.status_cd !== 1) {
      console.log(res.data); // Debugging: Log binary data
      console.log(typeof res.data);
      var file = new Blob([res.data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } else {
      showSnackbar('Invalid response from server', 'error');
    }
  };

  return (
    <Box>
      <Grid container sx={{ borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme), mb: 3 }}>
        {yearlyStats.map((item, index) => (
          <React.Fragment key={'fragment' + index}>
            {index === 0 && (
              <Grid key={'filter' + index} size={{ xs: 6, sm: 6, md: 2 }}>
                <MainCard
                  sx={{
                    border: 'none',
                    borderRadius: 0,
                    boxShadow: 'none'
                  }}
                >
                  <Stack sx={{ gap: 1.5 }}>
                    <Autocomplete
                      options={['2021-22', '2022-23', '2023-24', '2024-25']}
                      value={financialYear}
                      onChange={(e, val) => {
                        setFinancialYear(val);
                      }}
                      disableClearable
                      renderOption={({ key: optionKey, ...optionProps }, option) => (
                        <li key={optionKey} {...optionProps}>
                          {option}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} slotProps={{ htmlInput: { ...params.inputProps, 'aria-label': 'language' } }} />
                      )}
                      // sx={{ width: 250 }}
                    />
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="caption" color="grey.700">
                        Select financial year to get yearly stats
                      </Typography>
                      {/* <Typography variant="caption" color="grey.700">
                    Tagline para
                  </Typography> */}
                    </Stack>
                  </Stack>
                </MainCard>
              </Grid>
            )}
            <Grid key={index} size={{ xs: 6, sm: 6, md: 2 }}>
              <MainCard
                onClick={() => {
                  getStatsData(item.id);
                }}
                sx={{
                  border: 'none',
                  borderRadius: 0,
                  boxShadow: 'none',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    bgcolor: 'grey.300'
                  },
                  minHeight: '100%'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                  <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 38, height: 36 }}>
                    <DynamicIcon name={'IconBolt'} size={26} stroke={1} />
                  </Avatar>
                </div>
                <Stack sx={{ gap: 1.5 }}>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Stack sx={{ gap: 0.5 }}>
                    <Typography variant="h3">{dashboardData[item.id] || 0}</Typography>
                    {/* <Typography variant="caption" color="grey.700">
                    Tagline para
                  </Typography> */}
                  </Stack>
                </Stack>
              </MainCard>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Grid container sx={{ borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme), mb: 4 }}>
        {overallStats.map((item, index) => (
          <Grid key={index} size={{ xs: 6, sm: 6, md: 3 }}>
            <MainCard
              onClick={() => {
                getStatsData(item.id);
              }}
              sx={{
                border: 'none',
                borderRadius: 0,
                boxShadow: 'none',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: 'grey.300'
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 38, height: 36 }}>
                  <DynamicIcon name={'IconBolt'} size={26} stroke={1} />
                </Avatar>
              </div>
              <Stack sx={{ gap: 1.5 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="h3">{dashboardData[item.id] || 0}</Typography>
                  {/* <Typography variant="caption" color="grey.700">
                    Tagline
                  </Typography> */}
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mb: 1 }}>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="caption" color="grey.700">
              FY: {financialYear}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ textAlign: 'right' }}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<IconReload size={16} />}
              sx={{ minWidth: 78, mr: 1 }}
              onClick={() => {
                getInvoices(1);
                setTitle('Over All Financial Year Invoices');
              }}
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<IconFilter size={16} />}
              sx={{ minWidth: 78 }}
              onClick={() => {
                setFilterDialog(true);
              }}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Invoice Number</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Balance Due</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell>{invoice.invoice_date}</TableCell>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{invoice.total_amount}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        variant="outlined"
                        label={invoice.payment_status === 'Unpaid' ? 'Pendind' : 'Paid'}
                        color={invoice.payment_status === 'Unpaid' ? 'warning' : 'error'}
                      />
                    </TableCell>
                    <TableCell>{invoice.due_date}</TableCell>
                    <TableCell>{invoice.pending_amount}</TableCell>
                    <TableCell>
                      <ActionCell
                        row={invoice} // Pass the row data
                        onEdit={() => showSnackbar('coming soon', 'success')} // Edit handler
                        onDelete={() => {
                          showSnackbar('coming soon', 'success');
                        }}
                        onDownload={() => {
                          downloadInvoice(invoice.id);
                        }}
                        deleteDialogData={{
                          title: 'Delete record',
                          heading: 'Are you sure you want to delete this record?',
                          description: `This action will permanantely remove this record from the list.`,
                          successMessage: 'Record has been deleted.'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No invoices available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <FilterDialog filterDialog={filterDialog} setFilterDialog={setFilterDialog} />
    </Box>
  );
}
