import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';

const InvoiceList = ({}) => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { showSnackbar } = useSnackbar();

  // Update invoice list when `invoicesListData` prop changes
  //   useEffect(() => {
  //     setInvoices(invoicesListData);
  //   }, [invoicesListData]);

  // Handle edit action
  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setType('edit');
    handleOpen();
  };

  // Handle delete action
  const handleDelete = async (invoice) => {
    let url = `/invoicing/invoices/delete/${invoice.id}`;
    const { res } = await Factory('delete', url, {});
    if (res.status_cd === 1) {
      showSnackbar(res.data.message, 'error');
    } else {
      showSnackbar('Invoice Deleted Successfully', 'success');
      getInvoicesData();
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Balance Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.length > 0 ? (
            invoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.customer_name}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.due_date}</TableCell>
                <TableCell>{invoice.balance_due}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No invoices available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceList;
