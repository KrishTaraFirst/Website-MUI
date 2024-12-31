'use client';
import Grid from '@mui/material/Grid2';

import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
import Services from '../dashboard/user/Services';
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from '../dashboard/user/OverviewCard';
import AnalyticsTopRef from '../dashboard/user/AnalyticsTopRef';

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function AnalyticsOverview() {
  //   const { user } = useAuth();
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const [clientListData, setClientListData] = useState({});
  const { showSnackbar } = useSnackbar();

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
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid size={12}>
        <OverviewCard clientListData={clientListData} />
      </Grid>
      <Grid size={12}>
        <Services />
      </Grid>
      {/* <Grid size={12}>
        <AnalyticsTopRef />
      </Grid> */}
    </Grid>
  );
}
