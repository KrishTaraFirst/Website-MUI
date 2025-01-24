'use client';
import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Stack, Grid2, Typography } from '@mui/material';
import WorkLocationDialog from './WorkLocationDialog'; // Import the WorkLocationDialog
import EmptyTable from '@/components/third-party/table/EmptyTable';
import HomeCard from '@/components/cards/HomeCard';

function Worklocation() {
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility

  // Sample data for the table
  const workLocations = [
    { id: 1, name: 'Headquarters', addressLine1: '123 Main St', addressLine2: 'Suite 100', state: 'Telangana', employees: 100 },
    { id: 2, name: 'Branch Office', addressLine1: '456 Elm St', addressLine2: 'Floor 3', state: 'AP', employees: 50 }
  ];

  // Open dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <HomeCard title="Work Location Details" tagline="Setup your organization before starting payroll">
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Work Locations</Typography>
            <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ marginBottom: 2 }}>
              Add Work Location
            </Button>
            <WorkLocationDialog open={openDialog} handleClose={handleCloseDialog} handleOpenDialog={handleOpenDialog} />
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address Line 1</TableCell>
                  <TableCell>Address Line 2</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>No of Employees</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workLocations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ height: 300 }}>
                      <EmptyTable msg="No work locations available" />
                    </TableCell>
                  </TableRow>
                ) : (
                  workLocations.map((location, index) => (
                    <TableRow key={location.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{location.name}</TableCell>
                      <TableCell>{location.addressLine1}</TableCell>
                      <TableCell>{location.addressLine2}</TableCell>
                      <TableCell>{location.state}</TableCell>
                      <TableCell>{location.employees}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      </Grid2>
    </HomeCard>
  );
}

export default Worklocation;
