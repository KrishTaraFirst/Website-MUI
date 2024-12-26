// src/components/CustomerEditDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Box, Divider } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import CustomInput from '@/utils/CustomInput';
import { indian_States_And_UTs } from '@/utils/indian_States_And_UT';
import Factory from '@/utils/Factory';
const CustomerEditDialog = ({ getCustomersData, open, handleClose, customer, handleSave }) => {
  const [formData, setFormData] = useState({}); // Initialize as empty object by default

  // Effect to set form data when customer prop changes
  useEffect(() => {
    if (customer) {
      setFormData(customer); // Only update formData when customer is valid
    }
  }, [customer]);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    let url = `/invoicing/invoicing/customer_profiles/update/${formData.id}/`;
    const { res } = await Factory('put', url, formData);
    if (res.status_cd === 0) {
      getCustomersData();
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Edit Customer
          </DialogTitle>

          <IconButton variant="outlined" color="secondary" aria-label="close" onClick={handleClose}>
            <IconX size={20} />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          {formData && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="name">Name of Business</label>
                </div>
                <CustomInput name="name" value={formData.name || ''} onChange={handleChange} id="name" textColor="#777680" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="pan_number">PAN</label>
                </div>
                <CustomInput
                  name="pan_number"
                  value={formData.pan_number || ''}
                  onChange={handleChange}
                  id="pan_number"
                  textColor="#777680"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="address_line1">Address Line 1</label>
                </div>
                <CustomInput
                  name="address_line1"
                  value={formData.address_line1 || ''}
                  onChange={handleChange}
                  id="address_line1"
                  textColor="#777680"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="state">State</label>
                </div>
                <CustomAutocomplete
                  value={formData.state || ''}
                  name="state"
                  onChange={handleChange}
                  options={indian_States_And_UTs}
                  id="state"
                  textColor="#777680"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="postal_code">Postal Code</label>
                </div>
                <CustomInput
                  name="postal_code"
                  value={formData.postal_code || ''}
                  onChange={handleChange}
                  id="postal_code"
                  textColor="#777680"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="gstin">GSTIN</label>
                </div>
                <CustomInput name="gstin" value={formData.gstin || ''} onChange={handleChange} id="gstin" textColor="#777680" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="email">Email</label>
                </div>
                <CustomInput name="email" value={formData.email || ''} onChange={handleChange} id="email" textColor="#777680" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="mobile_number">Mobile</label>
                </div>
                <CustomInput
                  name="mobile_number"
                  value={formData.mobile_number || ''}
                  onChange={handleChange}
                  id="mobile_number"
                  textColor="#777680"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="opening_balance">Opening Balance</label>
                </div>
                <CustomInput
                  name="opening_balance"
                  value={formData.opening_balance || ''}
                  onChange={handleChange}
                  id="opening_balance"
                  textColor="#777680"
                />
              </Grid>
            </Grid>
          )}
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

export default CustomerEditDialog;
