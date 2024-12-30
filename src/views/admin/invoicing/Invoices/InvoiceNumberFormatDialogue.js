import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Box, Divider } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import CustomInput from '@/utils/CustomInput';
import Factory from '@/utils/Factory';
const InvoiceNumberFormatDialogue = ({ businessDetailsData, setInvoiceNumberFormatDialogue, invoiceNumberFormatDialogue }) => {
  const [invoiceFormatData, setInvoiceFormatData] = useState({
    startingNumber: '',
    prefix: '',
    suffix: ''
  });
  useEffect(() => {
    if (businessDetailsData.invoice_format) {
      setInvoiceFormatData(businessDetailsData.invoice_format);
    }
  }, [businessDetailsData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInvoiceFormatData({
      ...invoiceFormatData,
      [name]: value
    });
  };
  const handleSubmit = async () => {
    const url = `/invoicing/invoicing-profiles/${businessDetailsData.id}/update/`;

    const postData = {
      invoice_format: invoiceFormatData
    };

    const { res } = await Factory('put', url, postData);
    if (res) {
      setInvoiceNumberFormatDialogue(false);
    }
  };

  return (
    <Dialog open={invoiceNumberFormatDialogue} onClose={() => setInvoiceNumberFormatDialogue(false)} maxWidth="md">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Invoice Number Format
          </DialogTitle>

          <IconButton variant="outlined" color="secondary" aria-label="close" onClick={() => setInvoiceNumberFormatDialogue(false)}>
            <IconX size={20} />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="suffix" style={{ marginRight: '8px' }}>
                  Invoice Starting Number:
                </label>
                <CustomInput
                  name="startingNumber"
                  value={invoiceFormatData.startingNumber}
                  onChange={handleChange}
                  textColor="#777680"
                  sx={{ flex: 1 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <h2>Custom Settings:</h2>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="prefix" style={{ marginRight: '8px' }}>
                  Prefix:
                </label>
                <CustomInput name="prefix" value={invoiceFormatData.prefix} onChange={handleChange} textColor="#777680" sx={{ flex: 1 }} />
              </Box>
            </Grid>{' '}
            <br></br>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="suffix" style={{ marginRight: '8px' }}>
                  Suffix:
                </label>
                <CustomInput name="suffix" value={invoiceFormatData.suffix} onChange={handleChange} textColor="#777680" sx={{ flex: 1 }} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', padding: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Update
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default InvoiceNumberFormatDialogue;
