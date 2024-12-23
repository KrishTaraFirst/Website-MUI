import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconPlus } from '@tabler/icons-react';
import AddInvoice from './AddInvoice'; // Import the AddCustomer component
import InvoiceList from './InvoiceList';

export default function TabFour({ onNext }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        {' '}
        <Grid item xs={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Invoices List</Typography>
            <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
              Add Invoice
            </Button>
            <AddInvoice open={open} onClose={handleClose} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <InvoiceList />
        </Grid>
      </Grid>
    </Stack>
  );
}
