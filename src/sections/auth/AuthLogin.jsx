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
import { Box, ButtonGroup } from '@mui/material';
import { motion } from 'framer-motion';

import { APP_DEFAULT_PATH, AUTH_USER_KEY } from '@/config';
import Typography from '@mui/material/Typography';
import { BASE_URL } from 'constants';

// @third-party
import { AuthRole } from '@/enum';
import { useForm } from 'react-hook-form';

// @project
import { emailSchema, passwordSchema, userNameSchema } from '@/utils/validationSchema';
import { useSnackbar } from '@/components/CustomSnackbar';

// @assets
import { CloseEye, OpenEye } from '@/icons';

const roles = {
  TaraTeam: AuthRole.SUPER_ADMIN,
  CA: AuthRole.CHARTED_ACCOUNTANT_FIRM,
  Business: AuthRole.CORPORATE_ADMIN,
  ServiceProvider: AuthRole.SERVICE_PROVIDER,
  Individual: AuthRole.INDIVIDUAL
};
const options = ['Individual', 'CA Firm', 'Corporate Entity', 'Service Provider'];
const optionValues = { Individual: 'Individual', 'CA Firm': 'CA', 'Corporate Entity': 'Business', 'Service Provider': 'ServiceProvider' };

export default function AuthLogin({ inputSx }) {
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [selected, setSelected] = useState(options[0]);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: { password: '' } });

  // Handle form submission
  const onSubmit = async (formData) => {
    setIsProcessing(true);
    setLoginError('');
    try {
      const url = `/token_auth/`;
      const postData = { ...formData, user_type: optionValues[selected] };

      const res = await axios.post(BASE_URL + url, postData);
      if (res.status === 200) {
        let userDAta = {
          id: res.data.id,
          email: res.data.email,
          role: roles[res.data.user_type],
          // role: AuthRole.SUPER_ADMIN,
          contact: '123456789',
          dialcode: '+1',
          firstname: res.data.name,
          lastname: '',
          user_groups: res.data.user_groups,
          associated_services: res.data.associated_services,
          // password: 'Super@123',
          mobile: res.data.mobile_number,
          access_token: res.data.access,
          user_role: res.data.user_role,
          user_type: res.data.user_type,
          user_kyc: res.data.user_kyc,
          user_groups: res.data.user_groups,
          associated_services: res.data.associated_services,
          business_exists: res.data.business_exists,
          business_affiliated: res.data.business_affiliated,
          individual_affiliated: res.data.individual_affiliated,
          service_provider_affiliated: res.data.service_provider_affiliated
        };
        setIsProcessing(false);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDAta));
        if (res.data.user_type === 'ServiceProvider' || res.data.user_type === 'TaraTeam') {
          router.push(APP_DEFAULT_PATH);
        } else if (res.data.user_type === 'Business') {
          if (res.data.business_exists === false) {
            router.push('/user-type');
          } else {
            router.push(APP_DEFAULT_PATH);
          }
        } else if (res.data.user_type === null || res.data.user_kyc === false) {
          router.push('/user-type');
        } else {
          router.push(APP_DEFAULT_PATH);
        }
      }
    } catch (error) {
      console.log('error', error);
      showSnackbar(JSON.stringify(error.detail), 'error');
      setIsProcessing(false);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center" mt={4} mb={3}>
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            // backgroundColor: '#e0e0e0',
            borderRadius: '50px',
            padding: '4px',
            width: '1200px', // Adjust width based on your design
            boxSizing: 'border-box',
            border: '1px solid #006397'
          }}
        >
          {/* Animated Background Pill */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 50 }}
            style={{
              position: 'absolute',
              top: '4px',
              bottom: '4px',
              left: `calc(${options.indexOf(selected)} * (100% / ${options.length}) + 4px)`,
              width: `calc((100% / ${options.length}) - 8px)`,
              backgroundColor: '#006397',
              borderRadius: '50px',
              zIndex: 0
            }}
          />

          {/* Buttons */}
          <ButtonGroup
            sx={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              boxSizing: 'border-box',
              '&:hover': { bgcolor: 'none' }
            }}
          >
            {options.map((option) => (
              <Button
                variant="text"
                key={option}
                onClick={() => setSelected(option)}
                sx={{
                  flex: 1,
                  px: 3,
                  py: 1,
                  fontSize: '14px',
                  color: selected === option ? 'white' : 'grey.800',
                  transition: 'color 0.3s',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'none' }
                }}
              >
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
      <Stack sx={{ gap: 2.5 }}>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Username / Email
          </Typography>
          <OutlinedInput
            {...register('email_or_user_name', userNameSchema)}
            placeholder="Enter email or user Name"
            slotProps={{ input: { 'aria-label': 'Email address' } }}
            error={errors.email_or_user_name && Boolean(errors.email_or_user_name)}
            sx={{ ...inputSx }}
          />
          {errors.email_or_user_name?.message && (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.email_or_user_name?.message}
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
