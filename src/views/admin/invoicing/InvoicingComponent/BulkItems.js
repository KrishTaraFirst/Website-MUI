import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Typography, TextField, IconButton } from '@mui/material';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { IconX } from '@tabler/icons-react';

const BulkItems = ({ bulkItemsDialogue, setBulkItemsDialogue, itemsList }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemSelect = (event, value) => {
    if (value && !selectedItems.includes(value)) {
      setSelectedItems((prevItems) => [...prevItems, value]);
      setSelectedItem(''); // Reset autocomplete after selection
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const handleAddItems = () => {
    // Logic to handle added items, e.g., submit or save selectedItems
    console.log('Items Added:', selectedItems);
    setBulkItemsDialogue(false); // Close the dialog after adding
  };

  return (
    <Dialog open={bulkItemsDialogue} aria-labelledby="form-dialog-title" fullWidth maxWidth="lg">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Add Items in Bulk
          </DialogTitle>
          <IconButton
            variant="outlined"
            color="secondary"
            aria-label="close"
            onClick={() => {
              setBulkItemsDialogue(false);
            }}
          >
            <IconX size={20} />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Item Details
            </Typography>
          </Box>
          <Grid container spacing={5}>
            {/* Left side: CustomAutocomplete */}
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                size="small"
                options={itemsList.map((item) => item.name)}
                value={selectedItem}
                onChange={handleItemSelect}
                renderInput={(params) => <TextField {...params} />}
                style={{ minWidth: 250, maxWidth: 250 }}
              />
            </Grid>

            {/* Divider between the two sections */}
            <Grid item xs={12} sm={6}>
              <Divider orientation="vertical" flexItem />
            </Grid>

            {/* Right side: Display selected items */}
            <Grid item xs={12} sm={6}>
              {selectedItems.length === 0 ? (
                <Typography>No items selected</Typography>
              ) : (
                selectedItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1
                    }}
                  >
                    <Typography>{item}</Typography>
                    <IconButton color="secondary" onClick={() => handleRemoveItem(item)} size="small">
                      <IconX size={16} />
                    </IconButton>
                  </Box>
                ))
              )}
            </Grid>
          </Grid>

          {/* Add Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3, gap: 5 }}>
            <Button variant="contained" onClick={handleAddItems}>
              Add
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default BulkItems;
