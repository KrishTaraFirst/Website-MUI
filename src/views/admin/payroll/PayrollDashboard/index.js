'use client';
import Grid from '@mui/material/Grid2';
import { usePathname, useRouter } from 'next/navigation';

import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from './OverviewCard';
import { Button, Stack, Typography } from '@mui/material';
import { IconSparkles, IconSettings2 } from '@tabler/icons-react';
import HomeCard from '@/components/cards/HomeCard';
import Loader from '@/components/PageLoader';

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function PayrollDashboard({ setPayrollSetup }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({});
  const [customers, setCustomers] = useState([]);
  const [invoicesList, setInvoicesList] = useState([]);
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const { showSnackbar } = useSnackbar();
  const [clientListData, setClientListData] = useState({});
  const [type, setType] = useState('');
  // <Loader />

  return (
    <Stack sx={{ gap: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Stack direction="column" sx={{ gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Payroll
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            Some text tagline regarding Payroll.
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ gap: 1.5 }}>
          <Button
            variant="outlined"
            onClick={() => {
              router.push(`/payrollsetup`);
              // setPayrollSetup(true);
            }}
            startIcon={<IconSettings2 size={18} />}
          >
            Payroll Settings
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setType('add');
              // handleOpen();
              router.push(`${pathname}/add-employee`);
            }}
            startIcon={<IconSparkles size={16} />}
          >
            Add Employee
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={12}>
          <OverviewCard />
        </Grid>
      </Grid>
    </Stack>
  );
}
