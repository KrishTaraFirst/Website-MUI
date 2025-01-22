'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import MainCard from '@/components/MainCard';

import { Stepper, Step, StepLabel, Button, Typography, Box, Stack, LinearProgress, Grid2 } from '@mui/material';

const PayrollSetup = () => {
  const steps = [
    { nameKey: 'Organization Details', path: '/organization_details', completed: false },
    { nameKey: 'Set up Work Location', path: '/set_up_work_location', completed: false },
    { nameKey: 'Set up Departments', path: '/set_up_departments', completed: false },
    { nameKey: 'Set up Designations', path: '/set_up_designations', completed: false },
    { nameKey: 'Set up Statutory Components', path: '/set_up_statutory_components', completed: false },
    { nameKey: 'Set up Salary Components', path: '/set_up_salary_components', completed: false }
  ];

  const router = useRouter();

  // Calculate completion percentage
  const totalSteps = steps.length;
  const completedSteps = steps.filter((step) => step.completed).length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Stack direction="column" sx={{ gap: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Payroll
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.700' }}>
              Setup your organization before starting payroll
            </Typography>
          </Stack>
        </Stack>
      </Grid2>
      <Grid2 size={12}>
        <MainCard>
          <Stack direction="column" sx={{ mb: 2, gap: 1 }}>
            <Typography variant="h6" sx={{ color: '#4A4A4A', fontWeight: 600 }}>
              Payroll Setup
            </Typography>
            <Typography variant="body2" sx={{ color: '#7D7D7D' }}>
              Follow these steps for an easy payroll process
            </Typography>
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{
                height: 8,
                borderRadius: 4,
                mt: 1,
                backgroundColor: '#EDEDED',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#4A90E2'
                }
              }}
            />
            <Typography variant="body2" sx={{ textAlign: 'right', color: '#4A4A4A' }}>
              {completionPercentage}%
            </Typography>
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
                  variant="body2"
                  type="button"
                  sx={{
                    color: step.completed ? '#4CAF50' : '#4A90E2',
                    fontWeight: step.completed ? 500 : 400
                  }}
                  onClick={() => {
                    const route = `/payroll${step.path}`;
                    router.push(route);
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
  );
};

export default PayrollSetup;
