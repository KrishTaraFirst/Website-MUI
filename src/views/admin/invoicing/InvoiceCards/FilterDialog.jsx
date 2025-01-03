'use client';

// @mui
import Typography from '@mui/material/Typography';

import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';

//react
import { useState, useEffect } from 'react';

import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  InputLabel,
  TextField,
  Grid2,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';

export default function FilterDialog({ filterDialog, setFilterDialog }) {
  const handleSubmit = async () => {
    // let url = `/invoicing/invoices/${business_id}`;
    // const { res } = await Factory('get', url, {});
    // if (res.status_cd === 1) {
    //   showSnackbar(res.data.message, 'error');
    // } else {
    //   showSnackbar('Invoice Deleted Successfully', 'success');
    // }
  };
  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setType('edit');
    handleOpen();
  };

  useEffect(() => {}, []);

  return (
    <Dialog
      open={filterDialog}
      onClose={() => {
        setFilterDialog(false);
      }}
      disableRestoreFocus
      aria-labelledby="block-dialog-title"
      aria-describedby="block-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="block-dialog-title">{'Choose any filter'}</DialogTitle>
      <DialogContent dividers>
        <Grid2 container>
          <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField
              name={'Invoice no'}
              fullWidth
              value={'12345'}
              sx={{ p: 1.5 }}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <TextField
              name={'Invoice no'}
              fullWidth
              sx={{ p: 1.5 }}
              value={'12345'}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <TextField
              name={'Invoice no'}
              fullWidth
              sx={{ p: 1.5 }}
              value={'12345'}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <TextField
              name={'Invoice no'}
              sx={{ p: 1.5 }}
              fullWidth
              value={'12345'}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField
              name={'Invoice no'}
              fullWidth
              sx={{ p: 1.5 }}
              value={'12345'}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <TextField
              name={'Invoice no'}
              fullWidth
              sx={{ p: 1.5 }}
              value={'12345'}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <TextField
              name={'Invoice no5'}
              fullWidth
              sx={{ p: 1.5 }}
              value={'12345'}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setFilterDialog(false);
          }}
          autoFocus
        >
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
