import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
export default function RenderTable({ headerData }) {
  return (
    <TableContainer component={Paper}>
      <Table size="large">
        <TableHead>
          <TableRow key="header-row">
            {headerData.map((item, index) => (
              <TableCell key={index} sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
}
