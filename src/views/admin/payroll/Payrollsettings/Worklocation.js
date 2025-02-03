'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Stack, Grid2, Typography } from '@mui/material';
import WorkLocationDialog from './WorkLocationDialog';
import EmptyTable from '@/components/third-party/table/EmptyTable';
import HomeCard from '@/components/cards/HomeCard';
import Factory from '@/utils/Factory';
import { useSearchParams } from 'next/navigation';
import ActionCell from '@/utils/ActionCell';
import { useSnackbar } from '@/components/CustomSnackbar';

function Worklocation() {
  const [openDialog, setOpenDialog] = useState(false); // Controls dialog visibility
  const [workLocations, setWorkLocations] = useState([]); // Stores the list of work locations
  const [payrollid, setPayrollId] = useState(null); // Payroll ID fetched from URL
  const [postType, setPostType] = useState(''); // Payroll ID fetched from URL
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { showSnackbar } = useSnackbar();

  const searchParams = useSearchParams();

  // Update payroll ID from search params
  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  // Open the dialog
  const handleOpenDialog = () => setOpenDialog(true);

  // Close the dialog
  const handleCloseDialog = () => setOpenDialog(false);

  // Fetch the work locations based on payrollid
  const fetchWorkLocations = async () => {
    if (!payrollid) return; // If there's no payroll id, exit early

    const url = `/payroll/work-locations/?payroll_id=${payrollid}`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0 && Array.isArray(res?.data)) {
      setWorkLocations(res?.data); // Successfully set work locations
    } else {
      setWorkLocations([]); // Reset to empty if data is invalid or an error occurred
      // Optionally show a snackbar error here if needed
      // showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
    }
  };
  const handleEdit = (location) => {
    setPostType('edit');
    setSelectedRecord(location);
    handleOpenDialog();
  };
  const handleDelete = async (location) => {
    console.log(location);
    let url = `/payroll/work-locations/delete/${location.id}/`;
    const { res } = await Factory('delete', url, {});
    console.log(res);
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      showSnackbar('Record Deleted Successfully', 'success');
      fetchWorkLocations();
    }
  };
  // Fetch data when payrollid changes

  useEffect(() => {
    if (payrollid !== null) fetchWorkLocations();
  }, [payrollid]);
  return (
    <HomeCard title="Work Location Details" tagline="Setup your organization before starting payroll">
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Work Locations</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setPostType('post');
                handleOpenDialog();
              }}
              sx={{ marginBottom: 2 }}
            >
              Add Work Location
            </Button>
            <WorkLocationDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              fetchWorkLocations={fetchWorkLocations} // Pass the fetch function to the dialog
              selectedRecord={selectedRecord}
              type={postType}
              setType={setPostType}
            />
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Check if workLocations is valid and has data */}
                {workLocations?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ height: 300 }}>
                      <EmptyTable msg="No work locations available" />
                    </TableCell>
                  </TableRow>
                ) : (
                  workLocations?.map((location, index) => (
                    <TableRow key={location.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{location.location_name || 'N/A'}</TableCell>
                      <TableCell>{location.address_line1 || 'N/A'}</TableCell>
                      <TableCell>{location.address_line2 || 'N/A'}</TableCell>
                      <TableCell>{location.address_state || 'N/A'}</TableCell>
                      <TableCell>{location.employees || 'NA'}</TableCell>
                      <TableCell>
                        {/* ActionCell to handle actions */}
                        <ActionCell
                          row={location} // Pass the customer row data
                          onEdit={() => handleEdit(location)} // Edit handler
                          onDelete={() => handleDelete(location)} // Delete handler
                          open={openDialog}
                          onClose={handleCloseDialog}
                          deleteDialogData={{
                            title: 'Delete Record',
                            heading: 'Are you sure you want to delete this Record?',
                            description: `This action will remove ${location.name} from the list.`,
                            successMessage: 'Record has been deleted.'
                          }}
                        />
                      </TableCell>
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
