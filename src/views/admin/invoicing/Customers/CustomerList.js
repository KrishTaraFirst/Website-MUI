import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Factory from '@/utils/Factory';
import AddCustomer from './AddCustomer';
import ActionCell from '../../../../utils/ActionCell';
import { useSnackbar } from '@/components/CustomSnackbar';

const CustomerList = ({ type, open, handleOpen, handleClose, setType, businessDetailsData, getCustomersData, customersListData }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setCustomers(customersListData);
  }, [customersListData]);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setType('edit');
    handleOpen();
  };

  const handleDelete = async (customer) => {
    let url = `/invoicing/customer_profiles/delete/${customer.id}`;
    const { res } = await Factory('delete', url, {});
    if (res.status_cd === 1) {
      showSnackbar(res.data.message, 'error');
    } else {
      showSnackbar('Data Deleted Successfully', 'success');
      getCustomersData();
    }
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
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.pan_number}</TableCell>
                  <TableCell>{customer.gstin ? customer.gstin : 'NA'}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.mobile_number}</TableCell>
                  <TableCell>{customer.opening_balance}</TableCell>
                  <TableCell>
                    {/* ActionCell to handle actions */}
                    <ActionCell
                      row={customer} // Pass the customer row data
                      onEdit={() => handleEdit(customer)} // Edit handler
                      onDelete={() => handleDelete(customer)} // Delete handler
                      open={open}
                      onClose={handleClose}
                      deleteDialogData={{
                        title: 'Delete Customer',
                        heading: 'Are you sure you want to delete this customer?',
                        description: `This action will remove ${customer.name} from the list.`,
                        successMessage: 'Customer has been deleted.'
                      }}
                    />
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

      <AddCustomer
        type={type}
        setType={setType}
        businessDetailsData={businessDetailsData}
        handleClose={handleClose}
        open={open}
        getCustomersData={getCustomersData}
        selectedCustomer={selectedCustomer}
      />
    </>
  );
};

export default CustomerList;
