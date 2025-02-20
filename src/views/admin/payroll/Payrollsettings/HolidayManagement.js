import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Grid2,
  Stack,
  Typography,
  Button,
  Box,
  Pagination
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import HolidayManagementDialog from './HolidayManagementDialog';

function HolidayManagement() {
  const [financialYear, setFinancialYear] = useState('2024-25');
  const [holidayManagementData, setHolidayManagementData] = useState([
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    },
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    }
    // Add more holiday data here
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [postType, setPostType] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Get paginated data
  const paginatedData = holidayManagementData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={12}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography sx={{ mb: 1 }}>Select Financial Year</Typography>
              <CustomAutocomplete
                options={['2021-22', '2022-23', '2023-24', '2024-25']}
                value={financialYear}
                onChange={(e, val) => setFinancialYear(val)}
                sx={{ minWidth: 200, maxWidth: 200 }}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Select Location</Typography>
              <CustomAutocomplete options={['Hyderabad']} sx={{ minWidth: 200, maxWidth: 200 }} />
            </Box>
          </Stack>

          <Stack>
            <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpenDialog}>
              Add New
            </Button>
          </Stack>
        </Stack>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <TableContainer component={Paper}>
          <Table size="large">
            <TableHead>
              <TableRow>
                <TableCell>Holiday Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Locations</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ height: 300 }}>
                    No Data available
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.holiday_name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description || 'N/A'}
                    </TableCell>
                    <TableCell>{item.applicable_for}</TableCell>
                    <TableCell>{/* Add actions here */}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {holidayManagementData.length > 0 && (
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', px: { xs: 0.5, sm: 2.5 }, py: 1.5 }}>
            <Pagination count={Math.ceil(holidayManagementData.length / rowsPerPage)} page={currentPage} onChange={handlePageChange} />
          </Stack>
        )}
      </Grid2>

      {/* Holiday Management Dialog */}
      <Grid2 size={{ xs: 12 }}>
        <HolidayManagementDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          handleOpenDialog={handleOpenDialog}
          selectedRecord={selectedRecord}
          type={postType}
          setType={setPostType}
        />
      </Grid2>
    </Grid2>
  );
}

export default HolidayManagement;
