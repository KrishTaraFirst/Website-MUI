import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // MUI Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // MUI Delete Icon
import InvoiceEditDialog from './InvoiceEditDialog'; // Import the dialog component
import AddInvoice from './AddInvoice'; // Import the AddCustomer component

const InvoiceList = ({ businessDetailsData, customers, open, onClose, invoicesList, handleOpen }) => {
  const [invoices, setInvoices] = useState([]); // Local state for storing invoices
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing
  const [openDialog, setOpenDialog] = useState(false); // Control dialog visibility

  // Update the invoices state whenever the invoicesList prop changes
  useEffect(() => {
    setInvoices(invoicesList);
  }, [invoicesList]);

  // Handle the edit action by opening the dialog with the selected item
  const handleEdit = (item) => {
    setSelectedItem(item);
    handleOpen(); // Open the edit dialog
  };

  // Handle the delete action by removing the item from the invoices list
  const handleDelete = (itemIndex) => {
    const updatedInvoices = invoices.filter((_, index) => index !== itemIndex);
    setInvoices(updatedInvoices); // Update the invoices list after deletion
  };

  // Close the edit dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Save the edited item and update the invoices list
  const handleSave = (updatedItem) => {
    const updatedInvoices = invoices.map((item) => (item === selectedItem ? updatedItem : item));
    setInvoices(updatedInvoices);
    setOpenDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.length > 0 ? (
              invoices.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.invoice_number}</TableCell>
                  <TableCell>{item.invoice_date}</TableCell>
                  <TableCell>{item.customer}</TableCell>
                  <TableCell>{item.total_amount}</TableCell>
                  <TableCell>{item.payment_status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item)} title="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)} title="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No invoices available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <InvoiceEditDialog open={openDialog} handleClose={handleCloseDialog} item={selectedItem} handleSave={handleSave} /> */}
      <AddInvoice
        type="put"
        businessDetailsData={businessDetailsData}
        customers={customers}
        handleOpen={handleOpen}
        onClose={onClose}
        open={open}
        selctedInvoiceData={selectedItem}
      />
    </>
  );
};

export default InvoiceList;
