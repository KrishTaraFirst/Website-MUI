import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // MUI Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // MUI Delete Icon
import CustomerEditDialog from './CustomerEditDialog'; // Import the dialog component

// Dummy customer data
const dummyCustomers = [
  {
    nameofthe_business: 'ABC Pvt Ltd',
    pan: 'ABC1234XYZ',
    gst_registered: 'Yes',
    gstin: 'GSTIN123456',
    typeof_gst: 'CGST',
    address: '123 Main St',
    addresslane2: 'Suite 101',
    pincode: '123456',
    email: 'contact@abc.com',
    mobile: '9876543210',
    opening_balance: '5000',
    swift_code: 'SWIFT123',
    receivables_date: '2024-12-31'
  },
  {
    nameofthe_business: 'ABC Pvt Ltd',
    pan: 'ABC1234XYZ',
    gst_registered: 'Yes',
    gstin: 'GSTIN123456',
    typeof_gst: 'CGST',
    address: '123 Main St',
    addresslane2: 'Suite 101',
    pincode: '123456',
    email: 'contact@abc.com',
    mobile: '9876543210',
    opening_balance: '5000',
    swift_code: 'SWIFT123',
    receivables_date: '2024-12-31'
  },
  {
    nameofthe_business: 'ABC Pvt Ltd',
    pan: 'ABC1234XYZ',
    gst_registered: 'Yes',
    gstin: 'GSTIN123456',
    typeof_gst: 'CGST',
    address: '123 Main St',
    addresslane2: 'Suite 101',
    pincode: '123456',
    email: 'contact@abc.com',
    mobile: '9876543210',
    opening_balance: '5000',
    swift_code: 'SWIFT123',
    receivables_date: '2024-12-31'
  },
  {
    nameofthe_business: 'XYZ Inc',
    pan: 'XYZ9876ABC',
    gst_registered: 'No',
    gstin: '',
    typeof_gst: 'IGST',
    address: '456 Second St',
    addresslane2: 'Building A',
    pincode: '654321',
    email: 'info@xyz.com',
    mobile: '9123456789',
    opening_balance: '3000',
    swift_code: 'SWIFT456',
    receivables_date: '2025-01-15'
  }
];

const CustomerList = () => {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Store the selected customer for editing
  const [openDialog, setOpenDialog] = useState(false); // Control the dialog visibility

  const handleEdit = (customerIndex) => {
    setSelectedCustomer(customers[customerIndex]);
    setOpenDialog(true); // Open dialog when Edit button is clicked
  };

  const handleDelete = (customerIndex) => {
    const updatedCustomers = customers.filter((_, index) => index !== customerIndex);
    setCustomers(updatedCustomers);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) => (customer === selectedCustomer ? updatedCustomer : customer));
    setCustomers(updatedCustomers);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>PAN</TableCell>
              <TableCell>GSTIN</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Receivables</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.nameofthe_business}</TableCell>
                <TableCell>{customer.pan}</TableCell>
                <TableCell>{customer.gstin}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.mobile}</TableCell>
                <TableCell>{customer.receivables_date}</TableCell>
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

      <CustomerEditDialog open={openDialog} handleClose={handleCloseDialog} customer={selectedCustomer} handleSave={handleSave} />
    </>
  );
};

export default CustomerList;
