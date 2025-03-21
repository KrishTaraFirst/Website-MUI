import React from 'react';
import RenderTable from './RenderTable';
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
export default function Exits() {
  const headerData = [
    'Employee Name',
    'Department',
    'Designations',
    'Exit Date',
    'Total Days',
    'Paid Days',
    'Settlement Date',
    'Actual CTC',
    'F & F'
  ];
  return <RenderTable headerData={headerData} />;
}
