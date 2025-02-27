import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconPlus } from '@tabler/icons-react';
import AddCustomer from './AddCustomer'; // Import the AddCustomer component
import CustomerList from './CustomerList';
import Factory from '@/utils/Factory';
import { Box } from '@mui/material';
export default function TabTwo({ getCustomersData, customers, businessDetails, onNext, handleBack }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid2 container spacing={2}>
        {' '}
        <Grid2 size={{ xs: 12 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Customers</Typography>
            <Button
              variant="contained"
              startIcon={<IconPlus size={16} />}
              onClick={() => {
                setType('add');
                handleOpen();
              }}
            >
              Add
            </Button>
            <AddCustomer businessDetailsData={businessDetails} open={open} handleClose={handleClose} getCustomersData={getCustomersData} />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <CustomerList
            type={type}
            setType={setType}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            businessDetailsData={businessDetails}
            customersListData={customers}
            getCustomersData={getCustomersData}
          />
        </Grid2>
      </Grid2>
      {/* <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={handleBack} sx={{ mt: 3 }}>
          Back
        </Button>
        <Button variant="contained" onClick={onNext} sx={{ mt: 3 }}>
          Next
        </Button>
      </Box> */}
    </>
  );
}
