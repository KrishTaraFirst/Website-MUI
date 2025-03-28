import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Stack, Pagination } from '@mui/material';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import MainCard from '@/components/MainCard';

const TABLE_HEADERS = [
  'Employee',
  'Gross',
  'Paid Days',
  'Earned Gross',
  'Benefits',
  'Deductions',
  'Taxes',
  'Recovery',
  'Reimbursement',
  'NP'
];

export default function PayrollSummary({ payrollSummaryData = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(payrollSummaryData.length / rowsPerPage);
  const paginatedData = payrollSummaryData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <MainCard>
      <Stack direction="column" spacing={2}>
        <TableContainer component={Paper}>
          <Table size="large">
            <TableHead>
              <TableRow>
                {TABLE_HEADERS.map((header) => (
                  <TableCell key={header} sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                    {header}
                  </TableCell>
                ))}
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
                  <TableRow key={item.employee || index}>
                    <TableCell>{item.employee}</TableCell>
                    <TableCell>{item.gross_salary}</TableCell>
                    <TableCell>{item.paid_days}</TableCell>
                    <TableCell>{item.earned_salary}</TableCell>
                    <TableCell>{item.benefits_total}</TableCell>
                    <TableCell>{item.deductions['Employee Deductions']}</TableCell>
                    <TableCell>{item.deductions['Taxes']}</TableCell>
                    <TableCell>{item.recovery}</TableCell>
                    <TableCell>{item.reimbursement}</TableCell>
                    <TableCell>{item.net_salary}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {payrollSummaryData.length > 0 && (
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ px: { xs: 0.5, sm: 2.5 }, py: 1.5 }}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
          </Stack>
        )}
      </Stack>
    </MainCard>
  );
}
