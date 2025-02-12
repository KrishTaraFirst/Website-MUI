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
import { firstNameSchema, lastNameSchema, emailSchema, passwordSchema, userNameSchema } from '@/utils/validationSchema';

// @icons
import { IconEye, IconEyeOff } from '@tabler/icons-react';

/***************************  AUTH - REGISTER  ***************************/
const options = ['Individual', 'CA Firm', 'Business', 'Service Provider'];
const optionValues = { Individual: 'Individual', 'CA Firm': 'CA', Business: 'Business', 'Service Provider': 'ServiceProvider' };

export default function AuthRegister({ inputSx }) {
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
      const payload = { ...formData, user_type: optionValues[selected] };
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
          {selected !== null && (
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
          )}

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
            Username&nbsp;
            <Typography component="span" color="error">
              *
            </Typography>
          </Typography>
          <OutlinedInput
            {...register('user_name', userNameSchema)}
            placeholder="Enter your user Name"
            slotProps={{ input: { 'aria-label': 'Username' } }}
            error={errors.user_name && Boolean(errors.user_name)}
            sx={{ ...inputSx }}
          />
          {errors.user_name?.message && (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.user_name?.message}
            </Typography>
          )}
        </Stack>
        <Stack sx={{ gap: 1 }} direction={'row'}>
          <Stack sx={{ gap: 0.5 }} style={{ minWidth: '50%', maxWidth: '50%' }}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              First Name&nbsp;
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
          <Stack sx={{ gap: 0.5 }} style={{ minWidth: '50%', maxWidth: '50%' }}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Last Name
            </Typography>
            <OutlinedInput
              {...register('last_name', lastNameSchema)}
              placeholder="Enter your last name"
              slotProps={{ input: { 'aria-label': 'Last Name' } }}
              error={errors.last_name && Boolean(errors.last_name)}
              sx={{ ...inputSx }}
            />
            {errors.last_name?.message && (
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.last_name?.message}
              </Typography>
            )}
          </Stack>
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
              href=""
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

AuthRegister.propTypes = { inputSx: PropTypes.any };
