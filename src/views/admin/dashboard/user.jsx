'use client';
import Grid from '@mui/material/Grid2';

import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
import OverviewCard from './user/OverviewCard';
import Services from './user/Services';
import { useSnackbar } from '@/components/CustomSnackbar';
import AnalyticsTopRef from './user/AnalyticsTopRef';
import MainCard from '@/components/MainCard';
import Profile from '@/components/Profile';
import { Card, Typography } from '@mui/material';
import ZombieingDoodle from '@/images/illustration/ZombieingDoodle';
import { Height } from '@mui/icons-material';

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function AnalyticsOverview() {
  //   const { user } = useAuth();
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid container size={12}>
        <Grid container size={8}>
          <MainCard style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid
              size={8}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h3">Hello Krishna Sai,</Typography>
              <Typography variant="h4">Welcom Back</Typography>
              <Typography sx={{ color: '#c9c9c9', mt: 2 }} variant="subtitle1">
                simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
              </Typography>
            </Grid>
            <Grid size={4}>
              <ZombieingDoodle />
            </Grid>
          </MainCard>
        </Grid>
        <Grid size={4}>
          <MainCard style={{ minHeight: '29%', maxHeight: '29%' }}>
            <Typography variant="subtitle1">User Since Dec, 2024</Typography>
          </MainCard>
          <div style={{ minHeight: '4%', maxHeight: '4%' }}></div>
          <MainCard style={{ minHeight: '67%', maxHeight: '67%' }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Credits Earned
            </Typography>
            <Typography variant="h4">7000$</Typography>
            <Typography variant="subtitle1" color="secondary">
              Use them to redeem
            </Typography>
          </MainCard>
        </Grid>
      </Grid>

      {/* <Grid size={12}>
        <Services />
      </Grid> */}
      {/* <Grid size={12}>
        <AnalyticsTopRef />
      </Grid> */}
    </Grid>
  );
}
