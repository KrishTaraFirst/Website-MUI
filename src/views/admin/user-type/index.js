'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, Tabs, Tab, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSnackbar } from '@/components/CustomSnackbar';
import Factory from '@/utils/Factory';
import IndividualForm from './individual';
import BusinessForm from './business';
import FirmForm from './firm';

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
  const router = useRouter(); // Next.js router
  const [selectedUserType, setSelectedUserType] = useState(''); // Selected type for navigation

  const handleTabChange = (event, newValue) => {
    setSelectedIndex(newValue); // Set the selected tab index
  };

  const handleNext = async () => {
    // const url = `/user_management/update-users-info`;
    // const postData = { user_type: user_type[selectedType] };

    // const { res, error } = await Factory('patch', url, postData);
    // console.log(res);
    // if (res.status_cd === 0) {
    setDialogOpen(false);
    //   //   const userDetails = JSON.parse(localStorage.getItem('user'));
    //   //   userDetails.user_type = selectedType;
    //   //   localStorage.setItem('user', JSON.stringify(userDetails));
    //   //   setSelectedUserType(selectedType);
    //   // router.push(`/tara/registrationtype/${selectedType}`);
    // } else {
    //   showSnackbar('Something went wrong', 'error');
    // }
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
  useEffect(() => {
    // const userDetails = JSON.parse(localStorage.getItem('user'));
    // console.log(userDetails);
    // if (!userDetails.user_kyc) {
    //   setSelectedUserType(userDetails.user_type);
    // }
    // userDetails.user_type = selectedType;
    // localStorage.setItem("user", JSON.stringify(userDetails));
  }, [selectedType]);

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
            onClick={() => setSelectedType('business')}
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
            onClick={() => setSelectedType('firm')}
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
            onClick={() => setSelectedType('individual')}
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
      {!dialogOpen && (
        <>
          {selectedType === 'individual' ? (
            <IndividualForm />
          ) : selectedType === 'business' ? (
            <BusinessForm />
          ) : (
            selectedType === 'firm' && <FirmForm />
          )}
        </>
      )}
    </>
  );
};

export default UserType;
