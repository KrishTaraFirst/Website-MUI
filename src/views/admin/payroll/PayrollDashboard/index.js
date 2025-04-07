'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setPayrollId } from '@/store/slices/payrollSlice';
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

export default function PayrollDashboard() {
  const { userData } = useCurrentUser();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({});
  const { showSnackbar } = useSnackbar();

  const getData = async (id) => {
    setLoading(true);
    const url = `/payroll/payroll-setup-status?business_id=${id}`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0) {
      if (res.data.payroll_setup === false) {
        router.push(`/payrollsetup`);
        setLoading(false);
      } else {
        setBusinessDetails(res?.data);
        setLoading(false);
      }
    } else {
      setBusinessDetails({});
      setLoading(false);
      showSnackbar(JSON.stringify(res?.data?.error), 'error');
    }
  };

  const get_business_details = async () => {
    setLoading(true);

    const userId = userData.dashboardChange ? userData.businesssDetails.id : userData.id;

    const url = `/user_management/businesses-by-client/?user_id=${userId}`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0) {
      getData(res.data.id);
    } else {
      showSnackbar(JSON.stringify(res?.data?.error || 'Unknown error'), 'error');
    }

    setLoading(false);
  };
  useEffect(() => {
    if (userData.business_exists === false) {
      router.push('/payrollsetup/payroll_business_profileSetup');
    } else {
      get_business_details();
    }
  }, [userData.id]);

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
          {/* <Button
            variant="outlined"
            onClick={() => router.push(`/payroll/employee-dashboard?payrollid=${businessDetails?.payroll_id}`)}
            startIcon={<IconSettings2 size={18} />}
          >
            Employee Dashboard
          </Button> */}
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/payrollsetup/add-employee?payrollid=${businessDetails?.payroll_id}`);
            }}
            startIcon={<IconSparkles size={16} />}
          >
            Add Employee
          </Button>
        </Stack>
      </Stack>
      <Grid2 container spacing={{ xs: 2, md: 3 }}>
        <Grid2 size={{ xs: 12 }}>
          <OverviewCard payrollId={businessDetails?.payroll_id} />
        </Grid2>
      </Grid2>
    </Stack>
  );
}
