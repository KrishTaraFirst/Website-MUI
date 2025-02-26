'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import MainCard from '@/components/MainCard';
import { Box, Stack, Typography, LinearProgress, Button, Grid2 } from '@mui/material';
import Factory from '@/utils/Factory';
import Loader from '@/components/PageLoader';
import { useSearchParams } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useSnackbar } from '@/components/CustomSnackbar';

const PayrollSetup = () => {
  const { userData } = useCurrentUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false); // State for loader
  const [payrollDetails, setPayrollDetails] = useState({});
  const [businessId, setBusinessId] = useState(null);
  const { showSnackbar } = useSnackbar();

  const [steps, setSteps] = useState([
    { nameKey: 'Organization Details', path: '/organization_details', completed: false },
    { nameKey: 'Set up Work Location', path: '/set_up_work_location', completed: false },
    { nameKey: 'Set up Departments', path: '/set_up_departments', completed: false },
    { nameKey: 'Set up Designations', path: '/set_up_designations', completed: false },
    { nameKey: 'Set up Statutory Components', path: '/set_up_statutory_components', completed: false },
    { nameKey: 'Set up Salary Components', path: '/set_up_salary_components', completed: false },
    { nameKey: 'Set up Salary Template', path: '/set_up_salary_template', completed: false },
    { nameKey: 'Set up Employee Master', path: '/set_up_employee_master', completed: false },
    { nameKey: 'Pay Schedule', path: '/pay_schedule', completed: false },
    { nameKey: 'Leave & Attendance', path: '/leave_and_attendance', completed: false }
  ]);

  useEffect(() => {
    const business_id = searchParams.get('business-id');
    if (business_id) {
      setBusinessId(business_id);
    }
  }, [searchParams]);

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  const totalSteps = steps.length;
  const completedSteps = steps.filter((step) => step.completed).length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

  const payroll_details = async () => {
    setLoading(true);
    const url = `/payroll/business-payroll/${businessId}/`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false);
    if (res.status_cd === 0) {
      setPayrollDetails((prev) => ({
        ...prev,
        ...res.data
      }));
      setSteps((prevSteps) =>
        prevSteps.map((step) => {
          if (step.path === '/organization_details') {
            return { ...step, completed: res.data.organisation_details };
          }
          if (step.path === '/set_up_work_location') {
            return { ...step, completed: res.data.work_locations };
          }
          if (step.path === '/set_up_departments') {
            return { ...step, completed: res.data.departments };
          }
          if (step.path === '/set_up_designations') {
            return { ...step, completed: res.data.designations };
          }
          if (step.path === '/set_up_statutory_components') {
            return { ...step, completed: res.data.statutory_component };
          }
          if (step.path === '/set_up_salary_components') {
            return { ...step, completed: res.data.salary_component };
          }
          if (step.path === '/set_up_salary_template') {
            return { ...step, completed: res.data.salary_component };
          }
          if (step.path === '/set_up_employee_master') {
            return { ...step, completed: res.data.employee_master };
          }
          if (step.path === '/pay_schedule') {
            return { ...step, completed: res.data.pay_schedule };
          }
          if (step.path === '/leave_and_attendance') {
            return { ...step, completed: res.data.salary_component };
          }

          return step; // Leave other steps unchanged
        })
      );
    } else {
    }
  };
  useEffect(() => {
    if (businessId) {
      payroll_details();
    }
  }, [businessId]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" textAlign="center" sx={{ mb: 1 }}>
              Welcome {userData.firstname}
            </Typography>
            <Typography variant="subtitle1" textAlign="center" sx={{ color: 'text.disabled' }}>
              Set up your organization before starting payroll
            </Typography>
          </Box>

          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={12}>
              <MainCard sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Stack direction="column" sx={{ flexGrow: 1, gap: 1 }}>
                    <Typography variant="h6" sx={{ color: '#4A4A4A', fontWeight: 600 }}>
                      Payroll Setup
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7D7D7D' }}>
                      Follow these steps for an easy payroll process
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <LinearProgress
                      variant="determinate"
                      value={completionPercentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        width: 250,
                        backgroundColor: '#EDEDED',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#4A90E2'
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                      {completionPercentage}%
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="column" spacing={2}>
                  {steps.map((step, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: step.completed ? '#F9F9F9' : '#FFFFFF',
                        boxShadow: step.completed ? 'none' : '0px 1px 3px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          backgroundColor: '#F1F1F1'
                        }
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: step.completed ? '#4A90E2' : '#E0E0E0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {step.completed && (
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontSize: 16 }}>
                              ✓
                            </Typography>
                          )}
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: step.completed ? '#7D7D7D' : '#4A4A4A' }}>
                          {index + 1}. {step.nameKey}
                        </Typography>
                      </Stack>
                      <Button
                        variant="outlined"
                        sx={{
                          color: step.completed ? '#4CAF50' : '#4A90E2',
                          fontWeight: step.completed ? 500 : 400
                        }}
                        onClick={() => {
                          const routeBase = `/payrollsetup${step.path}`;
                          if (step.nameKey === 'Organization Details' && !payrollDetails?.payroll_id) {
                            router.push(`${routeBase}?business-id=${businessId}`); // Navigate to route without payroll ID
                          } else if (payrollDetails?.payroll_id) {
                            router.push(`${routeBase}?payrollid=${payrollDetails.payroll_id}`); // Navigate with payroll ID
                          } else {
                            showSnackbar('Payroll ID not available', 'error');
                          }
                        }}
                      >
                        {step.completed ? 'Completed' : 'Complete Now'}
                      </Button>
                    </Stack>
                  ))}
                </Stack>
              </MainCard>
            </Grid2>
          </Grid2>
        </Box>
      )}
    </>
  );
};

export default PayrollSetup;
