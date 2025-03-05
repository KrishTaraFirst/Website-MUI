'use client';
import UserBehaviourTable from '@/sections/dashboard/analytics/user-behavior';
import HomeCard from '@/components/cards/HomeCard';
import AnalyticsBehaviorCard from '@/sections/dashboard/analytics/user-behavior/AnalyticsBehaviorCard';
import { IconArrowDown, IconArrowUpRight } from '@tabler/icons-react';
import Grid from '@mui/material/Grid2';
const userBehaviorAnalytics = [
  {
    title: 'Total Users',
    value: '23,876',
    compare: 'vs last month',
    chip: {
      label: '24.5%',
      icon: <IconArrowUpRight />
    }
  },
  {
    title: 'New Users',
    value: '30,450',
    compare: 'vs last month',
    chip: {
      label: '20.5%',
      icon: <IconArrowUpRight />
    }
  },
  {
    title: 'Current Users',
    value: '34,789',
    compare: 'vs last month',
    chip: {
      label: '20.5%',
      color: 'error',
      icon: <IconArrowDown />
    }
  }
];

const productsData = [
  {
    title: 'Payroll',
    value: '23,876',
    compare: 'vs last month',
    chip: {
      label: '24.5%',
      icon: <IconArrowUpRight />
    }
  },
  {
    title: 'Invoicing',
    value: '30,450',
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
    chip: {
      label: '20.5%',
      color: 'error',
      icon: <IconArrowDown />
    }
  }
];

export default function Individual() {
  return (
    <HomeCard title="Individual" tagline="Individual Dashbord">
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={12}>
          <AnalyticsBehaviorCard data={userBehaviorAnalytics} />
        </Grid>
        {/* <Grid size={12}>
          <AnalyticsBehaviorCard data={productsData} products={true} />
        </Grid> */}
      </Grid>
    </HomeCard>
  );
}
