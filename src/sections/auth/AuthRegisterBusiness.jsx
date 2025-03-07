'use client';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

// @next
import { useRouter } from 'next/navigation';

import { useState, useRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { CloseEye, OpenEye } from '@/icons';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box, ButtonGroup } from '@mui/material';
import { motion } from 'framer-motion';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import Contact from '@/components/Contact';
import { useSnackbar } from '@/components/CustomSnackbar';
import { AuthRole } from '@/enum';
import { APP_DEFAULT_PATH, AUTH_USER_KEY } from '@/config';
import { BASE_URL } from 'constants';
import axios from '@/utils/axios';
import { firstNameSchema, lastNameSchema, emailSchema, passwordSchema, userNameSchema, phoneSchema } from '@/utils/validationSchema';

// @icons
import { IconEye, IconEyeOff } from '@tabler/icons-react';

/***************************  AUTH - REGISTER  ***************************/
const options = ['Individual', 'CA Firm', 'Business', 'Service Provider'];
const optionValues = { Individual: 'Individual', 'CA Firm': 'CA', Business: 'Business', 'Service Provider': 'ServiceProvider' };

export default function AuthRegisterBusiness({ inputSx, serviceKey }) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selected, setSelected] = useState(options[0]);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: {} });

  const password = useRef({});
  password.current = watch('password', '');

  // Handle form submission
  const onSubmit = async (formData) => {
    setIsProcessing(true);
    setRegisterError('');
    try {
      const url = `/user_management/register/`;
      const payload = { ...formData, user_type: 'Individual', user_name: formData.email, service_request: serviceKey };
      console.log(payload);
      const res = await axios.post(BASE_URL + url, payload);
      if (res.status === 201) {
        setIsProcessing(false);
        showSnackbar('Activation link has been sent to given email', 'success');
        router.push('/login');
      }
      reset();
    } catch (error) {
      // CustomSnackbar
      showSnackbar(JSON.stringify(error), 'error');
      setIsProcessing(false);
    }
  };

  const commonIconProps = { size: 16, color: theme.palette.grey[700] };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2 }}>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Name&nbsp;
            <Typography component="span" color="error">
              *
            </Typography>
          </Typography>
          <OutlinedInput
            {...register('first_name', firstNameSchema)}
            placeholder="Enter your first name"
            slotProps={{ input: { 'aria-label': 'First Name' } }}
            error={errors.first_name && Boolean(errors.first_name)}
            sx={{ ...inputSx }}
          />
          {errors.first_name?.message && (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.first_name?.message}
            </Typography>
          )}
        </Stack>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Mobile No.&nbsp;
            <Typography component="span" color="error">
              *
            </Typography>
          </Typography>
          <OutlinedInput
            {...register('mobile_number', phoneSchema)}
            placeholder="Enter your Mobile Number"
            slotProps={{ input: { 'aria-label': 'First Name' } }}
            error={errors.mobile_number && Boolean(errors.mobile_number)}
            sx={{ ...inputSx }}
          />
          {errors.mobile_number?.message && (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.mobile_number?.message}
            </Typography>
          )}
        </Stack>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Email&nbsp;
            <Typography component="span" color="error">
              *
            </Typography>
          </Typography>
          <OutlinedInput
            {...register('email', emailSchema)}
            placeholder="example@gmail.com"
            autoComplete="new-email"
            slotProps={{ input: { 'aria-label': 'Email address' } }}
            error={errors.email && Boolean(errors.email)}
            sx={{ ...inputSx }}
          />
          {errors.email?.message && (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.email?.message}
            </Typography>
          )}
        </Stack>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Password&nbsp;
            <Typography component="span" color="error">
              *
            </Typography>
          </Typography>
          <OutlinedInput
            {...register('password', passwordSchema)}
            type={isOpen ? 'text' : 'password'}
            placeholder="Enter your password"
            autoComplete="new-password"
            slotProps={{ input: { 'aria-label': 'Password' } }}
            error={errors.password && Boolean(errors.password)}
            endAdornment={
              <IconButton sx={{ height: 0 }} onClick={() => setIsOpen(!isOpen)} rel="noopener noreferrer" aria-label="eye">
                {isOpen ? <OpenEye color={theme.palette.grey[700]} /> : <CloseEye color={theme.palette.grey[700]} />}
              </IconButton>
            }
            sx={inputSx}
          />
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: errors.password?.message ? 'space-between' : 'flex-end', width: 1 }}
          >
            {errors.password?.message && (
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.password?.message}
              </Typography>
            )}
            {/* <Link
              component={NextLink}
              underline="hover"
              variant="caption2"
              href=""
              sx={{ textAlign: 'right', '&:hover': { color: 'primary.dark' } }}
            >
              Forgot Password?
            </Link> */}
          </Stack>
        </Stack>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={isProcessing}
          endIcon={isProcessing && <CircularProgress color="secondary" size={16} />}
          sx={{ borderRadius: '32px', minWidth: 120, mt: { xs: 1, sm: 4 }, '& .MuiButton-endIcon': { ml: 1 }, p: 2 }}
        >
          Sign Up
        </Button>

        {loginError && (
          <Alert sx={{ mt: 2 }} severity="error" variant="filled" icon={false}>
            {loginError}
          </Alert>
        )}
      </Stack>
    </form>
  );
}

AuthRegisterBusiness.propTypes = { inputSx: PropTypes.any };
