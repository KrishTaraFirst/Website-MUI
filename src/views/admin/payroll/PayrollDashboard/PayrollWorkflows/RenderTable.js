import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Stack, Pagination } from '@mui/material';
import Loader from '@/components/PageLoader';
import EmptyTable from '@/components/third-party/table/EmptyTable';

export default function RenderTable({ headerData, tableData = [], loading, body_keys }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  // console.log(paginatedData);
  return (
    <Stack spacing={3}>
      {loading ? (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: 400 }}>
          <Loader />
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table size="large">
            <TableHead>
              <TableRow>
                {headerData.map((item, index) => (
                  <TableCell key={index} sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headerData.length} sx={{ height: 300 }}>
                    <EmptyTable msg="No Data available" />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    {body_keys.map((key, idx) => (
                      <TableCell key={idx}>{item[key] || '—'}</TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tableData.length > 0 && (
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', px: { xs: 0.5, sm: 2.5 }, py: 1.5 }}>
          <Pagination count={Math.ceil(tableData.length / rowsPerPage)} page={currentPage} onChange={handlePageChange} />
        </Stack>
      )}
    </Stack>
  );
}
