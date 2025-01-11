'use client';
import Grid from '@mui/material/Grid2';

import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
import { useSnackbar } from '@/components/CustomSnackbar';
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
                Tara gives you the power to handle taxes, incorporate your business, stay compliant, run payroll, and create invoices – all
                in a few clicks. Let us help you focus on your wellbeing while we take care of the rest!
              </Typography>
            </Grid>
            <Grid size={4}>
              <ZombieingDoodle />
            </Grid>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
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
    </Grid>
  );
}
