'use client';
import Grid from '@mui/material/Grid2';

import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from './InvoiceCards/OverviewCard';
import { Button, Stack, Typography } from '@mui/material';
import { IconSparkles, IconSettings2 } from '@tabler/icons-react';

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function AnalyticsOverview() {
  //   const { user } = useAuth();
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const { showSnackbar } = useSnackbar();
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
  return (
    <Stack sx={{ gap: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Stack direction="column" sx={{ gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Invoicing
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            Some text tagline regarding invoicing.
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ gap: 1.5 }}>
          <Button variant="outlined" startIcon={<IconSettings2 size={18} />}>
            Invoice Settings
          </Button>
          <Button variant="contained" startIcon={<IconSparkles size={16} />}>
            New Invoice
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={12}>
          <OverviewCard clientListData={clientListData} />
        </Grid>
        <Grid size={12}>{/* <Services /> */}</Grid>
      </Grid>
    </Stack>
  );
}
