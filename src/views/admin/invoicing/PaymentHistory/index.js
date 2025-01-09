'use client';

import { useState, useEffect } from 'react';
import Factory from '@/utils/Factory';
import { indianCurrency } from '../../../../utils/CurrencyToggle';
import { useSearchParams } from 'next/navigation';
import { Typography, Button, Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

/***************************  ACCOUNT  ***************************/

export default function RecordPayment() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get('id');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const get_Individual_Invoice_Data = async () => {
    const { res } = await Factory('get', `/invoicing/individual-invoice/${invoiceId}/`, {});
    if (res.status_cd === 0) {
      setSelectedInvoice(res.data);
    } else {
      console.log('Failed to fetch details');
    }
  };

  useEffect(() => {
    if (invoiceId) {
      get_Individual_Invoice_Data();
    }
  }, [invoiceId]);

  return (
    <Stack sx={{ gap: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Stack direction="column" sx={{ gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Record of Payments Received
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            Some text tagline regarding Record Payment.
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedInvoice?.customer_invoice_receipts.length > 0 ? (
                selectedInvoice?.customer_invoice_receipts?.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>{customer.date}</TableCell>
                    <TableCell>
                      {indianCurrency}&nbsp;
                      {customer.amount}
                    </TableCell>
                    <TableCell>
                      {customer.method === 'cash'
                        ? 'Cash'
                        : customer.method === 'card'
                          ? 'Card'
                          : customer.method === 'bank_transfer'
                            ? 'Bank Transfer'
                            : ''}
                    </TableCell>
                    <TableCell>{customer.comments}</TableCell>
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
      </Box>
    </Stack>
  );
}
