'use client';

import {
  Typography,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Chip,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomInput from '@/components/CustomComponents/CustomInput';
import CustomAutocomplete from '@/components/CustomComponents/CustomAutocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionCell from './ActionCell';
let visaTypes = ['Student Visa', 'Visit', 'Work Visa', 'Business'];

const TaskList = ({
  dialogOpen,
  setDialogOpen,
  taskList,
  handleDelete,
  handleEditClick,
  handleSubmit,
  editedService,
  setEditedService,
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleInputChange,
  destinationCountries,
  from
}) => {
  return (
    <div>
      <Box sx={{ mt: 1 }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '12px',
            overflow: 'auto', // Enable scrolling when content exceeds max height
            maxHeight: '500px', // Set the maximum height
            minHeight: '200px' // Set the minimum height
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead
              sx={{
                position: 'sticky', // Sticky header
                top: 0, // Stick to the top
                zIndex: 1 // Ensure the header stays above the table body
              }}
            >
              <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Task ID</TableCell>
                <TableCell align="left">Service</TableCell>
                {from === 'tasklist' && <TableCell align="center">Client Name</TableCell>}
                <TableCell align="center">Date</TableCell>
                {/* <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  Passport Number
                </TableCell> */}
                {/* <TableCell align="center">Purpose</TableCell> */}
                {/* <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  Visa Type
                </TableCell> */}
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                  Destination Country
                </TableCell>

                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList &&
                taskList?.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell align="center">{service.id || service.service_id}</TableCell>
                    <TableCell align="left">{service.service_name}</TableCell>
                    {from === 'tasklist' && <TableCell align="left">{service.first_name + ' ' + service.last_name}</TableCell>}

                    <TableCell align="center">{service.date}</TableCell>
                    {/* <TableCell align="center">
                      {service.passport_number}
                    </TableCell> */}
                    {/* <TableCell align="center">{service.purpose}</TableCell>
                    <TableCell align="left">{service.visa_type}</TableCell> */}
                    <TableCell align="center">{service.destination_country}</TableCell>
                    <TableCell align="center">{service.quantity}</TableCell>
                    <TableCell
                      align="center"
                      // sx={{
                      //   color: service.status === 'Pending' ? 'orange' : service.status === 'In - Progress' ? '#f58d42' : 'green',
                      //   fontWeight: 'bold'
                      // }}
                    >
                      <Chip
                        label={service.status === 'pending' ? 'Pending' : service.status === 'completed' ? 'Completed' : 'In Progress'}
                        color={service.status === 'pending' ? 'warning' : service.status === 'completed' ? 'success' : 'warning'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">{service.comments}</TableCell>

                    <TableCell align="center">
                      <ActionCell
                        row={service}
                        onEdit={() => handleEditClick(service)}
                        onDelete={(id) => {
                          handleDelete(service);
                          // setDeleteDialogOpen(true);
                          // setEditedService({ ...service });
                        }}
                      />
                      {/* <Box>
                        <Button onClick={() => handleEditClick(service)}>
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            setDeleteDialogOpen(true);
                            setEditedService({ ...service });
                            // handleDelete(service);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* edit ialogue */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs">
        <DialogTitle>Service Details</DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomInput id="id" label="Task ID" name="id" disabled value={editedService.id || ''} onChange={handleInputChange} />
              </Grid>

              <Grid item xs={12}>
                <CustomAutocomplete
                  id="status"
                  label="Status"
                  name="status"
                  value={editedService?.status?.[0]?.toUpperCase() + editedService?.status?.slice(1) || ''}
                  options={['pending', 'completed', 'in progress']}
                  onChange={(e, val) => {
                    handleInputChange('status', val);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  id="comments"
                  label="Comments"
                  name="comments"
                  value={editedService.comments || ''}
                  onChange={(e, val) => {
                    handleInputChange('comments', e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomInput
                  id="passport_number"
                  label="Passport Number"
                  name="passport_number"
                  value={editedService.passport_number || ''}
                  onChange={(e, val) => {
                    handleInputChange('passport_number', e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomAutocomplete
                  id="destination_country"
                  label="Destination Country"
                  name="destination_country" // Make sure the name is passed
                  value={editedService?.destination_country?.[0]?.toUpperCase() + editedService?.destination_country?.slice(1) || ''}
                  options={destinationCountries} // Display labels (e.g., 'In Progress')
                  onChange={(e, val) => {
                    // Find the value corresponding to the selected label

                    handleInputChange('destination_country', val);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomAutocomplete
                  id="visa_type"
                  label="Visa Type"
                  name="visa_type" // Make sure the name is passed
                  value={editedService?.visa_type?.[0]?.toUpperCase() + editedService?.visa_type?.slice(1) || ''}
                  options={visaTypes} // Display labels (e.g., 'In Progress')
                  onChange={(e, val) => {
                    // Find the value corresponding to the selected label

                    handleInputChange('visa_type', val);
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button variant="outlined" color="error" type="button" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* delete dialogue */}
      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Are you sure you want to delete the Task?</DialogTitle>

        <DialogActions sx={{ textAlign: 'center' }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleDelete(editedService);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>{' '}
    </div>
  );
};

export default TaskList;
