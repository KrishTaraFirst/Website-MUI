import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  Button,
  Box,
  Pagination
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import LeaveManagementDialog from './LeaveManagementDialog';
import ActionCell from '@/utils/ActionCell';
import MainCard from '@/components/MainCard';
import { useSearchParams } from 'next/navigation';
import Loader from '@/components/PageLoader';
import { useSnackbar } from '@/components/CustomSnackbar';
import Factory from '@/utils/Factory';
import EmptyTable from '@/components/third-party/table/EmptyTable';

function LeaveManagement() {
  const [leaveType, setLeaveType] = useState('2024-25');
  const [loading, setLoading] = useState(false);
  const [payrollId, setPayrollId] = useState(null);
  const [leaveManagementData, setLeaveManagementData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [postType, setPostType] = useState('');
  const searchParams = useSearchParams();
  const showSnackbar = useSnackbar();
  const rowsPerPage = 5;

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) setPayrollId(id);
  }, [searchParams]);

  useEffect(() => {
    if (payrollId) fetchLeaveManagementData();
  }, [payrollId]);

  const fetchLeaveManagementData = async () => {
    setLoading(true);
    const url = `/payroll/leave-management/${payrollId}`;
    const { res, error } = await Factory(postType, url, { payroll: Number(payrollId) });
    setLoading(false);
    if (res.status_cd === 0) {
      setLeaveManagementData(res.data);
    } else {
      showSnackbar(JSON.stringify(res.data.data), 'error');
    }
  };

  const handlePageChange = (event, value) => setCurrentPage(value);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const paginatedData = leaveManagementData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <MainCard>
      {loading && <Loader />}
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography sx={{ mb: 1 }}>Leave Type</Typography>
            <CustomAutocomplete
              options={[]}
              value={leaveType}
              onChange={(e, val) => setLeaveType(val)}
              sx={{ minWidth: 200, maxWidth: 200 }}
            />
          </Box>
          <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpenDialog}>
            Add Leave Management
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>No of Leaves</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ height: 300 }}>
                    <EmptyTable msg="No Data available" />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item) => (
                  <TableRow key={item.id || item.code}>
                    {' '}
                    {/* Ensure key is unique */}
                    <TableCell>{item.holiday_name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {`${item.description}`?.length > 30 ? `${item.description?.substring(0, 20)}...` : `${item.description}` || 'N/A'}
                    </TableCell>
                    <TableCell>{item.applicable_for}</TableCell>
                    <TableCell>
                      <ActionCell
                        row={item}
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
                        open={openDialog}
                        onClose={handleCloseDialog}
                        deleteDialogData={{
                          title: 'Delete Record',
                          heading: 'Are you sure you want to delete this Record?',
                          description: `This action will remove ${item.name} from the list.`,
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

        {leaveManagementData.length > 0 && (
          <Stack direction="row" justifyContent="center" py={1.5}>
            <Pagination count={Math.ceil(leaveManagementData.length / rowsPerPage)} page={currentPage} onChange={handlePageChange} />
          </Stack>
        )}
      </Stack>

      <LeaveManagementDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        selectedRecord={selectedRecord}
        type={postType}
        setType={setPostType}
      />
    </MainCard>
  );
}

export default LeaveManagement;
