'use client';
import Grid from '@mui/material/Grid2';

import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
import Services from './visaconsultencyFiles/Services';
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from './visaconsultencyFiles/OverviewCard';
import { useAuth } from '@/contexts/AuthContext';
import { Stack, Typography } from '@mui/material';
/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function AnalyticsOverview() {
  //   const { user } = useAuth();
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const [clientListData, setClientListData] = useState({});
  const { showSnackbar } = useSnackbar();
  const { user, tokens, logout } = useAuth();

  const getClientsData = async () => {
    const url = '/user_management/visa-clients/dashboard-status/';
    try {
      const { res, error } = await Factory('get', url, {});
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
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Stack sx={{ gap: 0 }}>
        <Typography variant="h4" sx={{ fontWeight: 400 }}>
          Quick access
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey.700' }}>
          View or create your services
        </Typography>
      </Stack>
      <Grid size={12}>
        <OverviewCard clientListData={clientListData} />
      </Grid>
      <Grid size={12}>
        <Services />
      </Grid>
    </Grid>
  );
}
