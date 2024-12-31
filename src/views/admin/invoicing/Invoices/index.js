import React, { useEffect, useState } from 'react';
import { Button, Box, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconPlus } from '@tabler/icons-react';
import AddInvoice from './AddInvoice'; // Import the AddCustomer component
import InvoiceList from './InvoiceList';
import Factory from '@/utils/Factory';
import InvoiceNumberFormatDialogue from './InvoiceNumberFormat';

export default function TabFour({ getCustomersData, customers, businessDetails, onNext }) {
  const [open, setOpen] = useState(false);
  const [invoicesList, setInvoicesList] = useState([]);
  const [invoiceNumberFormatDialogue, setInvoiceNumberFormatDialogue] = useState(false);
  const [type, setType] = useState('');
  const handleOpen = () => {
    setType('add');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const getInvoicesList = async () => {
    let url = `/invoicing/invoice-retrieve/${businessDetails.id}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      setInvoicesList(res.data.invoices);
    }
  };
  useEffect(() => {
    getInvoicesList();
  }, []);
  return (
    <>
      {/* <Grid container spacing={2}>
        {' '}
        <Grid item xs={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Invoices List</Typography>

            <Box>
              <Button
                variant="contained"
                startIcon={<IconPlus size={16} />}
                onClick={() => setInvoiceNumberFormatDialogue(true)}
                sx={{ mr: 2 }}
              >
                Invoice Number Format
              </Button>

              <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
                Add Invoice
              </Button>
              <AddInvoice
                invoicesList={invoicesList}
                type="add"
                businessDetailsData={businessDetails}
                customers={customers}
                open={open}
                onClose={handleClose}
                getInvoicesList={getInvoicesList}
              />
              <InvoiceNumberFormatDialogue
                businessDetailsData={businessDetails}
                invoiceNumberFormatDialogue={invoiceNumberFormatDialogue}
                setInvoiceNumberFormatDialogue={setInvoiceNumberFormatDialogue}
              />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <InvoiceList
            invoicesList={invoicesList}
            businessDetailsData={businessDetails}
            customers={customers}
            handleOpen={handleOpen}
            open={open}
            onClose={handleClose}
            getInvoicesList={getInvoicesList}
            type={type}
            setType={setType}
          />
        </Grid>
      </Grid> */}
      <InvoiceNumberFormatDialogue businessDetailsData={businessDetails} setInvoiceNumberFormatDialogue={setInvoiceNumberFormatDialogue} />
    </>
  );
}
