'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useAuth } from '@/contexts/AuthContext';
import useCurrentUser from '@/hooks/useCurrentUser';
import Factory from '@/utils/Factory';
import HomeCard from '@/components/cards/HomeCard';
import MainCard from '@/components/MainCard';
import OverviewCard from './OverviewCard';
import PayrollSummary from './PayrollSummary';
import Grid2 from '@mui/material/Grid2';
import { Box, Stack, Typography, CardActionArea, CardContent, Card } from '@mui/material';

const PRODUCTS_DATA = [
  { title: 'New Joiners', href: '/payroll-workflows' },
  { title: 'Exits', href: '/invoicing' },
  { title: 'Attendance', href: '#' },
  { title: 'Loans & Advances', href: '#' },
  { title: 'Bonus & Incentives', href: '#' },
  { title: 'Salary Revisions', href: '#' },
  { title: 'Adhoc Reimbursements', href: '#' }
];

export default function Index() {
  const { showSnackbar } = useSnackbar();
  const { userData } = useCurrentUser();
  const { user, tokens, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [clientListData] = useState({});
  const [payrollId, setPayrollId] = useState(null);
  const [month, setMonth] = useState(null);
  const [payrollSummaryData, setPayrollSummaryData] = useState([]);

  // Sync payrollId from search params
  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) setPayrollId(id);
  }, [searchParams]);

  // Sync month from search params
  useEffect(() => {
    const monthNumber = searchParams.get('month');
    if (monthNumber) setMonth(monthNumber);
  }, [searchParams]);

  // Fetch payroll summary data
  const fetchPayrollSummary = async () => {
    const url = `/payroll/calculate-employee-monthly-salary?payroll_id=${payrollId}&month=3&financial_year=2024-2025`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      setPayrollSummaryData(res.data || []);
    } else {
      showSnackbar(JSON.stringify(res.data.data), 'error');
    }
  };

  useEffect(() => {
    if (payrollId) fetchPayrollSummary();
  }, [payrollId]);

  const handleCardClick = (href, index) => {
    router.push(`/payroll${href}?payrollid=${payrollId}&tabValue=${index}&month=${month}`);
  };

  return (
    <HomeCard title="Employee Dashboard" tagline="Know Your Monthly Payroll Details">
      <Box sx={{ pb: 3 }}>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          <Grid2 size={12}>
            <OverviewCard clientListData={clientListData} />
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Payroll Workflows
            </Typography>
            <MainCard>
              <Grid2 container spacing={1}>
                {' '}
                {PRODUCTS_DATA.map((item, index) => (
                  <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
                    <Card
                      sx={{
                        height: '60px', // Reduced from 80px to 60px
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // Changed to center for tighter fit
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', // Slightly smaller shadow
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)', // Reduced hover lift
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          cursor: 'pointer'
                        },
                        borderRadius: '6px', // Slightly smaller radius
                        overflow: 'hidden'
                      }}
                      onClick={() => handleCardClick(item.href, index)}
                    >
                      <CardContent sx={{ p: 1 }}>
                        {' '}
                        <Stack
                          direction="column"
                          spacing={0} // Removed spacing entirely
                          alignItems="center"
                          justifyContent="center"
                          sx={{ height: '100%' }}
                        >
                          <Typography
                            variant="subtitle2"
                            color="text.primary"
                            fontWeight="medium"
                            textAlign="center"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              lineHeight: 1.2 // Tighter line height
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            </MainCard>
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Payroll Summary
            </Typography>
          </Grid2>
          <Grid2 size={12}>
            <PayrollSummary payrollSummaryData={payrollSummaryData} />
          </Grid2>
        </Grid2>
      </Box>
    </HomeCard>
  );
}
