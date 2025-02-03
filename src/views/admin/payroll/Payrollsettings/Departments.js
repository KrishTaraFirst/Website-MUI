'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Stack, Grid2, Typography } from '@mui/material';
import DepartmentDialog from './DepartmentDialog'; // Import the DepartmentDialog
import EmptyTable from '@/components/third-party/table/EmptyTable';
import HomeCard from '@/components/cards/HomeCard';
import Factory from '@/utils/Factory';
import { useSearchParams } from 'next/navigation';
import ActionCell from '@/utils/ActionCell';
import { useSnackbar } from '@/components/CustomSnackbar';

function Departments() {
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
  const [departments, setDepartments] = useState([]); // State to store departments data
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

  // Open dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchDepartments = async () => {
    if (!payrollid) return; // If there's no payroll id, exit early

    const url = `/payroll/departments/?payroll_id=${payrollid}`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0 && Array.isArray(res?.data)) {
      setDepartments(res?.data); // Successfully set work locations
    } else {
      setDepartments([]);
    }
  };
  const handleEdit = (department) => {
    setPostType('edit');
    setSelectedRecord(department);
    handleOpenDialog();
  };
  const handleDelete = async (department) => {
    console.log(department);
    let url = `/payroll/departments/${department.id}/`;
    const { res } = await Factory('delete', url, {});
    console.log(res);
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      showSnackbar('Record Deleted Successfully', 'success');
      fetchDepartments();
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, [payrollid]);
  return (
    <HomeCard title="Departments Details" tagline="Setup your organization before starting payroll">
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Departments</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setPostType('post');
                handleOpenDialog();
              }}
              sx={{ marginBottom: 2 }}
            >
              Add Department
            </Button>
            <DepartmentDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              handleOpenDialog={handleOpenDialog}
              selectedRecord={selectedRecord}
              type={postType}
              setType={setPostType}
              fetchDepartments={fetchDepartments}
            />
          </Stack>
        </Grid2>

        <Grid2 size={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S No</TableCell>
                  <TableCell>Department Name</TableCell>
                  <TableCell>Department Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>No of Employees</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ height: 300 }}>
                      <EmptyTable msg="No departments available" />
                    </TableCell>
                  </TableRow>
                ) : (
                  departments.map((department, index) => (
                    <TableRow key={department.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{department.dept_name}</TableCell>
                      <TableCell>{department.dept_code}</TableCell>
                      <TableCell>{department.description}</TableCell>
                      <TableCell>{department.numOfEmployees}</TableCell>
                      <TableCell>
                        <ActionCell
                          row={department} // Pass the customer row data
                          onEdit={() => handleEdit(department)} // Edit handler
                          onDelete={() => handleDelete(department)} // Delete handler
                          open={openDialog}
                          onClose={handleCloseDialog}
                          deleteDialogData={{
                            title: 'Delete Record',
                            heading: 'Are you sure you want to delete this Record?',
                            description: `This action will remove ${department.name} from the list.`,
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

export default Departments;
