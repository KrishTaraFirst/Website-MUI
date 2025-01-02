'use client';

import { useState, useEffect } from 'react';

// @mui
import { Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddInvoice from './AddInvoice';
//@project
import { AccountList, NewAccount } from '@/sections/account';

// @assets
import { IconPlus } from '@tabler/icons-react';
import InvoiceList from './InvoiceList';
import Factory from '@/utils/Factory';
/***************************  ACCOUNT  ***************************/

export default function InvoicingPage({ isValid, setIsValid }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [businessDetails, setBusinessDetails] = useState({});
  const [customers, setCustomers] = useState([]);
  const [invoicesList, setInvoicesList] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  const navigateToProfileSetting = () => {
    setIsValid(false);
  };

  // Fetch invoices after businessDetails is fetched
  const getInvoicesList = async () => {
    if (businessDetails?.id) {
      let url = `/invoicing/invoice-retrieve/${businessDetails?.id}`;
      const { res } = await Factory('get', url, {});
      if (res.status_cd === 0) {
        setInvoicesList(res.data.invoices);
      }
    }
  };

  // Fetch business details on page load
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
      if (res) {
        const businessData = { ...res.data, state: 'Telangana' };
        setBusinessDetails(businessData);
      }
    };
    fetchBusinessDetails();
  }, []);

  // Fetch invoices whenever businessDetails changes
  useEffect(() => {
    if (businessDetails?.id) {
      getInvoicesList();
    }
  }, [businessDetails]); // Dependency on businessDetails

  // Fetch customer data initially
  const getCustomersData = async () => {
    const { res } = await Factory('get', '/invoicing/customer_profiles/', {});
    if (res.status_cd === 0) {
      setCustomers(res.data.customer_profiles);
    }
  };

  useEffect(() => {
    getCustomersData();
  }, []);
  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      <Grid size={12}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6">Invoice</Typography>
          <Box>
            <Button variant="outlined" onClick={navigateToProfileSetting} sx={{ mr: 2 }}>
              Invoice Settings
            </Button>
            <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
              New Invoice
            </Button>
          </Box>

          <AddInvoice
            invoicesList={invoicesList}
            businessDetailsData={businessDetails}
            customers={customers}
            open={open}
            onClose={handleClose}
            getInvoicesList={getInvoicesList}
          />
        </Stack>
      </Grid>
      <Grid size={12}>
        <InvoiceList invoices={invoicesList} />
      </Grid>
    </Grid>
  );
}
