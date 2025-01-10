'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import { IconDotsVertical, IconEdit, IconTrash, IconDownload, IconCheck } from '@tabler/icons-react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MessyDoodle from '@/images/illustration/MessyDoodle';

/**
 * ActionCell Component - Handles Edit and Delete actions
 *
 * @param {Object} props - Component props
 * @param {Object} props.row - The row data for the entity (generic).
 * @param {boolean} props.open - Controls the visibility of the action menu.
 * @param {Function} props.onClose - Callback to close the action menu.
 * @param {Function} props.onEdit - Callback function for editing the entity.
 * @param {Function} props.onDelete - Callback function for deleting the entity.
 * @param {Object} props.deleteDialogData - Custom data for the delete confirmation dialog.
 * @param {Object} props.onRecordPayment
 * @param {Object} props.onPaymentHistory
 * @param {Object} props.onWriteOff
 *
 * @returns {JSX.Element} - The rendered ActionCell component.
 */
export default function ActionCell({
  row,
  onRecordPayment,
  onPaymentHistory,
  fromComponent,
  open,
  onClose,
  onEdit,
  onDelete,
  deleteDialogData,
  onDownload,
  onWriteOff
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null); // Anchor for Popper
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Delete dialog state

  // Popper (action menu) state
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'action-cell-popper' : undefined;

  const handleActionClick = (event) => {
    // Set the anchor element to the button that was clicked
    setAnchorEl(event.currentTarget);
  };

  // Delete Dialog Handling
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDialogDelete = () => {
    onDelete(row); // Call delete callback with row data
    handleDeleteDialogClose();
  };

  return (
    <>
      <IconButton color="secondary" size="small" onClick={handleActionClick} aria-label="action">
        <IconDotsVertical size={16} color={theme.palette.text.secondary} />
      </IconButton>

      <Popper placement="top-end" id={id} open={isOpen} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade in={isOpen} {...TransitionProps}>
            <div
              style={{
                minWidth: 150,
                padding: '5px',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 8,
                boxShadow: theme.customShadows.tooltip
              }}
            >
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <List disablePadding>
                  {/* download icon */}
                  {onDownload && (
                    <ListItemButton
                      onClick={() => {
                        onDownload();
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <IconDownload size={16} />
                      </ListItemIcon>
                      <ListItemText>View</ListItemText>
                    </ListItemButton>
                  )}
                  {/* Edit Action */}
                  <ListItemButton onClick={onEdit}>
                    <ListItemIcon>
                      <IconEdit size={16} />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </ListItemButton>
                  {fromComponent === 'invoice' && (
                    <ListItemButton onClick={onRecordPayment}>
                      <ListItemIcon>
                        <IconEdit size={16} />
                      </ListItemIcon>
                      <ListItemText>Record Payment</ListItemText>
                    </ListItemButton>
                  )}
                  {fromComponent === 'invoice' && (
                    <ListItemButton onClick={onPaymentHistory}>
                      <ListItemIcon>
                        <IconEdit size={16} />
                      </ListItemIcon>
                      <ListItemText>Payment History</ListItemText>
                    </ListItemButton>
                  )}
                  {fromComponent === 'invoice' && (
                    <ListItemButton onClick={onWriteOff}>
                      <ListItemIcon>
                        <IconCheck size={16} />
                      </ListItemIcon>
                      <ListItemText>Write Off</ListItemText>
                    </ListItemButton>
                  )}
                  {/* Delete Action */}
                  <ListItemButton sx={{ color: 'error.main' }} onClick={handleDeleteDialogOpen}>
                    <ListItemIcon>
                      <IconTrash size={16} />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </div>
          </Fade>
        )}
      </Popper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        disableRestoreFocus
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="delete-dialog-title">{deleteDialogData?.title || 'Delete'}</DialogTitle>
        <DialogContent dividers>
          <Stack sx={{ gap: 2.5, alignItems: 'center' }}>
            <Box sx={{ height: 170, width: 230 }}>
              <MessyDoodle />
            </Box>
            <Stack sx={{ gap: 1, textAlign: 'center', alignItems: 'center' }}>
              <Typography id="delete-dialog-description" variant="h5" sx={{ color: 'text.primary' }}>
                {deleteDialogData?.heading || 'Are you sure you want to delete?'}
              </Typography>
              <Typography variant="body1" color="grey.700" sx={{ width: '90%' }}>
                {deleteDialogData?.description || 'This action cannot be undone.'}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button variant="outlined" color="secondary" onClick={handleDeleteDialogClose} autoFocus>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDialogDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ActionCell.propTypes = {
  row: PropTypes.object.isRequired, // Entity data
  onEdit: PropTypes.func.isRequired, // Edit action callback
  onDelete: PropTypes.func.isRequired, // Delete action callback
  deleteDialogData: PropTypes.object, // Custom delete dialog data
  open: PropTypes.bool.isRequired, // Whether the action menu is open or not
  onClose: PropTypes.func.isRequired // Function to close the action menu
};
