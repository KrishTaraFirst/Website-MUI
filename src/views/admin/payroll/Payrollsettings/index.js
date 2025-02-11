'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import MainCard from '@/components/MainCard';
import HomeCard from '@/components/cards/HomeCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import Factory from '@/utils/Factory';

import { Stepper, Step, StepLabel, Button, Typography, Box, Stack, LinearProgress, Grid2 } from '@mui/material';

const PayrollSetup = () => {
  const { userData } = useCurrentUser();
  const [payrollDetails, setPayrollDetails] = useState({});
  const steps = [
    { nameKey: 'Organization Details', path: '/organization_details', completed: true },
    { nameKey: 'Set up Work Location', path: '/set_up_work_location', completed: true },
    { nameKey: 'Set up Departments', path: '/set_up_departments', completed: true },
    { nameKey: 'Set up Designations', path: '/set_up_designations', completed: false },
    { nameKey: 'Set up Statutory Components', path: '/set_up_statutory_components', completed: false },
    { nameKey: 'Set up Salary Components', path: '/set_up_salary_components', completed: false },
    { nameKey: 'Set up Salary Template', path: '/set_up_salary_template', completed: false }
  ];

  const router = useRouter();

  // Calculate completion percentage
  const totalSteps = steps.length;
  const completedSteps = steps.filter((step) => step.completed).length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

  const getData = async () => {
    const url = `/payroll/business-payroll/${userData.id}/`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0) {
      setPayrollDetails(res?.data);
    } else {
      setPayrollDetails({}); // Ensure workLocations is reset if there's an error or invalid data
      // Optionally show a snackbar error here if needed
      // showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Box sx={{}}>
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

              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    width: 250, // Adjust width as needed
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
                    type="button"
                    sx={{
                      color: step.completed ? '#4CAF50' : '#4A90E2',
                      fontWeight: step.completed ? 500 : 400
                    }}
                    onClick={() => {
                      const routeBase = `/payrollsetup${step.path}`;

                      // if (step.nameKey === 'Organization Details' && !payrollDetails?.id) {
                      //   router.push(routeBase); // Navigate to route without payroll ID
                      // } else if (payrollDetails?.id) {
                      router.push(`${routeBase}?payrollid=${payrollDetails.id}`); // Navigate with payroll ID
                      // } else {
                      //   alert('Payroll ID not available!');
                      // }
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
  );
};

export default PayrollSetup;
