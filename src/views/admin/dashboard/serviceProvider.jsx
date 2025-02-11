'use client';
import Grid from '@mui/material/Grid2';
// @project
import MainCard from '@/components/MainCard';
import { Typography } from '@mui/material';
import ZombieingDoodle from '@/images/illustration/ZombieingDoodle';

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function ServiceProvider() {
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
            <Typography variant="subtitle1">User Since Dec, 2023</Typography>
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
