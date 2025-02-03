'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Stack, Grid2, Typography } from '@mui/material';
import AddBusinessDialog from './AddBusinessDialog'; // Import the DepartmentDialog
import EmptyTable from '@/components/third-party/table/EmptyTable';
import HomeCard from '@/components/cards/HomeCard';
import Factory from '@/utils/Factory';
import { useSearchParams } from 'next/navigation';
import ActionCell from '@/utils/ActionCell';
import { useSnackbar } from '@/components/CustomSnackbar';
import useCurrentUser from '@/hooks/useCurrentUser';

function BusinessList() {
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
  const [businessList, setBusinessList] = useState([]); // State to store businessList data
  const [postType, setPostType] = useState(''); // Payroll ID fetched from URL
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { showSnackbar } = useSnackbar();
  const { userData } = useCurrentUser();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getBusinessList = async () => {
    const url = `/user_management/businesses-by-client/`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0 && Array.isArray(res?.data)) {
      setBusinessList(res?.data); // Successfully set work locations
    } else {
      setBusinessList([]);
    }
  };
  const handleEdit = (business) => {
    setPostType('edit');
    setSelectedRecord(business);
    handleOpenDialog();
  };
  const handleDelete = async (business) => {
    console.log(business);
    let url = `/payroll/businessList/${business.id}/`;
    const { res } = await Factory('delete', url, {});
    console.log(res);
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      showSnackbar('Record Deleted Successfully', 'success');
      getBusinessList();
    }
  };
  // Fetch data when payrollid changes

  useEffect(() => {
    getBusinessList();
  }, []);
  return (
    <HomeCard title="Business Details" tagline="Setup your organization before starting Business">
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">List of Businesses</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setPostType('post');
                handleOpenDialog();
              }}
              sx={{ marginBottom: 2 }}
            >
              Add Business
            </Button>
            <AddBusinessDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              handleOpenDialog={handleOpenDialog}
              selectedRecord={selectedRecord}
              type={postType}
              setType={setPostType}
              getBusinessList={getBusinessList}
            />
          </Stack>
        </Grid2>

        <Grid2 size={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S No</TableCell>
                  <TableCell>Business Name</TableCell>
                  <TableCell>Business PAN</TableCell>
                  <TableCell>Entity Type</TableCell>
                  <TableCell>Nature of Business</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businessList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ height: 300 }}>
                      <EmptyTable msg="No Designations available" />
                    </TableCell>
                  </TableRow>
                ) : (
                  businessList.map((business, index) => (
                    <TableRow key={business.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{business.nameOfBusiness}</TableCell>
                      <TableCell>{business.pan}</TableCell>
                      <TableCell>{business.entityType}</TableCell>
                      <TableCell>{business.business_nature}</TableCell>

                      <TableCell>
                        <ActionCell
                          row={business} // Pass the customer row data
                          onEdit={() => handleEdit(business)} // Edit handler
                          onDelete={() => handleDelete(business)} // Delete handler
                          open={openDialog}
                          onClose={handleCloseDialog}
                          deleteDialogData={{
                            title: 'Delete Record',
                            heading: 'Are you sure you want to delete this Record?',
                            description: `This action will remove ${business.name} from the list.`,
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

export default BusinessList;
