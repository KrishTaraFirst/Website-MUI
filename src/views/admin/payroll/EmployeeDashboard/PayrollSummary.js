import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Stack,
  Grid2,
  Pagination,
  Box
} from '@mui/material';
const paginatedData = [
  {
    employee: 'John Doe',
    gross: 50000,
    paidDays: 22,
    earnedGross: 45000,
    benefits: 5000,
    deductions: 3000,
    taxes: 7000,
    recovery: 1000,
    reimbursement: 2000,
    netPay: 38000
  },
  {
    employee: 'Jane Smith',
    gross: 60000,
    paidDays: 20,
    earnedGross: 54000,
    benefits: 6000,
    deductions: 4000,
    taxes: 8000,
    recovery: 2000,
    reimbursement: 2500,
    netPay: 40500
  },
  {
    employee: 'David Johnson',
    gross: 55000,
    paidDays: 23,
    earnedGross: 51000,
    benefits: 5500,
    deductions: 3500,
    taxes: 7500,
    recovery: 1500,
    reimbursement: 1800,
    netPay: 39800
  },
  {
    employee: 'Emily Brown',
    gross: 52000,
    paidDays: 21,
    earnedGross: 48000,
    benefits: 5200,
    deductions: 3200,
    taxes: 7200,
    recovery: 1200,
    reimbursement: 2100,
    netPay: 38800
  },
  {
    employee: 'Michael Wilson',
    gross: 58000,
    paidDays: 24,
    earnedGross: 56000,
    benefits: 5800,
    deductions: 4000,
    taxes: 8500,
    recovery: 1800,
    reimbursement: 2600,
    netPay: 43300
  }
];

export default function PayrollSummary() {
  return (
    <TableContainer component={Paper}>
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Employee</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Gross</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Paid Days</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Earned Gross</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Benefits</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Deductions</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Taxes</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Recovery</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Reimbursement</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>NP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} sx={{ height: 300 }}>
                <EmptyTable msg="No work locations available" />
              </TableCell>
            </TableRow>
          ) : (
            paginatedData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.employee}</TableCell>
                <TableCell>{item.gross}</TableCell>
                <TableCell>{item.paidDays}</TableCell>
                <TableCell>{item.earnedGross}</TableCell>
                <TableCell>{item.benefits}</TableCell>
                <TableCell>{item.deductions}</TableCell>
                <TableCell>{item.taxes}</TableCell>
                <TableCell>{item.recovery}</TableCell>
                <TableCell>{item.reimbursement}</TableCell>
                <TableCell>{item.netPay}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
