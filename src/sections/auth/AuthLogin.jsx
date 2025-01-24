'use client';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import axios from '@/utils/axios';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { APP_DEFAULT_PATH, AUTH_USER_KEY } from '@/config';
import Typography from '@mui/material/Typography';
import { BASE_URL } from 'constants';

// @third-party
import { AuthRole } from '@/enum';
import { useForm } from 'react-hook-form';

// @project
import { emailSchema, passwordSchema } from '@/utils/validationSchema';

// @assets
import { CloseEye, OpenEye } from '@/icons';

const roles = {
  Tara: AuthRole.SUPER_ADMIN,
  CA: AuthRole.CHARTED_ACCOUNTANT_FIRM,
  Business: AuthRole.CORPORATE_ADMIN,
  ServiceProvider: AuthRole.SERVICE_PROVIDER,
  Individual: AuthRole.INDIVIDUAL
};

export default function AuthLogin({ inputSx }) {
  const theme = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: { email: '', password: '' } });

  // Handle form submission
  const onSubmit = async (formData) => {
    setIsProcessing(true);
    setLoginError('');
    try {
      const url = `/token_auth/`;
      const postData = {
        email_or_mobile: formData.email,
        password: formData.password
      };

      const res = await axios.post(BASE_URL + url, postData);

      if (res.status === 200) {
        let userDAta = {
          id: res.data.id,
          email: res.data.email,
          // role: roles[res.data.user_type],
          role: AuthRole.SUPER_ADMIN,
          contact: '123456789',
          dialcode: '+1',
          firstname: res.data.name,
          lastname: '',
          user_groups: res.data.user_groups,
          associated_services: res.data.associated_services,
          // password: 'Super@123',
          mobile: res.data.mobile_number,
          access_token: res.data.access
        };
        setIsProcessing(false);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDAta));
        if (res.data.user_type === null) router.push('/user-type');
        else router.push(APP_DEFAULT_PATH);
      }
    } catch (error) {
      // console.error("Login error:", error.response.data.detail);
      console.log('error', error);
      setIsProcessing(false);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2.5 }}>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Email
          </Typography>
          <OutlinedInput
            {...register('email', emailSchema)}
            placeholder="example@gmail.com"
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
            Password
          </Typography>
          <OutlinedInput
            {...register('password', passwordSchema)}
            type={isOpen ? 'text' : 'password'}
            placeholder="Enter your password"
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
            <Link
              component={NextLink}
              underline="hover"
              variant="caption2"
              href="/forgot-password"
              sx={{ textAlign: 'right', '&:hover': { color: 'primary.dark' } }}
            >
              Forgot Password?
            </Link>
          </Stack>
        </Stack>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={isProcessing}
          endIcon={isProcessing && <CircularProgress color="secondary" size={16} />}
          sx={{ borderRadius: '32px', minWidth: 120, mt: { xs: 1, sm: 4 }, '& .MuiButton-endIcon': { ml: 1 } }}
        >
          Sign In
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

AuthLogin.propTypes = { inputSx: PropTypes.any };
