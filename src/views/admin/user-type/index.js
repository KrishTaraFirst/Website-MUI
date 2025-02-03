'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Dialog, Tabs, Tab, Link } from '@mui/material';
import { useSnackbar } from '@/components/CustomSnackbar';
import Factory from '@/utils/Factory';
import IndividualForm from './individual';
import BusinessForm from './business';
import FirmForm from './firm';
import useCurrentUser from '@/hooks/useCurrentUser';

const user_type = {
  individual: 'Individual',
  firm: 'CA',
  business: 'Business',
  sp: 'ServiceProvider'
};

const UserType = () => {
  const { showSnackbar } = useSnackbar();
  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected tab index
  const [selectedType, setSelectedType] = useState(null); // Selected type for navigation
  const [dialogOpen, setDialogOpen] = useState(true); // Dialog open state
  const { userData } = useCurrentUser();
  const handleTabChange = (event, newValue) => {
    setSelectedIndex(newValue); // Set the selected tab index
  };
  useEffect(() => {
    const isUserTypeNull = userData.user_type === null;
    const isUserTypeValidAndKycFalse = userData.user_type !== null && userData.user_kyc === false;

    if (isUserTypeNull) {
      setDialogOpen(true);
    } else if (isUserTypeValidAndKycFalse) {
      setDialogOpen(false);
      setSelectedType(userData.user_type);
    }
  }, [userData, selectedType]);

  const handleNext = async () => {
    const url = `/user_management/update-users-info`;
    const postData = { user_type: user_type[selectedType] };

    const { res, error } = await Factory('patch', url, postData);
    console.log(res);
    if (res.status_cd === 0) {
      setDialogOpen(false);
      const userDetails = JSON.parse(localStorage.getItem('auth-user'));
      userDetails.user_type = selectedType;
      localStorage.setItem('auth-user', JSON.stringify(userDetails));
    } else {
      showSnackbar(res.data.data, 'error');
    }
  };

  const getTabLabel = (label, desc, flag) => {
    return (
      <>
        <Typography sx={{ textAlign: 'center', color: !flag && 'primary' }} variant="h6">
          {label}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: !flag ? 'grey.700' : 'grey.800' }} id="dialog-description">
          {desc}
        </Typography>
      </>
    );
  };
  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '20px',
            padding: '16px'
          }
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <Typography sx={{ m: 1, color: 'grey.800', textAlign: 'center' }} variant="h2">
          Welcome aboard, let's get started!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'grey.700', textAlign: 'center' }} color="disabled" id="dialog-description">
          Pick your account type to proceed.
        </Typography>
        <Tabs
          value={selectedIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{
            p: 0.5,
            position: 'relative',
            transition: 'transform 0.6s ease-in-out',
            '& .MuiTabs-indicator': {
              // display: "none",
              // backgroundColor: "rgb(215 217 219)",
              // borderRadius: 2,
              // borderBottomLeftRadius: "50px 20px",
            },
            backgroundColor: '#d7d9db',
            // borderRadius: 2,
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            display: 'flex',
            flexWrap: 'wrap', // Allow tabs to wrap when screen shrinks
            justifyContent: 'center' // Center-align content
          }}
        >
          <Tab
            label={getTabLabel(
              'Corporate Entity',
              'Streamlining business operations, compliance with financial regulation management',
              selectedIndex === 0
            )}
            sx={{
              textTransform: 'none',
              padding: '30px 20px', // Reduce padding for smaller screens
              minWidth: '150px', // Set a minimum width
              flex: '1 1 auto', // Flex-grow for responsiveness
              // borderRadius: 2,
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              boxShadow: selectedIndex === 0 ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
              backgroundColor: selectedIndex === 0 ? 'white' : '#d7d9db',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onClick={() => setSelectedType('Business')}
          />
          <Tab
            label={getTabLabel(
              'Tax Consultant',
              'Provides tax advice and support to individuals, businesses, and organizations',
              selectedIndex === 1
            )}
            sx={{
              textTransform: 'none',
              padding: '30px 20px', // Reduce padding for smaller screens
              minWidth: '150px', // Set a minimum width
              flex: '1 1 auto', // Flex-grow for responsiveness
              // borderRadius: 2,
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              boxShadow: selectedIndex === 1 ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
              backgroundColor: selectedIndex === 1 ? 'white' : '#d7d9db',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onClick={() => setSelectedType('CA')}
          />
          <Tab
            label={getTabLabel(
              'Individual',
              'Provides tax advice and support to individuals, businesses, and organizations',
              selectedIndex === 2
            )}
            sx={{
              textTransform: 'none',
              padding: '30px 20px', // Reduce padding for smaller screens
              minWidth: '150px', // Set a minimum width
              flex: '1 1 auto', // Flex-grow for responsiveness
              // borderRadius: 2,
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              boxShadow: selectedIndex === 2 ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
              backgroundColor: selectedIndex === 2 ? 'white' : '#d7d9db',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onClick={() => setSelectedType('Individual')}
          />
        </Tabs>
        {/* Next Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            mt: 4
          }}
        >
          <Link
            color="primary"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              // setSelectedType('individual');
              setDialogOpen(false);
              // handleNext();
              router.push(APP_DEFAULT_PATH);
            }}
            sx={{ mr: 2 }}
          >
            Skip
          </Link>

          <Button
            variant="contained"
            color="primary"
            sx={{ px: 5 }}
            onClick={handleNext}
            disabled={!selectedType} // Disable the button if no type is selected
          >
            Next
          </Button>
        </Box>
      </Dialog>
      {!dialogOpen && selectedType !== null && (
        <>
          {selectedType === 'Individual' && <IndividualForm />}
          {selectedType === 'Business' && <BusinessForm />}
          {selectedType === 'CA' && <FirmForm />}
        </>
      )}
    </>
  );
};

export default UserType;
