import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconPlus } from '@tabler/icons-react';
import AddItem from './AddItem'; // Import the AddCustomer component
import ItemList from './ItemList';

export default function TabThree({ onNext }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        {' '}
        <Grid item xs={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Items</Typography>
            <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
              Add Item
            </Button>
            <AddItem open={open} onClose={handleClose} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ItemList />
        </Grid>
      </Grid>
    </Stack>
  );
}
