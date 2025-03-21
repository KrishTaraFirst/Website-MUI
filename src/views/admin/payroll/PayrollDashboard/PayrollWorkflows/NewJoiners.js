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
import RenderTable from './RenderTable';
function NewJoiners() {
  const headerData = ['Employee', 'Department', 'Designations', 'Joining', 'Total Days', 'Paid Days', 'Actual Gross', 'Actual CTC'];
  return <RenderTable headerData={headerData} />;
}

export default NewJoiners;
