import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconPlus } from '@tabler/icons-react';
import AddCustomer from './AddCustomer'; // Import the AddCustomer component
import CustomerList from './CustomerList';
import Factory from '@/utils/Factory';
export default function TabTwo({ getCustomersData, customers, businessDetails, onNext }) {
  const [open, setOpen] = useState(false);
  // const [customers, setCustomers] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const getCustomersData = async () => {
  //   let url = '/invoicing/customer_profiles/';
  //   const { res } = await Factory('get', url, {});
  //   if (res.status_cd === 0) {
  //     setCustomers(res.data.customer_profiles);
  //   }
  // };

  // useEffect(() => {
  //   getCustomersData();
  // }, []);
  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        {' '}
        <Grid item xs={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Customers</Typography>
            <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
              Add Customer
            </Button>
            <AddCustomer businessDetailsData={businessDetails} open={open} onClose={handleClose} getCustomersData={getCustomersData} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <CustomerList customersListData={customers} getCustomersData={getCustomersData} />
        </Grid>
      </Grid>
    </Stack>
  );
}
