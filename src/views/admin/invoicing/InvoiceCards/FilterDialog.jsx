'use client';

// @mui
import Typography from '@mui/material/Typography';

import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useForm } from 'react-hook-form';

//react
import { useState, useEffect } from 'react';

import {
  Autocomplete,
  Stack,
  TextField,
  Button,
  Grid2,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  OutlinedInput
} from '@mui/material';

export default function FilterDialog({ financialYear, businessData, filterDialog, setFilterDialog, setInvoices, setTitle }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: {} });
  const { showSnackbar } = useSnackbar();

  // const handleSubmit = async () => {
  // let url = `/invoicing/invoices/${business_id}`;
  // const { res } = await Factory('get', url, {});
  // if (res.status_cd === 1) {
  //   showSnackbar(res.data.message, 'error');
  // } else {
  //   showSnackbar('Invoice Deleted Successfully', 'success');
  // }
  // };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setType('edit');
    handleOpen();
  };

  useEffect(() => {}, []);

  const onSubmit = async (formData) => {
    let url = `/invoicing/filter-invoices?invoicing_profile_id=${businessData.id}&financial_year=${financialYear}&payment_status=${formData.status}&due_date=${formData.dueDate}&invoice_date=${formData.date}&invoice_number=${formData.invoiceNumber}&customer=${formData.customer}&total_amount=${formData.amount}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      if (res.data.length === 0) showSnackbar('No record found with this combination', 'warning');
      setTitle('Over All Financial Year Invoices');
      setInvoices(res.data);
      setFilterDialog(false);
    }
    reset({ status: '' });
    setValue('status', '');
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
              <Stack sx={{ gap: 2.5 }}>
                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Date
                  </Typography>
                  <OutlinedInput
                    {...register('date')}
                    placeholder="DD/MM/YYYY"
                    type="date"
                    slotProps={{ input: { 'aria-label': 'Date' } }}
                    error={errors.date && Boolean(errors.date)}
                    // sx={{ ...inputSx }}
                  />
                </Stack>
                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Invoice Number
                  </Typography>
                  <OutlinedInput
                    {...register('invoiceNumber')}
                    placeholder=""
                    slotProps={{ input: { 'aria-label': 'Invoice Number' } }}
                    error={errors.invoiceNumber && Boolean(errors.invoiceNumber)}
                    // sx={{ ...inputSx }}
                  />
                </Stack>

                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Customer
                  </Typography>
                  <OutlinedInput
                    {...register('customer')}
                    placeholder="Customer Name"
                    slotProps={{ input: { 'aria-label': 'Customer' } }}
                    error={errors.customer && Boolean(errors.customer)}
                    // sx={{ ...inputSx }}
                  />
                </Stack>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
              <Stack sx={{ gap: 2.5 }}>
                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Amount
                  </Typography>
                  <OutlinedInput
                    {...register('amount')}
                    placeholder="₹"
                    slotProps={{ input: { 'aria-label': 'Amount' } }}
                    error={errors.amount && Boolean(errors.amount)}
                    // sx={{ ...inputSx }}
                  />
                </Stack>

                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Status
                  </Typography>
                  <Autocomplete
                    options={['Pending', 'Paid']}
                    onChange={(e, val) => {
                      setValue('status', val);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} slotProps={{ htmlInput: { ...params.inputProps, 'aria-label': 'Status' } }} />
                    )}
                    placeholder="Select status"
                    error={errors.status && Boolean(errors.status)}
                  />
                  {/* <OutlinedInput
                    {...register('status')}
                    placeholder=""
                    slotProps={{ input: { 'aria-label': 'Status' } }}
                    error={errors.status && Boolean(errors.status)}
                    // sx={{ ...inputSx }}
                  /> */}
                </Stack>

                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Due Date
                  </Typography>
                  <OutlinedInput
                    {...register('dueDate')}
                    placeholder="DD/MM/YYYY"
                    type="date"
                    slotProps={{ input: { 'aria-label': 'Due Date' } }}
                    error={errors.dueDate && Boolean(errors.dueDate)}
                    // sx={{ ...inputSx }}
                  />
                </Stack>
              </Stack>
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
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
