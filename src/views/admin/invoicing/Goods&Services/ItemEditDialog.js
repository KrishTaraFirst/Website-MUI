import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Box, Divider } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import CustomInput from '@/utils/CustomInput';

const ItemEditDialog = ({ open, handleClose, itemData, handleSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (itemData) {
      setFormData(itemData);
    }
  }, [itemData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Edit Item
          </DialogTitle>

          <IconButton variant="outlined" color="secondary" aria-label="close" onClick={handleClose}>
            <IconX size={20} />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          {formData && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="item_name">Item Name</label>
                </div>
                <CustomInput name="item_name" value={formData.item_name || ''} onChange={handleChange} id="item_name" textColor="#777680" />
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="sku">SKU</label>
                </div>
                <CustomInput name="sku" value={formData.sku || ''} onChange={handleChange} id="sku" textColor="#777680" />
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="units">Units</label>
                </div>
                <CustomInput name="units" value={formData.units || ''} onChange={handleChange} id="units" textColor="#777680" />
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="hsn_sac">HSN/SAC</label>
                </div>
                <CustomInput name="hsn_sac" value={formData.hsn_sac || ''} onChange={handleChange} id="hsn_sac" textColor="#777680" />
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="gst_rate">GST Rate</label>
                </div>
                <CustomInput name="gst_rate" value={formData.gst_rate || ''} onChange={handleChange} id="gst_rate" textColor="#777680" />
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="tax_preference">Tax Preference</label>
                </div>
                <CustomInput
                  name="tax_preference"
                  value={formData.tax_preference || ''}
                  onChange={handleChange}
                  id="tax_preference"
                  textColor="#777680"
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="selling_price">Selling Price</label>
                </div>
                <CustomInput
                  name="selling_price"
                  value={formData.selling_price || ''}
                  onChange={handleChange}
                  id="selling_price"
                  textColor="#777680"
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingBottom: '5px' }}>
                  <label htmlFor="description">Description</label>
                </div>
                <CustomInput
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  id="description"
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

export default ItemEditDialog;
