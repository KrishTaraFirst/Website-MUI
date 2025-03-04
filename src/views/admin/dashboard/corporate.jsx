'use client';
import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
// import Services from './visaconsultencyFiles/Services';
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from '../corporate-entity/OverviewCard';
import { useAuth } from '@/contexts/AuthContext';
import AnalyticsBehaviorCard from '@/sections/dashboard/analytics/user-behavior/AnalyticsBehaviorCard';
import Grid from '@mui/material/Grid2';
import MainCard from '@/components/MainCard';
import { Box, Chip, Stack, Typography } from '@mui/material';
import ZombieingDoodle from '@/images/illustration/ZombieingDoodle';
import { IconArrowDown, IconArrowUpRight } from '@tabler/icons-react';
import useCurrentUser from '@/hooks/useCurrentUser';

const productsData = [
  {
    title: 'Payroll',
    value: '23,876',
    href: '/payroll',
    compare: 'vs last month',
    chip: {
      label: '24.5%',
      icon: <IconArrowUpRight />
    }
  },
  {
    title: 'Invoicing',
    value: '30,450',
    href: '/invoicing',
    compare: 'vs last month',
    chip: {
      label: '20.5%',
      icon: <IconArrowUpRight />
    }
  },
  {
    title: 'Doc Wallet',
    value: '34,789',
    compare: 'vs last month',
    href: '#',
    chip: {
      label: '20.5%',
      color: 'error',
      icon: <IconArrowDown />
    }
  },
  {
    title: 'GST Registration',
    value: '34,789',
    compare: 'vs last month',
    href: '#',
    chip: {
      label: '20.5%',
      color: 'error',
      icon: <IconArrowDown />
    }
  }
];
export default function CorporateEntity() {
  //   const { user } = useAuth();
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const [clientListData, setClientListData] = useState({});
  const { showSnackbar } = useSnackbar();
  const { userData } = useCurrentUser();
  console.log(userData);
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
          <Grid size={{ xs: 12, md: 12 }}>
            <MainCard style={{ display: 'flex', flexDirection: 'row' }}>
              <Grid
                size={8.5}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                sx={{ p: 1 }}
              >
                <Typography variant="h3">
                  Hello,{' '}
                  {userData.dashboardChange === 'business'
                    ? userData.businesssDetails.business[0].nameOfBusiness
                    : userData.first_name + ' ' + userData.last_name}
                  !
                </Typography>
                <Typography variant="h5">Welcome back to Tara First</Typography>
                <Typography color="grey.600" sx={{ mt: 2 }} variant="subtitle1">
                  Tara empowers you to take control of your finances effortlessly. From seamless tax management and hassle-free business
                  incorporation to ensuring compliance, running payroll, and generating professional invoices—all in just a few clicks. Our
                  intuitive platform simplifies the complexities of financial operations, so you can focus on growing your business and
                  enhancing your well-being while we handle the rest with precision and care!
                </Typography>
              </Grid>
              <Grid size={3.5}>
                <ZombieingDoodle />
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={12}>
          <AnalyticsBehaviorCard data={productsData} products={true} />
        </Grid>
        <Grid size={12}>
          <OverviewCard clientListData={clientListData} />
        </Grid>
      </Grid>
    </Box>
  );
}
