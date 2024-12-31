import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // MUI Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // MUI Delete Icon
import AddInvoice from './AddInvoice'; // Import the AddCustomer component
import Factory from '@/utils/Factory';
const InvoiceList = ({ businessDetailsData, customers, type, setType, invoicesList, getInvoicesList }) => {
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
    setType('edit');
    setOpenDialog(true); // Open the edit dialog
  };

  // Handle the delete action by removing the item from the invoices list
  const handleDelete = async (item) => {
    let url = `/invoicing/invoice-delete/${item.id}/`;
    const { res } = await Factory('delete', url, {});
    getInvoicesList();
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
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item)}>
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

      <AddInvoice
        businessDetailsData={businessDetailsData}
        customers={customers}
        handleOpen={openDialog}
        onClose={handleCloseDialog}
        open={openDialog}
        selctedInvoiceData={selectedItem}
        type={type}
        setType={setType}
      />
    </>
  );
};

export default InvoiceList;
