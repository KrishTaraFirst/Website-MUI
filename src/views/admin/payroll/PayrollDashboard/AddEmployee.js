'use client';
import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, Stack } from '@mui/material';
import BasicDetails from './BasicDetails';
import SalaryDetails from './SalaryDetails';
import PersonalDetails from './PersonalDetails';
import PaymentInformation from './PaymentInformation';
import MainCard from '@/components/MainCard';
import HomeCard from '@/components/cards/HomeCard';
import { useSearchParams } from 'next/navigation';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';

const StepperComponent = ({ employeeMasterData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false); // State for loader

  const steps = ['Basic Details', 'Salary Details', 'Personal Details', 'Payment Information'];
  const [payrollid, setPayrollId] = useState(null);
  const searchParams = useSearchParams();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);
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
        return <BasicDetails employeeMasterData={employeeMasterData} />;
      case 1:
        return <SalaryDetails employeeMasterData={employeeMasterData} />;
      case 2:
        return <PersonalDetails employeeMasterData={employeeMasterData} />;
      case 3:
        return <PaymentInformation employeeMasterData={employeeMasterData} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <HomeCard title="Employee Master Data" tagline="Create and manage Deatils.">
        <MainCard>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box>
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
        </MainCard>
      </HomeCard>
    </Box>
  );
};

export default StepperComponent;
