'use client';
import React, { useState, useEffect } from 'react';
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
  Typography,
  Box
} from '@mui/material';
import DesignationDialog from './DesignationDialog'; // Import the DepartmentDialog
import EmptyTable from '@/components/third-party/table/EmptyTable';
import HomeCard from '@/components/cards/HomeCard';
import Factory from '@/utils/Factory';
import { useSearchParams } from 'next/navigation';
import ActionCell from '@/utils/ActionCell';
import { useSnackbar } from '@/components/CustomSnackbar';
import { useRouter } from 'next/navigation';

function PaySchedule() {
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
  const [designations, setDesignations] = useState([]); // State to store designations data
  const [payrollid, setPayrollId] = useState(null); // Payroll ID fetched from URL
  const [postType, setPostType] = useState(''); // Payroll ID fetched from URL
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const searchParams = useSearchParams();

  // Update payroll ID from search params
  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Example to simulate adding a designation
  const addDepartment = (newDepartment) => {
    setDesignations((prevDepartments) => [...prevDepartments, newDepartment]);
  };
  const fetch_pay_schedules = async () => {
    if (!payrollid) return; // If there's no payroll id, exit early

    const url = `/payroll/pay-schedules/?payroll_id=${payrollid}`;
    const { res, error } = await Factory('get', url, {});

    if (res?.status_cd === 0 && Array.isArray(res?.data)) {
      setDesignations(res?.data); // Successfully set work locations
    } else {
      setDesignations([]);
    }
  };

  const handleDelete = async (designation) => {
    console.log(designation);
    let url = `/payroll/designations/${designation.id}/`;
    const { res } = await Factory('delete', url, {});
    console.log(res);
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      showSnackbar('Record Deleted Successfully', 'success');
    }
  };
  // Fetch data when payrollid changes

  useEffect(() => {
    if (payrollid !== null) fetch_pay_schedules();
  }, [payrollid]);
  return (
    <HomeCard
      title="Pay Schedule"
      tagline="Setup your organization before starting payroll"
      CustomElement={() => (
        <Stack direction="row" sx={{ gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setPostType('post');
              handleOpenDialog();
            }}
            sx={{ marginBottom: 2 }}
          >
            Add Designation
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              // setPostType('post');
              // handleOpenDialog();
            }}
            sx={{ marginBottom: 2 }}
          >
            Import
          </Button>
        </Stack>
      )}
    >
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12}></Grid2>
      </Grid2>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            router.back();
          }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </HomeCard>
  );
}

export default PaySchedule;
