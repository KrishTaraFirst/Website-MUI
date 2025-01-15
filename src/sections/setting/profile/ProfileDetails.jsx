import { useState } from 'react';

// @mui
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// @project
import ModalEmail from './ModalEmail';
import ModalPhoneNumber from './ModalPhoneNumber';
import ModalPassword from './ModalPassword';
import ProfileAvatar from './ProfileAvatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import { logout } from '@/utils/api';

import SettingCard from '@/components/cards/SettingCard';
import DialogLogout from '@/components/dialog/DialogLogout';
import DialogDelete from '@/components/dialog/DialogDelete';

// @assets
import { IconCheck } from '@tabler/icons-react';

/***************************   PROFILE - DETAILS  ***************************/

export default function SettingDetailsCard() {
  const { userData } = useCurrentUser();
  const listStyle = { p: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 1 };

  // if (userData && Object.keys(userData).length > 0) {
  //   const name = `${userData?.firstname ?? ''} ${userData?.lastname ?? ''}`.trim();
  //   profileData.caption = userData?.role ? RoleTitles[userData.role] : undefined;
  //   profileData.title = name;
  // }

  const primaryTypographyProps = { variant: 'body2', sx: { color: 'grey.700' } };
  const secondaryTypographyProps = {
    variant: 'body1',
    sx: { mt: 1, color: 'text.primary' }
  };

  // Dialog Logout handle
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const handleDialogLogoutOpen = () => {
    setOpenLogoutDialog(true);
  };

  const handleDialogLogoutClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleDialogLogout = () => {
    setOpenLogoutDialog(false);
    logout();
  };

  // Dialog Delete handle
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDialogDeleteOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDialogDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDialogDelete = () => {
    console.log('Delete');
    setOpenDeleteDialog(false);
  };

  return (
    <SettingCard title="Details" caption="Manage your personal details and preferences.">
      <List disablePadding>
        <ListItem sx={listStyle} divider>
          <ProfileAvatar />
        </ListItem>
        <ListItem sx={listStyle} divider>
          <Grid container columnSpacing={2} rowSpacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                defaultValue={userData?.firstname || ''}
                fullWidth
                aria-describedby="outlined-name"
                inputProps={{ 'aria-label': 'name' }}
                placeholder="ex. Jone"
              />
            </Grid>
            {/* <Grid size={{ xs: 12, sm: 6 }}>
              <InputLabel>Last Name</InputLabel>
              <OutlinedInput
                defaultValue={userData?.lastname || ''}
                fullWidth
                aria-describedby="outlined-name"
                inputProps={{ 'aria-label': 'name' }}
                placeholder="ex. Doe"
              />
            </Grid> */}
            <Grid size={12}>
              <FormHelperText sx={{ mt: 0 }}>Use your name as they appear on your government-issued ID.</FormHelperText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={listStyle} divider>
          <ListItemText
            primary="Email Address"
            secondary={userData?.email || ''}
            {...{ primaryTypographyProps, secondaryTypographyProps }}
          />
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, ml: 'auto' }}>
            <Chip label="Verified" variant="text" avatar={<IconCheck />} color="success" />
            <ModalEmail />
          </Stack>
        </ListItem>
        <ListItem sx={listStyle} divider>
          <ListItemText
            primary="Phone Number (optional)"
            secondary={userData?.contact || ''}
            {...{ primaryTypographyProps, secondaryTypographyProps }}
          />
          <ModalPhoneNumber />
        </ListItem>
        <ListItem sx={listStyle} divider>
          <ListItemText
            primary="Change Password"
            secondary="Change the passwords for your Account Security"
            {...{ primaryTypographyProps, secondaryTypographyProps }}
          />
          <ModalPassword />
        </ListItem>
        <ListItem sx={listStyle} divider>
          <ListItemText primary="Logout" secondary="Logout options here" {...{ primaryTypographyProps, secondaryTypographyProps }} />
          <Button onClick={handleDialogLogoutOpen} sx={{ ml: 'auto' }}>
            Logout
          </Button>
          <DialogLogout
            open={openLogoutDialog}
            title="Logout"
            heading={`Are you sure you want to logout of ${userData?.firstname ?? ''}?`}
            onClose={handleDialogLogoutClose}
            onLogout={handleDialogLogout}
          />
        </ListItem>
        {/* <ListItem sx={listStyle}>
          <ListItemText
            primary="Delete Account"
            secondary="No longer use of this Account?"
            {...{ primaryTypographyProps, secondaryTypographyProps }}
          />
          <Button color="error" onClick={handleDialogDeleteOpen} sx={{ ml: 'auto' }}>
            Delete Account
          </Button>
          <DialogDelete
            open={openDeleteDialog}
            title="Delete Account"
            heading="Are you sure you want to Delete Your Account?"
            description="After deleting your account there is no way to recover your data back."
            onClose={handleDialogDeleteClose}
            onDelete={handleDialogDelete}
          />
        </ListItem> */}
      </List>
    </SettingCard>
  );
}
