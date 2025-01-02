'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';

//react
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// @project
import MainCard from '@/components/MainCard';
import { getRadiusStyles } from '@/utils/getRadiusStyles';

// @assets
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
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
    title: 'Total Revenue',
    href: '',
    value: '23,876',
    compare: 'Compare to last week',
    buttonLable: 'Create New',
    chip: {
      label: '24.5%',
      avatar: <IconArrowUp />
    }
  },
  {
    title: "Today's Revenue",
    href: 'pending',
    value: '6,788',
    compare: 'Compare to last week',
    data: [],
    buttonLable: 'View',
    chip: {
      label: '20.5%',
      avatar: <IconArrowUp />
    }
  },
  {
    title: 'Revenue this month',
    href: 'in_progress',
    value: '43,333',
    compare: 'Compare to last week',
    data: [],
    buttonLable: 'View',
    chip: {
      label: '20.5%',
      color: 'error',
      avatar: <IconArrowDown />
    }
  },
  {
    title: 'Revenue last month',
    href: 'in_progress',
    value: '23,678',
    compare: 'Compare to last week',
    data: [],
    buttonLable: 'View',
    chip: {
      label: '20.5%',
      color: 'error',
      avatar: <IconArrowDown />
    }
  },
  {
    title: 'Average revenue per day',
    href: 'completed',
    value: '3,985',
    compare: 'Compare to last week',
    data: [],
    buttonLable: 'View',
    chip: {
      label: '24.5%',
      avatar: <IconArrowUp />
    }
  }
];

const overallStats = [
  {
    title: 'Over due',
    href: '',
    value: '23,876',
    compare: 'Compare to last week',
    buttonLable: 'Create New',
    chip: {
      label: '24.5%',
      avatar: <IconArrowUp />
    }
  },
  {
    title: 'Due today',
    href: 'pending',
    value: '23,455',
    compare: 'Compare to last week',
    data: [],
    buttonLable: 'View',
    chip: {
      label: '20.5%',
      avatar: <IconArrowUp />
    }
  },
  {
    title: 'Due with in 30 days',
    href: 'in_progress',
    value: '34,678',
    compare: 'Compare to last week',
    data: [],
    buttonLable: 'View',
    chip: {
      label: '20.5%',
      color: 'error',
      avatar: <IconArrowDown />
    }
  },
  {
    title: 'Total Receivable',
    href: 'completed',
    value: '1,23,455',
    compare: 'Compare to last week',
    data: [],
    buttonLable: 'View',
    chip: {
      label: '24.5%',
      avatar: <IconArrowUp />
    }
  }
];
export default function OverviewCard() {
  const theme = useTheme();
  const router = useRouter();
  const chipDefaultProps = { color: 'success', variant: 'text', size: 'small' };
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { showSnackbar } = useSnackbar();

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
      getInvoicesData();
    }
  };

  useEffect(() => {}, []);

  const handleChange = (val) => {
    router.replace(`/dashboard/user/${val}`);
  };

  return (
    <Box>
      <Box sx={{ py: { xs: 1, sm: 2 } }}>
        <Autocomplete
          options={['2021-22', '2022-23', '2023-24', '2024-25']}
          value={'2024-25'}
          disableClearable
          renderOption={({ key: optionKey, ...optionProps }, option) => (
            <li key={optionKey} {...optionProps}>
              {option}
            </li>
          )}
          renderInput={(params) => <TextField {...params} slotProps={{ htmlInput: { ...params.inputProps, 'aria-label': 'language' } }} />}
          sx={{ width: 250 }}
        />
        <FormHelperText>&nbsp;Select financial year to get yearly stats</FormHelperText>
      </Box>
      <Grid container sx={{ borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme), mb: 3 }}>
        {yearlyStats.map((item, index) => (
          <Grid key={index} size={{ xs: 6, sm: 6, md: 2.4 }}>
            <MainCard sx={{ border: 'none', borderRadius: 0, boxShadow: 'none', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 38, height: 36 }}>
                  <DynamicIcon name={'IconBolt'} size={26} stroke={1} />
                </Avatar>
              </div>{' '}
              <Stack sx={{ gap: 2 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="h3">{item.value}</Typography>
                  {/* <Typography variant="caption" color="grey.700">
                    {item.compare}
                  </Typography> */}
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
        ))}
      </Grid>

      <Grid container sx={{ borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme), mb: 3 }}>
        {overallStats.map((item, index) => (
          <Grid key={index} size={{ xs: 6, sm: 6, md: 3 }}>
            <MainCard sx={{ border: 'none', borderRadius: 0, boxShadow: 'none', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 38, height: 36 }}>
                  <DynamicIcon name={'IconBolt'} size={26} stroke={1} />
                </Avatar>
              </div>
              <Stack sx={{ gap: 2 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="h3">{item.value}</Typography>
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
        ))}
      </Grid>

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
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.customer_name}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>{invoice.due_date}</TableCell>
                    <TableCell>{invoice.balance_due}</TableCell>
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
    </Box>
  );
}
