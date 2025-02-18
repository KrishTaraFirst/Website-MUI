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
  Box
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import NewAccount from '@/sections/account/NewAccount';
import HolidayManagementDialog from './HolidayManagementDialog';
import ActionCell from '@/utils/ActionCell';

function HolidayManagement() {
  // State to manage the selected financial year
  const [financialYear, setFinancialYear] = useState('2024-25');
  const [holidayManagementData, setHolidayManagementData] = useState([
    {
      holiday_name: 'New Year',
      date: '2025-01-01',
      description: 'Celebration of the New Year.',
      applicable_for: 'All Employees',
      location: 's'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [postType, setPostType] = useState('');

  // Handle opening the dialog
  const handleOpenDialog = () => setOpenDialog(true);

  // Handle closing the dialog
  const handleCloseDialog = () => setOpenDialog(false);

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
              <CustomAutocomplete options={['Hyderabd']} sx={{ minWidth: 200, maxWidth: 200 }} />
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
          <Table>
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
              {/* {holidayManagementData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ height: 300 }}>
                    <EmptyTable msg="No Data available" />
                  </TableCell>
                </TableRow>
              ) : (
                holidayManagementData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.holiday_name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {`${item.description}`?.length > 30 ? `${item.description?.substring(0, 20)}...` : `${item.description}` || 'N/A'}
                    </TableCell>
                    <TableCell>{item.applicable_for}</TableCell>

                    <TableCell>
                      <ActionCell
                        row={item} // Pass the customer row data
                        onEdit={() => handleEdit(item)} // Edit handler
                        onDelete={() => handleDelete(item)} // Delete handler
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
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
      {/* Department Dialog */}
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
