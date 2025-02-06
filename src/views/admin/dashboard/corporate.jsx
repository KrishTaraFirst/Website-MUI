'use client';
import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
// import Services from './visaconsultencyFiles/Services';
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from '../corporate-entity/OverviewCard';
import { useAuth } from '@/contexts/AuthContext';
import UserBehaviourTable from '@/sections/dashboard/analytics/user-behavior';
import Grid from '@mui/material/Grid2';
import MainCard from '@/components/MainCard';
import { Box, Chip, Stack, Typography } from '@mui/material';
import ZombieingDoodle from '@/images/illustration/ZombieingDoodle';

export default function CorporateEntity() {
  //   const { user } = useAuth();
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const [clientListData, setClientListData] = useState({});
  const { showSnackbar } = useSnackbar();
  const { user, tokens, logout } = useAuth();

  // const getClientsData = async () => {
  //   const url = '/user_management/visa-clients/dashboard-status/';
  //   try {
  //     const { res, error } = await Factory('get', url, {});
  //     if (res.status_cd === 0) {
  //       setClientListData(res.data);
  //     }
  //   } catch (error) {
  //     // Catch any errors during the request
  //     console.error('Error:', error);
  //     showSnackbar(JSON.stringify(error), 'error');
  //   }
  // };

  // useEffect(() => {
  //   getClientsData(); // Load client list on component mount
  // }, []);

  return (
    <Box>
      <Grid container sx={{ mb: 3 }} spacing={{ xs: 2, md: 3 }}>
        <Grid container size={12}>
          <Grid size={{ xs: 12, md: 8 }}>
            <MainCard style={{ display: 'flex', flexDirection: 'row' }}>
              <Grid
                size={8}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h3">Hello, User!</Typography>
                <Typography variant="h5">Welcome back to Tara First</Typography>
                <Typography color="grey.600" sx={{ mt: 2 }} variant="subtitle1">
                  Tara gives you the power to handle taxes, incorporate your business, stay compliant, run payroll, and create invoices –
                  all in a few clicks. Let us help you focus on your wellbeing while we take care of the rest!
                </Typography>
              </Grid>
              <Grid size={4}>
                <ZombieingDoodle />
              </Grid>
            </MainCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <MainCard style={{ minHeight: '100%', maxHeight: '100%' }}>
              <Stack sx={{ gap: 1.5 }}>
                <Typography variant="subtitle1">
                  <Stack direction={'column'} sx={{ gap: 0 }}>
                    User Since Dec, 2023{' '}
                    <Typography variant="subtitle2" color="grey.700">
                      Last Login - Jan 30, 2025
                    </Typography>
                  </Stack>
                </Typography>
                <Typography variant="subtitle1">
                  <Stack direction={'row'} sx={{ gap: 1 }}>
                    User KYC Status - <Typography color="success">Completed</Typography>
                  </Stack>
                </Typography>
                <Typography variant="subtitle1">
                  <Stack direction={'row'} sx={{ gap: 1 }}>
                    Subscription Plan - <Typography color="primary">Premium</Typography>
                  </Stack>
                </Typography>

                <Typography variant="subtitle1">Next Renewal - March 10, 2025</Typography>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12} sx={{ mb: 3 }}>
        <OverviewCard clientListData={clientListData} />
      </Grid>
      <UserBehaviourTable />
    </Box>
  );
}
