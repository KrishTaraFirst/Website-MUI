import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import axios from '@/utils/axios';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import { passwordSchema } from '@/utils/validationSchema';
import { BASE_URL } from 'constants';

// @assets
import { IconEye, IconEyeOff } from '@tabler/icons-react';

/***************************   MODAL - CHANGE PASSWORD   ***************************/

export default function ModalPassword({ inputSx }) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbar, setSnackbar] = useState(null);

  const [open, setOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOldOpen, setIsOldOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const iconCommonProps = { size: 16, color: theme.palette.grey[700] };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar((prev) => prev && { ...prev, open: false });
  };

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    let token = JSON.parse(localStorage.getItem('auth-user'));
    token = token.access_token;
    console.log;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    try {
      const url = `/user_management/change-password/`;
      const payload = {
        old_password: data.oldPassword,
        new_password: data.password
      };
      const res = await axios.put(BASE_URL + url, payload, { headers: headers });
      if (res.status === 200) {
        console.log(res);
        setSnackbar({ open: true, message: 'Password Changed Successfully', severity: 'success' });
        setOpen(false);
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.old_password, severity: 'error' });
      setOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} sx={{ ml: 'auto' }}>
        Change Password
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={ModalSize.MD}
        header={{ title: 'Change Password', subheader: 'Regularly updating your password helps safeguard your information.' }}
        modalContent={
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack sx={{ gap: 2 }}>
              <Box>
                <InputLabel>Old Password</InputLabel>
                <OutlinedInput
                  {...register('oldPassword', passwordSchema)}
                  type={isOldOpen ? 'text' : 'password'}
                  placeholder="Enter your old password"
                  fullWidth
                  autoComplete="old-password"
                  error={errors.oldPassword && Boolean(errors.oldPassword)}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                      onClick={() => setIsOldOpen(!isOldOpen)}
                    >
                      {isOldOpen ? <IconEye {...iconCommonProps} /> : <IconEyeOff {...iconCommonProps} />}
                    </InputAdornment>
                  }
                  sx={inputSx}
                />
                {errors.oldPassword?.message && <FormHelperText error>{errors.oldPassword?.message}</FormHelperText>}
              </Box>
              <Box>
                <InputLabel>New Password</InputLabel>
                <OutlinedInput
                  {...register('password', passwordSchema)}
                  type={isOpen ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  fullWidth
                  autoComplete="new-password"
                  error={errors.password && Boolean(errors.password)}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {isOpen ? <IconEye {...iconCommonProps} /> : <IconEyeOff {...iconCommonProps} />}
                    </InputAdornment>
                  }
                  sx={inputSx}
                />
                {errors.password?.message && <FormHelperText error>{errors.password?.message}</FormHelperText>}
              </Box>
              <Box>
                <InputLabel>New Confirm Password</InputLabel>
                <OutlinedInput
                  {...register('confirmPassword', { validate: (value) => value === password.current || 'The passwords do not match' })}
                  type={isConfirmOpen ? 'text' : 'password'}
                  placeholder="Enter your new confirm password"
                  fullWidth
                  error={errors.confirmPassword && Boolean(errors.confirmPassword)}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                      onClick={() => setIsConfirmOpen(!isConfirmOpen)}
                    >
                      {isConfirmOpen ? <IconEye {...iconCommonProps} /> : <IconEyeOff {...iconCommonProps} />}
                    </InputAdornment>
                  }
                  sx={inputSx}
                />
                {errors.confirmPassword?.message && <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>}
              </Box>
              <Stack {...(!downSM && { direction: 'row' })} sx={{ gap: 1.5, alignItems: { sm: 'center' } }}>
                <Stack sx={{ gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'grey.700' }}>
                    Forgot Password
                  </Typography>
                  <Typography variant="body1">In case if you forgot older password then you can recover password here.</Typography>
                </Stack>
                <Button href="/forgot-password" sx={{ minWidth: 'fit-content', ml: 'auto' }}>
                  Forgot Password
                </Button>
              </Stack>
            </Stack>
          </form>
        }
        footer={
          <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
            <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Change Password
            </Button>
          </Stack>
        }
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
        open={snackbar?.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar?.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

ModalPassword.propTypes = { inputSx: PropTypes.any };
