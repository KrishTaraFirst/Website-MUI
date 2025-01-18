import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Stack, Grid2, Typography } from '@mui/material';
import DesignationDialog from './DesignationDialog'; // Import the DepartmentDialog
import EmptyTable from '@/components/third-party/table/EmptyTable';
const sampleDepartments = [
  { id: 1, designationName: 'HR', numOfEmployees: 25 },
  { id: 2, designationName: 'IT', numOfEmployees: 40 }
];
function Designations() {
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
  const [departments, setDepartments] = useState(sampleDepartments); // State to store departments data

  // Sample data for the table (example)

  // Open dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Example to simulate adding a department
  const addDepartment = (newDepartment) => {
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
  };

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6">Designations</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ marginBottom: 2 }}>
            Add Designation
          </Button>
          <DesignationDialog
            open={openDialog}
            handleClose={handleCloseDialog}
            handleOpenDialog={handleOpenDialog}
            addDepartment={addDepartment}
          />
        </Stack>
      </Grid2>

      <Grid2 size={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No</TableCell>
                <TableCell>Designation Name</TableCell>
                <TableCell>No of Employees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ height: 300 }}>
                    <EmptyTable msg="No Designations available" />
                  </TableCell>
                </TableRow>
              ) : (
                departments.map((department, index) => (
                  <TableRow key={department.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{department.designationName}</TableCell>
                    <TableCell>{department.numOfEmployees}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </Grid2>
  );
}

export default Designations;
