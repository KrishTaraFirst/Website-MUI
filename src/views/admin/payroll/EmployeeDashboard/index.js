'use client';
import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
// import Services from './visaconsultencyFiles/Services';
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from './OverviewCard';
import { useAuth } from '@/contexts/AuthContext';
import AnalyticsBehaviorCard from '@/sections/dashboard/analytics/user-behavior/AnalyticsBehaviorCard';
import Grid2 from '@mui/material/Grid2';
import MainCard from '@/components/MainCard';
import { Box, Chip, Stack, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import ZombieingDoodle from '@/images/illustration/ZombieingDoodle';
import { IconArrowDown, IconArrowUpRight } from '@tabler/icons-react';
import useCurrentUser from '@/hooks/useCurrentUser';
import PayrollSummary from './PayrollSummary';
const productsData = [
  {
    title: 'New Joiners',
    value: '23,876',
    href: '/payroll-workflows'
  },
  {
    title: 'Exits',
    value: '30,450',
    href: '/invoicing'
  },
  {
    title: 'Attendance',
    value: '34,789',
    compare: 'vs last month',
    href: '#'
  },
  {
    title: 'Loans & Advances',
    value: '34,789',
    compare: 'vs last month',
    href: '#'
  },
  {
    title: 'Bonus & Incnetives',
    value: '34,789',
    compare: 'vs last month',
    href: '#'
  },
  {
    title: 'Salary revisions',
    value: '34,789',
    compare: 'vs last month',
    href: '#'
  },
  {
    title: 'Adhoc Reimbursements',
    value: '34,789',
    compare: 'vs last month',
    href: '#'
  }
];
export default function index() {
  //   const { user } = useAuth();
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const [clientListData, setClientListData] = useState({});
  const { showSnackbar } = useSnackbar();
  const { userData } = useCurrentUser();
  const { user, tokens, logout } = useAuth();
  const router = useRouter();
  const [payrollid, setPayrollId] = useState(null); // Payroll ID fetched from URL

  const searchParams = useSearchParams();

  // Update payroll ID from search params
  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);
  return (
    <Box>
      <Grid2 container sx={{ mb: 3 }} spacing={{ xs: 2, md: 3 }}>
        <Grid2 container size={{ xs: 12 }}>
          <Grid2 size={12}>
            <OverviewCard clientListData={clientListData} />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="h6">Payroll WorkFlows:</Typography>
          </Grid2>
          <MainCard>
            <Grid2 container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {productsData.map((item, index) => (
                <Grid2 key={index} xs={12} sm={6} md={4}>
                  <Card sx={{ minHeight: '100px', maxHeight: '100px' }}>
                    <CardActionArea onClick={() => router.push(`/payroll${item.href}?payrollid=${payrollid}&tabValue=${index}`)}>
                      <CardContent>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="h6">{item.title}</Typography>
                        </Stack>
                        <Typography variant="h5" sx={{ mt: 1 }}>
                          {item.value}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </MainCard>

          <Grid2 size={{ xs: 12 }}>
            <Typography variant="h6">Payroll Summary</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <MainCard style={{ display: 'flex', flexDirection: 'row' }}>
              <PayrollSummary />
            </MainCard>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={{ xs: 2, md: 3 }}></Grid2>
    </Box>
  );
}
