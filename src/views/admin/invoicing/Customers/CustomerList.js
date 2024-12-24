import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomerEditDialog from './CustomerEditDialog';
import { ConstructionOutlined } from '@mui/icons-material';
import Factory from '@/utils/Factory';
const CustomerList = ({ getCustomersData, customersListData }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setCustomers(customersListData);
  }, [customersListData]);

  const handleEdit = (customerIndex) => {
    setSelectedCustomer(customers[customerIndex]);
    setOpenDialog(true);
  };

  const handleDelete = async (customer) => {
    let url = `/invoicing/customer_profiles/delete/${customer.id}`;
    const { res } = await Factory('delete', url, {});
    console.log(res);
    getCustomersData();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const handleSave = (updatedCustomer) => {
  //   const updatedCustomers = customers.map((customer) => (customer === selectedCustomer ? updatedCustomer : customer));
  //   setCustomers(updatedCustomers);
  // };

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
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.pan_number}</TableCell>
                  <TableCell>{customer.gstin}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.mobile_number}</TableCell>
                  <TableCell>{customer.receivables_date}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(customer)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No customers available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomerEditDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        customer={selectedCustomer}
        // handleSave={handleSave}
        getCustomersData={getCustomersData}
      />
    </>
  );
};

export default CustomerList;
