'use client';
import { usePathname, useRouter } from 'next/navigation';

import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from './OverviewCard';
import { Button, Stack, Typography, Grid2 } from '@mui/material';
import { IconSparkles, IconSettings2 } from '@tabler/icons-react';
import HomeCard from '@/components/cards/HomeCard';
import Loader from '@/components/PageLoader';
import useCurrentUser from '@/hooks/useCurrentUser';
/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function PayrollDashboard({ setPayrollSetup }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({});
  const { showSnackbar } = useSnackbar();
  const { userData } = useCurrentUser();

  const getData = async () => {
    setLoading(true);
    const url = `/user_management/businesses-by-client/?user_id=${userData.id}`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false);

    if (res?.status_cd === 0) {
      setBusinessDetails(res?.data);
    } else {
      setBusinessDetails({});
      showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
    }
  };

  useEffect(() => {
    getData();
  }, [userData.id]);

  useEffect(() => {
    if (!businessDetails?.id) {
      router.push(`/payrollsetup`);
    }
  }, [businessDetails, router]);

  return loading ? (
    <Loader />
  ) : (
    <Stack sx={{ gap: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Stack direction="column" sx={{ gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Payroll
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            Some text tagline regarding Payroll.
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ gap: 1.5 }}>
          <Button variant="outlined" onClick={() => router.push(`/payrollsetup`)} startIcon={<IconSettings2 size={18} />}>
            Payroll Settings
          </Button>
          <Button variant="contained" onClick={() => router.push(`${pathname}/add-employee`)} startIcon={<IconSparkles size={16} />}>
            Add Employee
          </Button>
        </Stack>
      </Stack>
      <Grid2 container spacing={{ xs: 2, md: 3 }}>
        <Grid2 size={{ xs: 12 }}>
          <OverviewCard />
        </Grid2>
      </Grid2>
    </Stack>
  );
}
