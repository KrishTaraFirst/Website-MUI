'use client';
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import BasicDetails from './BasicDetails';
import SalaryDetails from './SalaryDetails';
import PersonalDetails from './PersonalDetails';
import PaymentInformation from './PaymentInformation';

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Basic Details', 'Salary Details', 'Personal Details', 'Payment Information'];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Conditional content rendering based on the active step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicDetails />;
      case 1:
        return <SalaryDetails />;
      case 2:
        return <PersonalDetails />;
      case 3:
        return <PaymentInformation />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ padding: 2 }}>
        {activeStep === steps.length ? (
          <Box>
            <Typography variant="h6">All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box>
            {/* <Typography variant="h6">{`You are on ${steps[activeStep]}`}</Typography> */}
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleBack} disabled={activeStep === 0}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === steps.length - 1}>
                Next
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StepperComponent;
