import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // MUI Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // MUI Delete Icon
import InvoiceEditDialog from './InvoiceEditDialog'; // Import the dialog component

// Corrected mock data
const mockData = [
  {
    type: 'Goods',
    item_name: 'Item 1',
    sku: 'SKU123',
    units: 'kg',
    hsn_sac: 'HSN123',
    gst_rate: '18%',
    tax_preference: 'GST',
    selling_price: '100',
    description: 'Description of Item 1'
  },
  {
    type: 'Goods',
    item_name: 'Item 2',
    sku: 'SKU124',
    units: 'pcs',
    hsn_sac: 'HSN124',
    gst_rate: '12%',
    tax_preference: 'GST',
    selling_price: '150',
    description: 'Description of Item 2'
  },
  {
    type: 'Services',
    item_name: 'Service 1',
    sku: 'SKU125',
    units: 'hrs',
    hsn_sac: 'HSN125',
    gst_rate: '5%',
    tax_preference: 'Service Tax',
    selling_price: '200',
    description: 'Description of Service 1'
  }
];

const InvoiceList = () => {
  const [itemsList, setItemsList] = useState(mockData); // Using correct mock data
  const [selectedItem, setSelectedItem] = useState(null); // Store the selected item for editing
  const [openDialog, setOpenDialog] = useState(false); // Control the dialog visibility

  const handleEdit = (itemIndex) => {
    setSelectedItem(itemsList[itemIndex]); // Get the item at the index
    setOpenDialog(true); // Open dialog when Edit button is clicked
  };

  const handleDelete = (itemIndex) => {
    const updatedItems = itemsList.filter((_, index) => index !== itemIndex); // Delete item at the given index
    setItemsList(updatedItems); // Update the list after deletion
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleSave = (updatedItem) => {
    const updatedItems = itemsList.map((item) => (item === selectedItem ? updatedItem : item)); // Update the specific item with the new data
    setItemsList(updatedItems); // Update the items list
    setOpenDialog(false); // Close the dialog after saving
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>GST%</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.gst_rate}</TableCell>
                <TableCell>{item.selling_price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <InvoiceEditDialog open={openDialog} handleClose={handleCloseDialog} item={selectedItem} handleSave={handleSave} />
    </>
  );
};

export default InvoiceList;
