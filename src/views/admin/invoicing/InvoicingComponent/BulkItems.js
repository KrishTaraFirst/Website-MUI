import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Box,
  Typography,
  TextField,
  IconButton,
  DialogActions,
  Autocomplete,
  Checkbox,
  Grid
} from '@mui/material';
import { IconX } from '@tabler/icons-react';

const BulkItems = ({ bulkItemsDialogue, setBulkItemsDialogue, itemsList, bulkItemSave }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);

  // Handle item selection in autocomplete
  const handleItemSelect = (event, value) => {
    if (value) {
      // Add the new selected items to the state
      setSelectedItems((prevItems) => [...new Set([...prevItems, ...value])]);
    }
  };
  console.log(selectedItems);
  // Handle item removal from the selected items list
  const handleRemoveItem = (item) => {
    setSelectedItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  // Handle saving added items
  const handleAddItems = () => {
    console.log('Items Added:', selectedItems);
    setBulkItemsDialogue(false); // Close the dialog after adding
    bulkItemSave(items);
  };
  useEffect(() => {
    // Update the 'items' array based on selected items
    const updatedItems = selectedItems
      .map((itemName) => {
        const selectedItem = itemsList.find((i) => i.name === itemName);

        if (selectedItem) {
          const gstRate = selectedItem.gst_rate ? parseFloat(selectedItem.gst_rate) : 0;
          const rate = selectedItem.selling_price || 0; // Get rate from selected item
          const discount = 0; // Assuming no discount, you can replace with dynamic logic if needed
          const quantity = 1; // Default quantity, you can replace with dynamic logic if needed

          // Calculate taxable amount (rate * quantity)
          const taxableAmount = rate * quantity;

          // Calculate amount after discount
          let amount = taxableAmount * (1 - discount / 100);

          // Calculate tax amount based on the taxable amount and GST rate
          const taxAmount = (amount * gstRate) / 100;

          // Total amount (amount after discount + tax amount)
          const totalAmount = amount + taxAmount;

          return {
            item: selectedItem.name,
            quantity: quantity,
            rate: rate,
            discount_type: '%',
            discount: discount,
            amount: amount,
            tax: gstRate,
            taxamount: taxAmount,
            total_amount: totalAmount,
            cgst_amount: taxAmount / 2, // Assuming CGST and SGST are equally split
            sgst_amount: taxAmount / 2,
            igst_amount: 0 // Assuming IGST is not applicable, adjust if needed
          };
        }
        return null;
      })
      .filter((item) => item !== null); // Filter out any null items

    // Update the state with the newly calculated item details
    setItems(updatedItems);
  }, [selectedItems, itemsList]);
  console.log(items);
  return (
    <Dialog open={bulkItemsDialogue} onClose={() => setBulkItemsDialogue(false)} maxWidth="lg">
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Add Items in Bulk
          </Typography>
          <IconButton onClick={() => setBulkItemsDialogue(false)} color="secondary">
            <IconX size={20} />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider sx={{ mb: 2 }} />

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Section 1
              </Typography>
              <Typography variant="body2">
                This is some content inside the dialog. You can add more elements, text, or even forms here.
              </Typography>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={itemsList.map((item) => item.name)}
                getOptionLabel={(option) => option}
                value={selectedItems}
                onChange={(event, newValue) => {
                  console.log('Selected values:', newValue);

                  const selectedItems = itemsList.filter((item) => newValue.includes(item.name));

                  // console.log(selectedItems);
                  handleItemSelect(event, newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Select Items" fullWidth />}
                renderOption={(props, option, { selected }) => {
                  const { key, ...restProps } = props;
                  return (
                    <li key={key} {...restProps}>
                      <Checkbox checked={selected} style={{ marginRight: 8 }} />
                      {option}
                    </li>
                  );
                }}
                sx={{ width: '100%' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Section 2
              </Typography>
              <Typography variant="body2">
                This is some content inside the dialog. You can add more elements, text, or even forms here.
              </Typography>
              {selectedItems.length > 0 ? (
                selectedItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                      padding: '5px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  >
                    <Typography variant="body2">{item}</Typography>
                    <IconButton color="secondary" onClick={() => handleRemoveItem(item)} size="small">
                      <IconX size={16} />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No items selected
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setBulkItemsDialogue(false)}>
          Close
        </Button>
        <Button color="primary" onClick={handleAddItems}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BulkItems;
