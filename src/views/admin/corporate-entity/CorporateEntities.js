'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Stack, Grid2, Typography } from '@mui/material';
import AddCorporateEntityDialog from './AddCorporateEntityDialog';
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
  const [user, setUser] = useState('');
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
  const handleEdit = (entity) => {
    setPostType('edit');
    setSelectedRecord(entity);
    handleOpenDialog();
  };
  const handleDelete = async (entity) => {
    console.log(entity);
    let url = `/payroll/businessList/${entity.id}/`;
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
    <HomeCard
      title="Corporate Entities"
      tagline="Setup your organization before starting Entities"
      CustomElement={() => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setPostType('post');
            handleOpenDialog();
          }}
          sx={{ marginBottom: 2 }}
        >
          Add Entity
        </Button>
      )}
    >
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S No</TableCell>
                  <TableCell>Entitiey Name</TableCell>
                  <TableCell>Entitiey PAN</TableCell>
                  <TableCell>Entity Type</TableCell>
                  <TableCell>Nature of Entitiey</TableCell>
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
                  businessList.map((entity, index) => (
                    <TableRow key={entity.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entity.nameOfBusiness}</TableCell>
                      <TableCell>{entity.pan}</TableCell>
                      <TableCell>{entity.entityType}</TableCell>
                      <TableCell>{entity.business_nature}</TableCell>

                      <TableCell>
                        <ActionCell
                          row={entity} // Pass the customer row data
                          onEdit={() => handleEdit(entity)} // Edit handler
                          onDelete={() => handleDelete(entity)} // Delete handler
                          open={openDialog}
                          onClose={handleCloseDialog}
                          deleteDialogData={{
                            title: 'Delete Record',
                            heading: 'Are you sure you want to delete this Record?',
                            description: `This action will remove ${entity.name} from the list.`,
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

      <AddCorporateEntityDialog
        open={openDialog}
        setOpen={setOpenDialog}
        type={'add'}
        getUsers={getBusinessList}
        user_type={'corporate-entities'}
        user_id={user}
        // setRefresh
      />
    </HomeCard>
  );
}

export default BusinessList;
