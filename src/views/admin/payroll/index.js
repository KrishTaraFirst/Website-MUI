'use client';
import React, { useState } from 'react';
import Designations from './payrollComponents/Designations';
import Departments from './payrollComponents/Departments';
import Organizationdetails from './payrollComponents/Organizationdetails';
import SalaryComponents from './payrollComponents/SalaryComponents';
import SalaryTemplate from './payrollComponents/SalaryTemplate';
import StatuitoryComponents from './payrollComponents/StatuitoryComponents';
import Worklocation from './payrollComponents/Worklocation';

import { Stepper, Step, StepLabel, StepButton, Button, Typography, Box, Stack } from '@mui/material';

const StepContent = ({ step }) => {
  switch (step) {
    case 0:
      return <Organizationdetails />;
    case 1:
      return <Worklocation />;
    case 2:
      return <Departments />;
    case 3:
      return <Designations />;
    case 4:
      return <StatuitoryComponents />;
    case 5:
      return <SalaryComponents />;
    case 6:
      return <SalaryTemplate />;
    default:
      return null;
  }
};

const MyStepper = () => {
  const steps = [
    'Organization details',
    'Set up work location',
    'Set up departments',
    'Set up designations',
    'Set up statutory components',
    'Set up salary components'
    // 'Set up salary template'
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);

    // Mark the current step as completed
    setCompletedSteps((prev) => new Set(prev).add(activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompletedSteps(new Set());
  };

  return (
    <Stack sx={{ gap: 3, width: '100%' }}>
      {/* Header Section */}
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

      {/* Stepper Section */}
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel nonLinear>
          {steps.map((label, index) => (
            <Step key={label} completed={completedSteps.has(index)}>
              <StepButton onClick={() => setActiveStep(index)}>
                <StepLabel>{label}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}
        <Box sx={{ mt: 2 }}>
          <StepContent step={activeStep} />
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button color="primary" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button color="primary" onClick={handleNext} disabled={activeStep === steps.length - 1}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>

        {/* Completion Message */}
        {activeStep === steps.length && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default MyStepper;
