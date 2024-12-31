'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DialogDelete from '@/components/dialog/DialogDelete'; // Assuming this is a confirmation dialog

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
 *
 * @returns {JSX.Element} - The rendered ActionCell component.
 */
export default function ActionCell({ row, open, onClose, onEdit, onDelete, deleteDialogData }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null); // Anchor for Popper

  // Popper (action menu) state
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'action-cell-popper' : undefined;

  const handleActionClick = (event) => {
    // Set the anchor element to the button that was clicked
    setAnchorEl(event.currentTarget);
  };

  // Delete Dialog Handling
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
                  {/* Edit Action */}
                  <ListItemButton onClick={onEdit}>
                    <ListItemIcon>
                      <IconEdit size={16} />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </ListItemButton>

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

      {deleteDialogData && (
        <DialogDelete {...deleteDialogData} open={openDeleteDialog} onClose={handleDeleteDialogClose} onDelete={handleDialogDelete} />
      )}
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
